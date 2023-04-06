import { SolutionSetIface, SolutionSetType } from './types';
import { MatrixIface } from '../../types';
import EchelonForm from '../EchelonForm';
import Matrix from '../../Matrix';

const IS_A_FREE_VAR = 'is a free variable';

const SolutionSet: SolutionSetIface = {
    isFreeVariable(matrix: MatrixIface, col: number, isAugmented = false): boolean {
        // make sure the col isn't the last column
        if (isAugmented && col === matrix.numCols - 1) {
            return false;
        }
        return EchelonForm.isPivotColumn(matrix, col) === false;
    },

    isBasicVariable(matrix: MatrixIface, col: number, isAugmented = false): boolean {
        if (isAugmented && col === matrix.numCols - 1) {
            return false;
        }
        return SolutionSet.isFreeVariable(matrix, col, isAugmented) === false;
    },

    getSolutionSetType(matrix: MatrixIface): SolutionSetType {

        /**
         * (1)If the last column of an augmented matrix in echelon form is a pivot column,
         * then the system does not have a solution.
         *
         * (2)If a free variable exists and the last column is not a pivot column, then the
         * system has infinitely many solutions.
         *
         * (3) If a free variable does not exist and the last column is not a pivot column,
         * then the system has a unique solution.
         */
        const isLastColPivotCol = EchelonForm.isPivotColumn(matrix, matrix.numCols - 1);

        let hasZeroRows = false;
        const temp: number[] = [];

        matrix._matrix.forEach((el: number, index: number) => {
            const col = index % matrix.numCols;
            if (col !== matrix.numCols - 1) {
                temp.push(el);
            }
        });

        const coefficientMatrix = Matrix({
            numRows: matrix.numRows,
            numCols: matrix.numCols - 1,
            matrix: temp
        });

        for (let row = 0; row < coefficientMatrix.numRows; row++) {

            if (EchelonForm.isZeroRow(coefficientMatrix, row)) {
                hasZeroRows = true;
            }
        }

        const hasFreeVariables = hasZeroRows || (matrix.numCols - 1 > matrix.numRows);

        if (isLastColPivotCol && hasFreeVariables) {
            return SolutionSetType.NoSolution;
        } else if (hasFreeVariables && !isLastColPivotCol) {
            return SolutionSetType.Infinite;
        } else {
            return SolutionSetType.Unique;
        }

    },

    getGeneralSolution(matrix: MatrixIface): string[] { //NOSONAR
        // check that the matrix is in echelon form
        if (EchelonForm.isEchelonForm(matrix) === false) {
            throw new Error('The matrix is not in echelon form');
        }

        // check that there is a solution
        const typeOfSolution: SolutionSetType = SolutionSet.getSolutionSetType(matrix);

        if (typeOfSolution === SolutionSetType.NoSolution) {
            return [SolutionSetType.NoSolution];
        }

        let solutions: string[] = [];
        const numVars = matrix.numCols - 1;
        const systemVariables: string[] = [];
        const constants = matrix.getColumn(matrix.numCols - 1);


        // build the system variables
        for (let i = 0; i < numVars; i++) {
            systemVariables.push(`x_${i + 1}`);
        }

        // reusable solve function
        function solveFor(variableName: string, row: number, rowVariables: number[]): void {
            let solution = '';

            type OtherVariables = {
                variable: string,
                coefficient: number,
                rowFound: number,
                columnFound: number
            };

            // if there are other variables in the row, we need to move them to the other side of the equation
            // and multiply them by -1
            const otherVariables: (OtherVariables | undefined)[] = rowVariables
                .map((el, index): OtherVariables | undefined => {
                    if (index !== row && el !== 0) {
                        const currentVar: string = systemVariables[index];

                        if (currentVar !== variableName) {
                            return {
                                variable: systemVariables[index],
                                coefficient: el,
                                rowFound: row,
                                columnFound: index
                            };
                        }
                    }
                    return undefined;
                }).filter(el => el !== undefined && el.variable !== undefined);

            // add the variable and the constant to the solution
            solution += `${variableName} = ${constants[row]}`;

            for (const otherVariable of otherVariables) {
                const coefficient = otherVariable?.coefficient || 1;
                const operation = coefficient < 0 ? '+' : '-';
                const absCoefficient = Math.abs(coefficient);

                solution += ` ${operation} ${absCoefficient}${otherVariable?.variable}`;
            }

            // add the solution to the solutions array in the correct order
            solutions.push(solution);
        }


        for (let row = 0; row < matrix.numRows; row++) {
            const rowVariables = matrix.getRow(row);
            let solution = '';

            // lets check if x_row is a free variable
            const isFreeVariable = SolutionSet.isFreeVariable(matrix, row, true);

            // write the variable to the solution
            solution += `${systemVariables[row]} `;

            // if the variable the corresponds to this row is a free variable, then immediately add the free variable
            // to the solution set, but we need to keep checking incase the row isn't a zero row
            if (isFreeVariable) {
                solution += IS_A_FREE_VAR;
                // add the solution to the solutions array
                solutions.push(solution);
                // reset the solution
                solution = '';
            }

            // IF THE VARIABLE WASN'T FOUND IN THE ROW
            if (rowVariables[row] === 0) {
                // ARE WE ZERO ROW?
                const isZeroRow = EchelonForm.isZeroRow(matrix, row);

                // IF WE ARE NOT A ZERO ROW
                !isZeroRow && (() => {
                    // we can look for the leading entry in the row and get the index, which is akin
                    // to the column index for the variable,
                    const colIndex = rowVariables.findIndex((el: number) => el === 1);
                    // THIS SHOULDN'T HAPPEN - BUT WE NEED TO HANDLE IT
                    !colIndex && (() => {
                        throw new Error('The matrix is not in echelon form');
                    })();

                    // we can then solve for the variable using the column index
                    solveFor(systemVariables[colIndex], row, rowVariables);
                })();
                // do nothing, if we are a zero row, then we can't solve for the variable
            } else {
                // WE CAN SOLVE FOR THE VARIABLE USING THIS ROW
                solveFor(systemVariables[row], row, rowVariables);
            }
        }

        // reduce the solutions to a single constant if possible
        const solved = solutions.filter(solution => solution.includes('=')
            && solution.split('=')[1].includes('x_') === false);

        // replaces a known variable with its value in the other equations
        for (const solvedSolution of solved) {
            const [variable] = solvedSolution.split(' ');
            const solvedValue = solvedSolution.split('=')[1] || -1;

            for (const nonReducedSolved of solutions) {
                const [nonReducedVariable, _equalSign] = nonReducedSolved.split(' ');
                if (nonReducedVariable !== variable && _equalSign !== 'is') {
                    const equationToReduce = nonReducedSolved.split('=')[1];
                    const constRegex = new RegExp(`[0-9]+${variable}`);

                    // constant that is attached to the variable
                    const constant = equationToReduce?.match(constRegex)?.[0].split('x')[0];
                    // operator that is attached to the constant
                    const op = equationToReduce.includes('+') ? '+' : '-';

                    // the original constant that was in the constant matrix
                    const originalConst: string = equationToReduce.split(op)[0];

                    // multiply the constant by the solved value
                    const newVal = Number(constant) * Number(solvedValue);

                    // add or subtract the new value from the original constant
                    const reducedVal: number = equationToReduce.includes('+') ?
                        Number(originalConst) + newVal :
                        Number(originalConst) - newVal;

                    const newSolution = `${nonReducedVariable} = ${reducedVal}`;

                    // replace the old solution with the new solution
                    solutions = solutions.map(solution => solution === nonReducedSolved ? newSolution : solution);
                }
            }
        }


        // check that all solutions are accounted for,
        const accountedFor = new Set(solutions.map(solution => solution.split(' ')[0].trim()));
        const missing = systemVariables.filter(variable => !accountedFor.has(variable));

        // for each missing variable we need to update the solutions array
        missing.forEach(variable => {
            const index = Number(variable.split('_')[1]) - 1;
            // if the variable was missing it is because the row isn't listed in the
            // matrix for the variable, so we can assume that the variable is a free variable
            const newSolution = `${variable} ${IS_A_FREE_VAR}`;

            solutions = [...solutions.slice(0, index), newSolution, ...solutions.slice(index)];
        });

        return solutions;
    },

    getParametricForm(matrix: MatrixIface): string[] {
        // check that the matrix is in reduced echelon form
        if (!EchelonForm.isEchelonForm(matrix)) {
            // TODO: implement the algorithm to reduce a matrix to reduced echelon form
            // This will be implemented in a different module and will will borrow it from there
            throw new Error('Matrix must be in echelon form');
        } else {
            // TODO: implement the algorithm to get the parametric form of a matrix
            const generalSolution: string[] = SolutionSet.getGeneralSolution(matrix);
            const _solution: string[] = [];

            if (!generalSolution.includes(SolutionSetType.NoSolution)) {
                // for each solution we need to get the parametric form
                // we can split at the = sign and get whatever is on the right side of the equation
                // if it is a free variable we need to split at is and take the left side
                generalSolution.forEach(solution => {
                    // check if the solution is a free variable
                    if (solution.includes(IS_A_FREE_VAR)) {
                        // split at the is and take the left side
                        _solution.push(solution.split('is')[0].trim());
                    } else {
                        // split at the = sign and take the right side

                        _solution.push(solution.split('=')[1].trim());
                    }
                });
                return _solution;
            }

            return generalSolution;
        }
    }
};

export default SolutionSet;

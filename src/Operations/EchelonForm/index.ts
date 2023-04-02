import { MatrixIface } from '../../types';
import { EchelonFormIface } from './types';
import { checkZeroRows, checkLeadingEntries } from './helpers';


export const EchelonForm: EchelonFormIface = {
    isZeroRow(matrix: MatrixIface, row: number): boolean {
        const Row = matrix.getRow(row);
        return Row.every((entry: number) => entry === 0);
    },
    isNonZeroRow(matrix: MatrixIface, row: number): boolean {
        return EchelonForm.isZeroRow(matrix, row) === false;
    },
    isZeroColumn(matrix: MatrixIface, col: number): boolean {
        const Col = matrix.getColumn(col);
        return Col.every((entry: number) => entry === 0);
    },
    isNonZeroColumn(matrix: MatrixIface, col: number): boolean {
        return EchelonForm.isZeroColumn(matrix, col) === false;
    },
    isEchelonForm(matrix: MatrixIface, isReduced = false): boolean {
        // the verification function throw errors if the matrix is not in echelon form
        try {
            // 1. all zero rows are at the bottom of the matrix
            checkZeroRows(matrix);
            // 2. the first non-zero entry in a row is a leading entry
            // 3. all entries below a leading entry are zeros
            // 4. all entries above a leading entry we don't care about
            // 5. all leading entries are to the right of the leading entry of the row above it

            // This may not be truly functional since we have a function
            // that can do two things but it is more efficient to do it this way
            // rather than have to loop over the matrix 2x if we
            // want to ensure it is in reduced form an optional
            // parameter can be passed to checkLeadingEntries, which defaults to false
            checkLeadingEntries(matrix, isReduced);
        } catch (error: unknown) {
            return false;
        }

        // if we make it here, the matrix is in echelon form
        return true;
    },
    isReducedEchelonForm(matrix: MatrixIface): boolean {
        return EchelonForm.isEchelonForm(matrix, true);
    },
    isPivotElement(matrix: MatrixIface, row: number, col: number): boolean {
        const Row = matrix.getRow(row);
        const leadingEntry = Row[col];
        const isLeadingEntry = leadingEntry !== 0;

        return isLeadingEntry;
    },
    isPivotColumn(matrix: MatrixIface, col: number): boolean {
        let hasPivot = false;
        const columnToCheck = matrix.getColumn(col);

        for (let row = 0; row < columnToCheck.length; row++) {
            const isPivotElement = EchelonForm.isPivotElement(matrix, row, col);
            if (isPivotElement) {
                hasPivot = true;
                break;
            }
        }
        return hasPivot;
    },
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
        return EchelonForm.isFreeVariable(matrix, col, isAugmented) === false;
    },
    getGeneralSolution(matrix: MatrixIface): string[] { //NOSONA
        // check that the matrix is in reduced echelon form
        if (EchelonForm.isReducedEchelonForm(matrix) === false) {
            throw new Error('The matrix is not in reduced echelon form');
        }

        const solutions: string[] = [];
        const numVars = matrix.numCols - 1;
        const systemVariables: string[] = [];
        const constants = matrix.getColumn(matrix.numCols - 1);


        // build the system variables
        for (let i = 0; i < numVars; i++) {
            systemVariables.push(`x_${i + 1}`);
        }
        // console.log({
        //     solutions,
        //     numVars,
        //     systemVariables,
        //     constants
        // })
        for (let row = 0; row < matrix.numRows; row++) {
            // we need to get all the variables in the row
            const rowVariables = matrix.getRow(row);
            // console.log({ rowVariables });
            let solution = '';

            // write the variable to the solution
            solution += `${systemVariables[row]} `;

            // if there are other variables in the row, we need to move them to the other side of the equation
            // and multiply them by -1
            const otherVariables: ({ variable: string, coefficient: number, isPivot: boolean } | undefined)[] = rowVariables.map((el, index) => {
                if (index !== row && el !== 0) {
                    return {
                        variable: systemVariables[index],
                        coefficient: el,
                        isPivot: EchelonForm.isPivotElement(matrix, row, index)
                    };
                }
            }).filter(el => el !== undefined && el.variable !== undefined);
            // console.log({ otherVariables });

            // if there are other variables in the row, we need to move them to the other side of the equation
            // and multiply them by -1
            if (otherVariables.length > 0) {
                // for the length of the other variables, we need to move them to the other side of the equation
                // and multiply them by -1
                for (const element of otherVariables) {
                    const { variable, coefficient } = element as {
                        variable: string,
                        coefficient: number
                    };
                    solution += `= ${constants[row]} ${coefficient < 0 ? '+' : '-'} ${Math.abs(coefficient)}${variable} `;
                }
            } else {
                // check if it is a free variable
                solution += EchelonForm.isFreeVariable(matrix, row) ?
                    'is a free variable' :
                    `= ${constants[row]}`;
            }

            // check if it is a free variable
            // add the solution to the solutions array
            solutions.push(solution);
        }

        // sometimes there are not enough rows, so we need to add the remaining variables
        // to the solutions array, these would be free variables
        if (solutions.length < numVars) {
            // get the number of free variables
            // add the missing variables to the solutions array
            for (let i = solutions.length; i < numVars; i++) {
                solutions.push(`x_${i + 1} is a free variable`);
            }
        }

        // console.log({ solutions });

        //**Before we return the solutions we should ensure that they are reduced all the way * /
        // look for any variables that are not free variables but have been solved, meaning
        // they equal only a constant and no other variables
        const solved = solutions.filter(solution => solution.includes('=')
            && solution.split('=')[1].includes('x_') === false);

        // console.log({ solved });

        // for other variables that are not free variables, and contain any solved variables
        // we can substitute the solved variable into the other variable and reduce the solution
        // to a single constant
        for (const solution of solutions) {
            // check if the solution is a free variable
            if (solution.includes('is a free variable') === false && !solved.includes(solution)) {
                // get the variable name
                // console.log('Need to substitute', { solution });
                const variable = solved
                    .filter(solvedVariable => solution?.includes(solvedVariable?.split('=')[0]))[0]?.split('=')[0];
                // console.log({ variable });

                if (variable === undefined) {
                    break;
                }

                // we need to get the coefficient of the variable
                // use regex to extract the first number to the immediate left of the variable
                // should be at the end of the string
                const coefficient = solution?.split(variable)[0]?.match(/\d+$/)?.[0];
                // console.log({ coefficient });

                // we need to get the constant from the solved and multiply it by the coefficient
                // and then replace the variable with the new constant in the solution
                const constant = solved?.filter(solvedVariable => solution?.includes(solvedVariable?.split('=')[0]))[0]?.split('=')[1];

                // we need to get the constant from the solution and multiply it by the coefficient
                // and then replace the variable with the new constant in the solution
                const newConstant = Number(constant) * Number(coefficient);
                // console.log({ newConstant });

                // replace the variable and its coefficient with the new constant
                let newSolution = solution.replace(`${coefficient}${variable}`, newConstant.toString());
                // console.log({ newSolution });

                // now we need to look to see if we can combine any constants in the solution or if it is already reduced
                // if there are other variables that is fine we want to leave them alone
                // we are looing to add or subtract constants
                // we need to get the constants from the solution
                const constants = newSolution.split('=').map(el => el.trim()).filter(el => el !== '' && el !== 'is a free variable' && el.includes('x_') === false);

                // console.log({ constants });

                // check if any of the elements in the constants have a + or - sign
                // if they do we need to split them and add or subtract them
                // if they don't we can just add them
                for (const entry of constants) {
                    // console.log({ entry });
                    // check if the entry has a + or - sign
                    const hasOp = entry.includes('+') || entry.includes('-');
                    hasOp && (() => {
                        // we need to perform the operation
                        // we need to get the operator
                        const operator = entry.includes('+') ? '+' : '-';

                        // we need to get the constants from the entry
                        const entryConstants = entry.split(operator).map(el => el.trim()).filter(el => el !== '');

                        // we need to perform the operation
                        const newEntry = operator === '+' ?
                            Number(entryConstants[0]) + Number(entryConstants[1]) :
                            Number(entryConstants[0]) - Number(entryConstants[1]);

                        // update the new solution
                        newSolution = newSolution.replace(entry.trim(), newEntry.toString());
                    })();
                    // console.log({ newSolution });
                    // replace the solution with the new solution in the solved array
                    solutions[solutions.indexOf(solution)] = newSolution;
                }
            }
        }
        // console.log({ solutions });
        return solutions;
    },

    getParametricForm(matrix: MatrixIface): string[] {
        // check that the matrix is in reduced echelon form
        if (EchelonForm.isReducedEchelonForm(matrix) === false) {
            // TODO: implement the algorithm to reduce a matrix to reduced echelon form
            // This will be implemented in a different module and will will borrow it from there
            throw new Error('Matrix must be in reduced echelon form');
        } else {
            // TODO: implement the algorithm to get the parametric form of a matrix

            const generalSolution = EchelonForm.getGeneralSolution(matrix);

            const _solution: string[] = [];
            // for each solution we need to get the parametric form
            // we can split at the = sign and get whatever is on the right side of the equation
            // if it is a free variable we need to split at is and take the left side
            generalSolution.forEach(solution => {
                // check if the solution is a free variable
                if (solution.includes('is a free variable')) {
                    // split at the is and take the left side
                    _solution.push(solution.split('is')[0].trim());
                } else {
                    // split at the = sign and take the right side

                    _solution.push(solution.split('=')[1].trim());
                }
            });
            return _solution;
        }
    }
};

export default EchelonForm;

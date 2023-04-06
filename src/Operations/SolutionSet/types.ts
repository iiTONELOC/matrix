import { MatrixIface } from '../../types';
/**
 * @public
 *  Every system of linear equations, without exception, has either no solution, one solution,
 *  or infinite solutions.
 * 
 * This section introduces methods for determining which of these three
 * cases applies to a given system.
 *
 * - isFreeVariable : a variable is a free variable if it is in a non-pivot column
 * - isBasicVariable : a variable is a basic variable if it is in a pivot column
 * - getGeneralSolution : returns the general solution of a system of linear equations
 * - getParametricSolution : returns the parametric solution of a system of linear equations
 */
export interface SolutionSetIface {
    /**
    * @public
    * Determines if a variable is a free variable
    *
    * A free variable is a variable is a variable that is in a non-pivot column and
    * resides in the coefficient matrix of a system of linear equations
    *
    * @param matrix the matrix we are operating on
    * @param col the column index of the element we are checking
    * @returns true if the element is a free variable, false otherwise
    * @throws Lots of errors, if the row or column index is out of bounds as well as malformed matrices
    *
    * see {@link EchelonFormIface.isEchelonForm}
    *
    * see {@link EchelonFormIface.isPivotColumn}
    *
    * see {@link EchelonFormIface.isPivotElement}
    */
    isFreeVariable: (matrix: MatrixIface, col: number, isAugmented?: boolean) => boolean;

    /**
     * @public
     * Determines if a variable is a basic variable
     *
     * A basic variable is a variable that is in a pivot column and
     * resides in the coefficient matrix of a system of linear equations
     *
     * @param matrix the matrix we are operating on
     * @param col the column index of the element we are checking
     * @returns true if the element is a basic variable, false otherwise
     * @throws Lots of errors, if the row or column index is out of bounds as well as malformed matrices
     *
     * see {@link EchelonFormIface.isEchelonForm}
     *
     * see {@link EchelonFormIface.isPivotColumn}
     *
     * see {@link EchelonFormIface.isFreeVariable}
     */
    isBasicVariable: (matrix: MatrixIface, col: number, isAugmented?: boolean) => boolean;

    /**
     * @public
     * Determines the type of solution this system of linear equations has
     *
     * The type of solution is either no solution, infinite solutions, or a unique solution.
     * @param matrix the matrix we are operating on
     * @returns the type of solution this system of linear equations has
     * see {@link SolutionSetType}
     * @throws Lots of errors, if the row or column index is out of bounds as well as malformed matrices
     */
    getSolutionSetType: (matrix: MatrixIface) => SolutionSetType;

    /**
     * @public
     * Retrieves the general solution of a system of linear equations given the matrix
     * is in reduced echelon form
     *
     * The general solution is the set of all solutions to a system of linear equations
     *
     * @param matrix the matrix we are operating on
     * @returns the general solution of the system of linear equations as the general solution, expressed
     * as a column matrix
     * @throws Lots of errors, if the row or column index is out of bounds as well as malformed matrices
     */
    getGeneralSolution: (matrix: MatrixIface) => string[];

    /**
     * @public
     * Returns the parametric form of a system of linear equations given the matrix
     * is in reduced echelon form
     *
     * @param matrix the matrix we are operating on
     * @returns the parametric form of the system of linear equations as the general solution, expressed
     * as a column matrix
     * @throws Lots of errors, if the row or column index is out of bounds as well as malformed matrices
     *
     * see {@link EchelonFormIface.isReducedEchelonForm}
     *
     * see {@link EchelonFormIface.isBasicVariable}
     *
     * see {@link EchelonFormIface.isFreeVariable}
     *
     * see {@link EchelonFormIface.isPivotColumn}
     *
     * see {@link EchelonFormIface.isPivotElement}
     */
    getParametricForm: (matrix: MatrixIface) => string[];
}

/**
 * @public
 * The type of solution set a system of linear equations can have
 *
 * - NoSolution : the system of linear equations has no solution
 * - Infinite : the system of linear equations has infinite solutions
 * - Unique : the system of linear equations has a unique solution
 */
export enum SolutionSetType {
    NoSolution = 'No Solution',
    Infinite = 'Infinite Solutions',
    Unique = 'Unique Solution',
    ERROR = 'ERROR'
}

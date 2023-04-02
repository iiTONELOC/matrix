/**
 * Echelon Form
 *
 * Definitions for Echelon Form
 *
 * - zero row : a row of all zeros
 * - non-zero row : a row with at least one non-zero entry
 * - zero column : a column of all zeros
 * - non-zero column : a column with at least one non-zero entry
 * - leading entry : the first non-zero entry in a row
 *
 *  (1) any zero rows are below all nonzero rows,
 *  (2) the leading entry of each row is to the right of the leading entries in the rows above, and
 *  (3) any entries below a leading entry are zeros. The third property is a consequence of the first two.
 */

import { MatrixIface } from '../../types';

/**
 * Echelon Form > Row Types
 * @public
 * @enum EchelonRowType
 * - ZeroRow : a row of all zeros
 * - NonZeroRow : a row with at least one non-zero entry
 */
export enum EchelonRowType {
    /**
     * @public
     * a row of all zeros
     */
    ZeroRow = 0,
    /**
     * @public
     * a row with at least one non-zero entry
     */
    NonZeroRow = 1
}

/**
 * Echelon Form > Column Types
 * @public
 * @enum EchelonColType
 * - ZeroCol : a column of all zeros
 * - NonZeroCol : a column with at least one non-zero entry
 */
export enum EchelonColType {
    /**
     * @public
     * a column of all zeros
     */
    ZeroCol = 0,
    /**
     * @public
     * a column with at least one non-zero entry
     */
    NonZeroCol = 1
}

/**
 * Echelon Form > Entry Types
 * @public
 * @enum EchelonEntryType
 * - LeadingEntry : the first non-zero entry in a row
 * - NonLeadingEntry : any entries below a leading entry are zeros
 * (any entries above a leading entry we don't care about),
 */
export enum EchelonEntryType {
    /**
     * @public
     * the first non-zero entry in a row
     */
    LeadingEntry = 1,
    /**
     * @public
     * any entries below a leading entry are zeros,
     * any entries above a leading entry we don't care about
     */
    NonLeadingEntry = 0
}

export interface EchelonFormIface {
    /**
     * @public
     * Determines if a row in a matrix is a zero row
     * @param matrix The matrix we are operating on
     * @param row the index of the row we are checking
     * @returns true if the row is a zero row, false otherwise
     * @Throws an error if the row index is out of bounds
     */
    isZeroRow: (matrix: MatrixIface, row: number) => boolean;

    /**
     * @public
     * Determines if a row in a matrix is a non-zero row
     * @param matrix The matrix we are operating on
     * @param row the index of the row we are checking
     * @returns true if the row is a non-zero row, false otherwise
     * @Throws an error if the row index is out of bounds
     */
    isNonZeroRow: (matrix: MatrixIface, row: number) => boolean;

    /**
     * @public
     * Determines if a column in a matrix is a zero column
     * @param matrix the matrix we are operating on
     * @param col the index of the column we are checking
     * @returns true if the column is a non-zero column, false otherwise
     * @Throws an error if the column index is out of bounds
     */
    isZeroColumn: (matrix: MatrixIface, col: number) => boolean;

    /**
     * @public
     * Determines if a column in a matrix is a non-zero column
     * @param matrix the matrix we are operating on
     * @param col the index of the column we are checking
     * @returns true if the column is a non-zero column, false otherwise
     * @Throws an error if the column index is out of bounds
     */
    isNonZeroColumn: (matrix: MatrixIface, col: number) => boolean;

    /**
     * @public
     * Determines if the matrix is in echelon form
     *
     * To be in echelon form, the matrix must satisfy the following conditions:
     *
     * (1) any zero rows are below all nonzero rows,
     *
     * (2) the leading entry of each row is to the right of the leading entries
     * in the rows above, and
     *
     * (3) any entries below a leading entry are zeros.
     *
     * @param matrix the matrix we are operating on
     * @returns true if the matrix is in echelon form, false otherwise
     */
    isEchelonForm: (matrix: MatrixIface, checkReduced?: boolean) => boolean;

    /**
     * @public
     * Determines if the matrix is in reduced echelon form
     *
     * Reduced echelon form is a matrix in echelon form that satisfies the following conditions:
     *
     * (1) any rows that contain all zeros are at the bottom of the matrix,
     *
     *
     * (2) the leading entry in each nonzero row is to the right of the leading entry in the row above it,
     *
     * (3) all entries below a leading entry are zeros, and
     *
     * (4) each leading entry is 1 and is the only nonzero entry in its column.
     *
     * @param matrix the matrix we are operating on
     * @returns true if the matrix is in reduced echelon form, false otherwise
     */
    isReducedEchelonForm: (matrix: MatrixIface) => boolean;

    /**
     * @public
     * Determines if an element in a matrix is the pivot element
     *
     * The pivot is any leading entry of a matrix that is in echelon form
     * @param matrix the matrix we are operating on
     * @param row the row index of the element we are checking
     * @param col the column index of the element we are checking
     * @returns true if the element is a pivot element, false otherwise
     * @throws Lots of errors, if the row or column index is out of bounds as well as malformed matrices
     *
     * see {@link EchelonFormIface.isEchelonForm}
     */
    isPivotElement: (matrix: MatrixIface, row: number, col: number) => boolean;

    /**
     * @public
     * Determines if a column is a pivot column
     *
     * A pivot column is a column that contains a pivot element
     * @param matrix the matrix we are operating on
     * @param col the column index of the column we are checking
     * @returns true if the column is a pivot column, false otherwise
     * @throws Lots of errors, if the column index is out of bounds as well as malformed matrices
     *
     * see {@link EchelonFormIface.isEchelonForm}
     *
     * see {@link EchelonFormIface.isPivotElement}
    */
    isPivotColumn: (matrix: MatrixIface, col: number) => boolean;

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

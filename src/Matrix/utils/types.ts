import type { MatrixIface } from '../types';

/**
 * @public
 * @enum MatrixType
 * @description
 * This enum defines the different types of matrices.
 *
 * identified types:
 * - ZeroMatrix : A zero matrix is a matrix in which all elements are zero.
 * - ColumnMatrix : A column matrix is a matrix with one column and any number of rows.
 * - RowMatrix : A row matrix is a matrix with one row and any number of columns.
 * - SquareMatrix : A square matrix is a matrix with the same number of rows and columns.
 * - DiagonalMatrix : A diagonal matrix is a square matrix in which all elements outside the main diagonal are zero.
 * - IdentityMatrix : A square diagonal matrix in which all entries along the main diagonal are equal to one.
 */
export enum MatrixType {
    /**
     * @public
     * A zero matrix is a matrix in which all elements are zero.
     */
    ZeroMatrix = 'ZeroMatrix',
    /**
     *  @public
     * A column matrix is a matrix with one column and any number of rows.
     */
    ColumnMatrix = 'ColumnMatrix',
    /**
     *  @public
     * A row matrix is a matrix with one row and any number of columns.
     */
    RowMatrix = 'RowMatrix',
    /**
     *  @public
     * A square matrix is a matrix with the same number of rows and columns.
     */
    SquareMatrix = 'SquareMatrix',
    /**
     *  @public
     * A diagonal matrix is a square matrix in which all elements outside the main diagonal are zero.
     */
    DiagonalMatrix = 'DiagonalMatrix',
    /**
     *  @public
     * A square diagonal matrix in which all entries along the main diagonal are equal to one.
     */
    IdentityMatrix = 'IdentityMatrix',

    NotSpecial = 'NotSpecial'
}

/**
 * @public
 * @interface MatrixUtilsIface
 * @description
 * This interface defines the functions that operate on individual matrices.
 * For example, the identifyMatrixType function identifies the type of a matrix
 * and transpose will return the individual transpose of a matrix. But this interface
 * doesn't contain functions that operate on multiple matrices such as addition, subtraction, etc.
 *
 * @property {MatrixType} identifyMatrixType Identifies the type of a matrix.
 */
export interface MatrixUtilsIface {
    /**
     * Identifies the type of a matrix.
     * @public
     *
     * @returns {MatrixType} The type of the matrix.
     */
    identifyMatrixType(): MatrixType;

    /**
     * Returns the transpose of a matrix.
     * 
     * The transpose of a matrix is a new matrix that is formed by turning all the
     * rows of the original matrix into columns and vice versa.
     * @public
     * @returns {number[]} The transpose of the matrix.
     */
    transpose(): number[];

    /**
     * Returns the trace of a matrix.
     * 
     * The trace of a matrix is the sum of the elements on the main diagonal of the matrix.
     * @public
     * @returns {number} The trace of the matrix.
     */
    trace(): number;

    /**
     * Scales a matrix by the given scalar and returns a new matrix.
     *
     * Does not mutate the original matrix!
     * @public
     * @param {number} scalar The scalar to multiply the matrix by.
     * @returns {number[]} The scaled matrix.
     * @throws {Error} If the scalar is not a number.
     * @throws {Error} If the scalar is not finite.
     */
    scale(scalar: number): MatrixIface;
}

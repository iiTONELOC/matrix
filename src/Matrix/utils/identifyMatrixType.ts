import { MatrixIface } from '../types';
import { MatrixType } from './types';

export function isZeroMatrix(matrix: MatrixIface): boolean {
    // every entry in the matrix is zero
    return matrix._matrix.every((entry: number) => entry === 0);
}

export function isColumnMatrix(matrix: MatrixIface): boolean {
    // only one column
    return matrix.numCols === 1 && matrix.numRows > 1;
}

export function isRowMatrix(matrix: MatrixIface): boolean {
    // only one row
    return matrix.numRows === 1 && matrix.numCols > 1;
}

export function isSquareMatrix(matrix: MatrixIface): boolean {
    // same number of rows and columns
    return matrix.numRows === matrix.numCols;
}

export function isDiagonalMatrix(matrix: MatrixIface): boolean {
    // must be a square matrix
    if (!isSquareMatrix(matrix)) {
        return false;
    }

    // loop through the rows
    for (let row = 0; row < matrix.numRows; row++) {
        // loop through the columns
        for (let col = 0; col < matrix.numCols; col++) {
            // if the entry is not on the diagonal and is not zero
            if (row !== col && matrix.get(row, col) !== 0) {
                return false;
            }
        }
    }

    return true;
}

export function isIdentity(matrix: MatrixIface) {
    if (!isDiagonalMatrix(matrix)) {
        return false;
    }

    // loop through the rows
    for (let row = 0; row < matrix.numRows; row++) {
        // loop through the columns
        for (let col = 0; col < matrix.numCols; col++) {
            // if the entry is on the diagonal and is not one
            if (row === col && matrix.get(row, col) !== 1) {
                return false;
            }
        }
    }

    return true;
}

export function identifyMatrixType(matrix: MatrixIface): MatrixType {
    if (isZeroMatrix(matrix)) {
        return MatrixType.ZeroMatrix;
    } else if (isColumnMatrix(matrix)) {
        return MatrixType.ColumnMatrix;
    } else if (isRowMatrix(matrix)) {
        return MatrixType.RowMatrix;
    } else if (isSquareMatrix(matrix)) {
        const isDiagonal = isDiagonalMatrix(matrix);
        if (isDiagonal) {
            const _isIdentity = isIdentity(matrix);
            return _isIdentity ? MatrixType.IdentityMatrix : MatrixType.DiagonalMatrix;
        } else {
            return MatrixType.SquareMatrix;
        }
    } else {
        return MatrixType.NotSpecial;
    }
}


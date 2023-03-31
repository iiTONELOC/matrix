import { MatrixConstructor, MatrixIface } from '.';

export const validateRowInput = (rowInput: unknown): void => {
    if (typeof rowInput !== 'number') {
        throw new Error(`Row must be a number. Received ${rowInput}.`);
    }

    if (rowInput < 0 || !Number.isInteger(rowInput)) {
        throw new Error(`Number of rows must be a positive integer. Received ${rowInput}.`);
    }
};

export const validateColInput = (colInput: unknown): void => {
    if (typeof colInput !== 'number') {
        throw new Error(`Column must be a number. Received ${colInput}.`);
    }

    if (colInput < 0 || !Number.isInteger(colInput)) {
        throw new Error(`Number of columns must be a positive integer. Received ${colInput}.`);
    }
};

export const validateRow = (row: number, numRows: number): void => {
    validateRowInput(row);
    if (row < 0 || row >= numRows) {
        throw new Error(`Row ${row} is out of bounds.`);
    }
};

export const validateCol = (col: number, numCols: number): void => {
    validateColInput(col);
    if (col < 0 || col >= numCols) {
        throw new Error(`Column ${col} is out of bounds.`);
    }
};

export const validateMatrix = (matrix: unknown, numRows: number, numCols: number): void => {
    if (!Array.isArray(matrix)) {
        throw new Error(`Matrix must be an array. Received ${matrix}.`);
    }

    // flatten before more validation
    matrix = [...matrix].flat();

    if (Array.isArray(matrix) && matrix.some((value: unknown) => typeof value !== 'number')) {
        throw new Error(`Matrix elements must contain only numbers. Received ${matrix}.`);
    }

    if (Array.isArray(matrix) && matrix.length !== numRows * numCols) {
        throw new Error(`Matrix must contain ${numRows * numCols} elements. Received ${matrix.flat().length}.`);
    }
};

export const validateConstructor = ({ numRows, numCols, matrix }: MatrixConstructor): void => {
    validateRowInput(numRows);
    validateColInput(numCols);

    matrix && validateMatrix(matrix, numRows, numCols);
};

export const validateGet = (row: number, col: number, self: MatrixIface): void => {
    validateRow(row, self.numRows);
    validateCol(col, self.numCols);
};

export const validateSet = (row: number, col: number, value: unknown, self: MatrixIface): void => {
    validateGet(row, col, self);

    if (typeof value !== 'number') {
        throw new Error(`Value must be a number. Received ${value}.`);
    }
};

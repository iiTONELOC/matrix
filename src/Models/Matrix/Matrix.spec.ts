import { describe, it, expect } from '@jest/globals';
import _matrix, { Matrix, MatrixIface, MatrixConstructor } from '.';

const mData: MatrixConstructor = {
    numRows: 2,
    numCols: 2,
    matrix: [1, 2, 3, 4]
};

describe('Matrix', () => {
    /**
     * Object and instantiation
     */
    it('Should have a default export that is defined', () => {
        expect(_matrix).toBeDefined();
        expect(_matrix).toBeInstanceOf(Function);
        expect.assertions(2);
    });

    it('Should return an instance of the Matrix class', () => {
        const matrix: MatrixIface = _matrix(mData);
        expect(matrix).toBeInstanceOf(Matrix);
        expect.assertions(1);
    });

    it('Should throw an error if the numRows parameter is not provided', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(() => _matrix({ numCols: 2 })).toThrow();
    });

    it('Should throw an error if the numCols parameter is not provided', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(() => _matrix({ numRows: 2 })).toThrow();
    });

    it('Should throw an error if the numRows parameter is less than 0', () => {
        expect(() => _matrix({ numRows: -1, numCols: 2 })).toThrow();
    });

    it('Should throw an error if the numCols parameter is less than 0', () => {
        expect(() => _matrix({ numRows: 2, numCols: -1 })).toThrow();
    });

    it('Should throw an error if the numRows parameter is not a number', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(() => _matrix({ numRows: 'a', numCols: 2 })).toThrow();
    });

    it('Should throw an error if the numCols parameter is not a number', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(() => _matrix({ numRows: 2, numCols: 'a' })).toThrow();
    });

    it('Should throw an error if the matrix parameter is not an array', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(() => _matrix({ numRows: 2, numCols: 2, matrix: 'a' })).toThrow();
    });

    it('Should throw and error if a matrix is provided with the type of elements', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(() => _matrix({ numRows: 2, numCols: 2, matrix: ['a', 'b', 'c', 'd'] })).toThrow();
    });

    it('Should throw an error if the matrix parameter is not the correct length', () => {
        expect(() => _matrix({ numRows: 2, numCols: 2, matrix: [1, 2, 3] })).toThrow();
    });

    it('Should create an empty matrix if no matrix parameter is provided', () => {
        const matrix: MatrixIface = _matrix({ numRows: 2, numCols: 2 });
        expect(matrix.get(0, 0)).toBe(0);
        expect(matrix.get(0, 1)).toBe(0);
        expect(matrix.get(1, 0)).toBe(0);
        expect(matrix.get(1, 1)).toBe(0);
    });


    /**
     * Property tests
     */

    it('Should have a numRows property', () => {
        const matrix: MatrixIface = _matrix(mData);
        expect(matrix.numRows).toBeDefined();
        expect(matrix.numRows).toBe(2);
        expect.assertions(2);
    });

    it('Should have a numCols property', () => {
        const matrix: MatrixIface = _matrix(mData);
        expect(matrix.numCols).toBeDefined();
        expect(matrix.numCols).toBe(2);
        expect.assertions(2);
    });

    /**
     * Method tests
     */

    it('Should have a get method', () => {
        const matrix: MatrixIface = _matrix(mData);
        expect(matrix.get).toBeDefined();
        expect(matrix.get).toBeInstanceOf(Function);
        expect.assertions(2);
    });

    it('Should return the correct value for the get method', () => {
        const matrix: MatrixIface = _matrix(mData);
        expect(matrix.get(0, 0)).toBe(1);
        expect(matrix.get(0, 1)).toBe(2);
        expect(matrix.get(1, 0)).toBe(3);
        expect(matrix.get(1, 1)).toBe(4);
    });

    it('Should be able to flatten a multi-dimensional array', () => {
        const matrix: MatrixIface = _matrix({
            numRows: 2,
            numCols: 2,
            matrix: [[1, 2], [3, 4]]
        });
        expect(matrix.get(0, 0)).toBe(1);
        expect(matrix.get(0, 1)).toBe(2);
        expect(matrix.get(1, 0)).toBe(3);
        expect(matrix.get(1, 1)).toBe(4);
    });

    it('Should throw an error if the row is out of bounds', () => {
        const matrix: MatrixIface = _matrix(mData);
        expect(() => matrix.get(2, 0)).toThrow();
    });

    it('Should throw an error if the column is out of bounds', () => {
        const matrix: MatrixIface = _matrix(mData);
        expect(() => matrix.get(0, 2)).toThrow();
    });

    it('Should throw an error if the row is negative', () => {
        const matrix: MatrixIface = _matrix(mData);
        expect(() => matrix.get(-1, 0)).toThrow();
    });

    it('Should throw an error if the column is negative', () => {
        const matrix: MatrixIface = _matrix(mData);
        expect(() => matrix.get(0, -1)).toThrow();
    });

    it('Should throw an error if the row is not a number', () => {
        const matrix: MatrixIface = _matrix(mData);
        expect(() => matrix.get('a' as any, 0)).toThrow();
    });

    it('Should throw an error if the column is not a number', () => {
        const matrix: MatrixIface = _matrix(mData);
        expect(() => matrix.get(0, 'a' as any)).toThrow();
    });

    it('Should throw an error if the row is not an integer', () => {
        const matrix: MatrixIface = _matrix(mData);
        expect(() => matrix.get(0.5, 0)).toThrow();
    });

    it('Should throw an error if the column is not an integer', () => {
        const matrix: MatrixIface = _matrix(mData);
        expect(() => matrix.get(0, 0.5)).toThrow();
    });
});

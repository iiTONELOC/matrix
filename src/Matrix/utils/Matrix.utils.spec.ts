import { describe, it, expect } from '@jest/globals';
import Matrix from '../index';

const ZeroMatrix = Matrix({ numRows: 3, numCols: 3 });
const ColumnMatrix = Matrix({ numRows: 3, numCols: 1, matrix: [[1], [2], [3]] });
const RowMatrix = Matrix({ numRows: 1, numCols: 3, matrix: [[1, 2, 3]] });
const SquareMatrix = Matrix({ numRows: 3, numCols: 3, matrix: [[1, 8, 1], [7, 2, 0], [5, 0, 3]] });
const DiagonalMatrix = Matrix({ numRows: 3, numCols: 3, matrix: [[1, 0, 0], [0, 4, 0], [0, 0, 7]] });
const IdentityMatrix = Matrix({ numRows: 2, numCols: 2, matrix: [[1, 0], [0, 1]] });


describe('Matrix utils', () => {
    describe('identifyMatrixType', () => {
        it('Should be a property of the Matrix class', () => {
            expect(ZeroMatrix.utils.identifyMatrixType).toBeDefined();
        });

        it('Should return the correct matrix type', () => {
            expect(ZeroMatrix.utils.identifyMatrixType()).toBe('ZeroMatrix');
            expect(ColumnMatrix.utils.identifyMatrixType()).toBe('ColumnMatrix');
            expect(RowMatrix.utils.identifyMatrixType()).toBe('RowMatrix');
            expect(SquareMatrix.utils.identifyMatrixType()).toBe('SquareMatrix');
            expect(DiagonalMatrix.utils.identifyMatrixType()).toBe('DiagonalMatrix');
            expect(IdentityMatrix.utils.identifyMatrixType()).toBe('IdentityMatrix');
        });
    });

    describe('transpose', () => {
        it('Should be a method of the Matrix class', () => {
            expect(ZeroMatrix.utils.transpose).toBeDefined();
            expect(ZeroMatrix.utils.transpose).toBeInstanceOf(Function);
        });

        it('Should transpose a matrix', () => {
            const t = [1, 7, 5, 8, 2, 0, 1, 0, 3];
            const transpose = SquareMatrix.utils.transpose();

            // transpose the transpose matrix
            const transposeTheTranspose = Matrix(
                { numRows: 3, numCols: 3, matrix: transpose }).utils.transpose();

            expect(transpose).toEqual(t);
            expect(transpose).not.toEqual(SquareMatrix._matrix);
            // the transpose of the transpose should be the original matrix
            expect(transposeTheTranspose).toEqual(SquareMatrix._matrix);
        });
    });

    describe('trace', () => {
        it('Should be a method of the Matrix class', () => {
            expect(ZeroMatrix.utils.trace).toBeDefined();
            expect(ZeroMatrix.utils.trace).toBeInstanceOf(Function);
        });

        it('Should return the trace of a matrix', () => {
            const trace = SquareMatrix.utils.trace();
            expect(trace).toBe(6);
        });
    });

    describe('scale', () => {
        it('Should be a method of the Matrix class', () => {
            expect(ZeroMatrix.utils.scale).toBeDefined();
            expect(ZeroMatrix.utils.scale).toBeInstanceOf(Function);
        });

        it('Should scale a matrix', () => {
            const scaled = SquareMatrix.utils.scale(2);
            expect(scaled._matrix).toEqual([2, 16, 2, 14, 4, 0, 10, 0, 6]);
        });

        it('Should throw an error if the scale factor is not a number', () => {
            expect(() => SquareMatrix.utils.scale('2' as any)).toThrow();
        });

        it('Should throw an error if the scale factor is not finite', () => {
            expect(() => SquareMatrix.utils.scale(Infinity)).toThrow();
        });
    });
});
import { describe, it, expect } from '@jest/globals';
import { MatrixIface } from '../../Matrix/types';
import Matrix from '../../Matrix';
import EchelonForm from './index';

const zeroMatrix: MatrixIface = Matrix({
    numRows: 2, numCols: 3,
    matrix: [
        [0, 0, 0],
        [0, 0, 0]
    ]
});

const nonZeroMatrix: MatrixIface = Matrix({
    numRows: 2, numCols: 3,
    matrix: [
        [0, 0, 0],
        [0, 0, 1]
    ]
});

const matrixWithPivots: MatrixIface = Matrix({
    numRows: 3, numCols: 3,
    matrix: [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ]
});

describe('EchelonForm', () => {
    it('Should be defined', () => {
        expect(EchelonForm).toBeDefined();
    });

    describe('isZeroRow', () => {
        it('Should be defined', () => {
            expect(EchelonForm.isZeroRow).toBeDefined();
        });

        it('Should return true for a row of all zeros', () => {
            expect(EchelonForm.isZeroRow(zeroMatrix, 0)).toBe(true);
            expect(EchelonForm.isZeroRow(zeroMatrix, 1)).toBe(true);
        });

        it('Should return false for a row with at least one non-zero entry', () => {
            expect(EchelonForm.isZeroRow(nonZeroMatrix, 1)).toBe(false);
        });

        it('Should throw an error if the row index is out of bounds', () => {
            expect(() => EchelonForm.isZeroRow(nonZeroMatrix, 2)).toThrow();
        });
    });

    describe('isNonZeroRow', () => {
        it('Should be defined', () => {
            expect(EchelonForm.isNonZeroRow).toBeDefined();
        });

        it('Should return true for a row with at least one non-zero entry', () => {
            expect(EchelonForm.isNonZeroRow(nonZeroMatrix, 1)).toBe(true);
        });

        it('Should return false for a row of all zeros', () => {
            expect(EchelonForm.isNonZeroRow(zeroMatrix, 0)).toBe(false);
            expect(EchelonForm.isNonZeroRow(zeroMatrix, 1)).toBe(false);
        });

        it('Should throw an error if the row index is out of bounds', () => {
            expect(() => EchelonForm.isNonZeroRow(nonZeroMatrix, 2)).toThrow();
        });
    });

    describe('isZeroColumn', () => {
        it('Should be defined', () => {
            expect(EchelonForm.isZeroColumn).toBeDefined();
        });

        it('Should return true for a column of all zeros', () => {
            expect(EchelonForm.isZeroColumn(zeroMatrix, 0)).toBe(true);
            expect(EchelonForm.isZeroColumn(zeroMatrix, 1)).toBe(true);
            expect(EchelonForm.isZeroColumn(zeroMatrix, 2)).toBe(true);
        });

        it('Should return false for a column with at least one non-zero entry', () => {
            expect(EchelonForm.isZeroColumn(nonZeroMatrix, 2)).toBe(false);
        });

        it('Should throw an error if the column index is out of bounds', () => {
            expect(() => EchelonForm.isZeroColumn(nonZeroMatrix, 3)).toThrow();
        });
    });

    describe('isNonZeroColumn', () => {
        it('Should be defined', () => {
            expect(EchelonForm.isNonZeroColumn).toBeDefined();
        });

        it('Should return true for a column with at least one non-zero entry', () => {
            expect(EchelonForm.isNonZeroColumn(nonZeroMatrix, 2)).toBe(true);
        });

        it('Should return false for a column of all zeros', () => {
            expect(EchelonForm.isNonZeroColumn(zeroMatrix, 0)).toBe(false);
            expect(EchelonForm.isNonZeroColumn(zeroMatrix, 1)).toBe(false);
            expect(EchelonForm.isNonZeroColumn(zeroMatrix, 2)).toBe(false);
        });

        it('Should throw an error if the column index is out of bounds', () => {
            expect(() => EchelonForm.isNonZeroColumn(nonZeroMatrix, 3)).toThrow();
        });
    });

    describe('isEchelonForm', () => {
        it('Should be defined', () => {
            expect(EchelonForm.isEchelonForm).toBeDefined();
        });

        it('Should return true for a matrix in echelon form', () => {
            const echelonMatrix: MatrixIface = Matrix({
                numRows: 3, numCols: 3,
                matrix: [
                    [1, 0, 0],
                    [0, 1, 0],
                    [0, 0, 1]
                ]
            });

            const eMatrix2 = Matrix({
                numRows: 4, numCols: 7, matrix: [
                    [2, 1, 7, - 1, 0, 2, 3],
                    [0, 0, 1, 3, 2, 2, 1],
                    [0, 0, 0, 0, 2, 1, -3],
                    [0, 0, 0, 0, 0, 0, 0]
                ]
            });

            expect(EchelonForm.isEchelonForm(eMatrix2)).toBe(true);
            expect(EchelonForm.isEchelonForm(echelonMatrix)).toBe(true);
        });

        it('Should return false for a matrix not in echelon form', () => {
            const nonEchelonMatrix: MatrixIface = Matrix({
                numRows: 3, numCols: 3,
                matrix: [
                    [1, 0, 0],
                    [0, 0, 1],
                    [0, 0, 1]
                ]
            });
            const nonEchelonMatrix2: MatrixIface = Matrix({
                numRows: 3, numCols: 3,
                matrix: [
                    [0, 0, 0],
                    [0, 1, 0],
                    [0, 0, 1]
                ]
            });

            expect(EchelonForm.isEchelonForm(zeroMatrix)).toBe(false);
            expect(EchelonForm.isEchelonForm(nonZeroMatrix)).toBe(false);
            expect(EchelonForm.isEchelonForm(nonEchelonMatrix2)).toBe(false);
            expect(EchelonForm.isEchelonForm(nonEchelonMatrix)).toBe(false);
        });
    });

    describe('isReducedEchelonForm', () => {
        it('Should be defined', () => {
            expect(EchelonForm.isReducedEchelonForm).toBeDefined();
        });

        it('Should return true for a matrix in reduced echelon form', () => {
            const reducedEchelonMatrix: MatrixIface = Matrix({
                numRows: 3, numCols: 3,
                matrix: [
                    [1, 0, 0],
                    [0, 1, 0],
                    [0, 0, 1]
                ]
            });

            const reducedEchelonMatrix2: MatrixIface = Matrix({
                numRows: 4, numCols: 7, matrix: [
                    [0, 1, 0, 0, 0, 0, 3],
                    [0, 0, 1, 0, 0, 0, 1],
                    [0, 0, 0, 1, 0, 0, -3],
                    [0, 0, 0, 0, 1, 0, 2]
                ]
            });


            const reducedEchelonMatrix3: MatrixIface = Matrix({
                numRows: 4, numCols: 7, matrix: [
                    [1, 0, 0, 0, 0, 0, 3],
                    [0, 1, 0, 0, 0, 0, 1],
                    [0, 0, 1, 0, 0, 0, -3],
                    [0, 0, 0, 1, 0, 0, 2]
                ]
            });

            expect(EchelonForm.isReducedEchelonForm(reducedEchelonMatrix3)).toBe(true);
            expect(EchelonForm.isReducedEchelonForm(reducedEchelonMatrix)).toBe(true);
            expect(EchelonForm.isReducedEchelonForm(reducedEchelonMatrix2)).toBe(true);
        });
    });

    describe('isPivotElement', () => {

        it('Should be defined', () => {
            expect(EchelonForm.isPivotElement).toBeDefined();
        });

        it('Should return true for a pivot', () => {
            expect(EchelonForm.isPivotElement(matrixWithPivots, 0, 0)).toBe(true);
            expect(EchelonForm.isPivotElement(matrixWithPivots, 1, 1)).toBe(true);
            expect(EchelonForm.isPivotElement(matrixWithPivots, 2, 2)).toBe(true);
        });

        it('Should return false for a non-pivot', () => {
            expect(EchelonForm.isPivotElement(matrixWithPivots, 0, 1)).toBe(false);
            expect(EchelonForm.isPivotElement(matrixWithPivots, 1, 0)).toBe(false);
            expect(EchelonForm.isPivotElement(matrixWithPivots, 2, 1)).toBe(false);
        });

        it('Should throw an error if the row or column index is out of bounds', () => {
            expect(() => EchelonForm.isPivotElement(matrixWithPivots, 3, 0)).toThrow();
            expect(() => EchelonForm.isPivotElement(matrixWithPivots, 3, 3)).toThrow();
        });
    });

    describe('isPivotColumn', () => {
        it('Should be defined', () => {
            expect(EchelonForm.isPivotColumn).toBeDefined();
        });

        it('Should return true for a pivot column', () => {
            expect(EchelonForm.isPivotColumn(matrixWithPivots, 0)).toBe(true);
            expect(EchelonForm.isPivotColumn(matrixWithPivots, 1)).toBe(true);
            expect(EchelonForm.isPivotColumn(matrixWithPivots, 2)).toBe(true);
        });

        it('Should return false for a non-pivot column', () => {
            expect(EchelonForm.isPivotColumn(zeroMatrix, 0)).toBe(false);
            expect(EchelonForm.isPivotColumn(zeroMatrix, 1)).toBe(false);
            expect(EchelonForm.isPivotColumn(zeroMatrix, 2)).toBe(false);
        });

        it('Should throw an error if the column index is out of bounds', () => {
            expect(() => EchelonForm.isPivotColumn(matrixWithPivots, 3)).toThrow();
        });
    });
})

import { describe, it, expect } from '@jest/globals';
import { MatrixIface } from '../../Matrix/types';
import Matrix from '../../Matrix';
import RowOps from '.';


describe('RowOps', () => {
    it('Should be defined', () => {
        expect(RowOps).toBeDefined();
    });

    describe('interchangeRows', () => {
        it('Should be defined', () => {
            expect(RowOps.interchangeRows).toBeDefined();
        });

        const matrix: number[][] = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ];

        const expectedMatrix: number[][] = [
            [7, 8, 9],
            [4, 5, 6],
            [1, 2, 3],
        ];

        const matrixObj: MatrixIface = Matrix({
            numRows: 3,
            numCols: 3,
            matrix,
        });


        it('Should swap two rows in a matrix', () => {
            RowOps.interchangeRows(0, 2, matrixObj);
            expect(matrixObj._matrix).toEqual(expectedMatrix.flat());
        });

        it('Should throw an error if the row index is out of bounds', () => {
            expect(() => {
                RowOps.interchangeRows(0, 3, matrixObj);
            }).toThrow('Row 3 is out of bounds');
        });
    });

    describe('scaleRow', () => {
        it('Should be defined', () => {
            expect(RowOps.scaleRow).toBeDefined();
        });

        const matrix: number[][] = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ];

        const expectedMatrix: number[][] = [
            [2, 4, 6],
            [4, 5, 6],
            [7, 8, 9],
        ];

        const matrixObj: MatrixIface = Matrix({
            numRows: 3,
            numCols: 3,
            matrix,
        });

        it('Should scale a row in a matrix', () => {
            RowOps.scaleRow(0, 2, matrixObj);

            expect(matrixObj._matrix).toEqual(expectedMatrix.flat());
        });

        it('Should throw an error if the row index is out of bounds', () => {
            expect(() => {
                RowOps.scaleRow(3, 2, matrixObj);
            }).toThrow('Row 3 is out of bounds');
        });

        it('Should throw an error if the scalar is 0', () => {
            expect(() => {
                RowOps.scaleRow(0, 0, matrixObj);
            }).toThrow('Cannot scale a row by 0');
        });

        it('Should throw an error if the scalar isn\'t a number', () => {
            expect(() => {
                RowOps.scaleRow(0, NaN, matrixObj);
            }).toThrow('Cannot scale a row by a non-number');
        });
    });

    describe('addMultipleOfRow', () => {
        it('Should be defined', () => {
            expect(RowOps.addMultipleOfRow).toBeDefined();
        });

        const matrix: number[][] = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ];

        const expectedMatrix: number[][] = [
            [1, 2, 3],
            [0, -3, -6],
            [7, 8, 9],
        ];

        const matrixObj: MatrixIface = Matrix({
            numRows: 3,
            numCols: 3,
            matrix,
        });

        it('Should be able to add a multiple of one row to another', () => {
            // to row one add -4 times row 0
            RowOps.addMultipleOfRow(1, -4, 0, matrixObj);

            expect(matrixObj._matrix).toEqual(expectedMatrix.flat());
        });

        it('Should throw an error if the row index is out of bounds', () => {
            expect(() => {
                RowOps.addMultipleOfRow(3, 1, 2, matrixObj);
            }).toThrow('Row 3 is out of bounds');
        });

        it('Should throw an error if the scalar is 0', () => {
            expect(() => {
                RowOps.addMultipleOfRow(0, 0, 2, matrixObj);
            }).toThrow();
        });

        it('Should throw an error if the scalar isn\'t a number', () => {
            expect(() => {
                RowOps.addMultipleOfRow(0, 'g' as any, 2, matrixObj);
            }).toThrow();
        });
    })
});

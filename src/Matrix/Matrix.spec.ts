import { jest, describe, it, expect } from '@jest/globals';
import { MatrixIface, MatrixConstructor } from './types';
import _matrix, { Matrix } from '.';

const mData: MatrixConstructor = {
    numRows: 2,
    numCols: 2,
    matrix: [1, 2, 3, 4]
};

describe('Matrix', () => {
    /**
     * Object and instantiation
     */
    describe('The Matrix object', () => {
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
    });

    describe('Object instantiation', () => {
        it('Should be able to create a matrix with the specified number of rows and columns and provided matrix data', () => {
            const matrix: MatrixIface = _matrix(mData);
            expect(matrix.get(0, 0)).toBe(1);
            expect(matrix.get(0, 1)).toBe(2);
            expect(matrix.get(1, 0)).toBe(3);
            expect(matrix.get(1, 1)).toBe(4);
        });

        it('Should create an empty matrix if no matrix parameter is provided', () => {
            const matrix: MatrixIface = _matrix({ numRows: 2, numCols: 2 });
            expect(matrix.get(0, 0)).toBe(0);
            expect(matrix.get(0, 1)).toBe(0);
            expect(matrix.get(1, 0)).toBe(0);
            expect(matrix.get(1, 1)).toBe(0);
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
    });
    const matrix: MatrixIface = _matrix(mData);
    describe('Object properties', () => {

        it('Should have a numRows property', () => {
            const isNum: boolean = typeof matrix.numRows === 'number';

            expect(isNum).toBe(true);
            expect(matrix.numRows).toBeDefined();
            expect(matrix.numRows).toBe(2);
            expect.assertions(3);
        });


        it('Should have a numCols property', () => {
            const isNum: boolean = typeof matrix.numCols === 'number';

            expect(isNum).toBe(true);
            expect(matrix.numCols).toBeDefined();
            expect(matrix.numCols).toBe(2);
            expect.assertions(3);
        });
    });

    /**
     * Method tests
     */
    describe('Object methods', () => {
        describe('get method', () => {
            const matrix: MatrixIface = _matrix(mData);
            it('Should have a get method', () => {
                expect(matrix.get).toBeDefined();
                expect(matrix.get).toBeInstanceOf(Function);
                expect.assertions(2);
            });

            it('Should return the correct value for the get method', () => {
                expect(matrix.get(0, 0)).toBe(1);
                expect(matrix.get(0, 1)).toBe(2);
                expect(matrix.get(1, 0)).toBe(3);
                expect(matrix.get(1, 1)).toBe(4);
            });

            it('Should throw an error if the row is out of bounds', () => {
                expect(() => matrix.get(2, 0)).toThrow();
            });

            it('Should throw an error if the column is out of bounds', () => {
                expect(() => matrix.get(0, 2)).toThrow();
            });

            it('Should throw an error if the row is negative', () => {
                expect(() => matrix.get(-1, 0)).toThrow();
            });

            it('Should throw an error if the column is negative', () => {
                expect(() => matrix.get(0, -1)).toThrow();
            });

            it('Should throw an error if the row is not a number', () => {
                expect(() => matrix.get('a' as any, 0)).toThrow();
            });

            it('Should throw an error if the column is not a number', () => {
                expect(() => matrix.get(0, 'a' as any)).toThrow();
            });

            it('Should throw an error if the row is not an integer', () => {
                expect(() => matrix.get(0.5, 0)).toThrow();
            });

            it('Should throw an error if the column is not an integer', () => {
                expect(() => matrix.get(0, 0.5)).toThrow();
            });
        });

        describe('set method', () => {
            const matrix: MatrixIface = _matrix(mData);
            it('Should have a method to set a value', () => {
                expect(matrix.set).toBeDefined();
                expect(matrix.set).toBeInstanceOf(Function);
                expect.assertions(2);
            });

            it('Should set the correct value', () => {
                matrix.set(0, 0, 5);
                expect(matrix.get(0, 0)).toBe(5);
            });

            it('Should throw an error if the row is out of bounds', () => {
                expect(() => matrix.set(2, 0, 5)).toThrow();
            });

            it('Should throw an error if the column is out of bounds', () => {
                expect(() => matrix.set(0, 2, 5)).toThrow();
            });

            it('Should throw an error if the row is negative', () => {
                expect(() => matrix.set(-1, 0, 5)).toThrow();
            });

            it('Should throw an error if the column is negative', () => {
                expect(() => matrix.set(0, -1, 5)).toThrow();
            });

            it('Should throw an error if the row is not a number', () => {
                expect(() => matrix.set('a' as any, 0, 5)).toThrow();
            });

            it('Should throw an error if the column is not a number', () => {
                expect(() => matrix.set(0, 'a' as any, 5)).toThrow();
            });

            it('Should throw an error if the row is not an integer', () => {
                expect(() => matrix.set(0.5, 0, 5)).toThrow();
            });

            it('Should throw an error if the column is not an integer', () => {
                expect(() => matrix.set(0, 0.5, 5)).toThrow();
            });

            it('Should throw an error if the value is not a number', () => {
                expect(() => matrix.set(0, 0, 'a' as any)).toThrow();
            });
        });

        describe('getRow method', () => {
            const matrix: MatrixIface = _matrix(mData);
            it('Should have a method to get a row as a whole', () => {

                expect(matrix.getRow).toBeDefined();
                expect(matrix.getRow).toBeInstanceOf(Function);
                expect.assertions(2);
            });

            it('Should return the correct row', () => {
                expect(matrix.getRow(0)).toEqual([1, 2]);
                expect(matrix.getRow(1)).toEqual([3, 4]);
            });

            it('Should throw an error if the row is out of bounds', () => {
                expect(() => matrix.getRow(2)).toThrow();
            });

            it('Should throw an error if the row is negative', () => {
                expect(() => matrix.getRow(-1)).toThrow();
            });

            it('Should throw an error if the row is not a number', () => {
                expect(() => matrix.getRow('a' as any)).toThrow();
            });
        });

        describe('getColumn method', () => {
            const matrix: MatrixIface = _matrix(mData);
            it('Should have a method to get a column as a whole', () => {
                expect(matrix.getColumn).toBeDefined();
                expect(matrix.getColumn).toBeInstanceOf(Function);
                expect.assertions(2);
            });

            it('Should return the correct column', () => {
                expect(matrix.getColumn(0)).toEqual([1, 3]);
                expect(matrix.getColumn(1)).toEqual([2, 4]);
            });

            it('Should throw an error if the column is out of bounds', () => {
                expect(() => matrix.getColumn(2)).toThrow();
            });

            it('Should throw an error if the column is negative', () => {
                expect(() => matrix.getColumn(-1)).toThrow();
            });

            it('Should throw an error if the column is not a number', () => {
                expect(() => matrix.getColumn('a' as any)).toThrow();
            });
        });

        describe('clone method', () => {
            const matrix: MatrixIface = _matrix(mData);
            it('Should have a method to clone the matrix', () => {
                expect(matrix.clone).toBeDefined();
                expect(matrix.clone).toBeInstanceOf(Function);
                expect.assertions(2);
            });

            it('Should return a new matrix with the same data', () => {
                const clone: MatrixIface = matrix.clone();
                expect(clone).not.toBe(matrix);
                expect(clone).toBeInstanceOf(Matrix);
                expect(clone.get(0, 0)).toBe(1);
                expect(clone.get(0, 1)).toBe(2);
                expect(clone.get(1, 0)).toBe(3);
                expect(clone.get(1, 1)).toBe(4);
            });
        });

        describe('print method', () => {
            const matrix: MatrixIface = _matrix(mData);
            it('Should have a method to print the matrix', () => {
                expect(matrix.print).toBeDefined();
                expect(matrix.print).toBeInstanceOf(Function);
                expect.assertions(2);
            });

            it('Should print the matrix to the console', () => {
                const spy = jest.spyOn(process.stdout, 'write');
                matrix.print();
                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('1 2');
                expect(spy).toHaveBeenCalledWith('3 4');
                spy.mockRestore();
            });
        });
    });
});

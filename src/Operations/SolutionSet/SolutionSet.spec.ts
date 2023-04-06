import { describe, it, expect } from '@jest/globals';
import { MatrixIface } from '../../Matrix/types';
import { SolutionSetType } from './types';
import Matrix from '../../Matrix';
import SolutionSet from '.';

// Test data
const matrixWithPivots: MatrixIface = Matrix({
    numRows: 3, numCols: 3,
    matrix: [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ]
});

const zeroMatrix: MatrixIface = Matrix({
    numRows: 2, numCols: 3,
    matrix: [
        [0, 0, 0],
        [0, 0, 0]
    ]
});

const twoByTwoMatrix = Matrix({
    numRows: 2,
    numCols: 3,
    matrix: [
        // x_1 + 8x_2 = 6
        [1, 8, 6],
        // 2x_2 = 3
        [0, 1, 3]
    ]
});

const hasNoSolution = Matrix({
    numRows: 4,
    numCols: 5,
    matrix: [
        // x_1 + 2x_2 - x_3 + 4x_4 = 8
        [1, 2, -1, 4, 8],
        // 2x_1 + 4x_2 - 2x_3 + 8x_4 = 16
        [0, 9, 5, 2, -5],
        // 3x_1 + 6x_2 - 3x_3 + 12x_4 = 24
        [0, 0, -7, 2, -5],
        // 0x_1 + 0x_2 + 0x_3 + 0x_4 = 1
        // ! zero can't equal one - there is no solution
        [0, 0, 0, 0, 1]
    ]
});

const twoByFourMatrix = Matrix({
    numRows: 2,
    numCols: 4,
    matrix: [
        //x_1 + 5x_3  = 6
        [1, 0, 5, 6],
        //x_2 - 3x_3 = 4
        [0, 1, -3, 4]
    ]
});

const fiveBySixMatrix = Matrix({
    numRows: 5,
    numCols: 6,
    matrix: [
        [1, 5, 0, 0, 3, 9],
        [0, 0, 1, 0, -2, -7],
        [0, 0, 0, 1, 8, 6],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ]
});

describe('SolutionSet', () => {
    it('Should be defined', () => {
        expect(SolutionSet).toBeDefined();
    });

    describe('isFreeVariable', () => {
        it('Should be defined', () => {
            expect(SolutionSet.isFreeVariable).toBeDefined();
        });

        it('Should return true for a free variable', () => {
            expect(SolutionSet.isFreeVariable(zeroMatrix, 0)).toBe(true);
            expect(SolutionSet.isFreeVariable(zeroMatrix, 1)).toBe(true);
            expect(SolutionSet.isFreeVariable(zeroMatrix, 2)).toBe(true);
        });

        it('Should return false for a non-free variable', () => {
            expect(SolutionSet.isFreeVariable(matrixWithPivots, 0)).toBe(false);
            expect(SolutionSet.isFreeVariable(matrixWithPivots, 1)).toBe(false);
            expect(SolutionSet.isFreeVariable(matrixWithPivots, 2)).toBe(false);
        });

        it('Should throw an error if the column index is out of bounds', () => {
            expect(() => SolutionSet.isFreeVariable(matrixWithPivots, 3)).toThrow();
        });

        it('Should be able to deal with augmented matrices', () => {
            expect(SolutionSet.isFreeVariable(matrixWithPivots, 0, true)).toBe(false);
            expect(SolutionSet.isFreeVariable(matrixWithPivots, 1, true)).toBe(false);
            expect(SolutionSet.isFreeVariable(matrixWithPivots, 2, true)).toBe(false);
        });
    });

    describe('isBasicVariable', () => {
        it('Should be defined', () => {
            expect(SolutionSet.isBasicVariable).toBeDefined();
        });

        it('Should return true for a basic variable', () => {
            expect(SolutionSet.isBasicVariable(matrixWithPivots, 0)).toBe(true);
            expect(SolutionSet.isBasicVariable(matrixWithPivots, 1)).toBe(true);
            expect(SolutionSet.isBasicVariable(matrixWithPivots, 2)).toBe(true);
        });

        it('Should return false for a non-basic variable', () => {
            expect(SolutionSet.isBasicVariable(zeroMatrix, 0)).toBe(false);
            expect(SolutionSet.isBasicVariable(zeroMatrix, 1)).toBe(false);
            expect(SolutionSet.isBasicVariable(zeroMatrix, 2)).toBe(false);
        });

        it('Should throw an error if the column index is out of bounds', () => {
            expect(() => SolutionSet.isBasicVariable(matrixWithPivots, 3)).toThrow();
        });

        it('Should be able to deal with augmented matrices', () => {
            expect(SolutionSet.isBasicVariable(matrixWithPivots, 0, true)).toBe(true);
            expect(SolutionSet.isBasicVariable(matrixWithPivots, 1, true)).toBe(true);
            expect(SolutionSet.isBasicVariable(matrixWithPivots, 2, false)).toBe(true);
        });
    });

    describe('getSolutionSetType', () => {
        const infiniteTest2 = Matrix({
            numRows: 4,
            numCols: 5,
            matrix: [
                [1, 2, -1, 4, 8],
                [0, 9, 5, 2, -5],
                [0, 0, -7, 2, -5],
                [0, 0, 0, 0, 0]
            ]
        });

        it('Should be defined', () => {
            expect(SolutionSet.getSolutionSetType).toBeDefined();
        });

        it('Should return No Solution if no solution exists', () => {
            expect(SolutionSet.getSolutionSetType(hasNoSolution)).toBe(SolutionSetType.NoSolution);
        });

        it('Should return Unique Solution if there is a unique solution', () => {
            expect(SolutionSet.getSolutionSetType(twoByTwoMatrix)).toBe(SolutionSetType.Unique);
        });

        it('Should return Infinite Solutions if there are infinite solutions', () => {
            expect(SolutionSet.getSolutionSetType(zeroMatrix)).toBe(SolutionSetType.Infinite);
            expect(SolutionSet.getSolutionSetType(fiveBySixMatrix)).toBe(SolutionSetType.Infinite);
            expect(SolutionSet.getSolutionSetType(infiniteTest2)).toBe(SolutionSetType.Infinite);
        });
    });

    describe('getGeneralSolution', () => {
        it('Should be defined', () => {
            expect(SolutionSet.getGeneralSolution).toBeDefined();
        });

        it('Should return the correct solution for a 2x3 matrix', () => {
            // The general solution aims to express each variable in terms of the free variables
            // here there are no free variables so the general solution is just a single solution
            expect(SolutionSet.getGeneralSolution(twoByTwoMatrix)).toEqual(['x_1 = -18', 'x_2 = 3']);
        });

        it('Should return the correct solution', () => {
            // The general solution aims to express each variable in terms of the free variables
            const sol = SolutionSet.getGeneralSolution(twoByFourMatrix);

            expect(sol).toEqual([
                'x_1 = 6 - 5x_3',
                'x_2 = 4 + 3x_3',
                'x_3 is a free variable'
            ]);

            expect(SolutionSet.getGeneralSolution(fiveBySixMatrix)).toEqual([
                "x_1 = 9 - 5x_2 - 3x_5",
                "x_2 is a free variable",
                "x_3 = -7 + 2x_5",
                "x_4 = 6 - 8x_5",
                "x_5 is a free variable",
            ]);
        });

        it('Should return no solution for a matrix with no solution', () => {
            expect(SolutionSet.getGeneralSolution(hasNoSolution)).toEqual(['No Solution']);
        });
    })

    describe('parametricForm', () => {
        it('Should be defined', () => {
            expect(SolutionSet.getParametricForm).toBeDefined();
        });

        it('Should return the correct parametric form for a 2x3 matrix', () => {
            expect(SolutionSet.getParametricForm(twoByTwoMatrix)).toEqual([
                '-18',
                '3'
            ]);
        });

        it('Should return the correct parametric form for a 2x4 matrix', () => {
            expect(SolutionSet.getParametricForm(twoByFourMatrix)).toEqual([
                '6 - 5x_3',
                '4 + 3x_3',
                'x_3'
            ]);
        });

        it('Should return no solution for a matrix with no solution', () => {
            expect(SolutionSet.getParametricForm(hasNoSolution)).toEqual(['No Solution']);
        });
    });
})


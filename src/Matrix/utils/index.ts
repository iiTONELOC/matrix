/***
 * This module contains functions pertaining to individual matrices.
 *
 * For example, the identifyMatrixType function identifies the type of a matrix.
 * and transpose will return the individual transpose of a matrix. But this module
 * doesn't contain functions that operate on multiple matrices such as addition, subtraction, etc.
 */

import { MatrixIface } from '../types';
import { MatrixUtilsIface } from './types';

import { trace } from './trace';
import { transpose } from './transpose';
import { identifyMatrixType } from './identifyMatrixType';




export function createUtils(matrix: MatrixIface): MatrixUtilsIface {
    return {
        identifyMatrixType: () => identifyMatrixType(matrix),
        transpose: () => transpose(matrix),
        trace: () => trace(matrix)
    };
}

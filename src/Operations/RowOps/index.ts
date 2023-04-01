import { ElemRowOpsIface } from './types';
import { MatrixIface } from '../../Matrix/types';

function verifyScalar(scalar: number): void {
    if (scalar === 0) {
        throw new Error('Cannot scale a row by 0');
    }
    if (typeof scalar !== 'number' || Number.isNaN(scalar)) {
        throw new Error('Cannot scale a row by a non-number');
    }
}


const ElemRowOps: ElemRowOpsIface = {
    interchangeRows(swapRowIndex: number, swapWithRowIndex: number, self: MatrixIface): void {
        // trying to getRow will throw errors if the input isn't valid
        const row1 = self.getRow(swapRowIndex);
        const row2 = self.getRow(swapWithRowIndex);

        const copy = [...self._matrix];

        // swap the rows
        copy.splice(swapRowIndex * self.numCols, self.numCols, ...row2);
        copy.splice(swapWithRowIndex * self.numCols, self.numCols, ...row1);

        self._matrix = copy;
    },

    scaleRow(rowId: number, scalar: number, self: MatrixIface): void {
        verifyScalar(scalar);
        // trying to getRow will throw errors if the input isn't valid
        const row = self.getRow(rowId);

        // scale the row
        const scaledRow = row.map((entry: number) => entry * scalar);

        const copy = [...self._matrix];

        // replace the row
        copy.splice(rowId * self.numCols, self.numCols, ...scaledRow);

        self._matrix = copy;
    },

    addMultipleOfRow(rowId: number, scalar: number, addRowId: number, self: MatrixIface): void {
        verifyScalar(scalar);
        // trying to getRow will throw errors if the input isn't valid
        const row = self.getRow(rowId);
        const addRow = self.getRow(addRowId);

        // add the rows
        const addedRow = row.map((entry: number, index: number) => entry + scalar * addRow[index]);

        const copy = [...self._matrix];

        // replace the row
        copy.splice(rowId * self.numCols, self.numCols, ...addedRow);

        self._matrix = copy;
    }

};

export default ElemRowOps;

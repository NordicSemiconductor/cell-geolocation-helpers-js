import { cellId } from "./cellId"

describe('cellId', () => {
    it('should generate a cellId', () => {
        expect(cellId({
            area: 42,
            mccmnc: 17,
            cell: 666
        })).toEqual('666-17-42')
    })
})
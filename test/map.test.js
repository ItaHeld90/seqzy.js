const expect = require('chai').expect;
const seq = require('../src/app');

describe('map', () => {
    describe('array', () => {
        let arrSeq = seq([1, 2, 3, 4]);
    
        it('single map', () => {
            expect(
                arrSeq
                    .map(val => val * 2)
                    .value()
            ).to.deep.equal([2, 4, 6, 8]);
        });
    
        it('multiple map', () => {
            expect(
                arrSeq
                    .map(val => val * 2)
                    .map(val => val + 2)
                    .value()
            ).to.deep.equal([4, 6, 8, 10]);
        });
    })
});
const expect = require('chai').expect;
const seq = require('../src/app');

describe('reducers', () => {
    let arrSeq = seq([1, 2, 3, 4]);

    describe('map', () => {
        it('single', () => {
            expect(
                arrSeq
                    .map(val => val * 2)
                    .value()
            ).to.deep.equal([2, 4, 6, 8]);
        });

        it('multiple', () => {
            expect(
                arrSeq
                    .map(val => val * 2)
                    .map(val => val + 2)
                    .value()
            ).to.deep.equal([4, 6, 8, 10]);
        });
    });

    describe('filter', () => {
        it('single', () => {
            expect(
                arrSeq
                    .filter(val => val % 2 === 0)
                    .value()
            ).to.deep.equal([2, 4]);
        });

        it('multiple', () => {
            expect(
                arrSeq
                    .filter(val => val > 2)
                    .filter(val => val % 2 === 0)
                    .value()
            ).to.deep.equal([4]);
        });
    });

    describe('reject', () => {
        it('single', () => {
            expect(
                arrSeq
                    .reject(val => val > 2)
                    .value()
            ).to.deep.equal([1, 2]);
        });

        it('multiple', () => {
            expect(
                arrSeq
                    .reject(val => val > 2)
                    .reject(val => val % 2 === 0)
                    .value()
            ).to.deep.equal([1]);
        });
    });

    describe('compact', () => {
        it('simple', () => {
            const arrToCompactSeq = seq([false, undefined, '', true, 'bla']);

            expect(
                arrToCompactSeq
                    .compact()
                    .value()
            ).to.deep.equal([true, 'bla']);
        });
    });

    describe('take', () => {
        it('single', () => {
            expect(
                arrSeq
                    .take(2)
                    .value()
            ).to.deep.equal([1, 2]);
        });

        it('multiple', () => {
            expect(
                arrSeq
                    .take(2)
                    .take(1)
                    .value()
            ).to.deep.equal([1]);
        });
    });

    describe('take while', () => {
        it('single', () => {
            expect(
                arrSeq
                    .takeWhile(val => val % 3 > 0)
                    .value()
            ).to.deep.equal([1, 2]);
        });

        it('multiple', () => {
            expect(
                arrSeq
                    .takeWhile(val => val % 3 > 0)
                    .takeWhile(val => val % 2 > 0)
                    .value()
            ).to.deep.equal([1]);
        });
    });

    describe('drop', () => {
        it('single', () => {
            expect(
                arrSeq
                    .drop(3)
                    .value()
            ).to.deep.equal([4]);
        });

        it('multiple', () => {
            expect(
                arrSeq
                    .drop(1)
                    .drop(2)
                    .drop(0)
                    .value()
            ).to.deep.equal([4]);
        });
    });

    describe('drop while', () => {
        it('single', () => {
            expect(
                arrSeq
                    .dropWhile(val => val < 5)
                    .value()
            ).to.deep.equal([]);
        });

        it('multiple', () => {
            expect(
                arrSeq
                    .dropWhile(val => val < 2)
                    .dropWhile(val => val % 2 === 0)
                    .value()
            ).to.deep.equal([3, 4]);
        });
    });
})
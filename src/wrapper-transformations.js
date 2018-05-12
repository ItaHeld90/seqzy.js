const { mapReducer, filterReducer, isIterable, makeIterator } = require('./helper-utils');
const { curry, partialRight, pipe } = require('ramda/src');

const map = curry(
    (mapperFn, iterableObj) => {
        let result = [];

        for (let item of iterableObj) {
            result.push(mapperFn(item));
        }

        return result;
    }
);

const filter = curry(
    (predicate, iterableObj) => {
        let result = [];

        for (let item of iterableObj) {
            if (predicate(item)) {
                result.push(item);
            }
        }

        return result;
    }
);

const take = curry(
    (times, iterableObj) => {
        let counter = times;
        let result = [];

        for (let item of iterableObj) {
            if (counter <= 0) {
                break;
            }

            result.push(item);
            counter--;
        }

        return result;
    }
);

const takeWhile = curry(
    (predicateFn, iterableObj) => {
        let result = [];

        for (let item of iterableObj) {
            if (!predicateFn(item)) {
                break;
            }

            result.push(item);
        }

        return result;
    }
)

const drop = curry(
    (times, iterableObj) => {
        let counter = 0;
        let result = [];

        for (let item of iterableObj) {
            if (counter >= times) {
                result.push(item);
            }

            counter++;
        }

        return result;
    }
)

module.exports = {
    map,
    filter,
    take,
    takeWhile,
    drop
}
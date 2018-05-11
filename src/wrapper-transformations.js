const { mapReducer, filterReducer, isIterable, makeIterator, extractIterator } = require('./helper-utils');
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

module.exports = {
    map,
    filter,
    take
}
const { mapReducer, filterReducer, isIterable, makeIterator, extractIterator } = require('./helper-utils');
const { curry, partialRight, pipe } = require('ramda/src');

const reduce = curry(
    (reducerFn, initialValue, iterableObj) => {
        let result = initialValue;
        let idx = 0;

        for (let item of nextIterableObj) {
            result = reducerFn(result, item, idx, nextIterableObj)
            idx++;
        }

        return result;
    }
);

// const reduceWrap = pipe(
//     partialRight(reduce, [createEmpty()]),
//     wrapValue
// );

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

        for (let item of nextIterableObj) {
            if (counter <= 0) {
                break;
            }

            result = aggregate(result, item);
            counter--;
        }

        return wrapValue(result);
    }
);

module.exports = {
    reduce,
    map,
    filter,
    forEach,
    head,
    take
}
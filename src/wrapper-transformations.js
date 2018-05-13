const { curry, partialRight } = require('ramda/src');
const { not } = require('./helper-utils');

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

const reject = curry(
    (predicateFn, iterableObj) =>
        filter(not(predicateFn), iterableObj)
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
);

const dropWhile = curry(
    (predicateFn, iterableObj) => {
        let result = [];
        let shouldDrop = true;

        for (let item of iterableObj) {
            console.log('debug:', predicateFn(item));

            // If passed the drop phase - add the item
            if (!shouldDrop) {
                result.push(item);
            }
            // If the predicate returns false - add the item and flag to start taking items
            else if (!predicateFn(item)) {
                shouldDrop = false;
                result.push(item);
            }
        }

        return result;
    }
);

module.exports = {
    map,
    filter,
    reject,
    take,
    takeWhile,
    drop,
    dropWhile
}
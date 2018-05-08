const { mapReducer, filterReducer, isIterable, makeIterator, extractIterator, combineList } = require('../helper-utils');
const { curry, partialRight, pipe } = require('ramda/src');
const trans = require('../wrapper-transformations');

// wrapper
const wrapIterable = (iterableObj, aggregate, createEmpty) => {
    return function rewrap(transformations) {
        const addTransformation = combineList(transformations);

        const rewrapWithNewTrans = pipe(
            addTransformation,
            rewrap
        );

        const reduce =
            (reducerFn, initialValue) =>
                rewrapWithNewTrans(trans.reduce(reducerFn, initialValue));

        const map =
            mapperFn =>
                rewrapWithNewTrans(trans.map(mapperFn));

        const filter =
            predicateFn =>
                rewrapWithNewTrans(trans.filter(predicateFn));

        const take =
            (times) =>
                rewrapWithNewTrans(trans.take(times));

        const forEach = (fn) => {
            for (let item of nextIterableObj) {
                fn(item);
            }
        }

        const head = () => makeIterator(nextIterableObj)
            .next()
            .value;

        const value = () => nextIterableObj;

        const result = {
            value,
            map,
            filter,
            reduce,
            forEach,
            head,
            take
        };

        return result;
    }([]);
};

module.exports = wrapIterable;
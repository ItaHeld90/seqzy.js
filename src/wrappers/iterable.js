const { combineList } = require('../helper-utils');
const { pipe } = require('ramda/src');
const trans = require('../wrapper-transformations');
const consumers = require('../wrapper-consumers');
const { execTransformations } = require('../iterable-utils');

// wrapper
const wrapIterable = (iterableObj, aggregate, createEmpty) => {
    return function rewrap(transformations) {
        const addTransformation = combineList(transformations);

        const rewrapWithNewTrans = pipe(
            addTransformation,
            rewrap
        );

        const execTransformationsOnIterable =
            () =>
                execTransformations(transformations, iterableObj);

        const map =
            mapperFn =>
                rewrapWithNewTrans(trans.map(mapperFn));

        const filter =
            predicateFn =>
                rewrapWithNewTrans(trans.filter(predicateFn));

        const take =
            (times) =>
                rewrapWithNewTrans(trans.take(times));

        const reduce = (reducerFn, initialVal) => {
            const transformed = execTransformationsOnIterable();
            return consumers.reduce(reducerFn, initialVal, transformed);
        };

        const forEach = (fn) => {
            const transformed = execTransformationsOnIterable();
            return consumers.forEach(fn, transformed);
        };

        const head = () => take(1).value();

        const value = execTransformationsOnIterable;

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
    }
        ([]);
};

module.exports = wrapIterable;
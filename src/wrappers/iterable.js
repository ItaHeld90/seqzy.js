const { combineList, makeIterator, iterableHead } = require('../helper-utils');
const { pipe } = require('ramda/src');
const transUtils = require('../wrapper-transformations');
const consumerUtils = require('../wrapper-consumers');
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

        const construct = consumerUtils.reduce(aggregate, createEmpty());

        const map =
            mapperFn =>
                rewrapWithNewTrans(transUtils.map(mapperFn));

        const filter =
            predicateFn =>
                rewrapWithNewTrans(transUtils.filter(predicateFn));

        const take =
            (times) =>
                rewrapWithNewTrans(transUtils.take(times));

        const reduce = (reducerFn, initialVal) => {
            const transformed = execTransformationsOnIterable();
            return consumerUtils.reduce(reducerFn, initialVal, transformed);
        };

        const forEach = (fn) => {
            const transformed = execTransformationsOnIterable();
            return consumerUtils.forEach(fn, transformed);
        };

        const some = (predicateFn) => {
            const transformed = execTransformationsOnIterable();
            return consumerUtils.some(predicateFn, transformed);
        };

        const every = (predicateFn) => {
            const transformed = execTransformationsOnIterable();
            return consumerUtils.every(predicateFn, transformed);
        };

        const find = (predicateFn) => {
            const transformed = execTransformationsOnIterable();
            return consumerUtils.find(predicateFn, transformed);
        };

        const findIndex = (predicateFn) => {
            const transformed = execTransformationsOnIterable();
            return consumerUtils.findIndex(predicateFn, transformed);
        }

        // using take 1 to return a wrapper with only 1 value,
        // then unwrapping the value
        const head = () => iterableHead(take(1).value());

        const value = pipe(
            execTransformationsOnIterable,
            construct
        );

        const result = {
            [Symbol.iterator]: () => {
                const transformed = execTransformationsOnIterable();
                return makeIterator(transformed);
            },
            value,
            map,
            filter,
            reduce,
            forEach,
            head,
            take,
            some,
            every,
            find,
            findIndex
        };

        return result;
    }
        ([]);
};

module.exports = wrapIterable;
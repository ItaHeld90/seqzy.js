const { mapReducer, filterReducer, isIterable, makeIterator, extractIterator, combineList } = require('../helper-utils');
const { curry, partialRight, pipe, identity } = require('ramda/src');
const trans = require('../wrapper-transformations');
const consumers = require('../wrapper-consumers');

// wrapper
const wrapIterable = (iterableObj, aggregate, createEmpty) => {
    return function rewrap(transformations) {
        const addTransformation = combineList(transformations);

        const rewrapWithNewTrans = pipe(
            addTransformation,
            rewrap
        );

        // If any transformations were chained - execute them
        // Else - return the iterable as is
        const execTransformations =
            transformations.length > 0
                ? pipe(
                    ...transformations
                )
                : identity;

        const map =
            mapperFn =>
                rewrapWithNewTrans(trans.map(mapperFn));

        const filter =
            predicateFn =>
                rewrapWithNewTrans(trans.filter(predicateFn));

        const take =
            (times) =>
                rewrapWithNewTrans(trans.take(times));

        const reduce = pipe(
            execTransformations,
            consumers.reduce
        );

        const forEach = pipe(
            execTransformations,
            consumers.forEach
        );

        const head = () => pipe(
            execTransformations,
            consumers.head
        );

        // const value = execTransformations;
        const value = () => execTransformations(iterableObj);

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
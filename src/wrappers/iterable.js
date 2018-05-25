const { combineList, makeIterator, iterableHead, valuesToPair, identity, last } = require('../helper-utils');
const { pipe, compose, concat, or, and } = require('ramda/src');
const { execTransformations } = require('../iterable-utils');
const { getFusionReducer } = require('../transduce-utils');

const transUtils = require('../wrapper-transformations');
const consumerUtils = require('../wrapper-consumers');
const consumerReducerUtils = require('../wrapper-consumer-reducers');
const reducerUtils = require('../wrapper-reducers');

// wrapper
const wrapIterable = (iterableObj, constructFn) => {
    return function rewrap(transformations) {
        const addTransformation = combineList(transformations);
        const defaultFusionReducerCalculator = getFusionReducer(combineList, []);

        return function fuse(fusionList) {
            const consume = (consumeFn) => {
                const allTransformations = addFusionToTransformations();
                const transformed = execTransformations(allTransformations, iterableObj);
                return consumeFn(transformed);
            };

            const addFusionToTransformations =
                () =>
                    fusionList.length > 0
                        ? addTransformation(defaultFusionReducerCalculator(fusionList))
                        : transformations;

            const rewrapWithNewTrans =
                (newTransformation) => {
                    let updatedTransformations = addFusionToTransformations();
                    updatedTransformations = addTransformation(newTransformation);
                    return rewrap(updatedTransformations);
                };

            const intoFusion = combineList(fusionList);

            const fuseIn = pipe(
                intoFusion,
                fuse
            );

            const fusionable =
                reducerFn =>
                    pipe(
                        reducerFn,
                        fuseIn
                    );

            const consumer =
                consumerFn =>
                    pipe(
                        consumerFn,
                        consume
                    );

            const fusionableConsumer =
                (consumeFn, aggregator, initialValue) => {
                    const reducerByFusion = getFusionReducer(aggregator, initialValue);

                    return (...args) => {
                        const allTransformations =
                            pipe(
                                consumeFn,
                                intoFusion,
                                reducerByFusion,
                                addTransformation,
                            )
                                (...args);

                        return execTransformations(allTransformations, iterableObj);
                    }
                };

            // Fusionable functions
            const map = fusionable(reducerUtils.mapReducer);

            const filter = fusionable(reducerUtils.filterReducer);

            const reject = fusionable(reducerUtils.rejectReducer);

            const compact = fusionable(() => reducerUtils.compactReducer);

            const take = fusionable(reducerUtils.takeReducer);

            const takeWhile = fusionable(reducerUtils.takeWhileReducer);

            const drop = fusionable(reducerUtils.dropReducer);

            const dropWhile = fusionable(reducerUtils.dropWhileReducer);

            // Consumer functions
            const reduce = (reducerFn) => fusionableConsumer(reducerFn, last, []);

            const forEach = consumer(consumerUtils.forEach);

            const some = fusionableConsumer(consumerReducerUtils.someReducer, last, false);

            const every = fusionableConsumer(consumerReducerUtils.everyReducer, last, true);

            const find = fusionableConsumer(consumerReducerUtils.findReducer, last, null);

            const findIndex = fusionableConsumer(consumerReducerUtils.findIndexReducer, last, -1);

            const nth = fusionableConsumer(consumerReducerUtils.nthReducer, last, null);

            const head = fusionableConsumer(() => consumerReducerUtils.headReducer, last, null);

            const value =
                () => {
                    const resultIterable = consume(identity);
                    return constructFn(resultIterable);
                };

            const wrapper = {
                [Symbol.iterator]: () => {
                    const transformed = consume(identity);
                    return makeIterator(transformed);
                },
                value,
                map,
                filter,
                reject,
                take,
                takeWhile,
                drop,
                dropWhile,
                compact,
                reduce,
                forEach,
                head,
                some,
                every,
                find,
                findIndex,
                nth
            };

            return wrapper;
        }
            ([]);
    }
        ([]);
};

module.exports = wrapIterable;
const { combineList, makeIterator, iterableHead, valuesToPair, identity } = require('../helper-utils');
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
                (consumeFn, initialValue) =>
                    (...args) => {
                        const consumeReducer = consumeFn(...args);
                        const getReducerByFusion = getFusionReducer(consumeReducer, initialValue);
                        const fusionReducer = getReducerByFusion(fusionList);
                        const allTransformations = addTransformation(fusionReducer);
                        return execTransformations(allTransformations, iterableObj);
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
            const reduce = (reducerFn) => fusionableConsumer(reducerFn, []);

            const forEach = consumer(consumerUtils.forEach);

            const some = fusionableConsumer(consumerReducerUtils.someReducer, false);

            const every = fusionableConsumer(consumerReducerUtils.everyReducer, true);

            const find = fusionableConsumer(consumerReducerUtils.findReducer, null);

            const findIndex = fusionableConsumer(consumerReducerUtils.findIndexReducer, -1);

            const nth = fusionableConsumer(consumerReducerUtils.nthReducer, null);

            const head = fusionableConsumer(() => consumerReducerUtils.headReducer, null);

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
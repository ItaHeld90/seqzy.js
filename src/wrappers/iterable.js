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

            const fuseIn = pipe(
                combineList(fusionList),
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
                    )

            const consumer2 =
                (consumeFn, aggregator, initialValue) =>
                    (...args) => {
                        // create consumer reducer
                        const reducer = consumeFn(...args);
                        // add to fusion
                        const newFusion = combineList(fusionList, reducer);
                        // get fusion reducer calculator
                        const calculateFusionReducer =
                            getFusionReducer(aggregator, initialValue);

                        // add fusion to transformations
                        const allTransformations =
                            pipe(
                                calculateFusionReducer,
                                addTransformation
                            )
                                (newFusion);
                        // execute transformations
                        return execTransformations(allTransformations, iterableObj);
                    }

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
            const reduce = consumer(consumerUtils.reduce);

            const forEach = consumer(consumerUtils.forEach);

            const some = consumer2(consumerReducerUtils.someReducer, last, false);

            const every = consumer2(consumerReducerUtils.everyReducer, last, true);

            const find = consumer2(consumerReducerUtils.findReducer, last, null);

            const findIndex = consumer2(consumerReducerUtils.findIndexReducer, last, -1);

            const nth = consumer2(consumerReducerUtils.nthReducer, last, null);

            // using take 1 to return a wrapper with only 1 value,
            // then unwrapping the value
            const head = () => iterableHead(take(1).value());

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
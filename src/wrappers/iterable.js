const { combineList, makeIterator, identity } = require('../helper-utils');
const { pipe } = require('ramda/src');
const { getFusionReducer } = require('../transduce-utils');

const consumerUtils = require('../wrapper-consumer-reducers');
const reducerUtils = require('../wrapper-reducers');

// wrapper
const wrapIterable = (iterableObj, constructFn) => {
    return function fuse(fusionList) {
        const defaultFusionReducerCalculator = getFusionReducer(combineList, []);

        const consume = (consumeFn) => {
            const transformation = defaultFusionReducerCalculator(fusionList);
            const transformed = transformation(iterableObj);
            return consumeFn(transformed);
        };

        const intoFusion = combineList(fusionList);

        const fuseIn = pipe(
            intoFusion,
            fuse
        );

        const reducer =
            reducerFn =>
                pipe(
                    reducerFn,
                    fuseIn
                );

        const consumer =
            (consumeFn, initialValue) =>
                (...args) => {
                    const consumeReducer = consumeFn(...args);
                    const getReducerByFusion = getFusionReducer(consumeReducer, initialValue);
                    const fusionReducer = getReducerByFusion(fusionList);
                    return fusionReducer(iterableObj);
                };

        // Fusionable functions
        const map = reducer(reducerUtils.mapReducer);

        const filter = reducer(reducerUtils.filterReducer);

        const reject = reducer(reducerUtils.rejectReducer);

        const compact = reducer(() => reducerUtils.compactReducer);

        const take = reducer(reducerUtils.takeReducer);

        const takeWhile = reducer(reducerUtils.takeWhileReducer);

        const drop = reducer(reducerUtils.dropReducer);

        const dropWhile = reducer(reducerUtils.dropWhileReducer);

        // Consumer functions
        const reduce = (reducerFn, initialValue) =>
            consumer
                (consumerUtils.reduce, initialValue)
                (reducerFn);

        const forEach = consumer(consumerUtils.forEachReducer, null);

        const some = consumer(consumerUtils.someReducer, false);

        const every = consumer(consumerUtils.everyReducer, true);

        const find = consumer(consumerUtils.findReducer, null);

        const findIndex = consumer(consumerUtils.findIndexReducer, -1);

        const nth = consumer(consumerUtils.nthReducer, null);

        const head = consumer(() => consumerUtils.headReducer, null);

        const toArray = consumer(() => consumerUtils.toArray, []);

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
            nth,
            toArray
        };

        return wrapper;
    }
        ([]);
};

module.exports = wrapIterable;
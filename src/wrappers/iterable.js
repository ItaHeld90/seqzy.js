const { combineList, makeIterator, iterableHead, valuesToPair, identity } = require('../helper-utils');
const { pipe, compose, concat } = require('ramda/src');
const { execTransformations, getFusionReducer } = require('../iterable-utils');

const transUtils = require('../wrapper-transformations');
const consumerUtils = require('../wrapper-consumers');
const reducerUtils = require('../wrapper-reducers');

// wrapper
const wrapIterable = (iterableObj, aggregate, createEmpty) => {
    const construct = consumerUtils.reduce(aggregate, createEmpty());

    return function rewrap(transformations) {
        const addTransformation = combineList(transformations);

        return function fuse(fusionList) {
            const consume = (consumeFn) => {
                const allTransformations = addFusionToTransformations();
                const transformed = execTransformations(allTransformations, iterableObj);
                return consumeFn(transformed);
            }

            const addFusionToTransformations =
                () =>
                    fusionList.length > 0
                        ? addTransformation(getFusionReducer(fusionList))
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

            const map = pipe(
                reducerUtils.mapReducer,
                fuseIn
            );

            const filter = pipe(
                reducerUtils.filterReducer,
                fuseIn
            );

            const reject = pipe(
                reducerUtils.rejectReducer,
                fuseIn
            );

            const compact = pipe(
                () => reducerUtils.compactReducer,
                fuseIn
            );

            const take = pipe(
                transUtils.take,
                rewrapWithNewTrans
            );

            const takeWhile = pipe(
                transUtils.takeWhile,
                rewrapWithNewTrans
            );

            const drop = pipe(
                transUtils.drop,
                rewrapWithNewTrans
            );

            const dropWhile = pipe(
                transUtils.dropWhile,
                rewrapWithNewTrans
            );

            const reduce = pipe(
                consumerUtils.reduce,
                consume
            );

            const forEach = pipe(
                consumerUtils.forEach,
                consume
            );

            const some = pipe(
                consumerUtils.some,
                consume
            );

            const every = pipe(
                consumerUtils.every,
                consume
            );

            const find = pipe(
                consumerUtils.find,
                consume
            );

            const findIndex = pipe(
                consumerUtils.findIndex,
                consume
            );

            const nth = pipe(
                consumerUtils.nth,
                consume
            );

            // using take 1 to return a wrapper with only 1 value,
            // then unwrapping the value
            const head = () => iterableHead(take(1).value());

            const value =
                () => {
                    const resultIterable = consume(identity);
                    return construct(resultIterable);
                };

            const result = {
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

            return result;
        }
            ([]);
    }
        ([]);
};

module.exports = wrapIterable;
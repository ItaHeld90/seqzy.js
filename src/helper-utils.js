const { curry } = require('ramda/src');

var reverseArgs =
    fn =>
        (...args) =>
            fn(...args.reverse());

const compose = (...fns) =>
    result =>
        fns.reduceRight(
            (result, fn) =>
                fn(result)
            , result
        );

const pipe = reverseArgs(compose);

const isIterable = (obj) => {
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}

const makeIterator = (iterable) => {
    return iterable[Symbol.iterator]();
}

const combineList = curry(
    (list, item) =>
        [...list, item]
);

const not =
    predicateFn =>
        (...args) =>
            !predicateFn(...args);

const identity =
    value =>
        value;

module.exports = {
    compose,
    pipe,
    isIterable,
    makeIterator,
    combineList,
    not,
    identity,
};
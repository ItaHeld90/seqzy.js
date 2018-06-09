const { curry } = require('ramda/src');

const reverseArgs =
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

const join = curry(
    (separator, charList) =>
        charList.length
            ? charList.reduce((result, c) => result.concat(separator, c))
            : ''
    );

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
    join,
    isIterable,
    makeIterator,
    combineList,
    not,
    identity,
};
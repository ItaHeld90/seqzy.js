const { mapReducer, filterReducer } = require('./help-utils');

// wrapper
function wrap(iterableObj, aggregate, empty) {
    const wrapValue = (val) => wrap(val, aggregate, empty);

    const map = (mapperFn) => {
        const result = reduce(
            mapReducer(mapperFn, aggregate),
            empty
        );

        return wrapValue(result);
    }

    const filter = (predicate) => {
        const result = reduce(
            filterReducer(predicate, aggregate),
            empty
        );

        return wrapValue(result);
    }

    const reduce = (reducer, initialValue) => {
        let result = initialValue;
        let idx = 0;

        for (let item of iterableObj) {
            result = reducer(result, item, idx)
            idx++;
        }

        return result;
    }

    return {
        value: () => iterableObj,
        map,
        filter
    };
}

const myArr = [1, 2, 3];
const myMap = new Map().set('bla', 'ga').set('a', 'x');

let wrappedMap =
    wrap(
        myMap,
        (result, [key, val]) => result.set(key, val),
        new Map()
    )
        //.map(([key, val]) => [key + val, val])
        .filter(([key, val]) => key.length > 2)
        .value();

console.log(wrappedMap);

let wrappedArr =
    wrap(
        myArr,
        (result, val) => [...result, val],
        []
    )
        .map(val => val * 2)
        .filter(val => val > 3)
        .value()

console.log(wrappedArr);

const obj = {
    [Symbol.iterator]: function* () {
        yield 12;
        yield 10;
        yield 20
    }
};

const wrappedObj = wrap(
    obj,
    (result, val) => [...result, val],
    []
)
    .map(val => val * 3)
    .filter(val => val > 40)
    .value();

console.log(wrappedObj);
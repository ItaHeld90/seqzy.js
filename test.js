const { wrap, wrapMap, wrapSet, wrapString, wrapList } = require("./app");

const myArr = [1, 2, 3];
const myMap = new Map().set('bla', 'ga').set('a', 'x');

const wrappedMap =
    wrap(
        myMap,
        (result, [key, val]) => result.set(key, val),
        new Map()
    )
        .map(([key, val]) => [key + val, val])
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

const wrappedMap2 = wrapMap(
    new Map().set('x', 1).set('y', 2)
)
    .map(([key, val]) => [key + val, val])
    .value();

console.log(wrappedMap2);

const wrappedStr = wrapString('hello world')
    .filter(c => c !== ' ')
    .map(c => c + c)
    .map(c => c.toUpperCase())
    .reduce((result, c) => [result, c].join('-'), '')
//.value();

console.log(wrappedStr);

const wrappedArrayVals = wrapList(Object.values({ x: 1, y: 2, z: 6, a: 8 }))
    .filter(val => val % 2 === 0)
    .map(val => val / 2)
    .value();

console.log(wrappedArrayVals);

//const notIterable = wrap({}, () => ({}), {});
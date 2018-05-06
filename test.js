const { wrap, wrapList } = require("./app");

const myMap = new Map().set('bla', 'ga').set('a', 'x');

const wrappedMap =
    wrap(
        myMap
    )
        .map(([key, val]) => [key + val, val])
        .filter(([key, val]) => key.length > 2)
        .value();

console.log(wrappedMap);

const myArr = [1, 2, 3];

let wrappedArr =
    wrap(
        myArr
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

const wrappedMap2 = wrap(
    new Map().set('x', 1).set('y', 2)
)
    .map(([key, val]) => [key + val, val])
    .value();

console.log(wrappedMap2);

const wrappedStr = wrap('hello world')
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

const wrappedMap3 = wrap(
    new Map().set('x', 1).set('y', 2)
)
    .map(([key, val]) => [key + val, val])
    .foreach(([key, val]) => console.log(`key is ${key}, value is ${val}`))
    .reduce((result, [, val]) => result + val, 0);

console.log(wrappedMap3);

//const notIterable = wrap({}, () => ({}), {});
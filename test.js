const { wrap } = require("./app");
const sentGen = require('./test-utils');

const wrappedMap =
    wrap(
        new Map().set('bla', 'ga').set('a', 'x')
    )
        .map(([key, val]) => [key + val, val])
        .filter(([key, val]) => key.length > 2)
        .value();

console.log(wrappedMap);

let wrappedArr =
    wrap(
        [1, 2, 3]
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
    () => []
)
    .map(val => val * 3)
    .filter(val => val > 40)
    .value();

console.log(wrappedObj);

const wrappedStr = wrap('hello world')
    .filter(c => c !== ' ')
    .map(c => c + c)
    .map(c => c.toUpperCase())
    .reduce((result, c) => [result, c].join('-'), '');

console.log(wrappedStr);

const wrappedArrayVals = wrap(Object.values({ x: 1, y: 2, z: 6, a: 8 }))
    .filter(val => val % 2 === 0)
    .map(val => val / 2)
    .value();

console.log(wrappedArrayVals);

const wrappedMap3 = wrap(
    new Map().set('x', 1).set('y', 2)
)
    .map(([key, val]) => [key + val, val])
    .reduce((result, [, val]) => result + val, 0)

const header = wrap(
    new Map().set('x', 1).set('y', 2)
)
    .head()

console.log(header);

const wrappedSentGen = wrap(
    sentGen
);

const sentGen1000 = wrappedSentGen
    .take(1000);

const sentGen10 = wrappedSentGen
    .take(10);

for (let sent of sentGen10.take(3)) {
    console.log(sent);
}

const balonGen = sentGen1000
    .filter(sent => sent.includes('balon'));

const pukkaGen = sentGen1000
    .filter(sent => sent.includes('pukka'));

console.log(balonGen.head());

const setWrapper = wrap(
    new Set().add('a').add('b')
)
    .map(val => val.toUpperCase())
    .value();

console.log(setWrapper);

const someTest = wrap(
    [1, 2, 3, 4]
)
    .some(val => val % 2 === 0)

console.log(someTest);

const everyTest =
    pukkaGen
        .every(val => val.includes('pukka'));

console.log(everyTest);

// Test Find
const findTest = wrap(
    [1, 2, 3, 4]
)
    .find(val => val > 2);

console.log('find:', findTest);

const findIndexTest = wrap(
    [1, 2, 3, 4]
)
    .findIndex(val => val > 2);

console.log('find index:', findIndexTest);

// const notIterable = wrap({}, () => ({}), {});

// TODO: Fix errors
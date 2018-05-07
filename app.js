const wrapIterable = require('./src/wrappers/iterable');
const wrapMap = require('./src/wrappers/map');
const wrapSet = require('./src/wrappers/set');
const wrapString = require('./src/wrappers/string');
const wrapList = require('./src/wrappers/list');
const { isIterable } = require('./src/helper-utils');

const wrap = (iterableObj, aggregate, createEmpty) => {
    if (!isIterable(iterableObj)) {
        throw new Error('The object received is not iterable');
    }

    if (iterableObj instanceof Map) {
        return wrapMap(iterableObj);
    }

    if (iterableObj instanceof Set) {
        return wrapSet(iterableObj);
    }

    if (typeof iterableObj === 'string') {
        return wrapString(iterableObj);
    }

    return wrapList(iterableObj);
}

module.exports = {
    wrap
};
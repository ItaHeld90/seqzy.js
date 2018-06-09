const wrapIterable = require('./wrappers/iterable');
const wrapMap = require('./wrappers/map');
const wrapSet = require('./wrappers/set');
const wrapString = require('./wrappers/string');
const wrapList = require('./wrappers/list');
const { isIterable } = require('./helper-utils');

const wrap = (iterableObj, construct) => {
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

    return wrapList(iterableObj, construct);
}

module.exports = wrap;
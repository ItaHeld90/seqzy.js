const wrapIterable = require('./src/wrappers/wrapper');
const wrapMap = require('./src/wrappers/built-in/map');
const wrapSet = require('./src/wrappers/built-in/set');
const wrapString = require('./src/wrappers/built-in/string');
const wrapList = require('./src/wrappers/built-in/list');

const wrap = (iterableObj, aggregate, empty) => {
    if (iterableObj instanceof Map) {
        return wrapMap(iterableObj);
    }

    if (iterableObj instanceof Set) {
        return wrapSet(iterableObj);
    }

    if (typeof iterableObj === 'string') {
        return wrapString(iterableObj);
    }

    if (iterableObj instanceof Array) {
        return wrapList(iterableObj);
    }

    return wrapIterable(iterableObj, aggregate, empty);
}

module.exports = {
    wrap,
    wrapList
};
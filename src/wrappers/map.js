const wrap = require('./iterable');

module.exports = function wrapMap(map) {
    return wrap(
        map,
        (result, [key, val]) => result.set(key, val),
        new Map()
    );
}
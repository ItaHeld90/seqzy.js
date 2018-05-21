const wrap = require('./iterable');

module.exports = function wrapMap(map) {
    return wrap(
        map,
        (iterableKeyValuePairs) => new Map(iterableKeyValuePairs)
    );
}
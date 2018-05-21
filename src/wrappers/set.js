const wrap = require('./iterable');

module.exports = function wrapSet(set) {
    return wrap(
        set,
        (iterableObj) => new Set(iterableObj)
    );
}
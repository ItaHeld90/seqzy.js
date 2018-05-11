const wrap = require('./iterable');

module.exports = function wrapSet(set) {
    return wrap(
        set,
        (result, val) => result.add(val),
        () => new Set()
    );
}
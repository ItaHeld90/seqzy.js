const wrap = require('./iterable');

module.exports = function wrapSet(set) {
    return wrap(
        set,
        (result, val) => set.add(value),
        new Set()
    );
}
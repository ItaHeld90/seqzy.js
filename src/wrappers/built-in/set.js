const wrap = require('../wrapper');

module.exports = function wrapSet(set) {
    return wrap(
        set,
        (result, val) => set.add(value),
        new Set()
    );
}
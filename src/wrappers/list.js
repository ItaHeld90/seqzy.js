const wrap = require('./iterable');

module.exports = function wrapList(list) {
    return wrap(
        list,
        (result, val) => [...result, val],
        []
    );
}
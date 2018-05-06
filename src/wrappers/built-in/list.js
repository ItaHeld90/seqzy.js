const wrap = require('../wrapper');

module.exports = function wrapList(list) {
    return wrap(
        list,
        (result, val) => [...result, val],
        []
    );
}
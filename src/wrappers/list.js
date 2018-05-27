const wrap = require('./iterable');
const { identity } = require('../helper-utils');

module.exports = function wrapList(list, construct = identity) {
    return wrap(
        list,
        construct
    );
}
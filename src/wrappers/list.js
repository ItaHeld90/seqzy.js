const wrap = require('./iterable');
const { combineList } = require('../helper-utils');
const { identity } = require('../helper-utils');

module.exports = function wrapList(list) {
    return wrap(
        list,
        identity
    );
}
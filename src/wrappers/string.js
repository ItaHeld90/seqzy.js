const wrap = require('./iterable');
const { join } = require('../helper-utils');

module.exports = function wrapString(str) {
    return wrap(
        str,
        join('')
    );
}
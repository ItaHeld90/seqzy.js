const wrap = require('./iterable');
const { join } = require('ramda/src');

module.exports = function wrapString(str) {
    return wrap(
        str,
        join
    );
}
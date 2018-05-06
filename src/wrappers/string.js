const wrap = require('./iterable');
const { concat } = require('ramda/src');

module.exports = function wrapString(str) {
    return wrap(
        str,
        concat,
        ''
    );
}
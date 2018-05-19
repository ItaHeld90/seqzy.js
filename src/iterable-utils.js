const { pipe, compose } = require('ramda/src');
const { identity, combineList } = require('./helper-utils');
const consumerUtils = require('./wrapper-consumers');

// If any transformations were chained - execute them
// Else - return the iterable as is
const execTransformations = (transformations, iterableObj) =>
    transformations.length > 0
        ? pipe(
            ...transformations
        )
            (iterableObj)
        : identity(iterableObj);

module.exports = {
    execTransformations
};
const { mapReducer, filterReducer } = require('./help-utils');

// wrapper
function wrap(iterableObj, aggregate, empty) {
    const wrapValue = (val) => wrap(val, aggregate, empty);

    const map = (mapperFn) => {
        const result = reduce(
            mapReducer(mapperFn, aggregate),
            empty
        );

        return wrapValue(result);
    }

    const filter = (predicate) => {
        const result = reduce(
            filterReducer(predicate, aggregate),
            empty
        );

        return wrapValue(result);
    }

    const reduce = (reducer, initialValue) => {
        let result = initialValue;
        let idx = 0;

        for (let item of iterableObj) {
            result = reducer(result, item, idx)
            idx++;
        }

        return result;
    }

    return {
        value: () => iterableObj,
        map,
        filter
    };
}

module.exports = {
    wrap
};
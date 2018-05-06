// helpers
const mapReducer = (mapperFn, aggregator) =>
    (result, item) =>
        aggregator(result, mapperFn(item));

const filterReducer = (predicateFn, aggregator) =>
    (result, item) =>
        predicateFn(item)
            ? aggregator(result, item)
            : result

const isIterable = (obj) => {
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}

module.exports = {
    mapReducer,
    filterReducer,
    isIterable
}
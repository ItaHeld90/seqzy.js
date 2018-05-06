// helpers
const mapReducer = (mapperFn, aggregator) =>
    (result, item) =>
        aggregator(result, mapperFn(item));

const filterReducer = (predicateFn, aggregator) =>
    (result, item) =>
        predicateFn(item)
            ? aggregator(result, item)
            : result

module.exports = {
    mapReducer,
    filterReducer
}
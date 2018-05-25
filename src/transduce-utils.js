const { createToken } = require('./transduce-token');
const { curry, compose } = require('ramda/src');

const breakableReduce = curry(
    (reducerFn, initialValue, iterableObj) => {
        let result = initialValue;
        let idx = 0;
        const token = createToken();

        for (let item of iterableObj) {
            result = reducerFn(result, item, idx, token);

            if (token.isDone()) {
                break;
            }

            idx++;
        }

        return result;
    }
);

const getFusionReducer = (
    (aggregator, initialValue) =>
        fusion => {
            const preparedFusion = compose(
                ...fusion
            )
                (aggregator);

            return breakableReduce(preparedFusion, initialValue);
        }
);

module.exports = {
    breakableReduce,
    getFusionReducer
};
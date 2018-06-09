const { createToken } = require('./transduce-token');
const { compose, curry } = require('./helper-utils');

const breakableReduce = curry(
    (reducerFn, initialValue, iterableObj) => {
        let result = initialValue;
        let idx = 0;
        const token = createToken();

        for (let item of iterableObj) {
            result = reducerFn(result, item, token);

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
        fusionList => {
            const preparedFusion = fusionList.length > 0
                ? compose(
                    ...fusionList
                )
                    (aggregator)
                : aggregator;

            return breakableReduce(preparedFusion, initialValue);
        }
);

module.exports = {
    breakableReduce,
    getFusionReducer
};
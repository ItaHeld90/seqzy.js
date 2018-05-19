const { createToken } = require('./transduce-token');
const { curry, compose } = require('ramda/src');
const { combineList } = require('./helper-utils')

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

const getFusionReducer =
    fusion => {
        const preparedFusion = compose(
            ...fusion
        )
            (combineList);

        return breakableReduce(preparedFusion, []);
    }

module.exports = {
    breakableReduce,
    getFusionReducer
};
const someReducer =
    predicateFn =>
        (result, item, token) => {
            const isPass = predicateFn(item);

            if (isPass) {
                token.done();
            }

            return isPass;
        };

const everyReducer =
    predicateFn =>
        (result, item, token) => {
            const isPass = predicateFn(item);

            if (!isPass) {
                token.done();
            }

            return isPass;
        };

const findReducer =
    predicateFn =>
        (result, item, token) => {
            const isPass = predicateFn(item);

            if (isPass) {
                token.done();
            }

            const newResult = isPass
                ? item
                : null;

            return newResult;
        };

const findIndexReducer =
    predicateFn => {
        let currIdx = 0;

        return (result, item, token) => {
            const isPass = predicateFn(item);

            if (isPass) {
                token.done();
            }

            const newResult = isPass
                ? currIdx
                : -1;

            currIdx++;

            return newResult;
        }
    };

const nthReducer =
    n => {
        let currIdx = 0;

        return (result, item, token) => {
            const isPass = currIdx === n;

            if (isPass) {
                token.done();
            }

            const newResult = isPass
                ? item
                : null;

            currIdx++;

            return newResult;
        }
    };

const headReducer =
    (result, item, token) => {
        console.log('item:', item);
        token.done();
        return item;
    };

module.exports = {
    someReducer,
    everyReducer,
    findReducer,
    findIndexReducer,
    nthReducer,
    headReducer,
};
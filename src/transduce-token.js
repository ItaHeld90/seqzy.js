const createToken =
    () => {
        let statusDone = false;

        function done() {
            statusDone = true;
        }

        function isDone() {
            return statusDone;
        }

        return {
            isDone,
            done
        }
    }

module.exports = {
    createToken
};
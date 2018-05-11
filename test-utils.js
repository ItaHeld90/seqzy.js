function randomItem(arr) {
    return arr[randInRange(0, arr.length - 1)];
}

function randInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let sentencesGenerator = {
    [Symbol.iterator]: function* () {
        const people = ['pukka', 'guygul', 'balon', 'it'];
        const extra = ['very', 'big', 'not', 'somewhat'];
        const adjectives = ['sus', 'gimbun', 'melech', 'noob'];

        while(true) {
            const [person, ex, adj] =  [people, extra, adjectives].map(x => randomItem(x));

            const date = new Date(Date());
            yield `${person} is ${ex} ${adj}`;
        }
    }
}

module.exports = sentencesGenerator;
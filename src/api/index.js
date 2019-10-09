const fs = require('fs');
const processLinear = require('./processor');

function saveResult(apiResponse) {
    fs.writeFile(__dirname + '/../../external/api.json', JSON.stringify(apiResponse), (err) => {
        if (err) {
            throw new Error(err);
        }
        console.log('Done');
    })
}

function main() {
    try {
        fs.readFile(__dirname + '/../../external/db.json', (err, dbData) => {
            if (err) {
                throw new Error(err);
            }

            var data = JSON.parse(dbData);
            var result = processLinear(data);
            saveResult(result);
        });
    } catch(err) {
        console.error('Error occured:', err);
    }
}

main();
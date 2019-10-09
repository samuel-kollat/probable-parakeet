const fs = require('fs');
const processXml = require('./processor');

function saveResult(linearData) {
    fs.writeFile(__dirname + '/../../external/db.json', JSON.stringify(linearData), (err) => {
        if (err) {
            throw new Error(err);
        }
        console.log('Done');
    })
}

function main() {
    try {
        fs.readFile(__dirname + '/../../external/s3.xml', (err, xmlData) => {
            if (err) {
                throw new Error(err);
            }

            processXml(xmlData, saveResult);
        });
    } catch(err) {
        console.error('Error occured:', err);
    }
}

main();
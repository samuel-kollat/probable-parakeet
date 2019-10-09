const xml2js = require('xml2js');
const getCategories = require('./categories');

function convertJsonToLinear(callback, err, json) {
    if (err) {
        throw new Error(err);
    }

    var categories = getCategories(json);

    callback(categories);
}

function processXml(xml, callback) {
    const xmlParser = new xml2js.Parser();

    xmlParser.parseString(
        xml,
        convertJsonToLinear.bind(null, callback),
    );
}

module.exports = processXml;

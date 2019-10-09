const getCategories = require('./categories');

function processLinear(json) {
    var categories = getCategories(json);

    return categories;
}

module.exports = processLinear;

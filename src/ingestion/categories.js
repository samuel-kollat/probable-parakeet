function getSubCategoriesCount(subCategories) {
    var count = 0;
    if (Array.isArray(subCategories)) {
        count = subCategories.length;
    } else if (typeof subCategories === 'object') {
        count = 1;
    }
    return count;
}

function subCategoriesReducer(name, accumulator, current) {
    const prefix = name + ' > ';
    const processed = getSubCategories(prefix, current);

    accumulator.unshift(...processed);
    return accumulator;
}


function getSubCategories(path, category) {
    if (!category) return;

    const self = {
        name: path + category.$.words,
        size: 0
    }

    var subCategories = category.synset;
    var subCategoriesCount = getSubCategoriesCount(subCategories);

    if (subCategoriesCount === 0) { return [self]; }
    if (subCategories === 1) { subCategories = [subCategories]; }

    const processed = subCategories.reduce(subCategoriesReducer.bind(null, self.name), []);

    self.size = processed.length;
    return[...processed, self];
}

function getCategories(document) {
    if(!document) {
        throw new Error("Document cannot be null or undefined.");
    }

    const pathRoot = '';
    var categoriesRoot = null;

    try {
        categoriesRoot = document['ImageNetStructure']['synset'][0];
    } catch(err) {
        throw new Error('Provided document is invalid. Root category not found.');
    }

    return getSubCategories(pathRoot, categoriesRoot);
}

module.exports = getCategories;
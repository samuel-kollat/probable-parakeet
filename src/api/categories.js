function* categories(document) {
    for (let index = 0; index < document.length; index++) {
        yield document[index];
    }
}

function convert(categoryAccessor, category, subCategories, root, prefix) {
    // Prepare information about self.
    const subCategory = subCategories.shift();
    const subCategoryPrefix = !!prefix ? prefix + ' > ' + subCategory : subCategory;

    root.name = root.name || subCategory;
    root.size = root.size || -1;
    const child = {};

    // Leaf node: save size and return next category for processing.
    if (subCategories.length === 0) {
        root.size = category.size;
        return categoryAccessor.next().value;
    }

    // Non-leaf node: prepare to process a child
    root.children = root.children || [];
    root.children.push(child);

    // Process child and obtain next category
    let nextCategory = convert(categoryAccessor, category, subCategories, child, subCategoryPrefix);

    // Process rest of children
    while (nextCategory.name.startsWith(subCategoryPrefix)) {

        // If next category is information about self, save size and return next category
        if (nextCategory.name === subCategoryPrefix) {
            root.size = nextCategory.size;
            return categoryAccessor.next().value;
        }

        // Process next category as a child of self
        var prefoxForSubs = !prefix ? '' : prefix + ' > ';
        var subs = nextCategory.name.slice((prefoxForSubs).length);
        nextCategory = convert(categoryAccessor, nextCategory, subs.split(' > '), root, prefix);

        if (!nextCategory) {
            break;
        }
    }

    return nextCategory;
}

function getCategories(document) {
    const categoryGenerator = categories(document);

    const root = {};
    const category = categoryGenerator.next().value;
    const subs = category.name.split(' > ');
    convert(categoryGenerator, category, subs, root, '');
    
    return root;
}

module.exports = getCategories
Meteor.methods({
    getProductDetailReport: function (arg) {
        var data = {
            title: {},
            header: {},
            content: [{index: 'No Result'}],
            footer: {}
        };

        var params = {};
        var content = [];
        var categoryId = arg.categoryId;
        var index = 1;
        if(categoryId != '') {
            params.categoryId = categoryId
        }
        /****** Title *****/
        var products = Restaurant.Collection.Products.find(params);
        products.forEach(function (product) {
            product.index = index;
            content.push(product);
            index++;
        });
        data.title = Restaurant.Collection.Company.findOne();
        var header = {};
        header.categoryId = categoryId == '' ? 'All' : Restaurant.Collection.Categories.findOne(categoryId).name;

        /****** Header *****/
        data.header = header;
        /****** Content *****/
        if (content.length > 0) {
            data.content = content;
        }
        return data
    }
});
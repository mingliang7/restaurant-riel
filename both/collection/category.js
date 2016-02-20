Restaurant.Collection.Categories = new Mongo.Collection("restaurant_categories");
Restaurant.Schema.Categories = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        //unique: true,
        max: 200
    },
    description:{
        type:String,
        label:"Description",
        optional:true
    },
  /*  parentId:{
        type:String,
        label:"ParentId",
        optional:true,
        autoform: {
            type: "select2",
            options: function () {
                //return Restaurant.List.category();
               return Restaurant.List.category("Select Parent | No Parent");
            }
        }
    }*/

});
Restaurant.Collection.Categories.attachSchema(Restaurant.Schema.Categories);
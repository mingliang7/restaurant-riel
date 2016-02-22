Restaurant.Collection.Sales = new Mongo.Collection("restaurant_sales");
Restaurant.Schema.Sales = new SimpleSchema({
  saleDate: {
    type: Date,
    label: "Sale Date"
  },
  discount: {
    type: Number,
    label: "Discount",
    decimal: true,
    optional: true
  },
  subTotal: {
    type: Number,
    label: "SubTotal",
    decimal: true,
    optional: true
  },
  total: {
    type: Number,
    label: "Total",
    decimal: true,
    optional: true
  },
  staffId: {
    type: String,
    label: "Staff",
    autoValue() {
      if (this.isInsert) {
        return Meteor.userId();
      }
    }
    //regEx: /^[a-z0-9A-Z_]{3,15}$/
  },
  status: {
    type: String,
    label: "Status"
  },
  customerId: {
    type: String,
    label: "អតិថិជន",
    optional: true,
    autoform: {
      type: 'select',
      options(){
        var sub = Meteor.subscribe("customers");
        if (!sub.ready()) {
          IonLoading.show()
        } else {
          IonLoading.hide();
          let customers = Restaurant.Collection.Customers.find();
          let list = []
          customers.forEach(function(customer) {
            list.push({
              label: `${customer.name}`,
              value: customer._id
            });
          });
          return list;
        }
      }
    }
  },
  tableLocation: {
    type: String,
    optional: true,
    label: 'ទីតាំងតុ',
    autoform: {
      type: 'select',
      options() {
        var sub = Meteor.subscribe("tableLocations");
        if (!sub.ready()) {
          IonLoading.show()
        } else {
          IonLoading.hide();
          let tableLocations = Restaurant.Collection.TableLocations.find();
          let list = []
          tableLocations.forEach(function(location) {
            list.push({
              label: `${location.name}`,
              value: location._id
            });
          });
          return list;
        }
      }
    }
  },
  tableId: {
    type: String,
    label: "តុ",
    autoform: {
      type: 'select',
      options() {
        let currentLocation = AutoForm.getFieldValue('tableLocation');
        let sub = Meteor.subscribe("tableInLocationId", currentLocation);
        if (!sub.ready()) {
          IonLoading.show();
        } else {
          IonLoading.hide();
          let list = [];
          let tables = Restaurant.Collection.Tables.find();
          tables.forEach(function(table) {
            list.push({
              label: `${table.name}`,
              value: table._id
            });
          });
          return list;
        }
      }
    }
  },
  exchangeRateId: {
    type: String,
    label: "Exchange Rate",
    optional: true
  },
  owedAmount: {
    type: Number,
    label: "Owed Amount",
    optional: true
  },
  _table: {
    type: Object,
    optional: true,
    blackbox: true
  },
  text: { //using this field for action-sheet event
    type: String,
    optional: true
  },
  _customer: {
    type: Object,
    optional: true,
    blackbox: true
  },
  _staff: {
    type: Object,
    optional: true,
    blackbox: true
  }
});
Restaurant.Collection.Sales.attachSchema(Restaurant.Schema.Sales);

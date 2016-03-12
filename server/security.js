Security.permit(['insert', 'update', 'remove']).collections([
    Restaurant.Collection.Categories,
    Restaurant.Collection.SaleDetails,
    Restaurant.Collection.Sales,
    Restaurant.Collection.Units,
    Restaurant.Collection.Products,
    Restaurant.Collection.Customers,
    Restaurant.Collection.Notes,
    Restaurant.Collection.Staffs,
    Restaurant.Collection.Tables,
    Restaurant.Collection.TableLocations,
    Images,
    Restaurant.Collection.Company,
    Restaurant.Collection.Payments,
    Restaurant.Collection.Vipcards
]).apply();

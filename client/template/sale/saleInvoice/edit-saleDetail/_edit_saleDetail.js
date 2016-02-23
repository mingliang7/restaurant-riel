Template._editSaleDetail.helpers({
  saleDetail() {
    let id = Template.instance().data.id;
    let saleDetail = Restaurant.Collection.SaleDetails.findOne({
      _id: `${id}`
    });
    console.log(saleDetail);
    return saleDetail;
  }
});


Template._editSaleDetail.events({
  "keyup [name='quantity']" (event, template) {
    let currentQty = $("[name='quantity']").val();
    let currentPrice = $('[name="price"]').val();
    let totalAmount;
    if (currentQty == '0') {
      $("[name='quantity']").val('1');
      $("[name='amount']").val(currentPrice);
    } else {
      checkDiscount();
    }
  },
  'keypress [name="quantity"]' (evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
  },
  "keyup [name='price']" (event, template) {
    let currentQty = $("[name='quantity']").val();
    let tmpPrice = this.value;
    let currentPrice = $('[name="price"]').val();
    let totalAmount;
    if (currentPrice == '0') {
      $("[name='price']").val(tmpPrice);
      $("[name='amount']").val(`${parseFloat(currentQty) * parseFloat(tmpPrice)}`);
    } else {
      checkDiscount();
    }
  },
  "keypress [name='price']" (evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
  },
  "keyup [name='discount']"(event){
    let currentDiscount = $('[name="discount"]').val();
    if(currentDiscount != '' ){
      if(parseFloat(currentDiscount) > 100 || parseFloat(currentDiscount) < 0){
        $('[name="discount"]').val('0')
      }else{
        checkDiscount();
      }
    }
  }

});

var checkDiscount = () => {
  let currentDiscount = $('[name="discount"]').val();
  let currentPrice = $('[name="price"]').val();
  let currentQty = $('[name="quantity"]').val();
  totalAmount = (parseFloat(currentPrice) * parseFloat(currentQty)) * (1 - parseFloat(currentDiscount) / 100);
  $("[name='amount']").val(totalAmount);
}

AutoForm.hooks({
  editSaleDetail: {
    onSuccess(formType, result) {
      Bert.alert('កែប្រែបានសម្រេច!', 'success', 'growl-bottom-right');
      IonModal.close();
    },
    onError(formType, err) {
      Bert.alert(err.message, 'danger', 'growl-bottom-right');
    }
  }
});
Template.restaurantPaymentList.created = function() {
  this.autorun(() => {
    this.subscribe = Meteor.subscribe("paymentList", Router.current().params.saleId);
  });
}

Template.restaurantPaymentList.rendered = function() {
  try {
    this.autorun(() => {
      if (!this.subscription.ready()) {
        IonLoading.show();
      } else {
        IonLoading.hide();
      }
    });
  } catch (e) {

  }
}
Template.restaurantPaymentList.helpers({
  payments() {
    return Restaurant.Collection.Payments.find({
      saleId: Router.current().params.saleId
    });
  },
  backToSale() {
    return `/restaurant/payment/${Router.current().params.saleId}/show`;
  }
});

Template.restaurantPaymentList.events({
  'click [data-action=confirm]' () {
    let payment = this;
    debugger
    Meteor.call('checkLastPayment', payment._id, payment.saleId, (err, result) => {
      if (result) {
        IonPopup.confirm({
          title: 'តើលោកអ្នកត្រូវការលុបឬ ?',
          template: `វិក័យប័ត្របង់ប្រាក់ #${payment._id}?`,
          onOk: () => {

          },
          onCancel: function() {
            Bert.alert('មិនយល់ព្រមក្នុងការលុប !', 'info', 'growl-bottom-right', 'fa-info')
          }
        });
      } else {
        Bert.alert(`វិក័យប័ត្របង់ប្រាក់​ #${payment._id} មិនមែនជាទិន្ន័យចុងក្រោយ`, 'danger', 'growl-bottom-right');

      }
    });
  }
});
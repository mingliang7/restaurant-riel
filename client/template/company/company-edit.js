Template.editCompany.helpers({
  company() {
    var template = Template.instance();
    return Restaurant.Collection.Company.findOne({
      _id: template.data.id
    });
  }
});

AutoForm.hooks({
  editCompany: {
    onSuccess(formType, result) {
      Bert.alert('Updated', 'success', 'growl-bottom-right');
      IonModal.close();
    },
    onError(formType, err) {
      Bert.alert(err.message, 'danger', 'growl-bottom-right');
    }
  }
});
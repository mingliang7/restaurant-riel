AutoForm.hooks({
   categoryNew:{
       onSuccess(formType, res){
           Bert.alert('Added', 'success', 'growl-bottom-right')
           //IonModal.close();
       },
       onError(formType, err){
           Bert.alert( err.message, 'danger', 'growl-bottom-right' );
       }
   }
});

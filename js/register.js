var database = firebase.database();
// función registrar
$('#btn-send').on('click', function(event) {
  event.preventDefault();
  var email = $('.name').val();
  var password = $('.password').val();
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
  
});

 

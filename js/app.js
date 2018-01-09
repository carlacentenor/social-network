// efecto preloader
$(document).ready(function() {
  setTimeout(function() {
    window.location.href = 'views/register.html';
  }, 1000);
});

// efecto input 
$(document).ready(function() {
  Materialize.updateTextFields();
});

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyDaQXMAU0DCAKYCLPd8DtHqEhcbYHOIKj0',
  authDomain: 'social-network-c585e.firebaseapp.com',
  databaseURL: 'https://social-network-c585e.firebaseio.com',
  projectId: 'social-network-c585e',
  storageBucket: 'social-network-c585e.appspot.com',
  messagingSenderId: '506952908893'
};
firebase.initializeApp(config);

// función login
$('#btn-login').on('click', function(event) {
  var email = $('.name').val();
  var password = $('.password').val();
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  // ...
  });
});
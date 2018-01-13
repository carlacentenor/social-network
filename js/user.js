$(document).ready(function() {
  var config = {
    apiKey: 'AIzaSyAXr5SfXVJQ_jCyB8w33CaaNZPuTPZeQAI',
    authDomain: 'our-kids-47772.firebaseapp.com',
    databaseURL: 'https://our-kids-47772.firebaseio.com',
    projectId: 'our-kids-47772',
    storageBucket: 'our-kids-47772.appspot.com',
    messagingSenderId: '208252014214'
  };
  firebase.initializeApp(config);

  $('.modal').modal();


  var passwordLogin = $('.password-login');
  var emailLogin = $('.email-login');
  var emailRegister = $('.email-register');
  var passwordRegisterNew = $('.password-register');
  var nameRegisterNew = $('.name-register');
  var validatePassword = false;
  var validateEmail = false;
  var validateName = false;


  emailRegister.on('keyup', function(event) {
    var EMAILUSER = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;

    if (EMAILUSER.test($(this).val())) {
      validateEmail = true;
      validateRegister();
    } else {
      inactiveRegister();
    }
  });


  passwordRegisterNew.on('keyup', function(event) {
    if (passwordRegisterNew.val()) {
      validatePassword = true;
      validateRegister();
    } else {
      inactiveRegister();
    }
  });

  nameRegisterNew.on('keyup', function(event) {
    if (nameRegisterNew.val()) {
      validateName = true;
      validateRegister();
    } else {
      inactiveRegister();
    }
  });

  emailLogin.on('keyup', function(event) {
    var EMAILUSER = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;

    if (EMAILUSER.test($(this).val())) {
      validateEmail = true;
      validateUser();
    } else {
      inactiveUser();
    }
  });

  passwordLogin.on('keyup', function(event) {
    if (passwordLogin.val()) {
      validatePassword = true;
      validateUser();
    } else {
      inactiveUser();
    }
  });

  function validateUser() {
    if (validateEmail && validatePassword) {
      $('.btn-login').attr('disabled', false);
    }
  }


  function validateRegister() {
    if (validateEmail && validatePassword && validateName) {
      $('.btn-register').attr('disabled', false);
    }
  }

  function inactiveRegister() {
    $('.btn-register').attr('disabled', 'disabled');
  }

  function inactiveUser() {
    $('.btn-login').attr('disabled', 'disabled');
  }
  

  $('.btn-register').click(function() {
    firebase.auth().createUserWithEmailAndPassword(emailRegister.val(), passwordRegisterNew.val())
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
      });

    firebase.auth().onAuthStateChanged(function(user) {
      var userNew = nameRegisterNew.val();    
      if (user) {
        firebase.database().ref('users/' + user.uid).set({
          name: userNew,
          email: user.email,
          uid: user.uid,
          profilePhoto: 'https://firebasestorage.googleapis.com/v0/b/our-kids-47772.appspot.com/o/userdefault.png?alt=media&token=ff44fe35-e341-45e5-914c-05878f0d72dd'
        }).then(user => {
          window.location.href = 'home.html';
        });
      } else {
        
      }
    });
  });


  // Autentificación por email y password
  
  $('.btn-login').click(function(event) {
    event.preventDefault();

    var email = emailLogin.val();
    var password = passwordLogin.val();

    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        $(location).attr('href', 'home.html');
      }
    });
  });
});


// Login con Google
var provider = new firebase.auth.GoogleAuthProvider();
$('.btn-google').on('click', function() {
  event.preventDefault();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;

    var user = result.user;

    firebase.database().ref('users/' + user.uid).set({
      name: user.displayName,
      email: user.email,
      uid: user.uid,
      profilePhoto: user.photoURL
    }).then(
      user => {
        $(location).attr('href', 'home.html');
      });
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
});


// Obteniendo datos del usuario actual
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var name = user.displayName;
    var email = user.email;
    var photoUrl = user.photoURL;
    var uid = user.uid;

    $('.user-name').text(name);
    $('.user-name-post-new').text(name);
    $('.img-user').attr('src', photoUrl);
    $('.img-user-post-new').attr('src', photoUrl);
    $('.img-user-profile').attr('src', photoUrl);
    // $('.poster').css('background-image', 'url("' + posterUser + '")');
    // $('.background-poster').css('background-image', 'url("' + posterUser + '")');
    $('.email-profile  p').text(email);
  } else {
    // No user is signed in.
  }
});

$('.close').click(function() {
  firebase.auth().signOut().then(function() {
    $(location).attr('href', 'register.html');
  }).catch(function(error) {
    // An error happened.

  });
});
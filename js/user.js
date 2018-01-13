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


  var database = firebase.database();
  var reference = database.ref('users');
  var imgUser, nameUser, postUser, posterUser;
  var email;
  var password;
  var users = {};


  $('.btn-register').click(function() {
    $('.error').remove();
    var emailRegister = $('.email-register').val();
    var passwordRegisterNew = $('.password-register').val();
    var nameUser = $('.name-register').val();


    reference.push({
      name: nameUser,
      email: emailRegister,
      password: passwordRegisterNew,
      imagen: '../assets/images/userdefault.png',
      poster: '../assets/images/portada2.jpg'

    }, function() {
      alert('Se registro correctamente');
    });
  });

  $('.btn-login').click(function() {
    event.preventDefault();
    $('.error').remove();
    reference.on('value', function(datos) {
      users = datos.val();
      var arrayUser = Object.values(users);
      for (i = 0; i < arrayUser.length; i++) {
        if (arrayUser[i].email === emailLogin.val() && arrayUser[i].password === passwordLogin.val()) {
          id = arrayUser[i];
          localStorage.email = id.email;

          window.location.href = 'home.html';
        }
      }
      $('.message').append('<p class="error">Email o contraseña incorrecta</p>');
    }, function(objetoError) {
      console.log('Error de lectura:' + objetoError.code);
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

  $('.close').click(function() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log('Cerrando sesión...');
      $(location).attr('href', 'login.html');
    }).catch(function(error) {
      // An error happened.
    });
  });
});
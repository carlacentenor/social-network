
// the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
$('.modal').modal();

var passwordLogin = $('.password-login');
var emailLogin = $('.email-login');
var emailRegister = $('#email');
var passwordRegisterNew = $('#password-register');

var validatePassword = false;
var validateEmail = false;

function registrar() {
  var email = emailRegister.val();
  var passwordRegister = passwordRegisterNew.val();

  firebase.auth().createUserWithEmailAndPassword(email, passwordRegister)
    .then(function() {
      verificar();
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ...
    });
}


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
  if (validateEmail && validatePassword) {
    $('.btn-register').attr('disabled', false);
  }
}

function inactiveRegister() {
  $('.btn-register').attr('disabled', 'disabled');
}

function inactiveUser() {
  $('.btn-login').attr('disabled', 'disabled');
}

function ingreso() {
  event.preventDefault();
  var email2 = document.getElementById('email2').value;
  var contraseña2 = document.getElementById('contraseña2').value;
  localStorage.email = email2;
  localStorage.password = contraseña2;

  for (i = 0; i < dataUsers[0].length; i++) {
    if (emailLogin.val() === dataUsers[0][i].email && passwordLogin.val() === dataUsers[0][i].password) {
      window.location.href = '../views/home.html';
    }
  }

  firebase.auth().signInWithEmailAndPassword(email2, contraseña2)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      

      // ...
    });
}

function observador() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('existe usuario activo');
      
      // User is signed in.
      var displayName = user.displayName;

      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;

      console.log('*************************');
      console.log(user.emailVerified);
      console.log('*************************');

     
      // ...
    } else {
      // User is signed out.
      console.log('No existe usuario activo');
      // ...
    }
  });
}
observador();


function verificar() {
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function() {
    // Email sent.
    console.log('Enviando correo....');
    alert('Revisa tu bandeja de Entrada, te hemos enviado un correo de confirmación');
  }).catch(function(error) {
    // An error happened.
    console.log(error);
  });
}


function cerrar() {
  firebase.auth().signOut()
    .then(function() {
      console.log('Saliendo...');
    })
    .catch(function(error) {
      console.log(error);
    });
}

$('.close').on('click', function() {
  cerrar();
});


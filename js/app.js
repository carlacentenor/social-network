// efecto preloader
$(document).ready(function() {
  setTimeout(function() {
    window.location.href = 'views/register.html';
  }, 1000);
});

// efecto input 
$(document).ready(function() {
  Materialize.updateTextFields();


  // función login
  $('#btn-login').on('click', function(event) {
    event.preventDefault();
    var email = $('.name').val();
    var password = $('.password').val();
  
    localStorage.email = email;
    localStorage.password = password;
   

    window.location.href = '../views/home.html';
  });
});



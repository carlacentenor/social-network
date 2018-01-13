$(document).ready(function() {
  // acción de menu
  $('.button-collapse').sideNav();
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();
  // carrusel

  $('.carousel').carousel();

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
      $('.email-profile  p').text(email);
    } else {
      // No user is signed in.
    }
  });

  /*

      $('.user-name-post-new').text(name);
      $('.img-user').attr('src', photoUrl);
      $('.img-user-post-new').attr('src', photoUrl);
      $('.img-user-profile').attr('src', photoUrl);
      // $('.poster').css('background-image', 'url("' + posterUser + '")');
      // $('.background-poster').css('background-image', 'url("' + posterUser + '")');
     
  */
});
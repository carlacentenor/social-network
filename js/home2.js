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
      var uid = user.uid;
      var name = user.displayName;
      var email = user.email;
      var photoUrl = user.photoURL;
      
      if (name === null) {
        var database = firebase.database();
        var reference = database.ref('users');
        reference.on('value', function(datos) {
          users = datos.val();
          var arrayUser = Object.values(users);
          for (i = 0; i < arrayUser.length; i++) {
            if (arrayUser[i].uid === uid) {
              var id = arrayUser[i];
                            console.log(id.name);
              $('.user-name').text(id.name);
              $('.user-name-post-new').text(id.name);
              $('.img-user').attr('src', id.profilePhoto);
              $('.img-user-post-new').attr('src', id.profilePhoto);
              $('.img-user-profile').attr('src', id.profilePhoto);
              $('.user-name-post').text(id.name);
              $('.email-profile  p').text(id.email);
            }
          }
        }, function(objetoError) {
          console.log('Error de lectura:' + objetoError.code);
        });
      } else {
        $('.user-name').text(name);
        $('.user-name-post-new').text(name);
        $('.img-user').attr('src', photoUrl);
        $('.img-user-post-new').attr('src', photoUrl);
        $('.img-user-profile').attr('src', photoUrl);
        $('.email-profile  p').text(email);
      }
    } else {
      // No user is signed in.
    }
  });
});
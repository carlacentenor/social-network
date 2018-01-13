$(document).ready(function() {
  // acción de menu
  $('.button-collapse').sideNav();
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();
  // carrusel
  var btnPost = $('.btn-post');
  $('.carousel').carousel();

  // Obteniendo datos del usuario actual


  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var uid = user.uid;
      var name = user.displayName;
      var email = user.email;
      var photoUrl = user.photoURL;
      var posterPhoto = user.posterPhoto;
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
              $('.poster').css('background-image', 'url("' + id.posterPhoto + '")');
              $('.background-poster').css('background-image', 'url("' + id.posterPhoto + '")');
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
        $('.poster').css('background-image', 'url("' + posterPhoto + '")');
        $('.background-poster').css('background-image', 'url("' + posterPhoto + '")');
      }
    } else {
      // No user is signed in.
    }
  });

  function clear() {
    $('.modalClear .post-user').val('');
  }
  var database = firebase.database();
  var reference = database.ref('users');
  var referencePost = database.ref('post');

  btnPost.on('click', function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var uid = user.uid;
        
        reference.on('value', function(datos) {
          users = datos.val();
          var arrayUser = Object.values(users);
          for (i = 0; i < arrayUser.length; i++) {
            if (arrayUser[i].uid === uid) {
              id = arrayUser[i];
              var nameUserLogin = id.name;
            }
          }
      
          var textPost = $('#post-user').val();
          var boxPost = $('.container-post');
          if (textPost) {
            referencePost.push({
              name: id.name,
              text: textPost,
              photoPost: id.profilePhoto
          
    
            }, function() {
              console.log('Se registro correctamente');
            });
          } else {
            btnPost.attr('disabled', false);
          }
    
          clear();
        });
      }
    });
  });

  referencePost.on('value', function(datos) {
    $('.post-new').remove();
    
    post = datos.val();

    // Recorremos todos los post y los mostramos
    $.each(post, function(indice, valor) {
      $('.container-post').prepend('<div class="border-post post-new"><div class="box-img-post"><figure class="border-photo-post-user" >' +
        '<img class="img-user-post" src="' + valor.photoPost + '" >' +
        '</figure>' +
        '<p class="user-name-post">' + valor.name + '</p></div><div class=""><p>' + valor.text + '</p></div> <div class="comment"><i class="small material-icons align">favorite_border</i><i class="small material-icons align">comment</i></div></div>');
    });
  }, function(objetoError) {
    console.log('Error de lectura:' + objetoError.code);
  });


  // Mostramos todos los usuarios
  reference.on('value', function(datos) {
    users = datos.val();

    // Recorremos todos los contactos y los mostramos
    $.each(users, function(indice, valor) {
      $('.contacts').append('<div class="border-post-contact name-contact"><img class="img-user-contact inline-block" src=' + valor.profilePhoto + ' ><p class="inline-block ">' + valor.name + '</p><button class ="btn inline-block"><i class="material-icons" >person_add</i>Seguir</button></div>');
    });
  }, function(objetoError) {
    console.log('Error de lectura:' + objetoError.code);
  });
});
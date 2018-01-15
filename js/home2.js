$(document).ready(function() {
  // acción de menu
  $('.button-collapse').sideNav();
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();
  // carrusel
  var btnPost = $('.btn-post');
  
  
  $('.carousel').carousel();

  // Firebase
  var database = firebase.database();
  var storage = firebase.storage();
  var reference = database.ref('users');
  var referencePost = database.ref('post');
  
  var file;
  var downloadURL;
  $('#imagen').change(function(event) {
    file = event.target.files[0];
  });


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
              
              $('.user-name').text(id.name);
              $('.user-name-post-new').text(id.name);
              $('.img-user').attr('src', id.profilePhoto);
              $('.img-user-post-new').attr('src', id.profilePhoto);
              $('.img-user-profile').attr('src', id.profilePhoto);
              $('#circle-photo').attr('src', id.profilePhoto);
              $('.name-menu').text(id.name);
              $('.new').attr('src', id.photoUrl);
              $('.email-menu').text(id.email);
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
        $('.new').attr('src', photoUrl);
        $('#circle-photo').attr('src', photoUrl);
        $('.name-menu').text(name);
        $('.email-menu').text(email);
        $('.email-profile  p').text(email);
      }
    } else {
      // No user is signed in.
    }
  });

  function clear() {
    $('.modalClear .post-user').val('');
  }


  btnPost.on('click', function() {
    if (file) {
      var storageRef = storage.ref('imagesPost/' + file.name);
      var uploadTask = storageRef.put(file);

      uploadTask.on('state_changed', function(snapshot) {


      }, function(error) {

      }, function() {
        downloadURL = uploadTask.snapshot.downloadURL;
        // Ibteniendo datos del usuario
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
              if (textPost && file) {
                referencePost.push({

                  name: id.name,
                  text: textPost,
                  photoPost: id.profilePhoto,
                  photo: downloadURL


                }, function() {
                  console.log('Se registro correctamente');
                  clear();
                });
              }
            });
          }
        });
      });
    } else {
      downloadURL = 'NONE';
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
                photoPost: id.profilePhoto,
                photo: downloadURL


              }, function() {
                console.log('Se registro correctamente');
                clear();
              });
            }
          });
        }
      });
    }
  });

  referencePost.on('value', function(datos) {
    $('.post-new').remove();

    post = datos.val();

    // Recorremos todos los post y los mostramos
    $.each(post, function(indice, valor) {
      if (valor.photo === 'NONE') {
        $('.container-post').prepend('<div class="border-post post-new"><div class="box-img-post"><figure class="border-photo-post-user" >' +
          '<img class="img-user-post" src="' + valor.photoPost + '" >' +
          '</figure>' +
          '<p class="user-name-post">' + valor.name + '</p></div><div class=""><p>' + valor.text + '</p></div> <div class="comment"><i class="small material-icons align like">favorite</i><i class="small material-icons align">comment</i></div></div>');
      } else {
        $('.container-post').prepend('<div class="border-post post-new"><div class="box-img-post"><figure class="border-photo-post-user" >' +
          '<img class="img-user-post" src="' + valor.photoPost + '" >' +
          '</figure>' +
          '<p class="user-name-post">' + valor.name + '</p></div><div class=""><p>' + valor.text + '</p></div><div class="box-image-post"><img class="img-post-new" src="' + valor.photo + '" ></div> <div class="comment"><i class="small material-icons align like">favorite</i><i class="small material-icons align">comment</i></div></div>');
      }
    });
  }, function(objetoError) {
    console.log('Error de lectura:' + objetoError.code);
  });


  // Mostramos todos los usuarios
  reference.on('value', function(datos) {
    users = datos.val();

    // Recorremos todos los contactos y los mostramos
    $.each(users, function(indice, valor) {
      $('.contacts').append('<div class="border-post-contact name-contact "><div class="row"><div class ="col s2"><img class="img-user-contact" src=' + valor.profilePhoto + ' ></div><div class="col s7"><p class="text-al-c title-contact">' + valor.name + '</p><p class="email-contact ">' + valor.email + '</p><p class="email-contact">Lima, Perú</p></div><div class="col s3 right-align"><a class="follow">Seguir<span class="icon-user-plus"></span></a></div></div></div>');
    });
  }, function(objetoError) {
    console.log('Error de lectura:' + objetoError.code);
  });

  // FUnción  de like 
  $(document).on('click', '.like', function() {
    $(this).toggleClass('click');
  });

  // FUncion de add friends
  $(document).on('click', '.follow', function() {
    $(this).toggleClass('follow-active');
  });
});
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
  // acción de menu
  $('.button-collapse').sideNav();
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();
  // carrusel

  $('.carousel').carousel();

  // variables de selectores
  var btnPost = $('.btn-post');
  var id;
  var nameUserLogin;
  $('.modal').modal();

  var database = firebase.database();
  var reference = database.ref('users');
  var imagendefault = '../assets/images/userdefault.png';
  var imgPosterDefault = '../assets/images/portada2.jpg';
  var imagen;

  $('#imagen').change(function() {
    var descriptor = new FileReader();
    descriptor.readAsDataURL(this.files[0]);

    descriptor.onloadend = function() {
      imagen = descriptor.result;
      $('#previsualizacion').attr('src', imagen);
    };
  });


  reference.on('value', function(datos) {
    users = datos.val();
    var arrayUser = Object.values(users);
    for (i = 0; i < arrayUser.length; i++) {
      if (arrayUser[i].email === localStorage.email) {
        id = arrayUser[i];
        nameUserLogin = id.name;

        // Ingresando datos del usuario
        $('.user-name').text(id.name);
        $('.user-name-post-new').text(id.name);
        $('.img-user').attr('src', imagendefault);
        $('.img-user-post-new').attr('src', imagendefault);
        $('.img-user-profile').attr('src', imagendefault);
        $('.user-name-post').text(id.name);
        $('.email-profile  p').text(id.email);
        $('.poster').css('background-image', 'url("' + id.posterPhoto + '")');
        $('.background-poster').css('background-image', 'url("' + id.posterPhoto + '")');
      }
    }
  }, function(objetoError) {
    console.log('Error de lectura:' + objetoError.code);
  });

  // FUnciónn Limpiar TextArea Post del modal 
  function clear() {
    $('.modalClear .post-user').val('');
  }

  // Función postear 
  var referencePost = database.ref('post');

  btnPost.on('click', function() {
    reference.on('value', function(datos) {
      users = datos.val();
      var arrayUser = Object.values(users);
      for (i = 0; i < arrayUser.length; i++) {
        if (arrayUser[i].email === localStorage.email) {
          id = arrayUser[i];
          nameUserLogin = id.name;
        }
      }

      if (!imagen) {
        imagen = 'NONE';
      }


      var textPost = $('#post-user').val();
      var boxPost = $('.container-post');
      if (textPost) {
        referencePost.push({
          email: localStorage.email,
          name: id.name,
          text: textPost,
      

        }, function() {
          console.log('Se registro correctamente');
        });
      } else {
        btnPost.attr('disabled', false);
      }
      clear();
    });
  });

  referencePost.on('value', function(datos) {
    $('.post-new').remove();
    post = datos.val();

    // Recorremos todos los post y los mostramos
    $.each(post, function(indice, valor) {
      $('.container-post').append('<div class="border-post post-new"><div class="box-img-post"><figure class="border-photo-post-user" >' +
        '<img class="img-user-post" src=' + imagendefault + '>' +
        '</figure>' +
        '<p class="user-name-post">' + valor.name + '</p></div><div class=""><p>' + valor.text + '</p></div> <div class="comment"><i class="small material-icons align">favorite_border</i><i class="small material-icons align">comment</i></div></div>');
    });
  }, function(objetoError) {
    console.log('Error de lectura:' + objetoError.code);
  });

  reference.on('value', function(datos) {
    $('.post-new').remove();
    users = datos.val();

    // Recorremos todos los post y los mostramos
    $.each(users, function(indice, valor) {
      $('.contacts').append('<div class="border-post-contact name-contact"><img class="img-user-contact inline-block" src=' + imagendefault + ' ><p class="inline-block ">' + valor.name + '</p><i class="small material-icons star">star</i></div>');
    });
  }, function(objetoError) {
    console.log('Error de lectura:' + objetoError.code);
  });
});
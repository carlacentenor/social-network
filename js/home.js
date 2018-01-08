$(document).ready(function() {
  // acción de menu
  $('.button-collapse').sideNav();
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();

  // variables de selectores
  var btnPost = $('.btn-post');
  
  // Variables de data de Users
  var imgUser, nameUser, emailUser, ageUser, contactsUser, postUser; 
  // Cargar data de Usuario
  for (i = 0 ; i < dataUsers.length; i++) {
    if (dataUsers[i].email === localStorage.email) {
      nameUser = dataUsers[i].name;
      imgUser = dataUsers[i].photoUser;
      emailUser = dataUsers[i].email;
      ageUser = dataUsers[i].age;
      contactsUser = dataUsers[i].contacts;

      $('.user-name').text(nameUser);
      $('.img-user').attr('src', imgUser);
      // función lista de contactos
      for (j = 0 ; j < contactsUser.length ;j++) {
        $('.contacts').append('<div><p>' + dataUsers[i].contacts[j] + '</p></div>');
      }
    }
  }


  // FUnciónn Limpiar TextArea Post del modal 
  function clear() {
    $('.modalClear .post-user').val('');
  }

  // Función postear 
  
  btnPost.on('click', function() {
    var textPost = $('#post-user').val();
    var boxPost = $('.container-post');
    if (textPost) {
      btnPost.attr('disabled', false);
      boxPost.append('<div class="box-post-new"><div class="box-img-post"><figure class="border-photo-post-user" >' +
    '<img class="img-user-post" src=' + imgUser + '>' +
  '</figure>' +
  '<p class="user-name-post">' + nameUser + '</p></div><div class="border-post"><p>' + textPost + '</p></div></div>');
    } else {
      btnPost.attr('disabled', false);
    }
    clear();
  });
});

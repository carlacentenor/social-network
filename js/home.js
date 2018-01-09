$(document).ready(function() {
  // acción de menu
  $('.button-collapse').sideNav();
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();

  // variables de selectores
  var btnPost = $('.btn-post');
  
  // Variables de data de Users
  var imgUser, nameUser, emailUser, ageUser, contactsUser, postUser, posterUser; 
  // Cargar data de Usuario
  for (i = 0 ; i < dataUsers[0].length; i++) {
    if (dataUsers[0][i].email === localStorage.email) {
      nameUser = dataUsers[0][i].name;
      imgUser = dataUsers[0][i].photoUser;
      posterUser = dataUsers[0][i].poster;
      emailUser = dataUsers[0][i].email;
      ageUser = dataUsers[0][i].age;
      contactsUser = dataUsers[0][i].contacts;

      $('.user-name').text(nameUser);
      $('.user-name-post-new').text(nameUser);
      $('.img-user').attr('src', imgUser);
      $('.img-user-post-new').attr('src', imgUser);
      $('.img-user-profile').attr('src', imgUser);
      $('.poster').css('background-image', 'url("' + posterUser + '")');
      $('.background-poster').css('background-image', 'url("' + posterUser + '")');
      $('.email-profile  p').text(emailUser);
      $('.age-profile  p').text(ageUser);
      $('.contacts-profile p').text(contactsUser.length);
   
      for (s = 0; s < dataUsers[1].length ;s++) {
        for (m = 0 ; m < dataUsers[0].length;m++) {
          for (p = 0 ; p < contactsUser.length ;p++) {
            if (dataUsers[1][s].email === dataUsers[0][m].email && contactsUser[p] === dataUsers[0][m].email) {
              var imgUserFriends = dataUsers[0][m].photoUser;
              var nameUserFriends = dataUsers[0][m].name;
              var textPostFriend = dataUsers[1][s].text;
              $('.container-post').append('<div class="border-post"><div class="box-img-post"><figure class="border-photo-post-user" >' +
          '<img class="img-user-post" src=' + imgUserFriends + '>' +
        '</figure>' +
        '<p class="user-name-post">' + nameUserFriends + '</p></div><div class=""><p>' + textPostFriend + '</p></div><div class="comment"><i class="small material-icons align">favorite_border</i><i class="small material-icons align">comment</i></div></div>'); 
            }
          }
        }
      }
     
      // función lista de contactos
      for (j = 0 ; j < contactsUser.length ;j++) {
        for (l = 0 ; l < dataUsers[0].length;l++) {
          if (contactsUser[j] === dataUsers[0][l].email) {
            $('.contacts').append('<div class="border-post-contact name-contact"><img class="img-user-contact inline-block" src=' + dataUsers[0][l].photoUser + ' ><p class="inline-block ">' + dataUsers[0][l].name + '</p><i class="small material-icons star">star</i></div>');
          }
        }
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
      dataUsers[1].push({email: emailUser,
        text: textPost });
      console.log(dataUsers[1]);
      btnPost.attr('disabled', false);
      boxPost.append('<div class="border-post"><div class="box-img-post"><figure class="border-photo-post-user" >' +
    '<img class="img-user-post" src=' + imgUser + '>' +
  '</figure>' +
  '<p class="user-name-post">' + nameUser + '</p></div><div class=""><p>' + textPost + '</p></div><div class="comment"><i class="small material-icons align">favorite_border</i><i class="small material-icons align">comment</i></div> </div>');
    } else {
      btnPost.attr('disabled', false);
    }
    clear();
  });
});

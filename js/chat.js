$(document).ready(function() {
  // variables
  var containerChat = $('#chat');
  var btnSend = $('#send');
  var inputText = $('#text-chat');
  var database = firebase.database();
  var referenceChat = database.ref('chat');
  var reference = database.ref('users');

  btnSend.click(function() {
    
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
          if (inputText.val()) {
            referenceChat.push({

              name: id.name,
              text: inputText.val(),
              photoPost: id.profilePhoto,


            }, function() {
              console.log('Mensaje Enviado');
              inputText.val('');
              $('#chat').scrollTop = $('#chat').scrollHeight;
            });
          }
        });
      }
    });
    
   
  });

  
  referenceChat.on('value', function(datos) {
    $('.box-message').remove();

    var message = datos.val();


    $.each(message, function(indice, valor) {
      containerChat.append('<div class="box-message"><p>' + valor.name + '</p><p class="text-message">' + valor.text + '</p></div>');
    });
  }, function(objetoError) {
    console.log('Error de lectura:' + objetoError.code);
  });
});
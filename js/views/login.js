if(Cookies.get('sesion') != null)
  window.location.replace("./index.html");

$('document').ready(function() {

  $('#btn_login').on('click', function() {

    var status = 0;
    $('.error').remove();
    status += validar($('#usuario'));
    status += validar($('#contrasena'));

    if(status > 0)
      return 0;

    var usuario = $('#usuario').val();
    var contrasena = md5($('#contrasena').val());

    var find = $.ajax({url: `http://localhost:3000/usuario/${usuario}/${contrasena}`, method: `get`});
    find.done(function(data) {
      if(!$.isEmptyObject(data)) {
        var sesion = {
          usuario: data[0].usuario,
          contrasena: data[0].contrasena,
          permisos: data[0].permisos
        }
        Cookies.set('sesion', sesion);
        window.location.replace('./index.html');
      } else {
        alertify.error("Usuario y contraseña no coinciden.")
      }
    });
  });


});

if(Cookies.get('sesion') == null || Cookies.getJSON('sesion')["permisos"] == false)
  window.location.replace("../index.html");

$('document').ready(function() {

  $('#usuario').on('blur', function() {
    $('#usuario').val($('#usuario').val().toLowerCase());
  });


  $('#btn_crear').on('click', function() {
    var status = 0;
    $('.error').remove();
    status += validar($('#usuario'));
    status += validar($('#contrasena'));

    if(status > 0) {
      return 0;
    }

    var usuario = {
      usuario: $('#usuario').val(),
      contrasena: md5($('#contrasena').val()),
      permisos: $('#permisos').is(':checked')
    }

    var crearUsuario = $.ajax({url: `http://localhost:3000/usuario`, method: `post`, data: usuario});
    crearUsuario.done(function(data) {
      if(data.constraint === "usuario_usuario_key")
        alertify.alert("Academic", `El usuario "${usuario.usuario}" ya existe. \nIntente otro usuario.`, function(){
          alertify.error('No se creo el usuario!');
        });
      else
        alertify.alert("Academic", `El usuario "${usuario.usuario}" ha sido creado!`, function(){
          alertify.message('OK');
        });
    });
    crearUsuario.fail(function() {
      alertify.error('Error al crear al usuario');
    });
  });

});

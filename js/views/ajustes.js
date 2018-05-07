if(Cookies.get('sesion') == null)
  window.location.replace("./index.html");

var sesion = Cookies.getJSON('sesion');

$('document').ready(function() {

  // Seccion de informacion
  var nombre = $('#nombre');
  var correo = $('#correo');
  var apellidoP = $('#apellidoP');
  var apellidoM = $('#apellidoM');
  var curriculum = $('#curriculum');


  $.ajax({url: `http://localhost:3000/usuario/${sesion.usuario}`,method: `get`})
  .done(function(data) {
    rednerInfo(data[0]);
  });

  function rednerInfo(data) {
    nombre.val(data.nombre);
    correo.val(data.correo);
    apellidoP.val(data.apellidop);
    apellidoM.val(data.apellidom);
    curriculum.val(data.curriculum);
  }

  $('#btn_informacion').on('click', function() {

    $('.error').remove();
    var status = 0;
    status += validar(nombre);
    status += validar(correo);
    status += validar(apellidoP);
    status += validar(apellidoM);
    status += validar(curriculum);

    if(status > 0)
      return 0;

    var objeto = {
      nombre: nombre.val(),
      correo: correo.val(),
      apellidoP: apellidoP.val(),
      apellidoM: apellidoM.val(),
      curriculum: curriculum.val()
    }

    $.ajax({url: `http://localhost:3000/usuario/${sesion.usuario}`,data: objeto ,method: `put`})
    .done(function(data) {
      alertify.alert("Academic", "Su información ha sido actualizada.", function(){
        alertify.message('OK');
      });
    });
  });

  // Seccion de cambio de contrasena

  var contrasena = $('#contrasena');
  var contrasenaVerificar = $('#contrasenaVerificar');

  $('#btn_contrasena').on('click', function() {

    $('.error').remove();
    var status = 0;
    status += validar(contrasena);
    status += validar(contrasenaVerificar);

    if(status > 0)
      return 0;

    if(contrasena.val() !== contrasenaVerificar.val()) {
      alertify.error('Las contraseñas no coinciden!');
      return 0;
    }

    var objeto = {
      contrasena: md5(contrasena.val())
    }

    $.ajax({url: `http://localhost:3000/usuario/${sesion.usuario}/contrasena`,data: objeto ,method: `put`})
    .done(function(data) {
      contrasena.val('');
      contrasenaVerificar.val('');
      alertify.alert("Academic", "Su contraseña ha sido actualizada.", function(){
        alertify.message('OK');
      });
    });
  });

  // Actualizar Foto
  var htmlFoto = ``;
  htmlFoto += `<form id="fotoForm" action="http://localhost:3000/usuario/${sesion.usuario}/foto" method="post" enctype="multipart/form-data" target="_blank">`;
    htmlFoto += `<p class="h3">Imagen de Perfil</p>`;
    htmlFoto += `<div class="form-group">`;
      htmlFoto += `<input type="file" class="form-control-file" id="foto" name="foto" data-type="foto">`;
    htmlFoto += `</div>`;
    htmlFoto += `<button type="submit" id="btn_foto" class="btn btn-primary">Actualizar</button>`;
  htmlFoto += `</form>`;

  $('#formFoto').append(htmlFoto);
});

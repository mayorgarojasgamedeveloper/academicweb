if(Cookies.get('sesion') == null)
  window.location.replace("./index.html");

var sesion = Cookies.getJSON('sesion');

$('document').ready(function() {
  $.ajax({url: `http://localhost:3000/usuario/${sesion.usuario}`,method: `get`})
  .done(function(data) {
    render(data[0]);
  });



  function render(data) {
    if(data.foto === 'default'){
      $('#foto').attr('src', `../img/perfil.png`);
    }else{
      $('#foto').attr('src', `../img/usuarios/${data.foto}`);
    }
    $('#usuario').html(data.usuario.toUpperCase());
    $('#nombre').html(data.nombre);
    $('#apellidos').html(data.apellidop + ' ' + data.apellidom);
    $('#correo').html(data.correo);
    $('#curriculum').html(data.curriculum);
  }
});

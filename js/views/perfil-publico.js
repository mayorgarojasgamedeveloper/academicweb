function getQueryVariable(variable)
{
   var query = window.location.search.substring(1);
   var vars = query.split("&");
   for (var i=0;i<vars.length;i++) {
       var pair = vars[i].split("=");
       if(pair[0] == variable){return pair[1];}
   }
   return(false);
}

$('document').ready(function() {
  $.ajax({url: `http://localhost:3000/usuario/${getQueryVariable("usuario")}`,method: `get`})
  .done(function(data) {
    if($.isEmptyObject(data))
    {
      alertify.alert("Academic", `El usaurio: "${getQueryVariable("usuario")}" no existe en la plataforma.`, function() {
        window.location.replace("./index.html");
      });
    }
    else {
      render(data[0]);
    }
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

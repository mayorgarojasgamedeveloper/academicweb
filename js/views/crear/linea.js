var sesion = Cookies.getJSON('sesion');

$('document').ready(function() {
  $('#btn_subir').on('click', function() {

    $('.error').remove();
    var status = 0;
    status += validar($('#linea'));

    if(status > 0)
      return 0;

    var objeto = {
      usuario: sesion["usuario"],
      tipo: 1,
      linea: $('#linea').val()
    }

    $.ajax({url: `http://localhost:3000/lineainovadora`, data: objeto, method: `post`})
    .done(function(data) {
      alertify.alert(`Academic`, `La Linea "${objeto["linea"]}" ha sido subida exitosamente.`, function(){
        alertify.message('OK');
      });
    });
  });
});

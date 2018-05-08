if(Cookies.get('sesion') == null)
  window.location.replace("../index.html");

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

    $('#btn_subir').attr('disabled', true);
    $.ajax({url: `http://localhost:3000/lineainovadora`, data: objeto, method: `post`})
    .done(function(data) {
      crearLog(`Usuario: ${objeto["usuario"]} creo la Linea "${objeto["linea"]}"`, function() {
        alertify.alert(`Academic`, `La Linea "${objeto["linea"]}" ha sido subida exitosamente.`, function(){
          alertify.message('OK');
          $('#btn_subir').attr('disabled', false);
        });
      });

    });
  });
});

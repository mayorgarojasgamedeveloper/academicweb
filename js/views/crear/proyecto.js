if(Cookies.get('sesion') == null)
  window.location.replace("../index.html");

var sesion = Cookies.getJSON('sesion');

$('document').ready(function() {
  $('#btn_subir').on('click', function() {

    $('.error').remove();
    var status = 0;
    status += validar($('#nombre'));
    status += validar($('#fecha_inicio'));
    status += validar($('#fecha_fin'));
    status += validar($('#colaboradores'));
    status += validar($('#instituciones'));

    if(status > 0)
      return 0;

    var objeto = {
      usuario: sesion["usuario"],
      tipo: 3,
      nombre: $('#nombre').val(),
      fecha_inicio: $('#fecha_inicio').val(),
      fecha_fin: $('#fecha_fin').val(),
      colaboradores: $('#colaboradores').val(),
      instituciones: $('#instituciones').val()
    }

    console.log(objeto);

    $('#btn_subir').attr('disabled', true);
    $.ajax({url: `http://localhost:3000/proyecto`, data: objeto, method: `post`})
    .done(function(data) {
      crearLog(`Usuario: ${objeto["usuario"]} creo el reporte "${objeto["nombre"]}"`, function() {
        alertify.alert(`Academic`, `El proyecto "${objeto["nombre"]}" ha sido subido exitosamente.`, function(){
          alertify.message('OK');
          $('#btn_subir').attr('disabled', false);
        });
      });
    });
  });
});

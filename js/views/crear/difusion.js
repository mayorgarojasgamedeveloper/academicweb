var sesion = Cookies.getJSON('sesion');

$('document').ready(function() {

  // CARGAR LINEAS
  $.ajax({url: `http://localhost:3000/lineainovadora`, method: `get`})
  .done(function(data) {
    var html = ``;
    $.each(data, function(index, value) {
      html += `<option value="${value.linea}">${value.linea}</option>`;
    });
    $('#linea').append(html);
  });


  $('#btn_subir').on('click', function() {

    $('.error').remove();
    var status = 0;
    status += validar($('#nombre'));
    status += validar($('#autores'));
    status += validar($('#fecha'));
    status += validar($('#linea'));
    status += validar($('#issn'));
    status += validar($('#nom_revista'));

    if(status > 0)
      return 0;

    var objeto = {
      usuario: sesion["usuario"],
      tipo: 2,
      nombre: $('#nombre').val(),
      autores: $('#autores').val(),
      fecha: $('#fecha').val(),
      linea: $('#linea').val(),
      subtipo: 1,
      issn: $('#issn').val(),
      nom_revista: $('#nom_revista').val()
    }

    console.log(objeto);

    $.ajax({url: `http://localhost:3000/reporte1`, data: objeto, method: `post`})
    .done(function(data) {
      alertify.alert(`Academic`, `El reporte "${objeto["nombre"]}" ha sido subido exitosamente.`, function(){
        alertify.message('OK');
      });
    });
  });
});

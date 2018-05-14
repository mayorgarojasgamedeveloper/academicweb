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


    var d = new Date();


$('document').ready(function() {

  var id = getQueryVariable('id');

  // CARGAR LINEAS
  $.ajax({url: `http://localhost:3000/lineainovadora`, method: `get`})
  .done(function(data) {
    var html = ``;
    $.each(data, function(index, value) {
      html += `<option value="${value.linea}">${value.linea}</option>`;
    });
    $('#linea').append(html);

    $.ajax({url: `http://localhost:3000/reporte3/${id}`, method: `get`})
    .done(function(data) {
      console.log(data);

      var htmlUsuario = `<a href="../perfil-publico.html?usuario=${data[0].usuario}">Usuario: ${data[0].usuario}</a><br><br>`;
      $('#usuario').append(htmlUsuario);
      // Agregar informacion
      $('#nombre').val(data[0].nombre);
      $('#autores').val(data[0].autores);
      $('#fecha').val(data[0].fecha.substr(0,10));
      $('#linea').val(data[0].linea);
      $('#linea').attr('disabled', true);
      $('#no_registro').val(data[0].no_registro);


      if(Cookies.get('sesion') != null) {
        if(Cookies.getJSON('sesion')['usuario'] === data[0].usuario || Cookies.getJSON('sesion')['permisos'] === true) {
          // Dibujar menu
          menu_vista();
        }
      }
    });
  });


  $('#menu').on('click', '#btn_eliminar', function() {
    alertify.confirm("Academic", "Seguro que quiere borrar este reporte?",
    function(){
      $.ajax({url: `http://localhost:3000/reporte3`, data: {id: id}, method: `delete`})
      .done(function(data) {
        crearLog(`Usuario: ${Cookies.getJSON('sesion')['usuario']} borro el reporte "${$('#nombre').val()}"`, function() {
          window.location.replace("../index.html");
        });
      });
    },
    function(){
      alertify.error('Acción Cancelada');
    });
  });

  $('#menu').on('click', '#btn_editar', function() {
    alertify.success('Entrando al modo de edicion.');
    // hacer editable

    $('input').removeClass( "form-control-plaintext" ).addClass( "form-control" );
    $('input').attr('readonly', false);
    $('select').removeClass( "form-control-plaintext" ).addClass( "form-control" );
    $('select').attr('disabled', false);

    menu_editar();
  });

  $('#menu').on('click', '#btn_guardar', function() {

    $('.error').remove();
    var status = 0;
    status += validar($('#nombre'));
    status += validar($('#autores'));
    status += validar($('#fecha'));
    status += validar($('#linea'));
    status += validar($('#no_registro'));

    if(status > 0)
      return 0;

    var objeto = {
      nombre: $('#nombre').val(),
      autores: $('#autores').val(),
      fecha: $('#fecha').val(),
      linea: $('#linea').val(),
      no_registro: $('#no_registro').val()
    }

    $.ajax({url: `http://localhost:3000/reporte3/${id}`, data: objeto, method: `put`})
    .done(function(data) {
      alertify.alert(`Academic`, `El Reporte "${objeto["nombre"]}" ha sido editado exitosamente.`, function(){
        location.reload();
      });
    });

  });

  $('#menu').on('click', '#btn_cancelar', function() {
    alertify.confirm("Academic", "No se guardaran los cambios.",
    function(){
      location.reload();
    },
    function(){
      alertify.error('Acción Cancelada');
    });
  });


  function menu_vista() {
    $('#menu').empty();
    var html = ``;
    html += `<button type="button" id="btn_editar" class="btn btn-secondary">Editar</button>`;
    html += `<button type="button" id="btn_eliminar" class="btn btn-secondary">Eliminar</button>`;
    $('#menu').append(html);
  }

  function menu_editar() {
    $('#menu').empty();
    var html = ``;
    html += `<button type="button" id="btn_guardar" class="btn btn-secondary">Guardar</button>`;
    html += `<button type="button" id="btn_cancelar" class="btn btn-secondary">Cancelar</button>`;
    $('#menu').append(html);
  }


  $('#btn_descargar').on('click', function() {
    // You'll need to make your image into a Data URL
    // Use http://dataurl.net/#dataurlmaker
    var imgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAABN2lDQ1BBZG9iZSBSR0IgKDE5OTgpAAAokZWPv0rDUBSHvxtFxaFWCOLgcCdRUGzVwYxJW4ogWKtDkq1JQ5ViEm6uf/oQjm4dXNx9AidHwUHxCXwDxamDQ4QMBYvf9J3fORzOAaNi152GUYbzWKt205Gu58vZF2aYAoBOmKV2q3UAECdxxBjf7wiA10277jTG+38yH6ZKAyNguxtlIYgK0L/SqQYxBMygn2oQD4CpTto1EE9AqZf7G1AKcv8ASsr1fBBfgNlzPR+MOcAMcl8BTB1da4Bakg7UWe9Uy6plWdLuJkEkjweZjs4zuR+HiUoT1dFRF8jvA2AxH2w3HblWtay99X/+PRHX82Vun0cIQCw9F1lBeKEuf1UYO5PrYsdwGQ7vYXpUZLs3cLcBC7dFtlqF8hY8Dn8AwMZP/fNTP8gAAAAJcEhZcwAACxMAAAsTAQCanBgAAATpaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0MiA3OS4xNjA5MjQsIDIwMTcvMDcvMTMtMDE6MDY6MzkgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTA1LTAzVDIzOjAzOjA2LTA1OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOC0wNS0wM1QyMzowNToyMS0wNTowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOC0wNS0wM1QyMzowNToyMS0wNTowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YWVlYmVmMDMtM2Y2Mi0zNjRkLThmM2YtNjg0ZTNhMTUxZTVkIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOmFlZWJlZjAzLTNmNjItMzY0ZC04ZjNmLTY4NGUzYTE1MWU1ZCIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmFlZWJlZjAzLTNmNjItMzY0ZC04ZjNmLTY4NGUzYTE1MWU1ZCI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YWVlYmVmMDMtM2Y2Mi0zNjRkLThmM2YtNjg0ZTNhMTUxZTVkIiBzdEV2dDp3aGVuPSIyMDE4LTA1LTAzVDIzOjAzOjA2LTA1OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlG3FsUAAA+VSURBVHic7d1rjB33Wcfx33/mnL141/csSXxJ4zQJTSUnATdQcGhCioEXFKlVVwIsKnBrXrKIF7zothIIwQuElCYCIbRpQS0LlVCFkBLhZgWiEU4rUSVSXcWR46Yuidexd70X7/3snjO82F3n5Hj37Jk5czkzz/cjWcnunpn/JOv5zTPP/GfGBUEgADZ5WW8AgOwQAIBh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';
    var doc = new jsPDF();

    doc.addImage(imgData, 'PNG', 15, 15, 25, 25);
    doc.setFontSize(30);
    doc.text('Academic.Archives', 45, 35);
    doc.setLineWidth(0.5);
    doc.line(15, 40, 190, 40);

    doc.setFontSize(15);
    doc.text('Prototipo', 15, 60);

    doc.setFontSize(15);
    doc.text('Nombre: ', 15, 80);
    doc.setFontSize(19);
    doc.text($('#nombre').val(), 15, 90);
    doc.setFontSize(15);
    doc.text('Autores: ', 15, 100);
    doc.setFontSize(19);
    doc.text($('#autores').val(), 15, 110);
    doc.setFontSize(15);
    doc.text('Fecha: ', 15, 120);
    doc.setFontSize(19);
    doc.text($('#fecha').val(), 15, 130);
    doc.setFontSize(15);
    doc.text('Linea:', 15, 140);
    doc.setFontSize(19);
    doc.text($('#linea').val(), 15, 150);
    doc.setFontSize(15);
    doc.text('No. de Registro: ', 15, 160);
    doc.setFontSize(19);
    doc.text($('#no_registro').val(), 15, 170);



    var d = new Date();
    doc.setFontSize(10)
    doc.text(d + "", 50, 270);

    doc.save('prototipo.pdf');
  });

});

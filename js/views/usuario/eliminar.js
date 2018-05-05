$('document').ready(function() {

  var listaUsuarios = $.ajax({url: `http://localhost:3000/usuario`, method: `get`});
  listaUsuarios.done(function(data) {
    var html = ``;
    $.each(data, function(index, value) {
      html += `<option value="${value.usuario}">${value.usuario}</option>`;
    });
    $('#usuario').append(html);
  });
  listaUsuarios.fail(function() {
    alertify.error('Error al cargar los usuario.');
  });

  /*Click en eliminar*/
  $('#btn_eliminar').on('click', function() {

    var usuarioAEliminar = {
      usuario: $('#usuario').val()[0]
    };

    // Ver si esta vacion el campo
    if(usuarioAEliminar.usuario == null) {
      alertify.alert("Academic","Seleccione un usuario.");
    } else {
      alertify.confirm("Academic",`Esta seguro que quiere borrar al usuario "${usuarioAEliminar.usuario}"?`,
        function(){
          var eliminarUsuario = $.ajax({url: `http://localhost:3000/usuario`, method: `delete`, data: usuarioAEliminar});
          eliminarUsuario.done(function(data) {
            alertify.success('Ok');
            location.reload();
          });
          eliminarUsuario.fail(function() {
            alertify.error('Error al eliminar un usuario: ' + usuarioAEliminar.usuario);
          });
        },
        function(){
          alertify.error('Cancel');
      });

    }


  });

});

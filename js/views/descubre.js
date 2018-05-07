
$('document').ready(function() {

  cambiarTiposDeOrdenamiento();
  renderReportes();

  $('#btn_buscar').on('click', function() {
    cambiarTiposDeOrdenamiento();
    renderReportes();
  });

  $('#orderBy').on('change', function() {
    renderReportes();
  });

  function cambiarTiposDeOrdenamiento() {
    var tipo = $('#type');
    $('#orderBy').empty();
    var html = ``;
    if(tipo.val() === "linea") {
      html += `<option value="linea">Linea</option>`;
      html += `<option value="usuario">Usuario</option>`;
    } else if(tipo.val() === "produccion") {
      html += `<option value="nombre">Nombre</option>`;
      html += `<option value="usuario">Usuario</option>`;
      html += `<option value="linea">Linea</option>`;
      html += `<option value="fecha">Fecha</option>`;
      html += `<option value="subtipo">Tipo de Produccion</option>`;
    } else if(tipo.val() === "proyectos") {
      html += `<option value="nombre">Nombre</option>`;
      html += `<option value="usuario">Usuario</option>`;
      html += `<option value="fecha_inicio">Fecha de Inicio</option>`;
    } else if(tipo.val() === "direccion") {
      html += `<option value="nombre">Nombre</option>`;
      html += `<option value="usuario">Usuario</option>`;
      html += `<option value="fecha_inicio">Fecha de Inicio</option>`;
    } else if(tipo.val() === "estadia") {
      html += `<option value="nombre">Nombre</option>`;
      html += `<option value="usuario">Usuario</option>`;
      html += `<option value="fecha_inicio">Fecha de Inicio</option>`;
    }
    $('#orderBy').append(html);
  }

  function renderReportes() {

    var tipo = $('#type');
    if(tipo.val() === "linea") {
      $.ajax({url: `http://localhost:3000/lineainovadora`, method: `get`})
      .done(function(data) {
        var ordenarPor = $('#orderBy').val();
        data = data.sort(function (a, b) {
            return a[ordenarPor].localeCompare( b[ordenarPor] );
        });
        rLinea(data);
      });
    }
    else if(tipo.val() === "produccion") {
      $.ajax({url: `http://localhost:3000/reporte1/produccion`, method: `get`})
      .done(function(data) {
        var ordenarPor = $('#orderBy').val();
        console.log(ordenarPor);
        data = data.sort(function (a, b) {
            let _a = a[ordenarPor] + '';
            let _b = b[ordenarPor] + '';
            return _a.localeCompare( _b );
        });
        rProduccion(data);
      });
    }
    else if(tipo.val() === "proyectos") {
      $.ajax({url: `http://localhost:3000/proyecto`, method: `get`})
      .done(function(data) {
        var ordenarPor = $('#orderBy').val();
        console.log(ordenarPor);
        data = data.sort(function (a, b) {
            return a[ordenarPor].localeCompare( b[ordenarPor] );
        });
        rProyectos(data);
      });
    }
    else if(tipo.val() === "direccion") {
      $.ajax({url: `http://localhost:3000/reporte4`, method: `get`})
      .done(function(data) {
        var ordenarPor = $('#orderBy').val();
        console.log(ordenarPor);
        data = data.sort(function (a, b) {
            return a[ordenarPor].localeCompare( b[ordenarPor] );
        });
        rDireccion(data);
      });
    }
    else if(tipo.val() === "estadia") {
      $.ajax({url: `http://localhost:3000/reporte4`, method: `get`})
      .done(function(data) {
        var ordenarPor = $('#orderBy').val();
        console.log(ordenarPor);
        data = data.sort(function (a, b) {
            return a[ordenarPor].localeCompare( b[ordenarPor] );
        });
        rEstadia(data);
      });
    }
  }

  var diccionarioVistas = {
    1: './vista/linea.html?id=',
    3: './vista/proyecto.html?id=',
    4: './vista/direccion.html?id=',
    5: './vista/estadia.html?id='
  }

  function rLinea(data) {
    $('#table').empty();
    var html = ``;
    html += `<thead>`;
    html += `<tr>`;
    html += `<th scope="col">Linea</th>`;
    html += `<th scope="col">Usuario</th>`;
    html += `</tr>`;
    html += `</thead>`;
    html += `<tbody>`;
    $.each(data, function(index, value) {
      if($('#nombre').val().toLowerCase() !== "")
        if(value.linea.toLowerCase().search($('#nombre').val().toLowerCase()) < 0)
          return;

        html += `<tr>`;
          html += `<th scope="row"><a href="${diccionarioVistas[value.tipo]}${value.id}">${value.linea}</a></th>`;
          html += `<td>${value.usuario}</td>`;
        html += `</tr>`;
    });
    html += `</tbody>`;
    $('#table').append(html);
  }

  var diccionarioSubtipo = {
    1: `Artículos de difusión y divulgación`,
    2: `Artículo arbitrado`,
    3: `Artículo en revista indexada`,
    4: `Capítulo del libro`,
    5: `Informe técnico`,
    6: `Libro`,
    7: `Manuales de operación`,
    8: `Memorias`,
    9: `Productividad innovadora`,
    10: `Prototipo`
  }

  var diccionarioVistasProduccion = {
    1: `./vista/difusion.html?id=`,
    2: `./vista/arbitrado.html?id=`,
    3: `./vista/revista.html?id=`,
    4: `./vista/capitulo.html?id=`,
    5: `./vista/informe.html?id=`,
    6: `./vista/libro.html?id=`,
    7: `./vista/manual.html?id=`,
    8: `./vista/memorias.html?id=`,
    9: `./vista/productividad.html?id=`,
    10: `./vista/prototipo.html?id=`
  }

  function rProduccion(data) {
    $('#table').empty();
    var html = ``;
    html += `<thead>`;
    html += `<tr>`;
    html += `<th scope="col">Nombre</th>`;
    html += `<th scope="col">Linea</th>`;
    html += `<th scope="col">Usuario</th>`;
    html += `<th scope="col">Fecha</th>`;
    html += `<th scope="col">Tipo</th>`;
    html += `</tr>`;
    html += `</thead>`;
    html += `<tbody>`;
    $.each(data, function(index, value) {
      if($('#nombre').val().toLowerCase() !== "")
        if(value.nombre.toLowerCase().search($('#nombre').val().toLowerCase()) < 0)
          return;

        html += `<tr>`;
          html += `<th scope="row"><a href="${diccionarioVistasProduccion[value.subtipo]}${value.id}">${value.nombre}</a></th>`;
          html += `<td>${value.linea}</td>`;
          html += `<td>${value.usuario}</td>`;
          html += `<td>${value.fecha.substr(0, 10)}</td>`;
          html += `<td>${diccionarioSubtipo[value.subtipo]}</td>`;
        html += `</tr>`;
    });
    html += `</tbody>`;
    $('#table').append(html);
  }

  function rProyectos(data) {
    $('#table').empty();
    var html = ``;
    html += `<thead>`;
    html += `<tr>`;
    html += `<th scope="col">Nombre</th>`;
    html += `<th scope="col">Usuario</th>`;
    html += `<th scope="col">Fecha de Inicio</th>`;
    html += `</tr>`;
    html += `</thead>`;
    html += `<tbody>`;
    $.each(data, function(index, value) {
      if($('#nombre').val().toLowerCase() !== "")
        if(value.nombre.toLowerCase().search($('#nombre').val().toLowerCase()) < 0)
          return;

        html += `<tr>`;
          html += `<th scope="row"><a href="${diccionarioVistas[value.tipo]}${value.id}">${value.nombre}</a></th>`;
          html += `<td>${value.usuario}</td>`;
          html += `<td>${value.fecha_inicio.substr(0, 10)}</td>`;
        html += `</tr>`;
    });
    html += `</tbody>`;
    $('#table').append(html);
  }

  function rDireccion(data) {
    $('#table').empty();
    var html = ``;
    html += `<thead>`;
    html += `<tr>`;
    html += `<th scope="col">Nombre</th>`;
    html += `<th scope="col">Usuario</th>`;
    html += `<th scope="col">Fecha de Inicio</th>`;
    html += `</tr>`;
    html += `</thead>`;
    html += `<tbody>`;
    $.each(data, function(index, value) {

      if(value.tipo !== 4) return;

      if($('#nombre').val().toLowerCase() !== "")
        if(value.nombre.toLowerCase().search($('#nombre').val().toLowerCase()) < 0)
          return;

        html += `<tr>`;
          html += `<th scope="row"><a href="${diccionarioVistas[value.tipo]}${value.id}">${value.nombre}</a></th>`;
          html += `<td>${value.usuario}</td>`;
          html += `<td>${value.fecha_inicio.substr(0, 10)}</td>`;
        html += `</tr>`;
    });
    html += `</tbody>`;
    $('#table').append(html);
  }

  function rEstadia(data) {
    $('#table').empty();
    var html = ``;
    html += `<thead>`;
    html += `<tr>`;
    html += `<th scope="col">Nombre</th>`;
    html += `<th scope="col">Usuario</th>`;
    html += `<th scope="col">Fecha de Inicio</th>`;
    html += `</tr>`;
    html += `</thead>`;
    html += `<tbody>`;
    $.each(data, function(index, value) {

      if(value.tipo !== 5) return;


      if($('#nombre').val().toLowerCase() !== "")
        if(value.nombre.toLowerCase().search($('#nombre').val().toLowerCase()) < 0)
          return;

        html += `<tr>`;
          html += `<th scope="row"><a href="${diccionarioVistas[value.tipo]}${value.id}">${value.nombre}</a></th>`;
          html += `<td>${value.usuario}</td>`;
          html += `<td>${value.fecha_inicio.substr(0, 10)}</td>`;
        html += `</tr>`;
    });
    html += `</tbody>`;
    $('#table').append(html);
  }
});

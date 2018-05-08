function crearLog(accion, cb) {

// Local
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();
  var log = {ip: `127.0.0.1`, accion: accion, fecha: yyyy+'-'+mm+'-'+dd };
  $.ajax({url: `http://localhost:3000/log`,data: log ,method: `post`})
  .done(function(data) {
    cb();
  })
  .fail(function() {
    cb();
  });
}
// Linea
  /*
  $.getJSON("http://jsonip.com/?callback=?", function (data) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    var log = {ip: data.ip, accion: accion, fecha: yyyy+'-'+mm+'-'+dd };
    $.ajax({url: `http://localhost:3000/log`,data: log ,method: `post`})
    .done(function(data) {
      cb();
    });
  });
}
*/

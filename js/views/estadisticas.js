if(Cookies.get('sesion') == null && Cookies.getJSON('sesion')['permisos'] === true)
  window.location.replace("./index.html");

$('document').ready(function() {


  $.ajax({url: `http://localhost:3000/lineainovadora/estadisticas`, method: `get`})
  .done(function(data) {
    var chart1 = $('#Chart1')
    var myChart1 = new Chart(chart1, {
      type: 'bar',
      data: {
        labels: [
          "Línea",
          "Producción",
          "Proyectos",
          "Dirección",
          "Estadía"],
          datasets: [{
            label: 'Tipos de Reportes',
            data: [data[0].linea, data[0].produccion, data[0].proyecto, data[0].direccion, data[0].estadia],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ]
          }]
        },
        options: {
          responsive: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:true
              }
            }]
          }
        }
      });
  });

  $.ajax({url: `http://localhost:3000/lineainovadora/estadisticasProduccion`, method: `get`})
  .done(function(data) {
    var chart2 = $('#Chart2')
    var myChart2 = new Chart(chart2, {
      type: 'bar',
      data: {
        labels: [
          "Difusión y Divulgación",
          "Arbitrado",
          "Revista Indexada",
          "Capítulo del libro",
          "Libro",
          "Memorias",
          "Informe Técnico",
          "Manuales",
          "Productividad",
          "Prototipo"
        ],
        datasets: [{
          label: 'Producción Académica',
          data: [data[0].difusion,data[0].arbitrado,data[0].revista,data[0].capitulo,data[0].libro,data[0].memoria,data[0].informe,data[0].manuales,data[0].productividad,data[0].prototipo],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ]
        }]
      },
      options: {
        responsive: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
    });
  });

  $.ajax({url: `http://localhost:3000/lineainovadora/estadisticasUsuarios`, method: `get`})
  .done(function(data) {
    var chart3 = $('#Chart3')
    var myChart3 = new Chart(chart3, {
      type: 'doughnut',
      data: {
        labels: [
          "Académicos",
          "Superusuarios"],
          datasets: [{
            label: 'Tipos de usuarios',
            data: [data[0].academicos, data[0].superusuarios],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ]
          }]
        },
        options: {
          responsive: false
        }
      });
  });

  $('#descargar').on('click', function() {



  	//creates PDF from img
  	var doc = new jsPDF('landscape');

    // Chart 1
    var canvas = document.querySelector('#Chart1');
    var canvasImg = canvas.toDataURL("image/png", 1.0);
  	doc.setFontSize(20);
  	doc.text(15, 15, "Tipos de reportes");
  	doc.addImage(canvasImg, 'PNG', 10, 15, 280, 150 );

    doc.addPage();
    // Chart 2
    var canvas2 = document.querySelector('#Chart2');
    var canvasImg2 = canvas2.toDataURL("image/png", 1.0);
  	doc.setFontSize(20);
  	doc.text(15, 15, "Producción Académica");
  	doc.addImage(canvasImg2, 'PNG', 10, 15, 280, 150 );

    doc.addPage();
    // Chart 2
    var canvas3 = document.querySelector('#Chart3');
    var canvasImg3 = canvas3.toDataURL("image/png", 1.0);
  	doc.setFontSize(20);
  	doc.text(15, 15, "Tipos de reportes");
  	doc.addImage(canvasImg3, 'PNG', 10, 15, 280, 150 );

  	doc.save(Cookies.getJSON('sesion')['usuario']+'.pdf');



  });


});

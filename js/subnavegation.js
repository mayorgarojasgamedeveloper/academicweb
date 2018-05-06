$('document').ready(function() {

  var html = ``;
  html += `<nav class="navbar navbar-expand-lg navbar-light bg-light">`;
  html += `  <a class="navbar-brand" href="../index.html">`;
  html += `    <img src="../../img/school.png" width="30" height="30" alt="">`;
  html += `  </a>`;
  html += `  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">`;
  html += `  <span class="navbar-toggler-icon"></span>`;
  html += `  </button>`;
  html += `  <div class="collapse navbar-collapse" id="navbarSupportedContent">`;
  html += `    <ul class="navbar-nav">`;
  html += `      <li class="nav-item">`;
  html += `        <a class="nav-link" href="../index.html">Inicio</span></a>`;
  html += `      </li>`;
  html += `      <li class="nav-item">`;
  html += `        <a class="nav-link" href="../descubre.html">Descubre</a>`;
  html += `      </li>`;
  html += `      <li class="nav-item">`;
  html += `        <a class="nav-link" href="../contacto.html">Contacto</a>`;
  html += `      </li>`;

  if(Cookies.getJSON('sesion') != null) {
    html += `      <li class="nav-item">`;
    html += `        <a class="nav-link" href="../carpeta.html">Carpeta</a>`;
    html += `      </li>`;
    html += `      <li class="nav-item dropdown">`;
    html += `        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">`;
    html += `          Crear`;
    html += `        </a>`;
    html += `        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">`;
    html += `          <a class="dropdown-item" href="../crear/linea.html">Línea innovadora de investigación aplicada al desarrollo tecnológico</a>`;
    html += `          <a class="dropdown-item" href="../crear/produccion.html">Producción académica</a>`;
    html += `          <a class="dropdown-item" href="../crear/proyecto.html">Proyectos de investigación aplicada y proyectos tecnológicos</a>`;
    html += `          <a class="dropdown-item" href="../crear/direccion.html">Dirección Individualizada</a>`;
    html += `          <a class="dropdown-item" href="../crear/estadia.html">Estadía en empresas</a>`;
    html += `        </div>`;
    html += `      </li>`;
    if(Cookies.getJSON('sesion')["permisos"]) {
      html += `      <li class="nav-item dropdown">`;
      html += `        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">`;
      html += `          Usuarios`;
      html += `        </a>`;
      html += `        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">`;
      html += `          <a class="dropdown-item" href="../usuario/crear.html">Crear</a>`;
      html += `          <a class="dropdown-item" href="../usuario/eliminar.html">Elimiar</a>`;
      html += `        </div>`;
      html += `      </li>`;
    }
  }

  html += `    </ul>`;
  html += `  </div>`;
  html += `  <ul class="navbar-nav">`;

  if(Cookies.getJSON('sesion') != null) {
    html += `    <li class="nav-item dropdown">`;
    html += `      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">`;
    html += `        ${Cookies.getJSON('sesion')["usuario"].toUpperCase()}`;
    html += `      </a>`;
    html += `      <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">`;
    html += `        <a class="dropdown-item" href="../perfil.html">Perfil</a>`;
    html += `        <a class="dropdown-item" href="../ajustes.html">Ajustes</a>`;
    html += `        <a class="dropdown-item" href="#" id="cerrar">Cerrar Sesion</a>`;
    html += `      </div>`;
    html += `    </li>`;
  } else {
    html += `      <li class="nav-item">`;
    html += `        <a class="nav-link" href="../login.html">Iniciar Sesión</a>`;
    html += `      </li>`;
  }

  html += `  </ul>`;
  html += `</nav>`;


  $('#navegation').append(html);

  $('#navegation').on('click', '#cerrar', function(){
    Cookies.remove('sesion');
    window.location.replace('../index.html');
  });

});

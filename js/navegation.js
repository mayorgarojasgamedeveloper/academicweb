$('document').ready(function() {

  var html = ``;
  html += `<nav class="navbar navbar-expand-lg navbar-light bg-light">`;
  html += `  <a class="navbar-brand" href="./index.html">`;
  html += `    <img src="../img/school.png" width="30" height="30" alt="">`;
  html += `  </a>`;
  html += `  <div class="collapse navbar-collapse" id="navbarNavDropdown">`;
  html += `    <ul class="navbar-nav">`;
  html += `      <li class="nav-item">`;
  html += `        <a class="nav-link" href="./index.html">Inicio</span></a>`;
  html += `      </li>`;
  html += `      <li class="nav-item">`;
  html += `        <a class="nav-link" href="./descubre.html">Descubre</a>`;
  html += `      </li>`;
  html += `      <li class="nav-item">`;
  html += `        <a class="nav-link" href="./contacto.html">Contacto</a>`;
  html += `      </li>`;
  html += `      <li class="nav-item">`;
  html += `        <a class="nav-link" href="./carpeta.html">Carpeta</a>`;
  html += `      </li>`;
  html += `    </ul>`;
  html += `  </div>`;
  html += `  <ul class="navbar-nav">`;
  html += `    <li class="nav-item dropdown">`;
  html += `      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">`;
  html += `        FERNANDO`;
  html += `      </a>`;
  html += `      <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">`;
  html += `        <a class="dropdown-item" href="./perfil.html">Perfil</a>`;
  html += `        <a class="dropdown-item" href="./ajustes.html">Ajustes</a>`;
  html += `        <a class="dropdown-item" href="#" id="cerrar">Cerrar Sesion</a>`;
  html += `      </div>`;
  html += `    </li>`;
  html += `  </ul>`;
  html += `</nav>`;


  $('#navegation').append(html);

});

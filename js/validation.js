var regex = {
  "usuario": /^[a-z0-9_-]{3,16}$/,
  "contrasena": /^[a-zA-Z0-9_-]{6,18}$/,
  "correo": /\S+@\S+\.\S+/,
  "nombre": /^[a-zA-Z0-9., ]{3,40}$/,
  "nombreCompleto": /^[a-zA-Z0-9., ]{3,80}$/,
  "nombres": /^[a-zA-Z0-9,. ]{3,200}$/,
  "curriculum": /^[a-zA-Z0-9,. !-/]{3,200}$/,
  "foto": /\.(jpg|png)\b/,
  "fecha": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/
};

var regexErrors = {
  "usuario": "El nombre usuario puede tener solo letras y numeros (3, 16).",
  "contrasena": "La contraseña puede tener solo letras y numeros (6, 18).",
  "correo": "El formato del correo es invalido.",
  "nombre": "El campo debe tener entre 3 y 40 letras.",
  "nombreCompleto": "El campo debe tener entre 3 y 80 letras.",
  "nombres": "El campo debe tener entre 3 y 200 letras.",
  "curriculum": "El campo debe tener entre 3 y 400 letras.",
  "foto": "No es el formato correcto.",
  "fecha": "Fecha incorrecta."
};

function error(element, errorMsg) {
  var html = `<p class="error text-danger">${errorMsg}</p>`;
  $(html).insertAfter(element);
}

function validar(element) {
  // Preparacion
  var dataType = element.data('type');
  var reg = new RegExp(regex[dataType]);
  var val = element.val();

  // Si es un input
  if(element.is('input')) {
    //console.log(dataType +"|"+val+": "+reg.test(val));
    if(!reg.test(val)) {
      error(element, regexErrors[dataType]);
      return 1;
    }
  }
  // Si es un select
  else if (element.is('select')){
    //alert('select');
    if(val === '0') {
      error(element, 'Seleccione una opcion.');
      return 1;
    }
  }
  // Si es un text area
  else if (element.is('textarea')){
    //alert('textarea');
    if(!reg.test(val)) {
      console.log(val);
      error(element, regexErrors[dataType]);
      return 1;
    }
  }
  return 0;
}

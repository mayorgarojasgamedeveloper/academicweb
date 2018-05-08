$('#btn_enviar').on('click', function() {

  $('.error').remove();
  var status = 0;

  status += validar($('#email'));
  status += validar($('#nombre'));
  status += validar($('#telefono'));
  status += validar($('#mensaje'));

  if(status > 0)
    return 0;

  
});

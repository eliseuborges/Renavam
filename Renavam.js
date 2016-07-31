var Renavam = Renavam || {};
    
/**
* Função para validar sequencia de digitos de Renavam
*
* Função baseada em uma classe java retirada desse link
* @link http://blog.victorjabur.com/2010/05/28/renavam_veiculos_java/ 
* @link http://www.denatran.gov.br/download/Portarias/2013/PORTARIA%20%2027%20-%2013.pdf
* @param {String|int} renavam Sequencia de digitos do renavam
* @return {Boolean}
*/
Renavam.valida = function( renavam ){

    // Pegando como exemplo o renavam = 639884962
    // Completa com zeros a esquerda se for no padrao antigo de 9 digitos
    // renavam = 00639884962
    renavam = str_pad(renavam, 11, "0", 'STR_PAD_LEFT');
    
    // Valida se possui 11 digitos pos formatacao
    if( !renavam.match("[0-9]{11}") ){
        return false;
    }

    // Remove o digito (11 posicao)
    var renavamSemDigito = renavam.substring(0, 10);
    
    
    // Inverte os caracteres (reverso)
    var renavamReversoSemDigito = renavamSemDigito.split("").reverse().join("");
    

    // Multiplica as strings reversas do renavam pelos numeros multiplicadores
    // Exemplo: renavam reverso sem digito = 69488936
    // 6, 9, 4, 8, 8, 9, 3, 6
    // * * * * * * * *
    // 2, 3, 4, 5, 6, 7, 8, 9 (numeros multiplicadores - sempre os mesmos [fixo])
    // 12 + 27 + 16 + 40 + 48 + 63 + 24 + 54
    // soma = 284
    
    var soma = 0;
    var multiplicador = 2;
    for (var i=0; i<10; i++){
        var algarismo = renavamReversoSemDigito.substring(i, i+1);
        soma += algarismo * multiplicador;
        
        if( multiplicador >= 9 ){
            multiplicador = 2;
        }else{
            multiplicador++;
        }
    }

    // mod11 = 284 % 11 = 9 (resto da divisao por 11)
    var mod11 = soma % 11;
    
    
    // Faz-se a conta 11 (valor fixo) - mod11 = 11 - 9 = 2
    var ultimoDigitoCalculado = 11 - mod11;

    // ultimoDigito = Caso o valor calculado anteriormente seja 10 ou 11, transformo ele em 0
    // caso contrario, eh o proprio numero
    ultimoDigitoCalculado = (ultimoDigitoCalculado >= 10 ? 0 : ultimoDigitoCalculado);
    
    // Pego o ultimo digito do renavam original (para confrontar com o calculado)
    var digitoRealInformado = parseInt(renavam.substring(renavam.length - 1, renavam.length));
    
    
    // Comparo os digitos calculado e informado
    if(ultimoDigitoCalculado === digitoRealInformado){
        return true;
    }

    return false;

};

function str_pad(input, pad_length, pad_string, pad_type) {
  //  discuss at: http://phpjs.org/functions/str_pad/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Michael White (http://getsprink.com)
  //    input by: Marco van Oort
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //   example 1: str_pad('Kevin van Zonneveld', 30, '-=', 'STR_PAD_LEFT');
  //   returns 1: '-=-=-=-=-=-Kevin van Zonneveld'
  //   example 2: str_pad('Kevin van Zonneveld', 30, '-', 'STR_PAD_BOTH');
  //   returns 2: '------Kevin van Zonneveld-----'

  var half = '',
    pad_to_go;

  var str_pad_repeater = function(s, len) {
    var collect = '',
      i;

    while (collect.length < len) {
      collect += s;
    }
    collect = collect.substr(0, len);

    return collect;
  };

  input += '';
  pad_string = pad_string !== undefined ? pad_string : ' ';

  if (pad_type !== 'STR_PAD_LEFT' && pad_type !== 'STR_PAD_RIGHT' && pad_type !== 'STR_PAD_BOTH') {
    pad_type = 'STR_PAD_RIGHT';
  }
  if ((pad_to_go = pad_length - input.length) > 0) {
    if (pad_type === 'STR_PAD_LEFT') {
      input = str_pad_repeater(pad_string, pad_to_go) + input;
    } else if (pad_type === 'STR_PAD_RIGHT') {
      input = input + str_pad_repeater(pad_string, pad_to_go);
    } else if (pad_type === 'STR_PAD_BOTH') {
      half = str_pad_repeater(pad_string, Math.ceil(pad_to_go / 2));
      input = half + input + half;
      input = input.substr(0, pad_length);
    }
  }

  return input;
}

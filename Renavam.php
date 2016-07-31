<?php

class Renavam{
    
    /**
    * Valida Novo Modelo Renavam 11 Digitos
    * http://blog.victorjabur.com/2010/05/28/renavam_veiculos_java/
    * http://www.guj.com.br/java/149379-validar-renavam---urgente
    * http://www.denatran.gov.br/download/Portarias/2013/PORTARIA%20%2027%20-%2013.pdf
    * 
    * @asserts ("163793123") == true
    * @asserts ("841534969") == true
    * @asserts ("280935994") == true
    * @asserts ("480486395") == true
    * @asserts ("199148350") == true
    * @asserts ("477077226") == true
    * @asserts ("210160284") == true
    * @asserts ("503645257") == true
    * @asserts ("720149169") == true
    * @asserts ("347068324") == true
    * @asserts ("456366393") == true
    * @asserts ("502846100") == true
    * @asserts ("894685058") == true
    * @asserts ("935832033") == true
    * @asserts ("179073818") == true
    * @asserts ("918715784") == true
    * @asserts ("231300751") == true
    * @asserts ("554215861") == true
    * @asserts ("540189740") == true
    * @asserts ("588381705") == true
    * @asserts ("548067953") == true
    */
    public static function valida( $renavam ){
        
        #Completa com zeros a esquerda caso o renavam seja com 9 digitos
        $renavam = str_pad($renavam, 11, "0", STR_PAD_LEFT); 
        
        
        #Valida se possui 11 digitos
        if( !preg_match("/[0-9]{11}/", $renavam) ){    
            return false;
        }
        
        $renavamSemDigito = substr($renavam, 0, 10);
        $renavamReversoSemDigito = strrev($renavamSemDigito);
        
        
        // Multiplica as strings reversas do renavam pelos numeros multiplicadores
        // Exemplo: renavam reverso sem digito = 69488936
        // 6, 9, 4, 8, 8, 9, 3, 6
        // * * * * * * * *
        // 2, 3, 4, 5, 6, 7, 8, 9 (numeros multiplicadores - sempre os mesmos [fixo])
        // 12 + 27 + 16 + 40 + 48 + 63 + 24 + 54
        // soma = 284
        
        $soma = 0;
        $multiplicador = 2;
        for ($i = 0; $i < 10; $i++) {
            $algarismo = substr($renavamReversoSemDigito, $i, 1);
            $soma += $algarismo * $multiplicador;
            
            if( $multiplicador >=9 ){
                $multiplicador = 2;
            }else{
                $multiplicador++;
            }
        }
        
        # mod11 = 284 % 11 = 9 (resto da divisao por 11)
        $mod11 = $soma % 11;
        
        #Faz-se a conta 11 (valor fixo) - mod11 = 11 - 9 = 2
        $ultimoDigitoCalculado = 11 - $mod11;
        
        #ultimoDigito = Caso o valor calculado anteriormente seja 10 ou 11, transformo ele em 0
        #caso contrario, eh o proprio numero
        $ultimoDigitoCalculado = ($ultimoDigitoCalculado >= 10 ? 0 : $ultimoDigitoCalculado);
 
        # Pego o ultimo digito do renavam original (para confrontar com o calculado)
        $digitoRealInformado = substr($renavam, -1);
  
        #Comparo os digitos calculado e informado
        if($ultimoDigitoCalculado == $digitoRealInformado){
            return true;
        }
        
        return false;
        
    }
}

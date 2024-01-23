    

const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');


//Objeto expresiones, con diferentes atributos:
const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^[ \d\-]{7,14}$/ // Espacios, dígitos y guión medio, de 7 a 14 elementos
}

//Creamos un objeto campos con un iniciador de objetos 
//(nos servirá para poder comprobar que todo está OK antes de enviar formulario)
const campos = {
    usuario: false,
    nombre: false,
    password: false,
    password2: false,
    correo: false,
    telefono: false
}
  
//Por cada input vamos añadir un evento que se ejecutará tras pulsar cada tecla
// la (e) significa que el parámetro que se pasa es un evento
//prueba a meter las instrucciones en un console.log(instruccion) para ver en la web si funciona


const validarFormulario = (e) =>{

    switch (e.target.name){

        case "usuario":

          validarCampo(expresiones.usuario, e.target, "usuario");

        break;

        case "nombre":
        
        validarCampo(expresiones.nombre, e.target, "nombre");

        break;

        case "password":
        
        validarCampo(expresiones.password, e.target, "password");
        validarPassword2();

        break;

        case "password2":
         
        validarPassword2();

        break;

        case "correo":
         
        validarCampo(expresiones.correo, e.target, "correo");

        break;

        case "telefono":
        
        validarCampo(expresiones.telefono, e.target, "telefono"); 

        break;
    }
}

//Refactorizamos todo el proceso de validar cada campo para no tener que repetirlo individualmente
/*Lo convertimos en una función a la que le vamos a pasar 3 parámetros:
    -Expresión: Contra cual de los valores de la función constante expresiones (definida arriba) vamos a contrastar el input del usuario: con la de nombre, correo,etc.
    -Input: lo que introduce el usuario
    -Campo: Qué parte del formulario estamos evaluando. En la función validarCampo() indicamos usando backticks (``)
     que vamos a escoger el campo que se introduzca en el parámetro de entre todos los disponibles de la clase grupo: `clase__${parametro}`

*/

const validarCampo = (expresion, input, campo) => {
      
    if (expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    }else{
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
    }
}
        //Explicación arriba: Añadimos que aparezca el mensaje de error bajo la caja de imput (y arriba añadimos que desaparezca cuando se escriba bien)
        //En el query selector recuerda llamar a ambas clases sin poner coma ni comillas entre ellas, como una unica entidad separada por espacio

const validarPassword2 = () =>{

    const inputPassword1 = document.getElementById('password');
    const inputPassword2 = document.getElementById('password2');

    if(inputPassword1.value !== inputPassword2.value){

        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos['password']==false;
    }else{
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos['password'] = true;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);

});

//Si el formulario está vacío, al pulsar 'enviar' no se envía ni recarga página
formulario.addEventListener('submit', (e) =>{
e.preventDefault();

const terminos = document.getElementById('terminos');
if(campos.usuario && campos.correo && campos.nombre && campos.password && campos.telefono && terminos.checked){

    formulario.reset();
    document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
    document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');

    setTimeout(()=>{
        document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');

    }, 3000);
}else{
    document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
}
});
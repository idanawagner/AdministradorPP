const URLDATOS=`https://62ca4272d9ead251e8c5a07f.mockapi.io/datos`
arrayDatos=[]
let container=document.getElementById('container')
let btnSignIn=document.createElement('button')
let btnSignUp=document.createElement('button')
btnSignIn.setAttribute('id','btnSignIn')
btnSignUp.setAttribute('id','btnSignUp')
btnSignIn.innerText=`Registrarse`
container.append(btnSignIn)
btnSignUp.innerText=`Iniciar Sesion`
container.append(btnSignUp)

let registro= document.getElementById('registro')
let iniciarSesion=document.getElementById('iniciarSesion')

btnSignUp.addEventListener('click',()=>{
    registro.style.display='none'
    iniciarSesion.style.display='grid'
})
btnSignIn.addEventListener('click',()=>{
    iniciarSesion.style.display='none'
    registro.style.display='grid'
})
//Constructor para registrarse e iniciar sesion
class Datos{
    constructor(nombre, usuario, password){
        this.nombre=nombre;
        this.usuario=usuario;
        this.password=password;
    };
    registrarse(datos){
        fetch(URLDATOS,{
                method:'POST',
                headers:{ 
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({
                            nombre: this.nombre,
                            usuario: this.usuario,
                            password: this.password,
                }),            
        })
    }//guarda los datos de registración
    obtenerDatos(){
            fetch(URLDATOS)
            .then(response => response.json())
            .then(data => {
            arrayDatos = data
            arrayDatos.forEach(dato => {
                    (inputUsuarioInic.value==dato.usuario && inputPasswordInic.value==dato.password)? 
                        window.location.href = "./operaciones.html":
                            Swal.fire({
                                title: 'Usuario no registrado',
                                icon: 'error',
                            })
                    });
            })
    }//obtiene los datos para iniciar sesion
}
//REGISTRARSE
let formReg=document.createElement('form')

formReg.innerHTML=`<div class="grid">
                    <label id=''>
                        Nombre completo
                        <input type="text" id="nombreReg" placeholder="Nombre" required>
                        Nombre de usuario
                        <input type="text" id="usuarioReg" placeholder="Usuario" required>
                        Contraseña
                        <input type="password" id="passwordReg" placeholder="Contraseña" required>
                    </label>
                </div>
                `
formReg.setAttribute('id', 'form__registro');
registro.append(formReg);

let inputNombreReg= document.getElementById('nombreReg')
let inputUsuarioReg= document.getElementById('usuarioReg')
let inputPasswordReg= document.getElementById('passwordReg')

let btnRegistraerse = document.createElement('button')
btnRegistraerse.setAttribute('id', 'btnRegistro')
btnRegistraerse.setAttribute('type', 'button')
btnRegistraerse.innerText= `Registrarse`
formReg.append(btnRegistraerse)

btnRegistraerse.addEventListener('click',()=>{
    const datos= new Datos(inputNombreReg.value, inputUsuarioReg.value, inputPasswordReg.value);
    datos.registrarse(datos)
    Swal.fire({
        title: 'Se registro correctamente!',
        icon: 'success',
      })
    registro.style.display='none'
    iniciarSesion.style.display='grid'
    inputNombreReg.value=''
    inputUsuarioReg.value=''
    inputPasswordReg.value=''
})
//INICIAR SESION
let formInic= document.createElement('form')
formInic.innerHTML=`<div class="grid">
                        <label id=''>
                            Nombre de usuario
                            <input type="text" id="usuarioInicio" placeholder="Usuario" required>
                            Contraseña
                            <input type="password" id="passwordInicio" placeholder="Contraseña" required>
                        </label>
                        </div>  
                        `
formInic.setAttribute('id','form__inicio')
iniciarSesion.append(formInic)
let inputUsuarioInic=document.getElementById('usuarioInicio')
let inputPasswordInic=document.getElementById('passwordInicio')

let btnIniciar= document.createElement('button')
btnIniciar.setAttribute('id', 'btnIniciar')
btnIniciar.setAttribute('type', 'button')
btnIniciar.innerText= `Iniciar Sesion`
formInic.append(btnIniciar)

admin=new Datos()
btnIniciar.addEventListener('click',()=>{
    admin.obtenerDatos()
    }
)

obtenerJSON(URL)
const administrador= new AdministradorOper(table);
administrador.renderTabla(table)
enviar.addEventListener('click',()=>{
  // debugger
    if (administrador.faltanDatos()){
      enviar.setAttribute('data-swal-toast-template','#my-template')
        Swal.fire({
          toast: true,
          text:'Faltan cargar datos',
          icon:'warning',
          color:'red'
        })
    }else{
      const objOperacion= new Operacion(new Date().toLocaleDateString(),inputConcepto.value,inputImporte.value); //crea el objeto operacion
      console.log(objOperacion)
      administrador.guardarOperacion(objOperacion,inputTipo.value); // guarda el objeto en el array correspondiente al tipo de operacion(ingreso/egreso)
      administrador.recuperarOp()
      administrador.balance()
      administrador.actualizarTabla(table) //genera la fila con los datos de los array en la tabla
      Swal.fire({
        title: 'Operacion agregada con exito',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
    }
        
});

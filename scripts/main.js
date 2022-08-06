const administrador= new AdministradorOper(table);
administrador.renderTabla(table)
enviar.addEventListener('click',()=>{
    if (administrador.faltanDatos()){
      enviar.setAttribute('data-swal-toast-template','#my-template')
        Swal.fire({
          toast: true,
          text:'Faltan cargar datos',
          icon:'warning',
          color:'red',
          width: '12em',
          position: 'center',
          height: '12em',
        })
    }else{
      const objOperacion= new Operacion(new Date().toLocaleDateString(),inputConcepto.value,inputImporte.value); //crea el objeto operacion
      administrador.guardarOperacion(objOperacion,inputTipo.value); // guarda el objeto en el array correspondiente al tipo de operacion(ingreso/egreso)
      administrador.recuperarOp() //recupera las operaciones de local storage
      administrador.balance() // genera el saldo total
      administrador.actualizarTabla(table) //genera la fila con los datos de los array en la tabla
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        text: 'Operacion agregada',
        showConfirmButton: false,
        width:'15em',
        timer: 1500
      })
    }    
});

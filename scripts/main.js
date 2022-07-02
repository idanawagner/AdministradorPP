const administrador= new AdministradorOper(table);
// debugger
administrador.renderTabla(table)
enviar.addEventListener('click',()=>{
    const objOperacion= new Operacion(new Date().toLocaleDateString(),inputConcepto.value,inputImporte.value); //crea el objeto operacion
    administrador.guardarOperacion(objOperacion,inputTipo.value); // guarda el objeto en el array correspondiente al tipo de operacion(ingreso/egreso)
    administrador.recuperarOp()
    administrador.balance()
    administrador.actualizarTabla(table) //genera la fila con los datos de los array en la tabla
    Swal.fire({
        title: 'Operacion agregada con exito',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
});


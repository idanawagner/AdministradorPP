//debugger
// function ingresar(){
//     usuario=prompt('Ingrese nombre de usuario')
//     contraseña=promt('Ingrese una constraseña')
// }


//Constructor de operaciones
class Operacion{
    constructor(tipo, fecha, importe, concepto){
        this.tipo=tipo;
        this.fecha=fecha;
        this.importe=importe;
        this.concepto=concepto;
    };
    static ingresarOp(){
        tipo=(prompt('¿Que tipo de operación ingresara?')).toLowerCase();
        fecha=prompt('Ingrese la fecha de la operación:');
        importe=parseFloat(prompt('Ingrese el importe:'));
        concepto=prompt('Ingrese el concepto:');
    };//metodo ingresar operacion
    static guardarOperacion(operacion){
        if (tipo=='ingreso'){
            ingresos.push(operacion);
        }else{    
            egresos.push(operacion);
        };
    };//metodo guardar operacion en array
    static balance(){
        totalIngresos = ingresos.reduce((total, i)=> total + i.importe,0);
        totalEgresos = egresos.reduce((total, e)=> total + e.importe,0);
        saldo=totalIngresos-totalEgresos;
        console.table(ingresos);
        console.table(egresos);
        console.log(totalIngresos, 'TOTAL INGRESOS');
        console.log(totalEgresos, 'TOTAL EGRESOS');
        console.log(saldo, 'SALDO RESTANTE');
        };
    //metodo balance total
}
while (salir!='no'){
    // debugger
    Operacion.ingresarOp();
    const objOperacion= new Operacion(tipo,fecha,importe,concepto);
    Operacion.guardarOperacion(objOperacion);
    salir=(prompt('Desea ingresar otra operacion? si/no')).toLowerCase();
};
Operacion.balance();
//Constructor de operaciones
class Operacion{
    constructor(fecha, concepto, importe){
        this.fecha=fecha;
        this.concepto=concepto;
        this.importe=parseFloat(importe);
        this.tipo=inputTipo.value;
    };
};
class AdministradorOper{
    constructor(){
        this.operacion=[];
        this.tabla=tabla;
        this.saldo=0;
    }
    renderTabla(){
        let thead= document.createElement('thead');
        thead.innerHTML=`<tr>
                            <th>Fecha</th>
                            <th>Concepto</th>
                            <th>Importe</th>
                         </tr>`;
        this.tabla.append(thead);
        let tbody= document.createElement('tbody');
        tbody.id='tbody';
        this.tabla.append(tbody);
        let tfoot= document.createElement('tfoot');
        tfoot.id='tfoot';
        this.tabla.append(tfoot);
        administrador.recuperarOp();         
        administrador.actualizarTabla();
        
    }//metodo crear el formato de la tabla
    faltanDatos(){
        let datos = (inputConcepto.value==''|| isNaN(inputImporte.value) || inputImporte.value=='')? true: false
        return datos
    }//metodo validar datos
    actualizarTabla(){
            tbody.innerHTML="";
            if (this.operacion.length>0){
                for (let i=0; i<this.operacion.length;i++){
                    let fila=document.createElement('tr');
                    fila.innerHTML= `<td>${this.operacion[i].fecha}</td>
                                     <td>${this.operacion[i].concepto}</td>
                                     <td>${this.operacion[i].importe}</td>`;
                    let boton=document.createElement('button');
                    boton.innerText='Eliminar';
                    let ref=this;
                    boton.addEventListener('click',()=>{
                        Swal.fire({
                            title: 'Operacion eliminada',
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                          })
                       let indice= ref.operacion.findIndex((item)=>{
                        return item.fecha==ref.operacion[i].fecha && item.concepto==ref.operacion[i].concepto && item.importe==ref.operacion[i].importe  
                       })
                       ref.operacion.splice(indice,1);
                       this.actualizarTabla();
                       this.actualizarLS();

                    })
                    fila.append(boton);
                    fila.id= 'operacion' +i;
                    tbody.append(fila);
                }
            }
            administrador.balance();
            tfoot.innerHTML=''
            let ultimaFila=document.createElement('tr');
            ultimaFila.innerHTML = `<td>TOTALES</td>
                                    <td></td>
                                    <td>${this.saldo}</td>`
            tfoot.append(ultimaFila);
    }//metodo actualizar tabla
    guardarOperacion(operacion,tipo){
        if (tipo=='egreso' && operacion.importe>0){
            operacion.importe=operacion.importe*-1
        }else{
            if (tipo=='ingreso' && operacion.importe<0){
                operacion.importe=operacion.importe*-1
            }
        }
        this.operacion.unshift(operacion)
        this.actualizarLS();
    };//metodo guardar operacion al inicio del array
    
    actualizarLS(){
        localStorage.setItem('OP', JSON.stringify(this.operacion));
    };//metodo actualizar local Storage

    recuperarOp(){
        this.operacion=JSON.parse(localStorage.getItem('OP')) || [];
    };//metodo recuperar operaciones de local storage

    balance(){
        this.saldo=this.operacion.reduce((acc,el) => acc + el.importe,0)
    }// metodo balance total
}


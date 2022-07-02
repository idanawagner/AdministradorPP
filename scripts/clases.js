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
        this.ingresos=[];
        this.egresos=[];
        this.tabla=tabla;
        this.totalIngresos=0;
        this.totalEgresos=0;
        this.saldo=0;
    }
    renderTabla(){
        let thead= document.createElement('thead');
        thead.innerHTML=`
                        <tr>
                            <th>Fecha</th>
                            <th>Concepto</th>
                            <th>Ingresos</th>
                            <th>Egresos</th>
                            <th></th>
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
        
    }
    actualizarTabla(){
            tbody.innerHTML="";
            if (this.ingresos.length>0){
                for (let i=0; i<this.ingresos.length;i++){
                    let fila=document.createElement('tr');
                    fila.innerHTML=` <td>${this.ingresos[i].fecha}</td>
                                     <td>${this.ingresos[i].concepto}</td>
                                     <td>${this.ingresos[i].importe}</td>
                                     <td></td>
                                     `;
                    let boton=document.createElement('button');
                    boton.innerText='Eliminar';
                    let ref=this;
                    boton.addEventListener('click',()=>{
                        Swal.fire({
                            title: 'Operacion eliminada',
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                          })
                       let indice= ref.ingresos.findIndex((item)=>{
                        return item.fecha==ref.ingresos[i].fecha && item.concepto==ref.ingresos[i].concepto && item.importe==ref.ingresos[i].importe  
                       })
                       ref.ingresos.splice(indice,1);
                       this.actualizarTabla();
                       this.actualizarLS();

                    })
                    fila.append(boton);
                    fila.id= 'ingreso' +i;
                    tbody.append(fila);
                }
            }
            if (this.egresos.length>0){
                for (let i=0; i<this.egresos.length;i++){
                    let fila=document.createElement('tr');
                    fila.innerHTML=`<td>${this.egresos[i].fecha}</td>
                                    <td>${this.egresos[i].concepto}</td>
                                    <td></td>
                                    <td>${this.egresos[i].importe}</td>
                                     `;
                    let boton=document.createElement('button');
                    boton.innerText='Eliminar';
                    let ref=this;
                    boton.addEventListener('click',()=>{
                        Swal.fire({
                            title: 'Operacion eliminada',
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                          });
                       let indice= ref.egresos.findIndex((item)=>{
                        return item.fecha==ref.egresos[i].fecha && item.concepto==ref.egresos[i].concepto && item.importe==ref.egresos[i].importe  
                       });
                       ref.egresos.splice(indice,1);
                       this.actualizarTabla();
                       this.actualizarLS();

                    })
                    fila.append(boton);
                    fila.id= 'egreso' +i;
                    tbody.append(fila);
                }
                
           }
           administrador.balance();
           tfoot.innerHTML=''
           let ultimaFila=document.createElement('tr');
           ultimaFila.innerHTML=` <td>TOTALES</td>
                            <td></td>
                            <td>${this.totalIngresos}</td>
                            <td>${this.totalEgresos}</td>
                            <td>${this.saldo}</td>`
            tfoot.append(ultimaFila);
        
    }
    guardarOperacion(operacion,tipo){
        tipo=='ingreso'? this.ingresos.unshift(operacion): this.egresos.unshift(operacion);
        this.actualizarLS();
    };//metodo guardar operacion al inicio del array
    
    actualizarLS(){
        localStorage.setItem('Ingreso', JSON.stringify(this.ingresos));
        localStorage.setItem('Egreso', JSON.stringify(this.egresos));
    };//metodo actualizar local Storage

    recuperarOp(){
        this.ingresos=JSON.parse(localStorage.getItem('Ingreso')) || [];
        this.egresos=JSON.parse(localStorage.getItem('Egreso')) || [];
    };//metodo recuperar operaciones de local storage

    balance(){
        if (this.ingresos.length>0){
        this.totalIngresos = this.ingresos.reduce((total, i)=> total + i.importe,0);
        }
        if (this.egresos.length>0){
            this.totalEgresos = this.egresos.reduce((total, e)=> total + e.importe,0);
        }
        this.saldo=this.totalIngresos-this.totalEgresos;
        };
    //metodo balance total
}


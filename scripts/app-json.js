const armarHeader = (contenido)=> {
    const {icono, nombre, descripcion} = contenido
       let HTMLCard = ""
             HTMLCard += `<div class="container__header">
                              <div>
                                <img id="logo" src="${icono}" alt="Logo">
                              </div>
                            <div>
                              <div>
                                <h1 class="header-titulo text-black font-bold underline">${nombre}</h1>
                              </div>
                              <div>
                                <h4>${descripcion}</h2>
                              </div>
                            </div>
                          </div>`
       return HTMLCard
}
const obtenerJSON = (URL)=>{ 
    fetch(URL)
    .then(response => response.json())
    .then(data => {
      arrayJSON = data
      arrayJSON.forEach(contenido => {
        mostrarCont= armarHeader(contenido)
      });
      headerDOM.innerHTML=mostrarCont
    })
}
obtenerJSON(URL)
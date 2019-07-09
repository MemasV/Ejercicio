function getData(filtro)
{
    const url = 'https://morning-lake-87711.herokuapp.com/equipos'
    axios.get(url)
        .then((res) => {
            const {data} = res
            const arregloCRs = data
              .filter(equipos => equipos.CR  == filtro)
              .map(elem => 
                  {
                    return {
                      IP: elem.direccionIP, 
                      modelo: elem.modelo, 
                      serie: elem.noSerie}
                    
                  })
            escribeEquipos(arregloCRs,filtro)
        })
        .catch((err) => {
            alert(`No se pueden obtener los datos.\n${err}`)
        })
}

function escribeEquipos(arreglo,cr)
{
    if(arreglo.length===0)
    {
        document.getElementById("cantidadEquipos").innerHTML = `<b>El CR No. ${cr} no existe</b>`
    }
    else
    {
        var tabla   = document.getElementById("tablaEquipos")
        document.getElementById("cantidadEquipos").innerHTML = `<b>El CR No. ${cr} tiene ${arreglo.length} equipos</b>`
        var tblBody = document.createElement("tbody")
        var tblEnc = document.createElement("tr")
        var encCelda = document.createElement("th")
        var textoEnc = document.createTextNode("IP")
        encCelda.appendChild(textoEnc)
        tblEnc.appendChild(encCelda);
        encCelda = document.createElement("th")
        textoEnc = document.createTextNode("Modelo")
        encCelda.appendChild(textoEnc)
        tblEnc.appendChild(encCelda);
        encCelda = document.createElement("th");
        textoEnc = document.createTextNode("No de Serie")
        encCelda.appendChild(textoEnc)
        tblEnc.appendChild(encCelda)
        tblBody.appendChild(tblEnc)
        arreglo.forEach(element => {    
            var fila = document.createElement("tr");
            var celda = document.createElement("td");
            var texto = document.createTextNode(element.IP)
            celda.appendChild(texto)
            fila.appendChild(celda);
            celda = document.createElement("td");
            texto = document.createTextNode(element.modelo)
            celda.appendChild(texto)
            fila.appendChild(celda);
            celda = document.createElement("td");
            texto = document.createTextNode(element.serie)
            celda.appendChild(texto)
            fila.appendChild(celda)
            tblBody.appendChild(fila)
        });
        tabla.appendChild(tblBody);
        tabla.setAttribute("border", "2")
    }
    document.getElementById("botonBuscar").disabled = false
}

function mostrarEquipos()
{
    document.getElementById("cantidadEquipos").innerHTML = ''
    var tabla   = document.getElementById("tablaEquipos")
    tabla.setAttribute("border", "0")
    while(tabla.hasChildNodes())
    {
       tabla.removeChild(tabla.firstChild);
    }
    var numeroCR = document.getElementById("numeroCR").value
    document.getElementById("numeroCR").value = ""
    if(numeroCR.length === 0 || numeroCR <= 0) {
        alert('Debes indicar un número válido de CR')        
    }
    else
    {
        document.getElementById("botonBuscar").disabled = true
        document.getElementById("cantidadEquipos").innerHTML = 'Cargando...'
        getData(numeroCR)
    }
}
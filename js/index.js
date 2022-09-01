let listaPeliculas = JSON.parse(localStorage.getItem('listaPeliculasKey')) || [];

//dibujar columnas
listaPeliculas.map((pelicula)=>{ crearColumna(pelicula)})


function crearColumna(pelicula){
    let grilla = document.querySelector('#grilla');
    grilla.innerHTML += `
    <aside class="col-12 col-md-4 col-lg-3 mb-3">
    <div class="card" >
      <img src="${pelicula.imagen}" class="card-img-top" alt="${pelicula.titulo}">
      <div class="card-body">
        <h5 class="card-title">${pelicula.titulo}</h5>
        <button class="btn btn-primary" onclick="detallePelicula('${pelicula.codigo}')">ver detalle</button>
      </div>
    </div>
  </aside>
    `
}

function detallePelicula(codigo){
    console.log(codigo)
    console.log(window.location.origin + '/pages/detalle.html?codigo='+codigo);
    window.location.href = window.location.origin + '/pages/detalle.html?codigo='+codigo;
}
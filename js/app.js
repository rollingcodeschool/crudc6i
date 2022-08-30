import Pelicula from "./classPelicula.js";

//declarar variables
let listaPeliculas =
  JSON.parse(localStorage.getItem("listaPeliculasKey")) || [];

const modalFormPelicula = new bootstrap.Modal(
  document.querySelector("#modalPelicula")
);
const btnCrearPelicula = document.querySelector("#btnCrearPelicula");
let codigo = document.querySelector("#codigo");
let titulo = document.querySelector("#titulo");
let descripcion = document.querySelector("#descripcion");
let imagen = document.querySelector("#imagen");
let genero = document.querySelector("#genero");
let formulario = document.querySelector("#formPelicula");

//agregar los eventos
btnCrearPelicula.addEventListener("click", mostrarFormulario);
formulario.addEventListener("submit", crearPelicula);

cargaInicial();

function cargaInicial() {
  if (listaPeliculas.length > 0) {
    //dibujar filas en la tabla
    listaPeliculas.map((pelicula) => {
      crearFila(pelicula);
    });
  }
  //else mostrar un mensaje al usuario que no hay elementos para mostrar
}

function crearFila(pelicula) {
  let tablaPelicula = document.querySelector("#tablaPelicula");
  tablaPelicula.innerHTML += `<tr>
    <th scope="row">${pelicula.codigo}</th>
    <td>${pelicula.titulo}</td>
    <td>${pelicula.descripcion}</td>
    <td>${pelicula.imagen}</td>
    <td>${pelicula.genero}</td>
    <td>
      <button class="btn btn-warning" >
        <i class="bi bi-pencil-square"></i>
      </button>
      <button class="btn btn-danger" onclick="borrarPelicula('${pelicula.codigo}')">
        <i class="bi bi-x-square"></i>
      </button>
    </td>
  </tr>`;
}

function mostrarFormulario() {
  modalFormPelicula.show();
  codigo.value = uuidv4();
}

function crearPelicula(e) {
  e.preventDefault();
  //agregar las validaciones necesarias
  //crear una pelicula
  const nuevaPelicula = new Pelicula(
    codigo.value,
    titulo.value,
    descripcion.value,
    imagen.value,
    genero.value
  );
  console.log(nuevaPelicula);
  //guardar la pelicula en el arreglo
  listaPeliculas.push(nuevaPelicula);
  console.log(listaPeliculas);
  //guardar los datos el localstorage
  guardarDatosEnLS();
  //limpiar el formulario
  limpiarFormulario();
  //dibujar esta peli en la tabla
  crearFila(nuevaPelicula);
  //mostrar mensaje al usuario
  Swal.fire(
    "Pelicula creada",
    "La pelicula fue creada correctamente",
    "success"
  );
  //cerrar la ventana modal
  modalFormPelicula.hide();
}

function limpiarFormulario() {
  formulario.reset();
  //resetear la clase de bootstrap form-control
  titulo.className = "form-control";
  descripcion.className = "form-control";
  imagen.className = "form-control";
  genero.className = "form-control";
  codigo.className = "form-control";
}

function guardarDatosEnLS() {
  localStorage.setItem("listaPeliculasKey", JSON.stringify(listaPeliculas));
}

window.borrarPelicula = function (codigo) {
  Swal.fire({
    title: "Eliminar Pelicula",
    text: "Esta por eliminar la pelicula seleccionada, no puede revertir este paso",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Borrar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    // console.log(result);
    if (result.isConfirmed) {
      //aqui agregar la logia para borrar
      //buscar en el listaPeliculas el codigo de la peli que quiero borrar
      //Opcion1: findIndex, splice(posicion,1)
      //Opcion2: filter
      // let copiaListaPeliculas = listaPeliculas.filter((pelicula)=>{return pelicula.codigo != codigo});
      let copiaListaPeliculas = listaPeliculas.filter(
        (pelicula) => pelicula.codigo != codigo
      ); //return implicito
      //tarea para la casa borrar del arreglo listaPeliculas el elemento del codigo recibido por parametro
      listaPeliculas = copiaListaPeliculas;
      //actualizar el localstorage
      guardarDatosEnLS();
      //actualizar la tabla
      actualizarTabla();
      Swal.fire("Pelicula eliminada", "La pelicula seleccionada se borro correctamente", "success");
    }
  });
};

function actualizarTabla() {
  let tablaPelicula = document.querySelector("#tablaPelicula");
  tablaPelicula.innerHTML = "";
  cargaInicial();
}

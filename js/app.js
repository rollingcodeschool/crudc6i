import Pelicula from "./classPelicula.js";

//declarar variables
let listaPeliculas = JSON.parse(localStorage.getItem('listaPeliculasKey')) || [];

const modalFormPelicula = new bootstrap.Modal(document.querySelector('#modalPelicula'));
const btnCrearPelicula = document.querySelector('#btnCrearPelicula');
let codigo = document.querySelector('#codigo');
let titulo = document.querySelector('#titulo');
let descripcion = document.querySelector('#descripcion');
let imagen = document.querySelector('#imagen');
let genero = document.querySelector('#genero');
let formulario = document.querySelector('#formPelicula');

//agregar los eventos
btnCrearPelicula.addEventListener('click', mostrarFormulario);
formulario.addEventListener('submit', crearPelicula)

cargaInicial();

function cargaInicial(){
    if(listaPeliculas.length > 0){
        //dibujar filas en la tabla
        listaPeliculas.map((pelicula)=>{ crearFila(pelicula)})
    }
    //else mostrar un mensaje al usuario que no hay elementos para mostrar
}

function crearFila(pelicula){
    console.log(pelicula)
    let tablaPelicula = document.querySelector('#tablaPelicula');
    tablaPelicula.innerHTML +=`<tr>
    <th scope="row">${pelicula.codigo}</th>
    <td>${pelicula.titulo}</td>
    <td>${pelicula.descripcion}</td>
    <td>${pelicula.imagen}</td>
    <td>${pelicula.genero}</td>
    <td>
      <button class="btn btn-warning" >
        <i class="bi bi-pencil-square"></i>
      </button>
      <button class="btn btn-danger">
        <i class="bi bi-x-square"></i>
      </button>
    </td>
  </tr>`
}

function mostrarFormulario(){
    modalFormPelicula.show();
    codigo.value = uuidv4();
}

function crearPelicula(e){
    e.preventDefault();
    //agregar las validaciones necesarias
    //crear una pelicula
    const nuevaPelicula = new Pelicula(codigo.value,titulo.value, descripcion.value, imagen.value, genero.value);
    console.log(nuevaPelicula);
    //guardar la pelicula en el arreglo
    listaPeliculas.push(nuevaPelicula);
    console.log(listaPeliculas);
    //guardar los datos el localstorage
    guardarDatosEnLS();
    //limpiar el formulario
    limpiarFormulario();
    //cerrar la ventana modal
    modalFormPelicula.hide();
}

function limpiarFormulario(){
    formulario.reset();
    //resetear la clase de bootstrap form-control
    titulo.className = 'form-control'
    descripcion.className = 'form-control'
    imagen.className = 'form-control'
}

function guardarDatosEnLS(){
    localStorage.setItem('listaPeliculasKey', JSON.stringify(listaPeliculas))
}
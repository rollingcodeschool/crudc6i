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
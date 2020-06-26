//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

//Insertar data al carrito
const insertarCarrito = (curso) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width="100">
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;
    listaCursos.appendChild(row)
}

//Lee los datos del curso
const leerDatosCurso = (curso) => {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoCurso)
}

//Funcion que añade el curso al carrito
const comprarCurso = (e) => {
    e.preventDefault();
    
    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        //Llamamos a la sig. función el curso seleccionado para obtener los datos
        leerDatosCurso(curso)
    }
}

const eliminarCurso = (e) => {
    e.preventDefault();

    let curso;
    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
    }
}

const vaciarCarrito = () => {
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }
    return false;
}

//Listeners
const cargarEventListeners = () => {
    cursos.addEventListener('click', comprarCurso);
    carrito.addEventListener('click', eliminarCurso);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}
cargarEventListeners();
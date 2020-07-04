//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

//Obtener cursos del local storage y comprobamos si hay algo
const obtenerCursosLocalStorage = () => {
    let cursosLS;
    if(localStorage.getItem('cursos') === null){
        cursosLS = [];
    } else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'))
    }
    return cursosLS;
}

//Almacerna cursos del carrito al Local Storage
const guardarCursosLocalStorage = (curso) => {
    let cursos;
    cursos = obtenerCursosLocalStorage();
    cursos.push(curso);
    console.log('cursos', cursos)
    console.log('curso', curso)
    localStorage.setItem('cursos', JSON.stringify(cursos));
}

const insertarCarrito = (curso) => {
    //Insertar data al carrito
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
    listaCursos.appendChild(row);
    guardarCursosLocalStorage(curso);
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
        leerDatosCurso(curso);
    }
}

const eliminarCursoLocalStorage = (curso) => {
    let cursosLS;
    cursosLS = obtenerCursosLocalStorage();
    cursosLS.forEach((cursoLS, index) => {
        if(cursoLS.id === curso){
            cursosLS.splice(index, 1)
        }
    })
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

const eliminarCurso = (e) => {
    e.preventDefault();

    let curso, 
        cursoId;
    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
    }
    eliminarCursoLocalStorage(cursoId);
}

const vaciarLocalStorage = () => {
    localStorage.clear();
}

const vaciarCarrito = () => {
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }
    vaciarLocalStorage();
    return false;
}

const leerLocalStorage = () => {
    let cursosLS;
    cursosLS = obtenerCursosLocalStorage();
    cursosLS.forEach(curso => {
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
        listaCursos.appendChild(row);
    })
}

//Listeners
const cargarEventListeners = () => {
    cursos.addEventListener('click', comprarCurso);
    carrito.addEventListener('click', eliminarCurso);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}
cargarEventListeners();
//Lee los datos del curso
const leerDatosCurso = (curso) =>{
    const infoCurso ={
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
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
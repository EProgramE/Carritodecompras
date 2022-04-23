//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {

    //Agregar carrito
    listaCursos.addEventListener('click', agregarCurso);


    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //reseteamos el arreglo
        limpiarHTML();//Eliminamos todo el HTML
    })

}

//Funciones
//funcion que añade el curso al carrito
function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito') ) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
    
}

function eliminarCurso(e) {
    if (e.target.classList.contains("borrar-curso")) {
      const cId = e.target.getAttribute("data-id");
   
      // Elimina del arreglo de articulosCarrito por el data-id
      cursoId=articulosCarrito.findIndex((it)=>it.id===cId);
      curso=articulosCarrito[cursoId];
      
      if(curso){
        curso.cantidad-=1;
        if(curso.cantidad===0){
          articulosCarrito.splice(cursoId,1);
        }
      }
   
      // articulosCarrito = articulosCarrito.filter(
      //   (cursos) => cursos.id !== cursoId
      // );
   
      carritoHTML();
    }
  }

/*//Elimina un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso') ){
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => cursoid !== cursoId);
        carritoHTML();//Iterar sobre el carrito y mostrar su HTML
    }
}
*/

//Leer el HTML
function leerDatosCurso(curso) {
    //console.log(curso);
    //Crear un objeto, con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    }

    //Revisar si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id) ;
    if (existe){
        const cursos =articulosCarrito.map(curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++; //retorna cantidad actualizada
                return curso;
            } else {
                return curso; //retorna cantidad no duplicada
            }
        });
        articulosCarrito = [...cursos];
    }   else{
        articulosCarrito = [...articulosCarrito, infoCurso];
    }


    //Agregar elementos al arreglo del Carrito
    carritoHTML();
}

//Muestra el Carrito en el HTML
function carritoHTML() {

    //limpiar el HTML
    limpiarHTML();


    //Recorre el carrito y genera el HTML.
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}" > X </a>
        </td>
        `;


        //Agregar el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}



//Elimina los cursos del tbody
function limpiarHTML (){

    //Forma lenta
    //contenedorCarrito.innerHTML = '';

    //Forma rapida
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
class Cuadro {
    constructor(imagen, nombre, precio) {
        this.imagen = imagen;
        this.nombre = nombre;
        this.precio = precio;
    }

    generarHTML() {
        return `
        <div class="col-12 col-sm-6 col-md-4 mb-4">
          <div class="cuadro">
            <img src="${this.imagen}" alt="${this.nombre}" class="img-fluid" />
            <p>${this.nombre}</p>
            <p>$${this.precio}</p>
          </div>
        </div>
        `;
    }
}

let cuadrosAMostrar = 3; // Número de cuadros a mostrar inicialmente
let totalCuadros = 0; // Total de cuadros en el JSON
let cuadrosCargados = []; // Array para almacenar los cuadros cargados

// Función para cargar los cuadros desde el archivo JSON
function cargarCuadros() {
    fetch('./cuadros.json')
        .then(response => response.json())
        .then(data => {
            totalCuadros = data.length; // Guardamos la cantidad total de cuadros
            cuadrosCargados = data.map(item => new Cuadro(item.imagen, item.nombre, item.precio)); // Almacenamos los cuadros en el array
            mostrarCuadros(); // Mostramos los cuadros iniciales
        })
        .catch(error => console.error("Error al cargar el JSON: ", error));
}

// Función para mostrar los cuadros en la galería
function mostrarCuadros() {
    const galeria = document.getElementById('galeria');
    galeria.innerHTML = ''; // Limpiar la galería antes de mostrar los cuadros

    // Mostrar solo los cuadros hasta el límite de cuadrosAMostrar
    cuadrosCargados.slice(0, cuadrosAMostrar).forEach(cuadro => {
        galeria.innerHTML += cuadro.generarHTML();
    });

    // Ocultar el botón si ya se han mostrado todos los cuadros
    if (cuadrosAMostrar >= totalCuadros) {
        document.getElementById('verMas').style.display = 'none';
    }
}


// Función para cargar más cuadros al hacer clic en el botón
function verMasCuadros() {
    cuadrosAMostrar += 3; // Aumentamos el número de cuadros a mostrar
    mostrarCuadros(); // Volvemos a mostrar la galería con más cuadros
}

// Inicializamos la carga de cuadros al cargar la página
window.onload = function() {
    cargarCuadros();

    // Agregamos el evento al botón "Ver más"
    document.getElementById('verMas').addEventListener('click', verMasCuadros);
};

 menuContainer = document.getElementById("menu-container");
 resultadosContainer = document.getElementById("resultados-container");
 searchInput = document.getElementById("search-input");
 searchButton = document.getElementById("search-button");
 tarjetasContainer = document.getElementById("tarjetas-container");

// Función para generar checkboxes de categorías
function generarCheckboxesCategorias(categorias) {
  // Crea un checkbox por cada categoría y los coloca en línea
  categorias.forEach((categoria) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "categoria";
    checkbox.value = categoria;
    checkbox.className = "form-check-input";

    const label = document.createElement("label");
    label.textContent = categoria;
    label.className = "form-check-label";

    const div = document.createElement("div");
    div.className = "form-check form-check-inline";
    div.appendChild(checkbox);
    div.appendChild(label);

    menuContainer.appendChild(div);
  });
}

// Función para obtener las categorías seleccionadas
function obtenerCategoriasSeleccionadas() {
  const checkboxes = document.querySelectorAll('input[name="categoria"]');
  const categoriasSeleccionadas = Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);
  return categoriasSeleccionadas;
}

// Función para mostrar los resultados en el contenedor de resultados
// Función para mostrar los resultados en el contenedor de resultados
function mostrarResultados(eventos) {
  // Borra el contenido existente del contenedor de resultados
  resultadosContainer.innerHTML = "";

  if (eventos.length === 0) {
    resultadosContainer.innerHTML = "No Match Results.";
    return;
  }

  eventos.forEach((evento) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "card text-dark bg-dark mb-3";
    tarjeta.style.width = "18rem";

    const contenido = `
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${evento.image}" class="img-fluid rounded-start" alt="${evento.name}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title" style="color: #a30ab1;">${evento.name}</h5>
            <ul>
              <li><b>Description:</b> ${evento.description}</li>
              <li><b>Price:</b> $${evento.price}</li>
            </ul>
          </div>
          <a href="./details.html?eventId=${evento._id}" class="btn btn-primary details-button"><b>Details</b></a>
          </div>
      </div>
    `;

    tarjeta.innerHTML = contenido;
    tarjetasContainer.appendChild(tarjeta);
  });
}


// Maneja la búsqueda cuando se hace clic en el botón "Search"
searchButton.addEventListener("click", function () {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const categoriasSeleccionadas = obtenerCategoriasSeleccionadas();

  // Borra el contenido existente del contenedor de tarjetas
  tarjetasContainer.innerHTML = "";

  // Realiza una solicitud a la API y filtra los eventos
  fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then((response) => response.json())
    .then((data) => {
      const eventosFiltrados = data.events.filter((evento) => {
        const nombreEnMinuscula = evento.name.toLowerCase();
        return (
          nombreEnMinuscula.includes(searchTerm) &&
          (categoriasSeleccionadas.length === 0 ||
            categoriasSeleccionadas.includes(evento.category))
        );
      });

      // Muestra los eventos filtrados en el contenedor de resultados
      mostrarResultados(eventosFiltrados);
    })
    .catch((error) => {
      console.error("Error al obtener datos de la API:", error);
    });
});

// Realiza una solicitud inicial para obtener las categorías y generar los checkboxes
fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((response) => response.json())
  .then((data) => {
    const categorias = new Set();

    // Recorre los eventos para obtener todas las categorías únicas
    data.events.forEach((evento) => {
      categorias.add(evento.category);
    });

    // Llama a la función para generar los checkboxes de categorías
    generarCheckboxesCategorias(Array.from(categorias));
  })
  .catch((error) => {
    console.error("Error al obtener categorías de la API:", error);
  });

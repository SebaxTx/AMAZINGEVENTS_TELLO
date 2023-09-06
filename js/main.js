let tarjetasContainer = document.getElementById("tarjetas-container");

function mostrarTarjetas(eventos) {
  // Borra el contenido existente del contenedor
  tarjetasContainer.innerHTML = "";

  eventos.forEach((evento) => {
    let tarjeta = document.createElement("div");
    tarjeta.className = "card card text-dark bg-dark mb-3 card-con-margen";
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
              <li><b>Date:</b> ${evento.date}</li>
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

mostrarTarjetas(data.events);

// Maneja la búsqueda cuando se hace clic en el botón "Search"
searchButton.addEventListener("click", function () {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const categoriasSeleccionadas = obtenerCategoriasSeleccionadas();

  // Filtra los eventos por término de búsqueda y categorías seleccionadas
  const eventosFiltrados = data.events.filter((evento) => {
    const nombreEnMinuscula = evento.name.toLowerCase();
    return (
      nombreEnMinuscula.includes(searchTerm) &&
      (categoriasSeleccionadas.length === 0 ||
        categoriasSeleccionadas.includes(evento.category))
    );
  });

  // Muestra los eventos filtrados en el contenedor de tarjetas
  mostrarTarjetas(eventosFiltrados);
});



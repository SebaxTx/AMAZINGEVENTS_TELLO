// Definir la URL de la API
const apiUrl = "https://mindhub-xj03.onrender.com/api/amazing";

// Obtener una referencia al contenedor de tarjetas
let tarjetasContainer = document.getElementById("tarjetas-container");

// Función para mostrar las tarjetas de eventos
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

// Realizar una solicitud a la API utilizando fetch
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    // Llamar a la función mostrarTarjetas con los datos obtenidos
    mostrarTarjetas(data.events);
  })
  .catch((error) => {
    console.error("Error al obtener datos de la API:", error);
  });

let tarjetasContainer = document.getElementById("tarjetas-container");

// Obtener el ID del evento de la URL
const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get("eventId");

if (eventId) {
  // Realizar una solicitud a la API para obtener los datos de eventos
  fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then((response) => response.json())
    .then((data) => {
      // Buscar el evento con el ID correspondiente en el arreglo de eventos
      const eventoSeleccionado = data.events.find((evento) => evento._id === parseInt(eventId));

      if (eventoSeleccionado) {
        // Crear y mostrar la tarjeta del evento seleccionado
        let tarjeta = document.createElement("div");
        tarjeta.className = "card card text-dark bg-dark mb-3";
        tarjeta.style.width = "18rem";

        const contenido = `
          <div class="row g-0">
              <div class="col-md-4">
                  <img src="${eventoSeleccionado.image}" class="img-fluid rounded-start" alt="${eventoSeleccionado.name}">
              </div>
              <div class="col-md-8">
                  <div class="card-body">
                      <h5 class="card-title" style="color: #a30ab1;">${eventoSeleccionado.name}</h5>
                      <ul>
                          <li><b>Date:</b> ${eventoSeleccionado.date}</li>
                          <li><b>Description:</b> ${eventoSeleccionado.description}</li>
                          <li><b>Category:</b> ${eventoSeleccionado.category}</li>
                          <li><b>Place:</b> ${eventoSeleccionado.place}</li>
                          <li><b>Capacity:</b> ${eventoSeleccionado.capacity}</li>
                          <li><b>Estimate:</b> ${eventoSeleccionado.estimate || 'N/A'}</li>
                          <li><b>Price:</b> $${eventoSeleccionado.price}</li>
                      </ul>
                  </div>
              </div>
          </div>
        `;

        tarjeta.innerHTML = contenido;
        tarjetasContainer.appendChild(tarjeta);
      } else {
        // En caso de que no se encuentre el evento
        console.error("Evento no encontrado");
      }
    })
    .catch((error) => {
      console.error("Error al obtener datos de la API:", error);
    });
} else {
  console.error("No se proporcionó el eventId en la URL");
}
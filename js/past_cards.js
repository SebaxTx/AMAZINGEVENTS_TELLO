const tarjetasContainer = document.getElementById("tarjetas-container");

data.events.forEach((evento) => {
  const eventDate = new Date(evento.date);
  const currentDate = new Date(data.currentDate);

  if (eventDate < currentDate) {
    const tarjeta = document.createElement("div");
    tarjeta.className = "card card text-dark bg-dark mb-3";
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
              <li>description: ${evento.description}</li>
              <li>date: ${evento.date}</li>
            </ul>
            <a href="./details.html" class="btn btn-primary"id="detbut"><b>Details</b></a>
          </div>
        </div>
      </div>
    `;

    tarjeta.innerHTML = contenido;
    tarjetasContainer.appendChild(tarjeta);
  }
});

//////////////////////////////////////////////////////////////////////////
let tarjetasContainer = document.getElementById("tarjetas-container");

data.events.forEach((evento) => {
  let tarjeta = document.createElement("div");
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
          <li>Id: ${evento._id}</li>
          <li>Date: ${evento.date}</li>
          <li>Description: ${evento.description}</li>
          <li>Category: ${evento.category}</li>
          <li>Place: ${evento.place}</li>
          <li>Capacity: ${evento.capacity}</li>
          <li>Estimate: ${evento.estimate}</li>
          <li>Price: ${"$"+evento.price}</li>
        </ul>
      </div>
    </div>
  </div>
`;


  tarjeta.innerHTML = contenido;
  tarjetasContainer.appendChild(tarjeta);
});

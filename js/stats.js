// Función para llenar una tabla con datos
function fillTable(tableId, data) {
    const table = document.getElementById(tableId);
    const tbody = table.querySelector('tbody');
  
    // Limpiar la tabla antes de llenarla con los nuevos datos
    tbody.innerHTML = '';
  
    // Llenar la tabla con datos de la API
    data.forEach((item) => {
      const row = tbody.insertRow();
      const eventName = item.name;
      const revenues = `$${item.price}`;
      const percentageOfAssistance = `${((item.assistance / item.capacity) * 100).toFixed(2)}%`;
  
      const cell1 = row.insertCell();
      const cell2 = row.insertCell();
      const cell3 = row.insertCell();
  
      cell1.textContent = eventName;
      cell2.textContent = revenues;
      cell3.textContent = percentageOfAssistance;
    });
  }
  
  // Obtener datos de la API
  fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(data => {
      // Suponiendo que los datos de eventos están en data.events
      const eventStatsData = data.events;
  
      // Filtrar los tres eventos con el mayor porcentaje de asistencia
      const largestPercentageOfAssistanceEvents = eventStatsData.sort((a, b) => {
        const percentageA = (a.assistance / a.capacity) * 100;
        const percentageB = (b.assistance / b.capacity) * 100;
        return percentageB - percentageA;
      }).slice(0, 3);
  
      // Copiar los datos para la segunda lista y ordenar por ingresos (Revenues)
      const upcomingEventStatsData = [...eventStatsData]
        .filter(event => new Date(event.date) > new Date(data.currentDate))
        .sort((a, b) => b.price - a.price)
        .slice(0, 3);
  
      // Filtrar y limitar la tercera lista a los primeros tres eventos pasados
      const pastEventStatsData = eventStatsData
        .filter(event => new Date(event.date) < new Date(data.currentDate))
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);
  
      // Llenar las tablas con los eventos filtrados
      fillTable("eventStatsTable", largestPercentageOfAssistanceEvents);
      fillTable("upcomingEventStatsTable", upcomingEventStatsData);
      fillTable("pastEventStatsTable", pastEventStatsData);
    })
    .catch(error => {
      console.error('Error al obtener datos de la API:', error);
    });
  
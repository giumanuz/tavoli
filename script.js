function occupySeats(element) {
    const currentSeats = parseInt(element.getAttribute('data-seats'));
    if (currentSeats > 0) {
        const seatsToOccupy = parseInt(prompt("Inserisci il numero di posti da occupare:", "1"));
        if (seatsToOccupy && seatsToOccupy > 0 && seatsToOccupy <= currentSeats) {
            const newSeats = currentSeats - seatsToOccupy;
            element.setAttribute('data-seats', newSeats);
            element.querySelector('.seats').textContent = newSeats;
            if (newSeats === 0) {
                element.classList.add('active');
            }
            updateCounter();
        } else {
            alert("Numero non valido. Inserisci un numero tra 1 e " + currentSeats);
        }
    }
}

function updateCounter() {
    const tables = document.querySelectorAll('.table');
    let totalAvailableSeats = 0;

    tables.forEach(table => {
        const seats = parseInt(table.getAttribute('data-seats'));
        totalAvailableSeats += seats;
    });

    document.getElementById('counter').textContent = totalAvailableSeats;
}

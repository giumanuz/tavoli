let incrementInterval;
let decrementInterval;

function startIncrement(button) {
    incrementSeats(button);
    incrementInterval = setInterval(() => incrementSeats(button), 200);
}

function stopIncrement() {
    clearInterval(incrementInterval);
}

function startDecrement(button) {
    decrementSeats(button);
    decrementInterval = setInterval(() => decrementSeats(button), 200);
}

function stopDecrement() {
    clearInterval(decrementInterval);
}

function incrementSeats(button) {
    const table = button.closest('.table');
    const currentSeats = parseInt(table.getAttribute('data-seats'));
    table.setAttribute('data-seats', currentSeats + 1);
    table.querySelector('.seats').textContent = currentSeats + 1;
    if (table.classList.contains('active')) {
        table.classList.remove('active');
    }
    updateCounter();
}

function decrementSeats(button) {
    const table = button.closest('.table');
    const currentSeats = parseInt(table.getAttribute('data-seats'));
    if (currentSeats > 0) {
        table.setAttribute('data-seats', currentSeats - 1);
        table.querySelector('.seats').textContent = currentSeats - 1;
        if (currentSeats - 1 === 0) {
            table.classList.add('active');
        }
        updateCounter();
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

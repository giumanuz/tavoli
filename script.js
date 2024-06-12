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
    saveTableState(); // Salva lo stato dei tavoli dopo ogni incremento
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
        saveTableState(); // Salva lo stato dei tavoli dopo ogni decremento
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

function saveTableState() {
    const tables = document.querySelectorAll('.table');
    const tableState = {};
    
    tables.forEach(table => {
        const tableName = table.querySelector('.table-name').textContent;
        const seats = parseInt(table.getAttribute('data-seats'));
        tableState[tableName] = seats;
    });
    
    localStorage.setItem('tableState', JSON.stringify(tableState)); // Salva lo stato dei tavoli nel localStorage
}

function loadTableState() {
    const tableState = JSON.parse(localStorage.getItem('tableState'));
    if (tableState) {
        const tables = document.querySelectorAll('.table');
        tables.forEach(table => {
            const tableName = table.querySelector('.table-name').textContent;
            if (tableState.hasOwnProperty(tableName)) {
                const seats = tableState[tableName];
                table.setAttribute('data-seats', seats);
                table.querySelector('.seats').textContent = seats;
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    generateTables();
    loadTableState(); // Carica lo stato dei tavoli salvato
});

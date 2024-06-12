function toggleTable(element) {
    element.classList.toggle('active');
    updateCounter();
}

function updateCounter() {
    const tables = document.querySelectorAll('.table');
    let availableTables = 0;

    tables.forEach(table => {
        if (!table.classList.contains('active')) {
            availableTables++;
        }
    });

    document.getElementById('counter').textContent = availableTables;
}

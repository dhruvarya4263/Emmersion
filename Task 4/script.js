const form = document.getElementById('vehicleForm');
const list = document.getElementById('vehicleList');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const vehicle = Object.fromEntries(formData.entries());

    const res = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vehicle)
    });

    const data = await res.json();
    addVehicleToList(data);
    form.reset();
});

function addVehicleToList(vehicle) {
    const item = document.createElement('li');
    item.innerHTML = `
        <strong>${vehicle.vehicleName}</strong> - ₹${vehicle.price} <br>
        <em>${vehicle.brand}</em> | ${vehicle.desc} <br>
        <img src="${vehicle.image}" width="100" />
    `;
    list.appendChild(item);
}

// Load existing vehicles
fetch('/api/vehicles')
    .then(res => res.json())
    .then(data => data.forEach(addVehicleToList));
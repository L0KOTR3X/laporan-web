const apiUrl = 'https://script.google.com/macros/s/AKfycbxV0pQLByXs6U8rLko1-gx7IT16znAV6b8NzN1E-Smkfef3-X2o4GNH_DLtxBhhBVHP/exec'; // Ganti dengan URL yang benar

async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log('Data received:', data);  // Menambahkan log untuk melihat data
        renderTable(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderTable(data) {
    const tableBody = document.querySelector('#report-table tbody');
    tableBody.innerHTML = '';  // Clear existing data
    let totalPayout = 0;

    data.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.Username}</td>
            <td>${item.Network}</td>
            <td>${item.Country}</td>
            <td>${item.OS}</td>
            <td>${parseFloat(item.Payout).toFixed(2)}</td>
        `;
        tableBody.appendChild(row);
        totalPayout += parseFloat(item.Payout) || 0;
    });

    document.getElementById('total-payout').textContent = totalPayout.toFixed(2);
}

// Filter function
function filterData() {
    const searchName = document.getElementById('search-name').value.toLowerCase();
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    fetchData().then(data => {
        const filteredData = data.filter(item => {
            let isMatch = true;

            if (searchName && !item.Username.toLowerCase().includes(searchName)) {
                isMatch = false;
            }

            if (startDate && item.Date < startDate) {
                isMatch = false;
            }
            if (endDate && item.Date > endDate) {
                isMatch = false;
            }

            return isMatch;
        });

        renderTable(filteredData);
    });
}

// Initial fetch
fetchData();

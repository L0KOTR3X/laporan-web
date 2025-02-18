const apiUrl = 'https://script.google.com/macros/s/AKfycbyLEdg3xTM0_wHkkh4pJ_2L9L99OtBQ_YsFWrfAnicZ7gRECZsdYkzWYY96jZerHmsg/exec'; // Replace with your script URL

// Fetch and display the data from Google Sheets
async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        renderTable(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Render data into the table
function renderTable(data) {
    const tableBody = document.querySelector('#report-table tbody');
    tableBody.innerHTML = ''; // Clear existing data
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

// Filter data based on search and date range
function filterData() {
    const searchName = document.getElementById('search-name').value.toLowerCase();
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    fetchData().then(data => {
        const filteredData = data.filter(item => {
            let isMatch = true;

            // Filter by username
            if (searchName && !item.Username.toLowerCase().includes(searchName)) {
                isMatch = false;
            }

            // Filter by date range (if dates are provided)
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

// Initial fetch of data
fetchData();

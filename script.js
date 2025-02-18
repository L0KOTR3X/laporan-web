document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = 'https://script.google.com/macros/s/AKfycbyvBQg_KEDrDrLHFB9OP_xuseA0ia74q8UamATNifIl1QTA5XayCFBdmfPoGhDdmFWkqw/exec'; // Ganti dengan ID script kamu
    
    // Ambil data dari Google Sheets
    async function fetchData() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.error) {
                console.error(data.error);
                document.getElementById('reportTable').innerHTML = `<p>${data.error}</p>`;
            } else {
                displayData(data);
            }
        } catch (error) {
            console.error("Error fetching data: ", error);
            document.getElementById('reportTable').innerHTML = `<p>Error fetching data. Please try again later.</p>`;
        }
    }

    // Menampilkan data ke tabel
    function displayData(data) {
        let tableBody = document.getElementById('reportTableBody');
        tableBody.innerHTML = '';  // Kosongkan tabel sebelum menambahkan data baru

        data.forEach((row, index) => {
            if (row.Username !== 'Total Payout') {
                let tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.No}</td>
                    <td>${row.Username}</td>
                    <td>${row.Network}</td>
                    <td>${row.Country}</td>
                    <td>${row.OS}</td>
                    <td>${row.Payout}</td>
                `;
                tableBody.appendChild(tr);
            }
        });

        // Menampilkan total payout
        const totalRow = data.find(row => row.Username === 'Total Payout');
        if (totalRow) {
            document.getElementById('totalPayout').textContent = `Total Payout: ${totalRow.Payout}`;
        }
    }

    // Panggil fungsi fetchData untuk mengambil data
    fetchData();
});

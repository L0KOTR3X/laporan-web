document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = 'https://script.google.com/macros/s/AKfycbyvBQg_KEDrDrLHFB9OP_xuseA0ia74q8UamATNifIl1QTA5XayCFBdmfPoGhDdmFWkqw/exec'; // Ganti dengan ID script kamu
    let reportData = [];  // Simpan data yang diambil dari Google Sheets

    // Fungsi untuk menampilkan data pada tabel
    function displayData(data) {
        let tableBody = document.getElementById('reportTableBody');
        tableBody.innerHTML = '';  // Kosongkan tabel sebelum menambahkan data baru

        data.forEach((row) => {
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

    // Fungsi untuk fetch data dari API (Google Sheets)
    async function fetchData() {
        try {
            let response = await fetch(apiUrl);  // Gunakan apiUrl yang benar
            let data = await response.json();
            reportData = data;  // Simpan data untuk pencarian dan filter
            displayData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Fungsi pencarian berdasarkan username
    function searchData() {
        let searchTerm = document.getElementById('searchUsername').value.toLowerCase();
        let filteredData = reportData.filter(row => row.Username.toLowerCase().includes(searchTerm));
        displayData(filteredData);
    }

    // Fungsi untuk filter berdasarkan tanggal
    function filterByDate() {
        let startDate = document.getElementById('startDate').value;
        let endDate = document.getElementById('endDate').value;

        // Filter data berdasarkan tanggal (jika ada)
        let filteredData = reportData.filter(row => {
            let rowDate = row.Date ? new Date(row.Date) : null;  // Pastikan row.Date ada di data
            return (!startDate || (rowDate && rowDate >= new Date(startDate))) &&
                   (!endDate || (rowDate && rowDate <= new Date(endDate)));
        });
        displayData(filteredData);
    }

    // Panggil fetchData saat halaman dimuat
    fetchData();
});

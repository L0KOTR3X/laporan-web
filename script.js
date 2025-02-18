const SPREADSHEET_ID = '1ifjbJFUXNPvebOuC3SkYJs9Z-UcJNu8QCsetr6UittM';  // Ganti dengan ID spreadsheet kamu
const API_KEY = 'AIzaSyA7xrfGjMEnFYwRmMlFsTht3MJSPb-PfsY';  // Ganti dengan API Key kamu
const RANGE = 'Leads Report!A1:F';  // Tentukan range yang sesuai dengan data di Google Sheets

// Mengambil data dari Google Sheets
function fetchData() {
  gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  }).then(function () {
    return gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    });
  }).then(function (response) {
    const data = response.result.values;
    displayData(data);
  });
}

// Menampilkan data di tabel
function displayData(data) {
  const tableBody = document.querySelector('#reportTable tbody');
  tableBody.innerHTML = '';  // Hapus tabel sebelumnya
  
  data.forEach((row, index) => {
    const tr = document.createElement('tr');
    
    // Jika baris adalah Total Payout, hilangkan
    if (row[0] === 'Total Payout') return;

    row.forEach((cell, i) => {
      const td = document.createElement('td');
      td.textContent = cell;
      tr.appendChild(td);
    });

    tableBody.appendChild(tr);
  });
}

// Muat Google API dan jalankan fungsi fetchData
function start() {
  gapi.load('client', fetchData);
}

start();

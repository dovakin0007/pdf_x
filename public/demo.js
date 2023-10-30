// function exportPdf(){
// fetch('/generate')
// .then(response => response.json())
// .then(data => {
//     const table = document.getElementById('table');
//     data.forEach(rowData => {
//         const row = table.insertRow();
//         for (const column in rowData) {
//             const cell = row.insertCell();
//             cell.innerHTML = rowData[column];
//         }
//     });
// })
// .catch(error => console.error('Error fetching data:', error));
// }

fetch('/generate')
.then(response => response.json())
.then(data => {
    const table = document.getElementById('table');
    data.forEach((rowData, index) => {
        const row = table.insertRow();
        for (const column in rowData) {
            const cell = row.insertCell();
            cell.innerHTML = rowData[column];

            // Add an image after the 4th column (index 3) in each row except the first row
            if (index > 0 && (cell.cellIndex + 1) % 4 === 0) {
                const img = document.createElement('img');
                img.src = rowData[column];
                img.alt = "none" // Set the image source accordingly
                cell.appendChild(img);
            }
        }
    });
})
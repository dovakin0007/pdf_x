var fonts = {
    Roboto: {
      normal: './fonts/Roboto-Regular.ttf',
      bold: './fonts/Roboto-Medium.ttf',
      italics: './fonts/Roboto-Italic.ttf',
      bolditalics: './fonts/Roboto-MediumItalic.ttf'
    }
  };
const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
var pdfMake = require('pdfmake');
var printer = new pdfMake(fonts);



function generateHTMLTable(data) {
    let table = '<table>';
    // Generate the table header
    table += '<thead><tr>';
    for (const key in data[0]) {
      table += `<th>${key}</th>`;
    }
    table += '</tr></thead>';
  
    // Generate the table body
    table += '<tbody>';
    for (let i = 1; i < data.length; i++) {
      table += '<tr>';
      for (const key in data[i]) {
        table += `<td>${data[i][key]}</td>`;
      }
      table += '</tr>';
    }
    table += '</tbody>';
    table += '</table>';
    return table;
  }

const path = require('path');
const data = [
    {
      column1: "Name",
      column2: "Mob No.",
      column3: "Email Id",
      column4: "Actions",
    },
    {
      column1: "Ezhil",
      column2: "8098098901",
      column3: "ezhil@gmail.com",
      column4: "images/yes.jpg"
    },
    {
      column1: "Some",
      column2: "8098238901",
      column3: "e@gmail.com",
      column4: "images/yes.jpg"
    },
  ];

app.use( express.static(path.join(__dirname , "public")));
app.get('/' , (req, res) => {
    const options = {
        root: path.join(__dirname)
    };
    res.sendFile('demo.html',options)

})
app.get('/generate', (req, res) => {
    res.json(data)
})

app.get('/generate-pdf', (req, res) => {
    // Define the content for your PDF
    const content = [];
    data.forEach((row, index) => {
        if (index === 0) {
            // Header row
            content.push([
                { text: row.column1, bold: true },
                { text: row.column2, bold: true },
                { text: row.column3, bold: true },
                { text: row.column4, bold: true },
            ]);
        } else {
            // Data rows
            const rowData = [
                row.column1,
                row.column2,
                row.column3,
                { image: path.join(__dirname , 'public',row.column4), width: 50, height: 50 }
            ];
            content.push(rowData);
        }
    });

    // Create the PDF definition
    const docDefinition = {
        content: [
            { text: 'Dynamic PDF Table with Images', style: 'header' },
            {
                table: {
                    headerRows: 1,
                    body: content,
                },
            },
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                alignment: 'center',
                margin: [0, 0, 0, 20],
            },
        },
    };

    // Create the PDF
    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    // Generate the PDF as a buffer
    
    var chunks = []
    var result

    pdfDoc.on('data', function (chunk) {
      chunks.push(chunk)
    });
    pdfDoc.on('end', function () {
      result = Buffer.concat(chunks)

      res.contentType('application/pdf')
      res.send(result)
    });
    res.attachment(pdfDoc)
    pdfDoc.end();
    

});
app.listen(port, () =>{
    console.log('Example app listening on port ${port}')
})

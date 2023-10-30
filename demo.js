const { jsPDF } = window.jspdf;

function exportPdf(){
    var pdf = new jsPDF();
    pdf.text(20,20,"Details");
    pdf.autoTable({html:'#table',
        
        theme:'grid',
        columnStyles:{
            0:{cellWidth:20},
            1:{cellWidth:60},
            2:{cellWidth:40},
            3:{cellWidth:100}
        },
        bodyStyles: {lineColor: [1, 1, 1]},
        styles:{minCellHeight:20},
        didDrawCell: function(data) {
            if (data.column.index === 3 && data.cell.section === 'body') {
               var td = data.cell.raw;
               var img = td.getElementsByTagName('img')[0];
               var dim = data.cell.height - data.cell.padding('vertical');
               var textPos = data.cell.textPos;
               pdf.addImage(img.src, data.cell.x,  data.cell.y, dim, dim);
            }
          }
    });
     // Add timestamp to the filename
     var timeStamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(/[,:]/g, "").replace(/ /g, "_");

    var fileName = "convertedpdf_" + timeStamp + ".pdf";

 
     // Use the modified filename for the pdf download
     var blob = pdf.output("blob");
     var url = URL.createObjectURL(blob);
     var link = document.createElement('a');
     link.href = url;
     link.download = fileName;
     link.click();
 }

 
    //window.open(URL.createObjectURL(pdf.output("blob")))
 
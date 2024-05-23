export default async function ExportEmbarcacoesToExcel(
  embarcacoes: Embarcacao[]
) {
  //with ExcelJs create a report

  const Excel = require('exceljs');
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Lista de Ocorrências');

  // fit column width to content
  worksheet.getColumn('A').width = 5;
  worksheet.getColumn('B').width = 60;
  worksheet.getColumn('C').width = 60;
  worksheet.getColumn('D').width = 60;

  await setHeaders(worksheet);
  await setData(worksheet, embarcacoes);

  await saveFile('Export_' + Math.floor(Math.random() * 100000), workbook);
}

async function saveFile(fileName: any, workbook: any) {
  const saveAs = (await import('file-saver')).default;
  const xls64 = await workbook.xlsx.writeBuffer({ base64: true });
  saveAs(
    new Blob([xls64], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    }),
    fileName
  );
}

function setHeaders(worksheet: any) {
  worksheet.getCell('A1').value = 'ID';
  setHeaderStyle(worksheet.getCell('A1'));
  worksheet.getCell('B1').value = 'Nome';
  setHeaderStyle(worksheet.getCell('B1'));
  worksheet.getCell('C1').value = 'Tipo de Embarcação';
  setHeaderStyle(worksheet.getCell('C1'));
  worksheet.autoFilter = 'A1:C1';
}

const setData = (worksheet: any, embarcacoes: Embarcacao[]) => {
  embarcacoes.map((embarcacao) => {
    worksheet.addRow([
      embarcacao.id,
      embarcacao?.nome,
      embarcacao?.tipo_embarcacao?.tipo,
    ]);
  });
};

const setHeaderStyle = (cell: any) => {
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',

    fgColor: { argb: 'FFC0C0C0' },
  };
  cell.font = { bold: true, size: 14 };
  setThinBorder(cell);
};

const setThinBorder = (cell: any) => {
  cell.border = {
    top: { style: 'thin' },
    left: { style: 'thin' },
    bottom: { style: 'thin' },
    right: { style: 'thin' },
  };
};

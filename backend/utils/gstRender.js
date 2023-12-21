const XlsxPopulate = require('xlsx-populate');
const fs = require('fs');

const templateFilePath = 'template.xlsx';
const outputFilePath = 'output.xlsx';

// Sample data to write to the Excel file
const dataToWrite = [
    {
      gstNumber: 'AAA232323e',
      customerName: 'Aarya',
      invoiceNumber: 20,
      invoiceDate: '20/10/2003',
      invoiceValue: 32034,
      placeOfSupply: '23-Madhya Pradesh',
      reverseCharge: 'N',
      taxRate: '',
      invoiceType: 'Regular B2B',
      ecomGstn: '',
      rate: 10,
      taxableValue: 2332,
      cessAmount: 0,
    },
    {
      gstNumber: 'BBB454545f',
      customerName: 'Bob',
      invoiceNumber: 21,
      invoiceDate: '21/10/2003',
      invoiceValue: 45000,
      placeOfSupply: '27-Maharashtra',
      reverseCharge: 'N',
      taxRate: '',
      invoiceType: 'Regular B2B',
      ecomGstn: '',
      rate: 12,
      taxableValue: 3000,
      cessAmount: 0,
    },
    {
      gstNumber: 'CCC676767g',
      customerName: 'Charlie',
      invoiceNumber: 22,
      invoiceDate: '22/10/2003',
      invoiceValue: 55000,
      placeOfSupply: '29-Karnataka',
      reverseCharge: 'N',
      taxRate: '',
      invoiceType: 'Regular B2B',
      ecomGstn: '',
      rate: 15,
      taxableValue: 4000,
      cessAmount: 0,
    },
  ];
  
XlsxPopulate.fromFileAsync(templateFilePath)
  .then(workbook => {
    const sheetName = 'Sheet1'; // Replace with the actual sheet name
    const sheet = workbook.sheet(sheetName);

    // Define the starting row for writing data
    const startRow = 5;

    // Write data to the worksheet starting from row 5
    dataToWrite.forEach((data, index) => {
      const row = startRow + index;

      // Write data to the worksheet based on the provided structure
      sheet.cell(`A${row}`).value(data.gstNumber);
      sheet.cell(`B${row}`).value(data.customerName);
      sheet.cell(`C${row}`).value(data.invoiceNumber);
      sheet.cell(`D${row}`).value(data.invoiceDate);
      sheet.cell(`E${row}`).value(data.invoiceValue);
      sheet.cell(`F${row}`).value(data.placeOfSupply);
      sheet.cell(`G${row}`).value(data.reverseCharge);
      sheet.cell(`H${row}`).value(data.taxRate);
      sheet.cell(`I${row}`).value(data.invoiceType);
      sheet.cell(`J${row}`).value(data.ecomGstn);
      sheet.cell(`K${row}`).value(data.rate);
      sheet.cell(`L${row}`).value(data.taxableValue);
      sheet.cell(`M${row}`).value(data.cessAmount);
    });

    return workbook.toFileAsync(outputFilePath);
  })
  .then(() => {
    console.log(`Data written to "${outputFilePath}" successfully.`);
  })
  .catch(error => {
    console.error(`Error reading or processing the Excel file: ${error.message}`);
  });

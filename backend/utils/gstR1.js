const XlsxPopulate = require('xlsx-populate');
const path = require('path');
const templateFilePath = path.join(__dirname, 'template.xlsx');
const outputFilePath = path.join(__dirname, 'output.xlsx');


async function writeDataToExcelB2B(dataToWrite) {
  try {
    const workbook = await XlsxPopulate.fromFileAsync(templateFilePath);
    const sheetName = 'Sheet1';
    const startRow = 5;
    const sheet = workbook.sheet(sheetName);

    const formatedData = [];

    dataToWrite.forEach(originalObject => {
      const { customerName, gstNumber, date, invoiceNumber, amount } = originalObject;
      
      const newObjectFive = {
        customerName,
        gstNumber,
        gst: {
          amount:originalObject.gst.five,
          type: 5
        },
        date,
        invoiceNumber,
        amount
      };

      const newObjectTwelve = {
        customerName,
        gstNumber,
        gst: {
          amount:originalObject.gst.twelve,
          type: 12
        },
        date,
        invoiceNumber,
        amount
      };
    
      const newObjectEighteen = {
        customerName,
        gstNumber,
        gst: {
          amount:originalObject.gst.eighteen,
          type: 18
        },
        date,
        invoiceNumber,
        amount
      };
    
      formatedData.push(newObjectFive,newObjectTwelve, newObjectEighteen);
    });
    
    //console.log(formatedData);

    // Write data to the worksheet starting from the specified row
    formatedData.forEach((data, index) => {
      const row = startRow + index;
      // use if during formatting
      if(data.gst.amount != 0) {
        sheet.cell(`A${row}`).value(data.gstNumber);
        sheet.cell(`B${row}`).value(data.customerName);
        sheet.cell(`C${row}`).value(data.invoiceNumber);
        sheet.cell(`D${row}`).value(data.date);
        sheet.cell(`E${row}`).value(data.amount);
        sheet.cell(`F${row}`).value('');
        sheet.cell(`G${row}`).value('N');
        sheet.cell(`H${row}`).value('');
        sheet.cell(`I${row}`).value('Regular B2B');
        sheet.cell(`J${row}`).value('');
        sheet.cell(`K${row}`).value(data.gst.type);
        sheet.cell(`L${row}`).value(data.gst.amount);
        sheet.cell(`M${row}`).value(0);
      }
    });

    await workbook.toFileAsync(outputFilePath);
    console.log(`Data written to "${outputFilePath}" successfully.`);
  } catch (error) {
    console.error(`Error reading or processing the Excel file: ${error.message}`);
  }
}

async function writeDataToExcelB2C(dataToWrite) {
  try {
    const workbook = await XlsxPopulate.fromFileAsync(templateFilePath);
    const sheetName = 'Sheet2';
    const startRow = 5;
    const sheet = workbook.sheet(sheetName);

    console.log(dataToWrite)

    dataToWrite.forEach((data, index) => {
      const row = startRow + index;
      // use if during formatting
      if(true) {
        sheet.cell(`A${row}`).value('OE');
        sheet.cell(`B${row}`).value('23-Madhya Pradesh');
        sheet.cell(`C${row}`).value('');
        sheet.cell(`D${row}`).value(data.type);
        sheet.cell(`E${row}`).value(data.amount);
        sheet.cell(`F${row}`).value(0);
        sheet.cell(`G${row}`).value('');
      }
    });

    await workbook.toFileAsync(outputFilePath);
    console.log(`Data written to "${outputFilePath}" successfully.`);
  } catch (error) {
    console.error(`Error reading or processing the Excel file: ${error.message}`);
  }
}

module.exports = { writeDataToExcelB2B , writeDataToExcelB2C };

// get all the invoice of a particular month ----> DONE
// split invoice into gst category  ----> DONE
// get the total invoice amount and taxable amount of each gst category ----> DONE

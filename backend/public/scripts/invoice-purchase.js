function addToTable() {

    const productName = document.getElementById('product').value;
    const selectedBatch = document.getElementById('batch').value;
    const expireDate = document.getElementById('product-date').value;
    const mrp = document.getElementById('product-mrp').value;
    const purchaserate = document.getElementById('purchaserate').value;
    const quantity = document.getElementsByName('quantity')[0].value;
    const discount = document.getElementsByName('discount')[0].value;
    const free = document.getElementsByName('free')[0].value;
    const packaging =document.getElementById('packaging').value;

   
    if (!productName || !selectedBatch || !expireDate || !mrp || !purchaserate || !quantity || !discount || !free || !packaging) {
      alert("Please fill in all fields.");
      return;
    }

    const tableBody = document.getElementById('tableBody');
    const newRow = tableBody.insertRow(tableBody.rows.length);

    const values = [productName, selectedBatch, expireDate, mrp, purchaserate, quantity, discount, free, packaging];
    values.forEach((value, index) => {
      newRow.insertCell(index).innerHTML = value;
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', function () {
      const rowIndex = this.parentNode.parentNode.rowIndex;
      document.getElementById('productTable').deleteRow(rowIndex);
    });

    const cellDelete = newRow.insertCell(9);
    cellDelete.appendChild(deleteButton);

    const elementIds = ['product', 'batch', 'product-date', 'product-mrp', 'purchaserate', 'quantity', 'discount', 'free','packaging'];
    elementIds.forEach((id) => {
      if (id !== 'quantity' && id !== 'discount' && id !== 'free') {
        document.getElementById(id).value = '';
      } else {
        document.getElementsByName(id)[0].value = '';
      }
    });
}

function sendDataToServer(endpoint, data) {
  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(responseData => {
      console.log('Data sent successfully:', responseData);
    })
    .catch(error => {
      console.error('Error sending data to server:', error);
    });
}

// creating batch in purchase invoice

function createBatch() {
  const tableRows = document.querySelectorAll('#tableBody tr');
  const productData = [];

    tableRows.forEach(row => {
      const rowData = {
        name: row.cells[0].innerText,
        batch: {
          batch: row.cells[1].innerText,
          quantity: 0,
          mrp: row.cells[3].innerText,
          expireDate: row.cells[2].innerText,
          packaging: row.cells[8].innerText
        }
      };

      productData.push(rowData);
    });

  //  console.log(productDaata);
  for(let i = 0 ; i < productData.length ; i++){
    sendDataToServer('/product/create/batch',productData[i])
  }
  invoiceData()
}

// function to converting data into json

function tableData() {
    const tableRows = document.querySelectorAll('#tableBody tr');
    const serializedData = [];

    tableRows.forEach(row => {
      const rowData = {
        name: row.cells[0].innerText,
        batch: row.cells[1].innerText,
        invoicerate: row.cells[4].innerText,
        quantity: row.cells[5].innerText,
        discount: row.cells[6].innerText,
        free: row.cells[7].innerText,
      };

      serializedData.push(rowData);
    });

    // console.log(JSON.stringify(serializedData));
   return serializedData;
}

function invoiceData() {
    let customerName = document.getElementById('customer-name').value;
    let invoiceDate = document.getElementById('invoice-date').value;
    let invoiceNumber = document.getElementById('invoice-number').value;
    let transactionType = document.getElementById('invoice-type').value;

    const data = {
      invoiceNumber: Number(invoiceNumber),
      customerName: customerName,
      date: Date(invoiceDate),
      type: transactionType,
      products: tableData()
    }
   // serializeTable()
   // return JSON.stringify(data);
    sendDataToServer('/invoices',data);
}








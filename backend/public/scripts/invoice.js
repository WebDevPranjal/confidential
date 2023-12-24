// show batch in dialog box
function showBatchDetails(batches) {
    const overlay = document.getElementById('overlay');
    const batchDetails = document.getElementById('batchDetails');
    const batchList = document.getElementById('batchList');
    const productName = document.getElementById('product').value;
    batchList.innerHTML = '';

    const selectedProduct = batches.find(product => product.name === productName);

    if (selectedProduct) {
      document.getElementById('salerate').value = selectedProduct.salerate;
    }

    if (selectedProduct) {
      selectedProduct.batches.forEach(batch => {
        if (batch) {
          const listItem = document.createElement('li');
          listItem.textContent = `Batch: ${batch.batch}, Quantity: ${batch.quantity}, MRP: ${batch.mrp}`;
          listItem.addEventListener('click', function () {
            document.getElementById('batch').value = batch.batch;
            document.getElementById('product-date').value = new Date(batch.expireDate).toISOString().split('T')[0];
            document.getElementById('product-mrp').value = batch.mrp;
            closeBatchDetails();
          });

          batchList.appendChild(listItem);
        }
      });
    }

    overlay.style.display = 'block';
    batchDetails.style.display = 'block';
}

function closeBatchDetails() {
    const overlay = document.getElementById('overlay');
    const batchDetails = document.getElementById('batchDetails');

    overlay.style.display = 'none';
    batchDetails.style.display = 'none';
}

// add data to table

function addToTable() {

    const productName = document.getElementById('product').value;
    const selectedBatch = document.getElementById('batch').value;
    const expireDate = document.getElementById('product-date').value;
    const mrp = document.getElementById('product-mrp').value;
    const salerate = document.getElementById('salerate').value;
    const quantity = document.getElementsByName('quantity')[0].value;
    const discount = document.getElementsByName('discount')[0].value;
    const free = document.getElementsByName('free')[0].value;

   
    if (!productName || !selectedBatch || !expireDate || !mrp || !salerate || !quantity || !discount || !free) {
      alert("Please fill in all fields.");
      return;
    }

    const tableBody = document.getElementById('tableBody');
    const newRow = tableBody.insertRow(tableBody.rows.length);

    const values = [productName, selectedBatch, expireDate, mrp, salerate, quantity, discount, free];
    values.forEach((value, index) => {
      newRow.insertCell(index).innerHTML = value;
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', function () {
      const rowIndex = this.parentNode.parentNode.rowIndex;
      document.getElementById('productTable').deleteRow(rowIndex);
    });

    const cellDelete = newRow.insertCell(8);
    cellDelete.appendChild(deleteButton);

    const elementIds = ['product', 'batch', 'product-date', 'product-mrp', 'salerate', 'quantity', 'discount', 'free'];
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

// creating batch in purchase invoice

function createBatch() {
  const productName = document.getElementById('product').value;
  const batch = document.getElementById('batch').value;
  const expireDate = document.getElementById('product-date').value;
  const packaging =document.getElementById('packaging').value;
  const mrp = document.getElementById('product-mrp').value;

  const data = {
    name:productName,
    batch: {
      batch: batch,
      quantity: 0,
      expireDate: expireDate,
      packaging: packaging,
      mrp: mrp
    }
  }
  console.log(JSON.stringify(data))
}






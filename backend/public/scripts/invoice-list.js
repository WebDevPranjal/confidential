function deleteInvoice(id) {
    // Send a delete request to the server
    fetch(`/invoices/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            // Reload the page after successful deletion
            window.location.reload();
        } else {
            console.error('Failed to delete invoice');
        }
    })
    .catch(error => console.error('Error:', error));
}


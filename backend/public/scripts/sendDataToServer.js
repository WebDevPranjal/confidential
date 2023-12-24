export function sendDataToServer(endpoint, data) {
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data // Ensure data is stringified for JSON content type
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

  
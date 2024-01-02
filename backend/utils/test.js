const twilio = require('twilio');
const path = require('path');
const fs = require('fs');

// Twilio credentials
const accountSid = 'ACd7684484aaf376975ef48a522e4d0e7e';
const authToken = '87bd250e72f13b5cf20ce7c2a9a242fb';
const twilioPhone = '+16175805496';

// Recipient's phone number
const toPhoneNumber = '+919617335198';

// Create a Twilio client
const client = twilio(accountSid, authToken);

// Read Excel file as base64
const excelPath = path.join(__dirname, 'template.xlsx');
const excelBase64 = fs.readFileSync(excelPath, { encoding: 'base64' });


// Send Excel file via Twilio
client.messages
  .create({
    body: 'Check out this Excel file!',
    from: twilioPhone,
    mediaUrl: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${excelBase64}`,
    to: toPhoneNumber
  })
  .then(message => console.log(`Message sent: ${message.sid}`))
  .catch(error => console.error(`Error sending message: ${error.message}`));

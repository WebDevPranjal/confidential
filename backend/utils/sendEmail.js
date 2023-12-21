const multer = require('multer');
const nodemailer = require('nodemailer');

// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Function to send email with attachment
function sendEmailWithAttachment(to, subject, text, fileName, fileBuffer) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'vpranjal291003@gmail.com', // Your Gmail email address
            pass: 'Abhinav@1', // Your Gmail password (use an "App Password" for better security)
        },
    });

    const mailOptions = {
        from: 'vpranjal291003@gmial.com', // Your Gmail email address
        to: 'pv291003@gmail.com',
        subject: subject,
        text: text,
        attachments: [
            {
                filename: fileName,
                content: fileBuffer,
            },
        ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

// Middleware for handling file uploads
const uploadFile = upload.single('template.xlsx');

// Express route handler for file uploads and email sending
function handleFileUploadAndEmail(req, res) {
    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;

    // Send the file as an email attachment
    sendEmailWithAttachment('recipient@example.com', 'Subject', 'Body', fileName, fileBuffer);

    res.send('File uploaded and email sent successfully!');
}

module.exports = {
    uploadFile,
    handleFileUploadAndEmail,
};

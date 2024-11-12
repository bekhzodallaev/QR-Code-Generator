const express = require('express');
const QRCode = require('qrcode');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5500;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/generate', async (req, res) => {
  const { url, color } = req.body;
  try {
    const qrCodeImage = await QRCode.toDataURL(url, {
      color: {
        dark: color || '#000000',
      },
      width: 250,
    });
    res.json({ qrCodeImage });
  } catch (err) {
    console.error('Error generating QR Code', err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log('Server is running on Port:', PORT);
});

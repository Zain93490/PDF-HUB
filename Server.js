const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const app = express();
const port = process.env.PORT || 5000;

const upload = multer({ storage: multer.memoryStorage() });

app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const pdfBuffer = req.file.buffer;
    const pdfData = await pdfParse(pdfBuffer);
    const text = pdfData.text;

    // Translate text using Google Translate API
    const response = await axios.post('https://translation.googleapis.com/language/translate/v2', {
      q: text,
      target: 'ur',
      key: 'YOUR_GOOGLE_TRANSLATE_API_KEY'
    });

    const translatedText = response.data.data.translations[0].translatedText;

    res.json({ translatedText });
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).send('Error processing file');
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Frontend Setup
const clientDir = path.join(__dirname, 'client');
if (!fs.existsSync(clientDir)) {
  fs.mkdirSync(clientDir);
}

const packageJson = {
  name: "client",
  version: "1.0.0",
  private: true,
  dependencies: {
    axios: "^0.21.1",
    react: "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "4.0.3"
  }
};

fs.writeFileSync(path.join(clientDir, 'package.json'), JSON.stringify(packageJson, null, 2));

const appJs = `
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [translatedText, setTranslatedText] = useState('');

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="App">
      <h1>PDF to Urdu Translator</h1>
      <input type="file" onChange={onFileChange} />
      <button onClick={onUpload}>Upload and Translate</button>
      <div>
        <h2>Translated Text:</h2>
        <p>{translatedText}</p>
      </div>
    </div>
  );
}

export default App;
`;

const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PDF to Urdu Translator</title>
</head>
<body>
  <div id="root"></div>
  <script src="/static/js/bundle.js"></script>
</body>
</html>
`;

const srcDir = path.join(clientDir, 'src');
if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir);
}

fs.writeFileSync(path.join(srcDir, 'App.js'), appJs);
fs.writeFileSync(path.join(clientDir, 'public', 'index.html'), indexHtml);

execSync('cd client && npm install');
execSync('cd client && npm run build');

console.log('Client build complete.');

index.html, styles.css, scripts.js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PDF HUB</title>
    <link rel="stylesheet" href="styles.css"> <!-- ایکسٹرنل سی ایس ایس فائل کا لنک -->
</head>
<body>
    <header>
        <div class="container">
            <h1>PDF HUB</h1> <!-- ویب سائٹ کا نام -->
        </div>
    </header>

    <div class="container">
        <div class="upload-form">
            <h2>Upload PDF</h2> <!-- پی ڈی ایف اپ لوڈ کرنے کا عنوان -->
            <form id="uploadForm" enctype="multipart/form-data">
                <input type="file" id="fileInput" accept=".pdf"> <!-- پی ڈی ایف فائل اپ لوڈ کرنے کے لیے -->
                <button type="submit">Upload PDF</button> <!-- پی ڈی ایف اپ لوڈ کرنے کا بٹن -->
            </form>
        </div>

        <div class="animations">
            <p>Interactive Animations and File Management Here!</p> <!-- اینیمیشنز اور فائل مینجمنٹ کا پیغام -->
        </div>

        <div class="files-list" id="filesList">
            <h2>Available PDFs</h2> <!-- دستیاب پی ڈی ایفز کا عنوان -->
            <!-- فائلوں کے لنکس یہاں متحرک طور پر شامل کیے جائیں گے -->
        </div>
    </div>

    <footer>
        <p>&copy; 2024 PDF HUB</p> <!-- فٹر میں کاپی رائٹ کا پیغام -->
    </footer>

    <script src="scripts.js"></script> <!-- ایکسٹرنل جاوا اسکرپٹ فائل کا لنک -->
</body>
</html>

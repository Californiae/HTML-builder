const fs = require('fs');
const path = require('path');

// Путь к файлу text.txt
const filePath = path.join(__dirname, 'text.txt');

// Создание потока чтения
const readStream = fs.createReadStream(filePath, 'utf-8');

// Обработка событий потока
readStream.on('data', (chunk) => {
  process.stdout.write(chunk);
});

readStream.on('error', (err) => {
  console.error('Error reading file:', err.message);
});

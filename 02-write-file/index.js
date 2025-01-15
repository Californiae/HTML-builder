const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Путь к файлу
const filePath = path.join(__dirname, 'output.txt');
const writeStream = fs.createWriteStream(filePath);

// Создаём интерфейс для чтения ввода
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Добро пожаловать! Введите текст для записи в файл. Для выхода напишите "exit" или нажмите Ctrl + C.');

// Обрабатываем ввод пользователя
rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('Спасибо, текст записан. До свидания!');
    rl.close();
  } else {
    writeStream.write(`${input}\n`);
  }
});

// Обрабатываем выход из программы
rl.on('close', () => {
  console.log('Процесс завершён.');
  writeStream.end();
});

// Обрабатываем Ctrl + C
process.on('SIGINT', () => {
  console.log('\nПроцесс завершён с помощью Ctrl + C. До свидания!');
  rl.close();
});

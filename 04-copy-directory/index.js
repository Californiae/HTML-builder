const fs = require('fs/promises');
const path = require('path');

async function copyDir(src, dest) {
  try {
    // Создаем папку назначения, если её нет
    await fs.mkdir(dest, { recursive: true });

    // Читаем содержимое исходной папки
    const entries = await fs.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name); // Путь к исходному файлу/папке
      const destPath = path.join(dest, entry.name); // Путь к файлу/папке назначения

      if (entry.isFile()) {
        // Копируем файл
        await fs.copyFile(srcPath, destPath);
      } else if (entry.isDirectory()) {
        // Рекурсивно копируем папку
        await copyDir(srcPath, destPath);
      }
    }

    console.log(`Directory copied from ${src} to ${dest}`);
  } catch (error) {
    console.error(`Error copying directory: ${error.message}`);
  }
}

// Пути к папкам
const srcFolder = path.join(__dirname, 'files');
const destFolder = path.join(__dirname, 'files-copy');

// Вызываем функцию для копирования
copyDir(srcFolder, destFolder);

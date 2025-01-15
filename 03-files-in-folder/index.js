const fs = require('fs/promises');
const path = require('path');

// Path to the secret-folder
const folderPath = path.join(__dirname, 'secret-folder');

(async () => {
  try {
    // Read directory contents
    const dirEntries = await fs.readdir(folderPath, { withFileTypes: true });

    // Process each entry
    for (const entry of dirEntries) {
      if (entry.isFile()) {
        const filePath = path.join(folderPath, entry.name);
        const fileStats = await fs.stat(filePath);

        const fileName = path.basename(entry.name, path.extname(entry.name));
        const fileExt = path.extname(entry.name).slice(1); // Remove the leading dot
        const fileSizeKB = (fileStats.size / 1024).toFixed(3);

        console.log(`${fileName} - ${fileExt} - ${fileSizeKB}kb`);
      }
    }
  } catch (error) {
    console.error('Error reading folder:', error.message);
  }
})();

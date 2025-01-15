const fs = require('fs/promises');
const path = require('path');

async function mergeStyles() {
  try {
    const stylesFolder = path.join(__dirname, 'styles');
    const outputFolder = path.join(__dirname, 'project-dist');
    const outputFile = path.join(outputFolder, 'bundle.css');

    // Ensure project-dist exists
    await fs.mkdir(outputFolder, { recursive: true });

    // Clear or create bundle.css
    await fs.writeFile(outputFile, '');

    // Read the styles folder
    const files = await fs.readdir(stylesFolder, { withFileTypes: true });

    for (const file of files) {
      const filePath = path.join(stylesFolder, file.name);

      // Check if it's a CSS file
      if (file.isFile() && path.extname(file.name) === '.css') {
        const data = await fs.readFile(filePath, 'utf-8');
        await fs.appendFile(outputFile, data + '\n');
      }
    }

    console.log(`CSS files have been merged into ${outputFile}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// Execute the function
mergeStyles();

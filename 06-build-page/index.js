const fs = require('fs/promises');
const path = require('path');

async function buildPage() {
    const distDir = path.join(__dirname, 'project-dist');
    const componentsDir = path.join(__dirname, 'components');
    const stylesDir = path.join(__dirname, 'styles');
    const assetsDir = path.join(__dirname, 'assets');

    // Создание папки project-dist
    await fs.mkdir(distDir, { recursive: true });

    // Чтение шаблона
    const templatePath = path.join(__dirname, 'template.html');
    let template = await fs.readFile(templatePath, 'utf-8');

    // Заменяем шаблонные теги
    const componentFiles = await fs.readdir(componentsDir);
    for (let file of componentFiles) {
        const componentName = path.parse(file).name;
        const componentPath = path.join(componentsDir, file);
        const componentContent = await fs.readFile(componentPath, 'utf-8');
        
        const tag = `{{${componentName}}}`;
        template = template.replace(tag, componentContent);
    }

    // Запись измененного шаблона в index.html
    const indexPath = path.join(distDir, 'index.html');
    await fs.writeFile(indexPath, template);

    // Объединяем CSS файлы
    const styleFiles = await fs.readdir(stylesDir);
    let styles = '';
    for (let file of styleFiles) {
        if (path.extname(file) === '.css') {
            const stylePath = path.join(stylesDir, file);
            const styleContent = await fs.readFile(stylePath, 'utf-8');
            styles += styleContent + '\n';
        }
    }

    // Запись стилей в style.css
    const stylePath = path.join(distDir, 'style.css');
    await fs.writeFile(stylePath, styles);

    // Копируем папку assets
    const assetsDistDir = path.join(distDir, 'assets');
    await copyDirectory(assetsDir, assetsDistDir);
}

async function copyDirectory(src, dest) {
    await fs.mkdir(dest, { recursive: true });

    const files = await fs.readdir(src);
    for (const file of files) {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);

        const stat = await fs.stat(srcPath);
        if (stat.isDirectory()) {
            await copyDirectory(srcPath, destPath);  // рекурсивный вызов для папок
        } else {
            await fs.copyFile(srcPath, destPath);  // копирование файла
        }
    }
}

// Запуск сборки
buildPage().catch(err => console.log(err));

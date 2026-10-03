const fs = require('fs');
const path = require('path');

const materiasDir = path.join(__dirname, 'materias');

if (fs.existsSync(materiasDir)) {
    const files = fs.readdirSync(materiasDir).filter(f => f.endsWith('.html'));
    
    for (const file of files) {
        const filePath = path.join(materiasDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        if (content.includes('navbar-container') && content.includes('design-system.css')) {
            continue;
        }

        // 1. Update CSS
        content = content.replace(
            /<link rel="stylesheet" href="\.\.\/css\/styles\.css">/g,
            '<link rel="stylesheet" href="../css/design-system.css">\n    <link rel="stylesheet" href="../css/navbar.css">'
        );
        
        // 2. Add navbar
        content = content.replace(
            /(<body[^>]*>)/i,
            '$1\n    <div id="navbar-container"></div>'
        );
        
        // 3. Add script
        content = content.replace(
            /<\/body>/i,
            '    <script src="../js/layout.js"></script>\n</body>'
        );
        
        fs.writeFileSync(filePath, content, 'utf8');
    }
    console.log(`Updated ${files.length} files in materias folder.`);
} else {
    console.log('Materias directory not found.');
}

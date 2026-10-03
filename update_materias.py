import os
import re
import glob

# Ruta al directorio materias
materias_dir = r"c:\Users\jeffe\OneDrive\Desktop\SABIQUIZ\materias"

html_files = glob.glob(os.path.join(materias_dir, "*.html"))

for file_path in html_files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Skip if already updated
    if "navbar-container" in content and "design-system.css" in content:
        continue

    # 1. Update CSS links
    content = re.sub(
        r'<link rel="stylesheet" href="\.\./css/styles\.css">',
        '<link rel="stylesheet" href="../css/design-system.css">\n    <link rel="stylesheet" href="../css/navbar.css">',
        content
    )

    # 2. Add navbar-container after <body>
    content = re.sub(
        r'(<body[^>]*>)',
        r'\1\n    <div id="navbar-container"></div>',
        content
    )

    # 3. Add layout.js script before </body>
    content = re.sub(
        r'(</body>)',
        r'    <script src="../js/layout.js"></script>\n\1',
        content
    )

    # Note: We won't try to automatically wrap in <main class="main-content"> for all files, 
    # as their internal structure varies too much (some have .container, some have .game-container, etc).
    # The navbar will appear at the top, and layout.js will inject the navbar with ../ prefixes correctly.

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print(f"Updated {len(html_files)} files in materias folder.")

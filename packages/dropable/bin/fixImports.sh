#!/bin/bash

BUILD_DIR="build"

# Находим все JS файлы и заменяем .module.scss → .module.css
find "$BUILD_DIR" -type f -name "*.js" | while read -r file; do
  sed -i 's/\.module\.scss/\.module\.css/g' "$file"
  # echo "Updated: $file"
done

echo "✅ Все импорты .module.scss заменены на .module.css!"
#!/bin/bash

# Переходим в корень проекта
cd "$(dirname "$0")"

# Публикуем все пакеты в packages/*
for dir in packages/*; do
  if [ -d "$dir" ] && [ -f "$dir/package.json" ]; then
    echo "📦 Publishing $dir..."
    (cd "$dir" && npm publish --access public)
  fi
done

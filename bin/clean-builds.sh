#!/bin/bash

# Найти все папки с именем "build" и удалить их рекурсивно
find ./packages -type d -name "build" -exec rm -rf {} +

echo "✅ All 'build' folders removed! pathes: ./packages"

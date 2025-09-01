#!/bin/bash
# Generate all UML diagrams from Mermaid files

echo "Generating UML diagrams..."

# Check if mermaid-cli is installed
if ! command -v mmdc &> /dev/null; then
    echo "Error: mermaid-cli is not installed."
    echo "Install it with: npm install -g @mermaid-js/mermaid-cli"
    exit 1
fi

# Create output directories
mkdir -p png
mkdir -p svg

# Dynamically find all .mmd files in current directory (using glob)
shopt -s nullglob  # Enable nullglob so empty matches return empty array
mmd_files=(*.mmd)
shopt -u nullglob  # Disable nullglob

# Check if any .mmd files were found
if [ ${#mmd_files[@]} -eq 0 ]; then
    echo "No .mmd files found in current directory"
    exit 1
fi

echo "Found ${#mmd_files[@]} Mermaid diagram files: ${mmd_files[*]}"

# Generate PNG and SVG for each diagram
for mmd_file in "${mmd_files[@]}"; do
    # Extract filename without extension and path
    diagram=$(basename "$mmd_file" .mmd)
    echo "Processing $diagram..."
    
    # Generate PNG (high resolution with white background)
    mmdc -i "$mmd_file" -o "png/$diagram.png" -w 1920 -H 1080 -b white -t neutral
    
    # Generate SVG (vector with white background)
    mmdc -i "$mmd_file" -o "svg/$diagram.svg" -b white -t neutral
    
    echo "✓ Generated $diagram.png and $diagram.svg"
done

echo ""
echo "🎉 All diagrams generated successfully!"
echo "📁 PNG files: diagrams/png/"
echo "📁 SVG files: diagrams/svg/"
echo ""
echo "Generated files:"
ls -la png/
echo ""
ls -la svg/
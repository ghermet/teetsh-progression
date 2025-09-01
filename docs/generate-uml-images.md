# Generate UML Images from Mermaid Diagrams

## Created Diagram Files

The following Mermaid diagram files have been created in the `diagrams/` directory:

1. **01-database-erd.mmd** - Entity Relationship Diagram for the database schema
2. **02-api-class-diagram.mmd** - API class structure and relationships
3. **03-api-sequence-diagram.mmd** - API endpoint flow sequences
4. **04-data-transformation-flow.mmd** - Data processing pipeline
5. **05-database-performance.mmd** - Database indexing and performance optimization
6. **06-caching-strategy.mmd** - Multi-layer caching architecture

## Methods to Generate Images

### Option 1: Using Mermaid CLI (Recommended)

Install the Mermaid CLI globally:

```bash
npm install -g @mermaid-js/mermaid-cli
```

Generate all images at once:

```bash
# Navigate to the project directory
cd /Users/guillaumehermet/Documents/teetsh-progression

# Generate PNG images (high resolution)
mmdc -i diagrams/01-database-erd.mmd -o diagrams/01-database-erd.png -w 1920 -H 1080
mmdc -i diagrams/02-api-class-diagram.mmd -o diagrams/02-api-class-diagram.png -w 1920 -H 1080
mmdc -i diagrams/03-api-sequence-diagram.mmd -o diagrams/03-api-sequence-diagram.png -w 1920 -H 1080
mmdc -i diagrams/04-data-transformation-flow.mmd -o diagrams/04-data-transformation-flow.png -w 1920 -H 1080
mmdc -i diagrams/05-database-performance.mmd -o diagrams/05-database-performance.png -w 1920 -H 1080
mmdc -i diagrams/06-caching-strategy.mmd -o diagrams/06-caching-strategy.png -w 1920 -H 1080

# Generate SVG images (vector format)
mmdc -i diagrams/01-database-erd.mmd -o diagrams/01-database-erd.svg
mmdc -i diagrams/02-api-class-diagram.mmd -o diagrams/02-api-class-diagram.svg
mmdc -i diagrams/03-api-sequence-diagram.mmd -o diagrams/03-api-sequence-diagram.svg
mmdc -i diagrams/04-data-transformation-flow.mmd -o diagrams/04-data-transformation-flow.svg
mmdc -i diagrams/05-database-performance.mmd -o diagrams/05-database-performance.svg
mmdc -i diagrams/06-caching-strategy.mmd -o diagrams/06-caching-strategy.svg
```

### Option 2: Using Online Mermaid Editor

1. Go to [Mermaid Live Editor](https://mermaid.live/)
2. Copy the content of each `.mmd` file into the editor
3. Click "Download PNG" or "Download SVG" to save the image
4. Repeat for all 6 diagrams

### Option 3: Using VS Code Extension

1. Install the "Mermaid Markdown Syntax Highlighting" extension
2. Install the "Mermaid Preview" extension
3. Open each `.mmd` file in VS Code
4. Right-click and select "Export Mermaid Diagram"
5. Choose your preferred format (PNG, SVG, PDF)

### Option 4: Using GitHub/GitLab Integration

1. Create a markdown file with mermaid code blocks:

````markdown
# Database ERD

```mermaid
[paste content from 01-database-erd.mmd]
```
````

````

2. GitHub and GitLab automatically render Mermaid diagrams
3. Take screenshots or use browser tools to export

## Batch Generation Script

The included script `diagrams/generate-all-diagrams.sh` automatically discovers and generates images for all `.mmd` files:

**Key Features:**
- **Dynamic file discovery** - Automatically finds all `.mmd` files in the directory
- **No maintenance required** - Add new `.mmd` files and they'll be processed automatically
- **Error handling** - Checks for Mermaid CLI installation and file existence
- **High-quality output** - Generates both PNG (high-res) and SVG (vector) formats

Make it executable and run:

```bash
chmod +x generate-all-diagrams.sh
./generate-all-diagrams.sh
```

## Recommended Settings

For best quality images:

- **PNG**: Use `-w 1920 -H 1080` for high resolution
- **SVG**: Vector format, scales perfectly
- **Background**: Use `-b white` for clean white background
- **Theme**: Add `-t neutral` for neutral color scheme

## Troubleshooting

If you encounter issues:

1. **CLI not found**: Make sure Node.js and npm are installed
2. **Permission errors**: Use `sudo npm install -g @mermaid-js/mermaid-cli`
3. **Puppeteer issues**: Install chromium manually if needed
4. **Font issues**: Install system fonts for better text rendering

## File Structure After Generation

```
diagrams/
├── 01-database-erd.mmd
├── 01-database-erd.png
├── 01-database-erd.svg
├── 02-api-class-diagram.mmd
├── 02-api-class-diagram.png
├── 02-api-class-diagram.svg
├── ... (and so on for all diagrams)
└── generate-all-diagrams.sh
```
````

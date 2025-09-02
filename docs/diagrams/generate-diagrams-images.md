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

### Option 1: Using the Batch Generation Script (Recommended)

The included script `diagrams/generate-diagrams-images.sh` automatically discovers and generates images for all `.mmd` files in the `diagrams` directory.

**Key Features:**

- **Dynamic file discovery** - Automatically finds all `.mmd` files in the directory
- **No maintenance required** - Add new `.mmd` files and they'll be processed automatically
- **Error handling** - Checks for Mermaid CLI installation and file existence
- **High-quality output** - Generates both PNG (high-res) and SVG (vector) formats

**Instructions:**

1.  Install the Mermaid CLI globally:
    ```bash
    npm install -g @mermaid-js/mermaid-cli
    ```
2.  Make the script executable (you only need to do this once):
    ```bash
    chmod +x docs/diagrams/generate-diagrams-images.sh
    ```
3.  Run the script from the project root:
    ```bash
    ./docs/diagrams/generate-diagrams-images.sh
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

2. GitHub and GitLab automatically render Mermaid diagrams
3. Take screenshots or use browser tools to export

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
├── 02-api-class-diagram.mmd
├── 03-api-sequence-diagram.mmd
├── 04-data-transformation-flow.mmd
├── 05-database-performance.mmd
├── 06-caching-strategy.mmd
├── generate-diagrams-images.sh
├── png/
│   ├── 01-database-erd.png
│   ├── 02-api-class-diagram.png
│   ├── 03-api-sequence-diagram.png
│   ├── 04-data-transformation-flow.png
│   ├── 05-database-performance.png
│   └── 06-caching-strategy.png
└── svg/
    ├── 01-database-erd.svg
    ├── 02-api-class-diagram.svg
    ├── 03-api-sequence-diagram.svg
    ├── 04-data-transformation-flow.svg
    ├── 05-database-performance.svg
    └── 06-caching-strategy.svg
```
````

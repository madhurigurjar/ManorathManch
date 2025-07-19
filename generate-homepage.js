const fs = require('fs');
const path = require('path');

const storiesDir = path.join(__dirname, 'docs', 'stories');
const outputDir = path.join(__dirname, 'docs');
const outputFile = path.join(outputDir, 'index.html');

/**
 * Creates a user-friendly title from a filename slug.
 * e.g., 'my-cool-story' -> 'My Cool Story'
 * @param {string} slug The filename without the .html extension.
 * @returns {string} A formatted title.
 */
function createTitleFromSlug(slug) {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

try {
  // 1. Ensure the stories directory exists before trying to read from it.
  if (!fs.existsSync(storiesDir)) {
    throw new Error(`Stories directory not found at: ${storiesDir}`);
  }

  // 2. Read all story files from the directory.
  const storyFiles = fs.readdirSync(storiesDir).filter(file => file.endsWith('.html'));

  // 3. Generate an HTML list item for each story.
  const storyListItems = storyFiles.map(file => {
    const slug = file.replace(/\.html$/, '');
    const title = createTitleFromSlug(slug);
    // The link path is relative to the `docs` root.
    const storyPath = `stories/${file}`;
    return `
      <li style="margin-bottom: 1rem;">
        <a href="${storyPath}" style="display: block; padding: 1.5rem; border: 1px solid #ddd; border-radius: 8px; text-decoration: none; color: #0070f3; font-size: 1.25rem; font-weight: 500; transition: border-color 0.2s;">
          ${title}
        </a>
      </li>`;
  }).join('');

  // 4. Assemble the final HTML for the homepage.
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Our Web Stories</title>
  <meta name="description" content="A collection of our latest and greatest web stories.">
  <style>
    body { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; color: #333; }
    header { border-bottom: 1px solid #eaeaea; padding-bottom: 1rem; margin-bottom: 2rem; }
    h1 { font-size: 2.5rem; margin: 0; }
    header p { color: #666; margin-top: 0.5rem; }
    ul { list-style: none; padding: 0; }
    a:hover { border-color: #0070f3; }
  </style>
</head>
<body>
  <main>
    <header>
      <h1>Web Stories</h1>
      <p>Discover our latest content in an immersive story format.</p>
    </header>
    ${storyListItems.length > 0 ? `<ul>${storyListItems}</ul>` : `<p>No stories found. Add HTML files to the 'docs/stories' directory and run the build script.</p>`}
  </main>
</body>
</html>`;

  // 5. Write the generated HTML to the output file.
  fs.writeFileSync(outputFile, htmlContent.trim());
  console.log(`✅ Homepage successfully generated at ${outputFile}`);

} catch (error) {
  console.error('❌ Error generating homepage:', error.message);
  process.exit(1); // Exit with an error code
}
const fs = require('fs'),
    Handlebars = require('handlebars');

function render(content) {
    const normalizeCss = fs.readFileSync(__dirname + '/normalize.css', 'utf-8');
    const css = fs.readFileSync(__dirname + '/style.css', 'utf-8');
    const tpl = fs.readFileSync(__dirname + '/index.hbs', 'utf-8');

    return Handlebars.compile(tpl)({
        normalizeCss,
        css,
        content
    });
}

const args = process.argv.slice(2);

const textLines = fs.readFileSync(args[0], 'utf-8').split('\n');
const parsedLines = [];

textLines
    .map(line => line.trim())
    .filter(line => '' !== line)
    .forEach(line => parsedLines.push(line));

const content = {
    episode: parsedLines[0],
    title: parsedLines[1],
    paragraphs: parsedLines.slice(2)
}

fs.writeFileSync('index.html', render(content), 'utf-8');

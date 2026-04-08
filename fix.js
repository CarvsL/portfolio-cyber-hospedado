const fs = require('fs');
let code = fs.readFileSync('js/script.js', 'utf8');

let startIndex = code.indexOf('const projects = [');
let endIndex = code.indexOf('let currentModalProjectId = null;');

let projectsBlock = code.substring(startIndex, endIndex);

projectsBlock = projectsBlock.replace(/\{ type: '([^']+)', src: '([^']+)' \}/g, (match, type, src) => {
    let filename = src.split('/').pop();
    let name = filename.substr(0, filename.lastIndexOf('.')) || filename;
    name = name.replaceAll('%20', ' ');
    name = name.charAt(0).toUpperCase() + name.slice(1);
    return { type: '', label: '', src: '' };
});

code = code.substring(0, startIndex) + projectsBlock + code.substring(endIndex);
fs.writeFileSync('js/script.js', code, 'utf8');
console.log('Fixed labels!');

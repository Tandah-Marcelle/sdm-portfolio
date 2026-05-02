import * as fs from 'fs';
import * as path from 'path';

function walk(dir: string, callback: (filepath: string) => void) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(dirPath);
    });
}

function replaceColors() {
    console.log("Starting Eco-Tech Transformation...");

    walk(path.join(process.cwd(), 'views'), (filepath) => {
        if (!filepath.endsWith('.ejs')) return;

        let content = fs.readFileSync(filepath, 'utf8');
        let initialContent = content;

        // 1. Text Accents
        content = content.replace(/text-amber-500/g, 'text-emerald-400');

        // 2. Borders
        content = content.replace(/border-amber-500\/50/g, 'border-emerald-500/50');
        content = content.replace(/border-amber-500\/40/g, 'border-emerald-500/40');
        content = content.replace(/border-amber-500\/30/g, 'border-emerald-500/30');
        content = content.replace(/border-amber-500\/20/g, 'border-emerald-500/20');
        content = content.replace(/border-amber-500\/10/g, 'border-emerald-500/10');
        content = content.replace(/border-amber-500/g, 'border-cyan-500');

        // 3. Backgrounds and Gradients
        // High impact solid buttons
        content = content.replace(/bg-amber-500 text-black/g, 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:from-emerald-400 hover:to-cyan-400 border border-emerald-400/50');
        content = content.replace(/bg-amber-500\/10/g, 'bg-emerald-500/10');
        content = content.replace(/bg-amber-500\/5/g, 'bg-emerald-500/5');
        content = content.replace(/bg-amber-500/g, 'bg-emerald-500');

        // Custom stuff
        content = content.replace(/shadow-amber-500/g, 'shadow-emerald-500');
        content = content.replace(/pulse-amber/g, 'pulse-emerald');
        content = content.replace(/from-amber-500/g, 'from-emerald-500');
        content = content.replace(/to-amber-400/g, 'to-cyan-500');

        // Selection
        content = content.replace(/selection:bg-amber-500\/30/g, 'selection:bg-emerald-500/30');
        content = content.replace(/selection:text-amber-500/g, 'selection:text-emerald-400');

        if (initialContent !== content) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Updated: ${filepath}`);
        }
    });

    console.log("Transformation Complete.");
}

replaceColors();

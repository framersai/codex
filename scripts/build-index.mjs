#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import yaml from 'js-yaml';

const ROOT = process.cwd();
const WEAVES_DIR = path.join(ROOT, 'weaves');
const TAGS_FILE = path.join(ROOT, 'tags', 'index.yaml');

const read = (p) => fs.readFileSync(p, 'utf8');
const safeRead = (p) => (fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null);
const listDirs = (p) => fs.readdirSync(p).filter((f) => fs.statSync(path.join(p, f)).isDirectory());
const listFiles = (p) => fs.readdirSync(p).filter((f) => fs.statSync(path.join(p, f)).isFile());

function loadYAML(filePath) {
  const txt = safeRead(filePath);
  if (!txt) return null;
  return yaml.load(txt);
}

function loadStrand(filePath) {
  const raw = read(filePath);
  const fm = matter(raw);
  const fmData = fm.data || {};
  const title = fmData.title || path.basename(filePath, '.md');
  const summary = fmData.summary || '';
  const slug = fmData.slug || path.basename(filePath, '.md');
  const tags = (fmData.taxonomy?.topic || []).concat(fmData.taxonomy?.subtopic || []);
  return {
    id: fmData.id || null,
    slug,
    title,
    summary,
    path: path.relative(ROOT, filePath).replace(/\\/g, '/'),
    contentType: fmData.contentType || 'reference',
    difficulty: fmData.difficulty || null,
    tags,
    relationships: fmData.relationships || []
  };
}

function buildIndex() {
  const tags = loadYAML(TAGS_FILE) || {};
  const tree = [];
  const flat = [];

  if (!fs.existsSync(WEAVES_DIR)) {
    console.error('No weaves directory found.');
    process.exit(1);
  }

  for (const weaveSlug of listDirs(WEAVES_DIR)) {
    const weaveDir = path.join(WEAVES_DIR, weaveSlug);
    const weaveYaml = loadYAML(path.join(weaveDir, 'weave.yaml')) || {};
    const weaveNode = {
      slug: weaveSlug,
      title: weaveYaml.title || weaveSlug,
      description: weaveYaml.description || '',
      looms: []
    };

    const loomsDir = path.join(weaveDir, 'looms');
    if (fs.existsSync(loomsDir)) {
      for (const loomSlug of listDirs(loomsDir)) {
        const loomDir = path.join(loomsDir, loomSlug);
        const loomYaml = loadYAML(path.join(loomDir, 'loom.yaml')) || {};
        const strandsDir = path.join(loomDir, 'strands');
        const loomNode = {
          slug: loomSlug,
          title: loomYaml.title || loomSlug,
          summary: loomYaml.summary || '',
          tags: loomYaml.tags || [],
          strands: []
        };
        if (fs.existsSync(strandsDir)) {
          for (const file of listFiles(strandsDir).filter((f) => f.endsWith('.md'))) {
            const strand = loadStrand(path.join(strandsDir, file));
            loomNode.strands.push(strand);
            flat.push({
              weave: weaveSlug,
              loom: loomSlug,
              ...strand
            });
          }
        }
        weaveNode.looms.push(loomNode);
      }
    }
    tree.push(weaveNode);
  }

  const index = {
    generatedAt: new Date().toISOString(),
    tags,
    tree,
    flat
  };
  const outPath = path.join(ROOT, 'index.json');
  fs.writeFileSync(outPath, JSON.stringify(index, null, 2), 'utf8');
  console.log(`Wrote ${outPath} with ${flat.length} strands.`);
}

buildIndex();



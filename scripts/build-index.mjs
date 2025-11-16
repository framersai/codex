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
const IGNORED_SEGMENTS = new Set(['.git', '.github', '.DS_Store', 'node_modules', '.cache']);

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

const formatSegment = (segment = '') =>
  segment
    .replace(/[-_]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const formatLoomTitle = (relativePath = '') => {
  if (!relativePath) return 'Loose strands (root)';
  return relativePath
    .split(/[\\/]/)
    .filter(Boolean)
    .map(formatSegment)
    .join(' / ');
};

function ensureLoomNode(map, weaveDir, loomPath) {
  if (map.has(loomPath)) return map.get(loomPath);

  const absolutePath = loomPath ? path.join(weaveDir, loomPath) : weaveDir;
  const loomYaml = loadYAML(path.join(absolutePath, 'loom.yaml')) || {};

  const node = {
    slug: loomPath ? loomPath.replace(/[/\\]/g, '-').toLowerCase() : '__root__',
    title: loomYaml.title || formatLoomTitle(loomPath),
    summary: loomYaml.summary || (loomPath ? '' : 'Markdown files stored at the weave root'),
    tags: loomYaml.tags || [],
    strands: []
  };

  map.set(loomPath, node);
  return node;
}

function walkWeaveDirectory({ weaveDir, weaveSlug, weaveNode, flat }) {
  const loomMap = new Map();

  const walk = (currentDir, relativeDir = '') => {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      if (IGNORED_SEGMENTS.has(entry.name)) continue;
      if (entry.name.startsWith('.')) continue;

      const entryPath = path.join(currentDir, entry.name);
      const relativePath = relativeDir ? path.join(relativeDir, entry.name) : entry.name;

      if (entry.isDirectory()) {
        walk(entryPath, relativePath);
        continue;
      }

      if (!entry.isFile()) continue;
      if (!entry.name.toLowerCase().endsWith('.md')) continue;
      if (entry.name === 'weave.yaml' || entry.name === 'loom.yaml') continue;

      const strand = loadStrand(entryPath);
      const normalized = relativePath.replace(/\\/g, '/');
      const loomPath = path.posix.dirname(normalized);
      const key = loomPath === '.' ? '' : loomPath;
      const loomNode = ensureLoomNode(loomMap, weaveDir, key);

      loomNode.strands.push(strand);
      flat.push({
        weave: weaveSlug,
        loom: key || null,
        ...strand
      });
    }
  };

  walk(weaveDir);
  weaveNode.looms = Array.from(loomMap.values()).sort((a, b) => a.title.localeCompare(b.title));
}

function buildIndex() {
  const tags = loadYAML(TAGS_FILE) || {};
  const tree = [];
  const flat = [];

  if (!fs.existsSync(WEAVES_DIR)) {
    console.error('No weaves directory found.');
    process.exit(1);
  }

  const weaveDirs = fs
    .readdirSync(WEAVES_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const weaveSlug of weaveDirs) {
    const weaveDir = path.join(WEAVES_DIR, weaveSlug);
    const weaveYaml = loadYAML(path.join(weaveDir, 'weave.yaml')) || {};
    const weaveNode = {
      slug: weaveSlug,
      title: weaveYaml.title || weaveSlug,
      description: weaveYaml.description || '',
      looms: []
    };

    walkWeaveDirectory({ weaveDir, weaveSlug, weaveNode, flat });
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



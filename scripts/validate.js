const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const matter = require('gray-matter');
const { v4: uuidv4, validate: validateUUID } = require('uuid');

class CodexValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.suggestions = [];
  }

  // Validate weave schema
  validateWeave(data, filePath) {
    const required = ['slug', 'title', 'description'];
    required.forEach(field => {
      if (!data[field]) {
        this.errors.push(`${filePath}: Missing required field '${field}'`);
      }
    });

    if (data.slug && !/^[a-z0-9-]+$/.test(data.slug)) {
      this.errors.push(`${filePath}: Slug must be lowercase alphanumeric with hyphens`);
    }

    if (data.tags && !Array.isArray(data.tags)) {
      this.errors.push(`${filePath}: Tags must be an array`);
    }

    if (!data.license) {
      this.warnings.push(`${filePath}: No license specified (defaults to MIT)`);
    }
  }

  // Validate loom schema
  validateLoom(data, filePath) {
    const required = ['slug', 'title', 'summary'];
    required.forEach(field => {
      if (!data[field]) {
        this.errors.push(`${filePath}: Missing required field '${field}'`);
      }
    });

    if (data.ordering) {
      if (!['sequential', 'hierarchical', 'network'].includes(data.ordering.type)) {
        this.errors.push(`${filePath}: Invalid ordering type`);
      }
      if (data.ordering.items && !Array.isArray(data.ordering.items)) {
        this.errors.push(`${filePath}: Ordering items must be an array`);
      }
    }
  }

  // Validate strand schema
  validateStrand(data, filePath) {
    const required = ['id', 'slug', 'title'];
    required.forEach(field => {
      if (!data[field]) {
        this.errors.push(`${filePath}: Missing required field '${field}'`);
      }
    });

    if (data.id && !validateUUID(data.id)) {
      this.errors.push(`${filePath}: ID must be a valid UUID`);
    }

    if (data.contentType && !['markdown', 'code', 'data', 'media'].includes(data.contentType)) {
      this.errors.push(`${filePath}: Invalid content type`);
    }

    if (data.difficulty && !['beginner', 'intermediate', 'advanced', 'expert'].includes(data.difficulty)) {
      this.errors.push(`${filePath}: Invalid difficulty level`);
    }

    if (data.version && !/^\d+\.\d+\.\d+$/.test(data.version)) {
      this.warnings.push(`${filePath}: Version should follow semver format (x.y.z)`);
    }

    // Check relationships
    if (data.relationships) {
      if (data.relationships.requires && !Array.isArray(data.relationships.requires)) {
        this.errors.push(`${filePath}: Relationships.requires must be an array`);
      }
      if (data.relationships.references && !Array.isArray(data.relationships.references)) {
        this.errors.push(`${filePath}: Relationships.references must be an array`);
      }
    }

    // Suggest improvements
    if (!data.summary) {
      this.suggestions.push(`${filePath}: Consider adding a summary for better searchability`);
    }
    if (!data.tags || data.tags.length === 0) {
      this.suggestions.push(`${filePath}: Consider adding tags for better categorization`);
    }
    if (!data.version) {
      this.suggestions.push(`${filePath}: Consider adding a version number`);
    }
  }

  // Validate file
  validateFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      let data = {};

      if (filePath.endsWith('.yaml') || filePath.endsWith('.yml')) {
        data = yaml.load(content);
        
        // Determine type by path or content
        if (filePath.includes('weave.yaml')) {
          this.validateWeave(data, filePath);
        } else if (filePath.includes('loom.yaml')) {
          this.validateLoom(data, filePath);
        }
      } else if (filePath.endsWith('.md')) {
        const { data: frontmatter, content: body } = matter(content);
        data = frontmatter;
        
        // Validate as strand
        this.validateStrand(data, filePath);
        
        // Check content length
        if (body.trim().length < 100) {
          this.warnings.push(`${filePath}: Content is very short (< 100 characters)`);
        }
        
        // Check for TODO/FIXME
        if (/TODO:|FIXME:/i.test(body)) {
          this.warnings.push(`${filePath}: Contains TODO/FIXME comments`);
        }
      }

      return true;
    } catch (error) {
      this.errors.push(`${filePath}: ${error.message}`);
      return false;
    }
  }

  // Check for duplicates
  checkDuplicates(files) {
    const seen = {
      ids: new Map(),
      slugs: new Map(),
      titles: new Map()
    };

    files.forEach(filePath => {
      if (!filePath.endsWith('.md') && !filePath.endsWith('.yaml') && !filePath.endsWith('.yml')) {
        return;
      }

      try {
        const content = fs.readFileSync(filePath, 'utf8');
        let data = {};

        if (filePath.endsWith('.yaml') || filePath.endsWith('.yml')) {
          data = yaml.load(content);
        } else if (filePath.endsWith('.md')) {
          const { data: frontmatter } = matter(content);
          data = frontmatter;
        }

        // Check ID duplicates
        if (data.id) {
          if (seen.ids.has(data.id)) {
            this.errors.push(`Duplicate ID '${data.id}' in ${filePath} and ${seen.ids.get(data.id)}`);
          } else {
            seen.ids.set(data.id, filePath);
          }
        }

        // Check slug duplicates within same directory
        if (data.slug) {
          const dir = path.dirname(filePath);
          const key = `${dir}:${data.slug}`;
          if (seen.slugs.has(key)) {
            this.errors.push(`Duplicate slug '${data.slug}' in ${filePath} and ${seen.slugs.get(key)}`);
          } else {
            seen.slugs.set(key, filePath);
          }
        }

        // Check title similarity
        if (data.title) {
          const normalizedTitle = data.title.toLowerCase().replace(/[^a-z0-9]/g, '');
          if (seen.titles.has(normalizedTitle)) {
            this.warnings.push(`Similar title '${data.title}' in ${filePath} and ${seen.titles.get(normalizedTitle)}`);
          } else {
            seen.titles.set(normalizedTitle, filePath);
          }
        }
      } catch (error) {
        // Skip files with errors
      }
    });
  }

  // Generate new strand template
  static generateStrandTemplate(title, options = {}) {
    return {
      id: uuidv4(),
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: title,
      summary: options.summary || '',
      version: '1.0.0',
      contentType: options.contentType || 'markdown',
      difficulty: options.difficulty || 'intermediate',
      taxonomy: {
        subjects: options.subjects || [],
        topics: options.topics || []
      },
      tags: options.tags || [],
      relationships: {
        requires: [],
        references: [],
        seeAlso: []
      },
      publishing: {
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        status: 'draft'
      }
    };
  }

  // Validate directory
  validateDirectory(dirPath, options = {}) {
    const files = [];
    
    // Collect all files
    const walk = (dir) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      entries.forEach(entry => {
        if (entry.name.startsWith('.')) return;
        
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(fullPath);
        } else {
          files.push(fullPath);
        }
      });
    };

    walk(dirPath);

    // Validate each file
    if (options.files) {
      // Validate only specific files
      options.files.forEach(file => {
        const fullPath = path.resolve(dirPath, file);
        if (fs.existsSync(fullPath)) {
          this.validateFile(fullPath);
        }
      });
    } else {
      // Validate all files
      files.forEach(file => this.validateFile(file));
    }

    // Check for duplicates
    if (!options.skipDuplicates) {
      this.checkDuplicates(files);
    }

    // Generate report
    return {
      valid: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings,
      suggestions: this.suggestions,
      stats: {
        totalFiles: files.length,
        errorCount: this.errors.length,
        warningCount: this.warnings.length,
        suggestionCount: this.suggestions.length
      }
    };
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const validator = new CodexValidator();
  
  if (args.includes('--generate')) {
    // Generate template
    const title = args[args.indexOf('--generate') + 1];
    const template = CodexValidator.generateStrandTemplate(title);
    console.log(yaml.dump(template));
  } else {
    // Validate
    const dir = args.includes('--path') ? args[args.indexOf('--path') + 1] : '.';
    const files = args.includes('--files') ? args[args.indexOf('--files') + 1].split(',') : null;
    
    const result = validator.validateDirectory(dir, { files });
    
    // Output results
    console.log('\nCodex Validation Results\n' + '='.repeat(40));
    console.log(`Total files: ${result.stats.totalFiles}`);
    console.log(`Errors: ${result.stats.errorCount}`);
    console.log(`Warnings: ${result.stats.warningCount}`);
    console.log(`Suggestions: ${result.stats.suggestionCount}`);
    
    if (result.errors.length > 0) {
      console.log('\n❌ Errors:');
      result.errors.forEach(err => console.log(`  - ${err}`));
    }
    
    if (result.warnings.length > 0) {
      console.log('\n⚠️  Warnings:');
      result.warnings.forEach(warn => console.log(`  - ${warn}`));
    }
    
    if (result.suggestions.length > 0) {
      console.log('\n💡 Suggestions:');
      result.suggestions.forEach(sug => console.log(`  - ${sug}`));
    }
    
    // Exit with error code if validation failed
    process.exit(result.valid ? 0 : 1);
  }
}

module.exports = CodexValidator;

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const srcDir = path.join(rootDir, 'src')

const extensions = ['.ts', '.tsx']

function findAllFiles(dir) {
  const files = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory() && !entry.name.startsWith('.')) {
      files.push(...findAllFiles(full))
    } else if (entry.isFile() && extensions.includes(path.extname(entry.name))) {
      files.push(full)
    }
  }
  return files
}

function isKeywordStart(src, i, keyword) {
  if (src.substring(i, i + keyword.length) !== keyword) return false
  const prev = src[i - 1]
  if (prev && /[a-zA-Z0-9_$]/.test(prev)) return false
  const next = src[i + keyword.length]
  if (next && /[a-zA-Z0-9_$]/.test(next)) return false
  return true
}

function skipWhitespaceAndNewlines(src, i) {
  while (i < src.length && (src[i] === ' ' || src[i] === '\t' || src[i] === '\n' || src[i] === '\r')) {
    i++
  }
  return i
}

function processFile(filePath) {
  const src = fs.readFileSync(filePath, 'utf-8')
  const len = src.length
  const out = []

  let inSingle = false
  let inDouble = false
  let inTemplate = false
  let inLineComment = false
  let inBlockComment = false

  // Template expression brace depth stack
  let templateBraceStack = []

  // For/while header tracking
  let forParenDepth = 0

  let i = 0
  while (i < len) {
    const c = src[i]
    const n = src[i + 1] || ''

    // ---- LINE COMMENT ----
    if (inLineComment) {
      if (c === '\n') {
        inLineComment = false
        out.push(c)
        i++
        continue
      }
      out.push(c)
      i++
      continue
    }

    // ---- BLOCK COMMENT ----
    if (inBlockComment) {
      if (c === '*' && n === '/') {
        inBlockComment = false
        out.push('*/')
        i += 2
        continue
      }
      out.push(c)
      i++
      continue
    }

    // ---- SINGLE QUOTE STRING ----
    if (inSingle) {
      if (c === '\\') {
        out.push(c, n)
        i += 2
        continue
      }
      if (c === "'") {
        inSingle = false
      }
      out.push(c)
      i++
      continue
    }

    // ---- DOUBLE QUOTE STRING ----
    if (inDouble) {
      if (c === '\\') {
        out.push(c, n)
        i += 2
        continue
      }
      if (c === '"') {
        inDouble = false
      }
      out.push(c)
      i++
      continue
    }

    // ---- TEMPLATE LITERAL ----
    if (inTemplate) {
      if (c === '\\') {
        out.push(c, n)
        i += 2
        continue
      }
      if (c === '`' && templateBraceStack.length === 0) {
        inTemplate = false
        out.push(c)
        i++
        continue
      }
      if (c === '$' && n === '{') {
        templateBraceStack.push(0)
        out.push('${')
        i += 2
        continue
      }
      if (templateBraceStack.length > 0) {
        // We're inside a template expression ${...}
        if (c === '{') {
          templateBraceStack[templateBraceStack.length - 1]++
          out.push(c)
          i++
          continue
        }
        if (c === '}') {
          templateBraceStack[templateBraceStack.length - 1]--
          if (templateBraceStack[templateBraceStack.length - 1] < 0) {
            templateBraceStack.pop()
          }
          out.push(c)
          i++
          continue
        }
        if (c === ';') {
          // Inside template expression - for/while tracking applies
          if (forParenDepth > 0) {
            out.push(c)
          }
          // else skip the semicolon
          i++
          continue
        }
        // Handle nested strings/comments inside template expression
        if (c === "'") {
          inSingle = true
          out.push(c)
          i++
          continue
        }
        if (c === '"') {
          inDouble = true
          out.push(c)
          i++
          continue
        }
        if (c === '/' && n === '/') {
          inLineComment = true
          out.push('//')
          i += 2
          continue
        }
        if (c === '/' && n === '*') {
          inBlockComment = true
          out.push('/*')
          i += 2
          continue
        }
        // Track for/while inside template expression
        if (c === '(' && forParenDepth > 0) {
          forParenDepth++
          out.push(c)
          i++
          continue
        }
        if (c === ')' && forParenDepth > 0) {
          forParenDepth--
          out.push(c)
          i++
          continue
        }
        // Check for for/while keywords inside template expression
        if (c === 'f' && src.substring(i, i + 3) === 'for' && forParenDepth === 0) {
          let j = skipWhitespaceAndNewlines(src, i + 3)
          if (j < len && src[j] === '(') {
            forParenDepth = 1
            out.push(src.substring(i, j + 1))
            i = j + 1
            continue
          }
        }
        if (c === 'w' && src.substring(i, i + 5) === 'while' && forParenDepth === 0) {
          let j = skipWhitespaceAndNewlines(src, i + 5)
          if (j < len && src[j] === '(') {
            forParenDepth = 1
            out.push(src.substring(i, j + 1))
            i = j + 1
            continue
          }
        }
        out.push(c)
        i++
        continue
      }
      out.push(c)
      i++
      continue
    }

    // ---- NORMAL STATE ----

    // Detect comments
    if (c === '/' && n === '/') {
      inLineComment = true
      out.push('//')
      i += 2
      continue
    }
    if (c === '/' && n === '*') {
      inBlockComment = true
      out.push('/*')
      i += 2
      continue
    }

    // Detect string starts
    if (c === "'") {
      inSingle = true
      out.push(c)
      i++
      continue
    }
    if (c === '"') {
      inDouble = true
      out.push(c)
      i++
      continue
    }
    if (c === '`') {
      inTemplate = true
      templateBraceStack = []
      out.push(c)
      i++
      continue
    }

    // Detect for/while headers
    if (c === 'f' && src.substring(i, i + 3) === 'for' && forParenDepth === 0) {
      if (isKeywordStart(src, i, 'for')) {
        let j = skipWhitespaceAndNewlines(src, i + 3)
        if (j < len && src[j] === '(') {
          forParenDepth = 1
          out.push(src.substring(i, j + 1))
          i = j + 1
          continue
        }
      }
    }
    if (c === 'w' && src.substring(i, i + 5) === 'while' && forParenDepth === 0) {
      if (isKeywordStart(src, i, 'while')) {
        let j = skipWhitespaceAndNewlines(src, i + 5)
        if (j < len && src[j] === '(') {
          forParenDepth = 1
          out.push(src.substring(i, j + 1))
          i = j + 1
          continue
        }
      }
    }

    // Handle parens inside for/while
    if (c === '(' && forParenDepth > 0) {
      forParenDepth++
      out.push(c)
      i++
      continue
    }
    if (c === ')' && forParenDepth > 0) {
      forParenDepth--
      out.push(c)
      i++
      continue
    }

    // Handle semicolons
    if (c === ';') {
      if (forParenDepth > 0) {
        // Inside for/while header - preserve
        out.push(c)
      }
      // else skip (remove) the semicolon
      i++
      continue
    }

    out.push(c)
    i++
  }

  const result = out.join('')
  if (result !== src) {
    fs.writeFileSync(filePath, result, 'utf-8')
    return true
  }
  return false
}

const files = findAllFiles(srcDir)
console.log(`Found ${files.length} .ts/.tsx files`)

let changed = 0
for (const file of files) {
  if (processFile(file)) {
    console.log(`  Modified: ${path.relative(rootDir, file)}`)
    changed++
  }
}

console.log(`\nDone. ${changed} files modified.`)

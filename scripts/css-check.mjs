/* Coverage: every class name the markup uses must have a rule somewhere in the
 * shipped CSS — the linked stylesheets AND any inline <style>. A class with no
 * rule is markup that renders unstyled.
 *
 * className is an expression as often as it is a literal, so the class names
 * are read from the STRING LITERALS inside it (a ternary's two branches are two
 * class lists), not by splitting the expression text — splitting it counts `?`,
 * `:` and the quotes themselves as class names.
 * Usage: node scripts/css-check.mjs [distDir] */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const dist = process.argv[2] || 'dist'
const walk = (d, a = []) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p, a) : a.push(p) } return a }
const files = walk(dist)

let css = files.filter((f) => f.endsWith('.css')).map((f) => readFileSync(f, 'utf8')).join('\n')
for (const h of files.filter((f) => f.endsWith('.html')))
  for (const m of readFileSync(h, 'utf8').matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) css += '\n' + m[1]
const defined = new Set([...css.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)].map((m) => m[1]))

const matchBrace = (s, i) => {
  let d = 0
  for (let j = i; j < s.length; j++) {
    const c = s[j]
    if (c === '{') d++
    else if (c === '}') { d--; if (!d) return j }
    else if (c === '"' || c === "'" || c === '`') { const q = c; j++; while (j < s.length && s[j] !== q) { if (s[j] === '\\') j++; j++ } }
  }
  return -1
}

const used = new Map()
const add = (v) => { for (const t of v.split(/\s+/).filter(Boolean)) used.set(t, (used.get(t) || 0) + 1) }

// A className expression holds class lists inside its string literals. A
// template literal is itself a mix: static spans are class lists, and each
// `${...}` span is another expression to look inside — that nesting is where a
// naive scan starts counting `?` and `:` as class names.
const scanExpr = (t) => {
  const lit = /"((?:\\.|[^"\\])*)"|'((?:\\.|[^'\\])*)'|`/g
  let m
  while ((m = lit.exec(t))) {
    if (m[0] !== '`') { add(m[1] ?? m[2] ?? ''); continue }
    let i = lit.lastIndex
    let out = ''
    while (i < t.length && t[i] !== '`') {
      if (t[i] === '\\') { i += 2; continue }
      if (t[i] === '$' && t[i + 1] === '{') {
        let d = 0, j = i + 1
        for (; j < t.length; j++) {
          if (t[j] === '{') d++
          else if (t[j] === '}') { d--; if (!d) break }
          else if (t[j] === '"' || t[j] === "'" || t[j] === '`') { const q = t[j]; j++; while (j < t.length && t[j] !== q) { if (t[j] === '\\') j++; j++ } }
        }
        scanExpr(t.slice(i + 2, j))   // the substitution is an expression too
        out += ' '
        i = j + 1
        continue
      }
      out += t[i++]
    }
    add(out)
    lit.lastIndex = i + 1
  }
}

for (const f of walk('src').filter((f) => /\.(tsx|ts|jsx|js)$/.test(f))) {
  const s = readFileSync(f, 'utf8')
  const re = /\bclassName\s*=\s*/g
  let m
  while ((m = re.exec(s))) {
    const j = m.index + m[0].length
    const c = s[j]
    if (c === '"' || c === "'") { const e = s.indexOf(c, j + 1); if (e > 0) { add(s.slice(j + 1, e)); re.lastIndex = e + 1 } }
    else if (c === '{') {
      const e = matchBrace(s, j)
      if (e < 0) continue
      scanExpr(s.slice(j + 1, e))
      re.lastIndex = e + 1
    }
  }
}

const orphans = [...used.entries()].filter(([c]) => !defined.has(c)).sort((a, b) => b[1] - a[1])
const totalUses = [...used.values()].reduce((a, b) => a + b, 0)
const orphanUses = orphans.reduce((a, b) => a + b[1], 0)
console.log(`classes used: ${used.size} distinct / ${totalUses} occurrences`)
console.log(`rules defined in shipped CSS: ${defined.size} selectors`)
console.log(`ORPHANS (used, never defined): ${orphans.length} distinct / ${orphanUses} occurrences`)
console.log(`coverage: ${(100 * (1 - orphanUses / totalUses)).toFixed(2)}% of occurrences, ${(100 * (1 - orphans.length / used.size)).toFixed(2)}% of names`)
if (orphans.length) console.log('\norphans:\n  ' + orphans.slice(0, 60).map(([c, n]) => `${c}:${n}`).join('  '))

/* eslint-disable */
/**
 * The tail of the migration: class names that sit in a string the codemod's
 * `className=` walk cannot see — a status→colour map in a data file, an object
 * field named `iconTextClass`, a `badge:` property whose value is a class list.
 *
 * It reuses detailwind's `translate()` rather than carrying a lookup table of
 * its own: there is one Tailwind→role translation in this repo, and a second
 * copy of it would drift from the first the moment either is corrected.
 *
 * The whole risk here is false positives — a string that LOOKS like a class
 * list but is a value being compared (`view === 'grid'`, `radius: 'rounded'`,
 * `position: 'top-left'`). So a literal is only rewritten when it is
 * unambiguous: either several tokens that are nearly all Tailwind, or a single
 * token that could not be anything but a colour utility.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { translate, IGNORE } from './detailwind.mjs'

const TW = /^-?(?:(?:[a-z][a-z0-9]*|\[[^\]]*\]):)*(?:flex|grid|hidden|inline-flex|container|truncate|uppercase|italic|underline|border|rounded|shadow|ring|(?:text|bg|from|via|to|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|w|h|min-w|max-w|min-h|max-h|gap|space-[xy]|items|justify|self|order|col|row|z|opacity|leading|tracking|font|whitespace|overflow|cursor|transition|duration|ease|delay|animate|backdrop|blur|scale|rotate|translate|inset|top|bottom|left|right|size|aspect|line-clamp|divide|outline|grow|shrink|basis|object|fill|stroke|snap|touch|select|resize|appearance|list|isolate|prose)-)/

// A lone token only counts when it is a colour utility: `bg-blue-900/30`,
// `text-[#fd4444]`, `border-white`. `rounded`, `grid` and `hidden` are words
// this codebase also uses as plain values, and translating those breaks logic.
const LONE = /^(?:hover:|focus:|group-hover:)?(?:(?:text|bg|border|from|via|to|ring|divide)-(?:[a-z]+-\d{2,3}(?:\/\d{1,3})?|black|white|transparent|\[[^\]]+\])|pointer-events-none|[mp][btlrxy]?-\d+(?:\.\d+)?)$/

const classy = (s) => {
  // Parentheses are legal inside an arbitrary value (`bg-[var(--black)]`), so
  // rejecting them skips every class list that reached for a CSS variable —
  // which on this site is most of the colours. Only real code punctuation
  // disqualifies a string.
  if (!s || s.length > 300 || s.includes('${') || /[<>{};=]/.test(s)) return false
  const parts = s.split(/\s+/).filter(Boolean)
  if (!parts.length) return false
  if (parts.length === 1) return LONE.test(parts[0])
  return parts.filter((p) => TW.test(p)).length >= parts.length * 0.6
}

const walk = (dir, acc = []) => {
  for (const f of readdirSync(dir)) {
    const p = dir + '/' + f
    statSync(p).isDirectory() ? walk(p, acc) : /\.(tsx|ts)$/.test(f) && !IGNORE.has(p) && acc.push(p)
  }
  return acc
}

let files = 0
let strings = 0
for (const p of walk('src')) {
  const src = readFileSync(p, 'utf8')
  const next = src.replace(/"((?:\\.|[^"\\])*)"|'((?:\\.|[^'\\])*)'/g, (all, d, s) => {
    const q = all[0]
    const body = d ?? s ?? ''
    if (!classy(body)) return all
    const t = translate(body)
    if (t === body) return all
    strings++
    return q + t + q
  })
  if (next !== src) { writeFileSync(p, next); files++ }
}
console.log(`residual sweep: ${strings} strings in ${files} files`)

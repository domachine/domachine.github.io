'use strict'

const fs = require('fs')
const { basename, dirname, join, relative } = require('path')
const { renderToStaticMarkup } = require('react-dom/server')
const React = require('react')
const glob = require('glob')
const concat = require('concat-files')
require('babel-register')()

module.exports = {
  buildAllPages,
  buildPage,
  buildCSS
}

function buildAllPages () {
  glob.sync('src/*.jsx')
    .map(input => join(process.cwd(), input))
    .forEach(buildPage)
}

function buildPage (input) {
  const path = require.resolve(input)
  delete require.cache[path]
  let Component
  let markup
  try {
    Component = require(path).default
    markup = renderToStaticMarkup(React.createElement(Component))
  } catch (e) {
    console.log()
    console.log(e.stack)
    console.log()
    return
  }
  const dir = dirname(relative(process.cwd(), input))
    .replace(/^src\/?/, '')
  const file = `${dir || '.'}/${basename(input, '.jsx')}.html`
  fs.writeFile(
    file,
    '<!DOCTYPE html>' + markup,
    (err) => {
      if (err) throw err
      console.log(`    Wrote ${file}`)
    }
  )
}

function buildCSS () {
  concat(glob.sync('src/styles/**/*.css'), 'bundle.css', () => {
    console.log('    Wrote ./bundle.css')
  })
}

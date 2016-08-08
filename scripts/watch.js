'use strict'

const fs = require('fs')
const gaze = require('gaze')
const catw = require('catw')

const { buildAllPages, buildPage } = require('./lib/build')

console.log('    Watching file changes ...')
buildAllPages()

// Watch pages
gaze('src/*.jsx', (err, watcher) => {
  if (err) throw err
  watcher.on('all', (event, filepath) =>
    !filepath.endsWith('/') && buildPage(filepath)
  )
})

// Watch components
gaze('src/components/**', (err, watcher) => {
  if (err) throw err
  watcher.on('changed', filepath => {
    delete require.cache[filepath]
    buildAllPages()
  })
})

// Watch styles
catw('src/styles/**/*.css', stream => {
  stream
    .pipe(fs.createWriteStream('bundle.css'))
    .on('close', () => console.log('    Wrote ./bundle.css'))
})

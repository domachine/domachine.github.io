'use strict'

const http = require('http')
const { fork } = require('child_process')
const ecstatic = require('ecstatic')

fork(`${__dirname}/watch`)
const srv = http.createServer(ecstatic({ root: process.cwd() }))
srv.listen(process.env.PORT || 3000, () => {
  console.log('    Listening on port ' + srv.address().port)
})

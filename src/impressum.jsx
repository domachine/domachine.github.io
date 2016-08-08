import React from 'react'

import asPage from './components/as_page.jsx'

function Index () {
  return (
    <div className='dialog dialog--center'>
      <div className='dialog__inner'>
        <h1>Impressum</h1>
        <p>
          Dominik Burgdörfer<br />
          Anne-Frank-Weg 14<br />
          89075 Ulm
        </p>
        <br />
        <p>
          <a href='https://github.com/domachine'><i className='fa fa-twitter fa-2x' /></a>
          &nbsp;<a href='https://github.com/ddomachine'><i className='fa fa-github fa-2x' /></a>
        </p>
      </div>
    </div>
  )
}

export default asPage({ title: 'Main' })(Index)

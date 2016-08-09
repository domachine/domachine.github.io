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
      </div>
    </div>
  )
}

export default asPage({ title: 'Main' })(Index)

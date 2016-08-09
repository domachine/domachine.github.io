import React from 'react'

import asPage from './components/as_page.jsx'

function Index () {
  return (
    <div className='dialog dialog--center'>
      <div className='dialog__inner'>
        <h1>.domachine</h1>
        <p>
          I'm a passionate web developer with experience in building products using&nbsp;
          <a href='https://nodejs.org'>node.js</a> and&nbsp;
          <a href='https://facebook.github.io/react'>react</a>.
        </p>
      </div>
    </div>
  )
}

export default asPage({ title: 'Main' })(Index)

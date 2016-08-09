import React from 'react'

import asPage from './components/as_page.jsx'

function Customers () {
  return (
    <div className='container'>
      <h1>people i work with</h1>
      <div className='cols page-content'>
        <div className='testimonial'>
          <h2>Thomas Lauer<br /><small>(Glöckler & Lauer GmbH)</small></h2>
          <img
            src='/images/thomas-lauer-foto.256x256.jpg'
            className='testimonial__img'
          />
          <div className='testimonial__body'>
            <i className='fa fa-quote-left' />
            <p className='testimonial__quote'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <i className='fa fa-quote-left' />
          </div>
        </div>
        <div className='testimonial'>
          <h2>Matthias Prinz<br /><small>(Crispy Mountain GmbH)</small></h2>
          <img
            src='/images/matthias-prinz-foto.256x256.jpg'
            className='testimonial__img'
          />
          <div className='testimonial__body'>
            <i className='fa fa-quote-left' />
            <p className='testimonial__quote'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <i className='fa fa-quote-left' />
          </div>
        </div>
      </div>
      <div className='cols'>
        <div className='testimonial'>
          <h2>Björn Schmidtke<br /><small>(websites smart)</small></h2>
          <img
            src='/images/björn-schmidtke-foto.256x256.jpg'
            className='testimonial__img'
          />
          <div className='testimonial__body'>
            <i className='fa fa-quote-left' />
            <p className='testimonial__quote'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <i className='fa fa-quote-left' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default asPage({ title: 'customers' })(Customers)

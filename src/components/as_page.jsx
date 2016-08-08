import React from 'react'

export default function asPage ({ title: _title }) {
  return Child =>
    props => (
      <html lang='en'>
        <head>
          <title>domachine | {_title}</title>
          <meta name='msapplication-TileImage' content='/rocket-144-190970.png' />
          <link href='https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css' rel='stylesheet' />
          <link href='/bundle.css' rel='stylesheet' />
          <link rel='icon' type='image/x-icon' href='/favicon.ico' />
          <link rel='apple-touch-icon-precomposed' href='/rocket-152-190970.png' />
          <link rel='apple-touch-icon-precomposed' sizes='152x152' href='/rocket-152-190970.png' />
          <link rel='apple-touch-icon-precomposed' sizes='144x144' href='/rocket-144-190970.png' />
          <link rel='apple-touch-icon-precomposed' sizes='120x120' href='/rocket-120-190970.png' />
          <link rel='apple-touch-icon-precomposed' sizes='114x114' href='/rocket-114-190970.png' />
          <link rel='apple-touch-icon-precomposed' sizes='72x72' href='/rocket-72-190970.png' />
          <link rel='apple-touch-icon-precomposed' href='/rocket-57-190970.png' />
          <link rel='icon' href='/rocket-32-190970.png' sizes='32x32' />
        </head>
        <body>
          <Child {... props} />
          <div className='toolbar'>
            <a href='/' className='toolbar__link'>
              Home
            </a>
            |
            <a href='/impressum.html' className='toolbar__link'>
              Impressum
            </a>
          </div>
        </body>
      </html>
    )
}

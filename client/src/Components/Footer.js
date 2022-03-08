import React from 'react';

function Footer() {
  return (
    <footer className='footer'>
    <div className='footer-left col-md-4 col-sm-6'>
      <p className='about'>
        <span> About This Project</span>
        Gameify is a web application designed to gamify new concepts and algorithms that come my way.
      </p>
    </div>
    <div className='footer-right '>
      <p>Follow me</p>
      <a href='https://www.linkedin.com/in/jerry-tong-87a99b221/' target='_blank' rel='noopener noreferrer'><i className='fa fa-linkedin'></i></a>
      <div>
        <p className='copyright'> Gameify &copy; {new Date().getFullYear()}</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer;
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
      <div id='linkedin'>
        <a href='https://www.linkedin.com/in/jerry-tong/' target='_blank' rel='noopener noreferrer'>
          <p className='social-links'>Follow me</p>
          <i className='fa fa-linkedin social-icons'></i>
        </a>
      </div>
      <div>
        <a href='https://github.com/itsJeri/Gameify-Project' target='_blank' rel='noopener noreferrer'>
          <p id='copyright'> Gameify &copy; {new Date().getFullYear()}</p>
        </a>
      </div>
    </div>
  </footer>
  )
}

export default Footer;
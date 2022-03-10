import React from 'react';

import './Footer.css';

const brendon = <a href="https://github.com/brendonwjames" target='_blank'>Brendon James</a>
const jacob = <a href="https://github.com/JacobHoldowsky" target='_blank'>Jacob Holdowsky</a>
const leonel = <a href="https://github.com/ljmurill" target='_blank'>Leonel Murillo</a>
const will = <a href="https://github.com/Willy-Git-Man" target='_blank'>Will Grossman</a>

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-content'>
        <div className='footer-header'>Created by {brendon}, {jacob}, {leonel}, and {will}</div>
          <a href='https://github.com/Willy-Git-Man/Cartoonstagram' target='_blank' rel='noopener noreferrer'>
            Project GitHub
          </a>
        </div>
        <div className='footer-technologies'>Project Built Using: Python • CSS • React • Redux • FlaskAlchemy • Sequelize • PostgreSQL</div>
      </div>
  );
};

export default Footer;
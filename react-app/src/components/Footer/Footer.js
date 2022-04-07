import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-content'>
        <div className='creatorsFooter'>
          <p className='createByTitle color'>Created By</p>
          <div className='individualProgrammer color'>
            Leonel Murillo
            <div className='personalLinks'>
              <a href="https://github.com/ljmurill" target='_blank' rel="noreferrer"><FontAwesomeIcon icon="fa-brands fa-github" size='2x' className='color'/></a>
              <a href="https://www.linkedin.com/in/leonel-murillo/" target='_blank' rel="noreferrer"><FontAwesomeIcon icon="fa-brands fa-linkedin" size='2x' className='color'/></a>
            </div>
          </div>
          <div className='individualProgrammer color'>
            Brendon James
            <div className='personalLinks'>
              <a href="https://github.com/brendonwjames" target='_blank' rel="noreferrer"><FontAwesomeIcon icon="fa-brands fa-github" size='2x' className='color'/></a>
              <a href="https://www.linkedin.com/in/brendon-james-43987a231/" target='_blank' rel="noreferrer"><FontAwesomeIcon icon="fa-brands fa-linkedin" size='2x' className='color'/></a>
            </div>
          </div>
          <div className='individualProgrammer color'>
          Jacob Holdowsky
            <div className='personalLinks'>
              <a href="https://github.com/JacobHoldowsky" target='_blank' rel="noreferrer"><FontAwesomeIcon icon="fa-brands fa-github" size='2x' className='color'/></a>
              <a href="https://www.linkedin.com/in/jacob-holdowsky-2b0baa103/" target='_blank' rel="noreferrer"><FontAwesomeIcon icon="fa-brands fa-linkedin" size='2x' className='color'/></a>
            </div>
          </div>
          <div className='individualProgrammer color'>
          Will Grossman
            <div className='personalLinks'>
              <a href="https://github.com/Willy-Git-Man" target='_blank' rel="noreferrer"><FontAwesomeIcon icon="fa-brands fa-github" size='2x' className='color'/></a>
              <a href="https://www.linkedin.com/in/william-b-grossman/" target='_blank' rel="noreferrer"><FontAwesomeIcon icon="fa-brands fa-linkedin" size='2x' className='color'/></a>
            </div>
          </div>
        </div>
        <div className='individualProgrammer color'>
          <div>Project GitHub</div>
          <a href='https://github.com/Willy-Git-Man/Cartoonstagram' target='_blank' rel='noopener noreferrer'>
          <FontAwesomeIcon icon="fa-brands fa-github" size='2x' className='color'/>
          </a>
        </div>
      </div>
        <div className='footer-technologies color'>Project Built Using: Python • CSS • React • Redux • FlaskAlchemy • Sequelize • PostgreSQL</div>
    </div>
  );
};

export default Footer;

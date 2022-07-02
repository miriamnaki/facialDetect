import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import logo from '../../assets/images/brain.png';

const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <Tilt perspective={500}
            glareEnable={true}
            glareMaxOpacity={0.45}
            scale={1.02}
            className='tilt br2 shadow-1'
            >
              
      <div>
        <img src={logo} alt="logo"  className='w4 mt4 ' />
      </div>
    </Tilt>

    </div>
  )
}

export default Logo
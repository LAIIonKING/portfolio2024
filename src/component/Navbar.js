import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import waveIcon from '../asset/img/waveIcon.png';
import './Navbar.css';
import { hover } from '@testing-library/user-event/dist/hover';

export default function Navbar() {
  const navigate = useNavigate();

  const [hoverMenu, setHoverMenu] = useState('default');

  return (
    <div className="w-full flex justify-between p-5">
      <div>
        <h4 className="text-white">SON HYUNJI</h4>
        <h4 className="text-white">2024</h4>
      </div>
      <div>
        <h4 className="text-white">South Korea</h4>
        <h4 className="text-white">Seoul</h4>
      </div>
      <div>
        <h4 className="text-white">Front End</h4>
        <h4 className="text-white">Developer</h4>
      </div>
      <div
        onMouseOver={() => setHoverMenu('open')}
        onMouseOut={() => setHoverMenu('close')}
      >
        {/* <div className="menuback" /> */}
        <button className="waveMenu">
          <img
            src={waveIcon}
            className={
              hoverMenu === 'default'
                ? ''
                : hoverMenu === 'open'
                ? 'fadeoutIcon'
                : 'fadeinIcon'
            }
          />
        </button>
        <div className="absolute z-10">
          <div
            className={
              hoverMenu === 'default'
                ? 'menu'
                : hoverMenu === 'open'
                ? 'menu openMenu'
                : 'menu closeMenu'
            }
          />
        </div>
        <div
          className={
            hoverMenu === 'default'
              ? 'navbox'
              : hoverMenu === 'open'
              ? 'navbox fadeinNav'
              : 'navbox fadeoutNav'
          }
        >
          <button className="navbtn">Home</button>
          <button className="navbtn">Projects</button>
          <button className="navbtn">Contact</button>
        </div>
      </div>
    </div>
  );
}

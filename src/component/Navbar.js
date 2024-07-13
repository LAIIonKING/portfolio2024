import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import waveIcon from '../asset/img/waveIcon.png';
import './Navbar.css';
import useStore from '../useStore';

export default function Navbar() {
  const { setNavigatorClick } = useStore((state) => state);

  const [hoverMenu, setHoverMenu] = useState('default');

  return (
    <div className="w-full flex justify-between p-5 absolute top-0 z-10">
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
      <div />
      <div
        className="waveMenuStick"
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
          <button className="navbtn" onClick={() => setNavigatorClick('home')}>
            Home
          </button>
          <button
            className="navbtn"
            onClick={() => setNavigatorClick('project')}
          >
            Projects
          </button>
          <button
            className="navbtn"
            onClick={() => setNavigatorClick('footer')}
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}

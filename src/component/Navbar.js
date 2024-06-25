import React from 'react';
import { useNavigate } from 'react-router-dom';
import waveIcon from '../asset/img/waveIcon.png';

export default function Navbar() {
  const navigate = useNavigate();

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
      <button>
        <img src={waveIcon} />
      </button>
    </div>
  );
}

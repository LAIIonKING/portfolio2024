import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex items-end">
      <button
        className="bg-white py-1 pl-1.5 pr-7 text-black text-3xl font-nanum"
        onClick={() => navigate('/')}
      >
        GRAPHICS
      </button>
      <div className="flex border-b w-full mx-9 items-end pb-2">
        <div className="flex">
          <button
            className="text-white mr-9"
            onClick={() => navigate('/project/silverfactory')}
          >
            Projects
          </button>
          <button
            className="text-white mr-9"
            onClick={() => navigate('/about')}
          >
            about
          </button>
          <button className="text-white" onClick={() => navigate('/contact')}>
            contact
          </button>
        </div>
      </div>
      <div>
        <div className="absolute flex">
          <div
            className="bg-white relative bottom-0.5 right-0.5"
            style={{ width: '5px', height: '5px' }}
          ></div>
          <div
            className="bg-white relative bottom-0.5 left-8"
            style={{ width: '5px', height: '5px' }}
          ></div>
        </div>
        <button className="border border-white text-white font-bold text-2xl w-10 h-10 p-3 flex items-center justify-center">
          M
        </button>
        <div className="absolute flex">
          <div
            className="bg-white relative right-0.5"
            style={{ width: '5px', height: '5px', bottom: '3px' }}
          ></div>
          <div
            className="bg-white relative left-8"
            style={{ width: '5px', height: '5px', bottom: '3px' }}
          ></div>
        </div>
      </div>
    </div>
  );
}

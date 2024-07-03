import React from 'react';
import ailabs1 from '../../asset/img/ailabs1.png';
import './Project.css';

export default function Project() {
  return (
    <>
      <div style={{ position: 'absolute', height: '50vh', width: '100%' }}>
        <div className="projectTopBg" />
      </div>
      <div className="projectBg">
        <div className="px-20">
          <div className="flex items-baseline gap-3">
            <h1 className="font-oi text-8xl">AI Labs</h1>
            <p>/2024</p>
          </div>
          <div className="flex mt-3 mb-6 gap-3">
            <div className="bg-main-orange px-4 rounded-xl">UI/UX</div>
            <div className="bg-main-orange px-4 rounded-xl">React</div>
          </div>
          <div className="flex">
            <div>
              <h3 className="text-2xl font-semibold mb-3">
                The Brigade is a digital agency in PDX.
              </h3>
              <p>
                The website was designed with sharp lines, angles and extended
                backgrounds. Its goal was for a fast, precise, and moody feel.
              </p>
            </div>
            <div>
              <p>
                The website was designed with sharp lines, angles and extended
                backgrounds. Its goal was for a fast, precise, and moody feel.
              </p>
            </div>
          </div>
          <div>
            <img src={ailabs1} className="rounded-2xl mt-6" />
          </div>
        </div>
      </div>
    </>
  );
}

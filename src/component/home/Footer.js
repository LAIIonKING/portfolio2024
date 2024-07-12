import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <div className="footerBg">
      <div className="contactBox">
        <h1 className="font-oi text-7xl">CONTACT</h1>
        <div className="btnBox">
          <button>LinkdIn</button>
          <button>Mail</button>
          <button>Github</button>
        </div>
      </div>
    </div>
  );
}

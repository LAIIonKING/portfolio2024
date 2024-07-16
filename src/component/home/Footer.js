import React from 'react';
import './Footer.css';

export default function Footer() {
  const handleCopyClick = (textToCopy) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert('이메일이 복사되었습니다.');
      })
      .catch((error) => {
        console.error('복사 실패:', error);
      });
  };

  return (
    <div className="footerBg">
      <div className="contactBox">
        <h1 className="font-oi text-4xl md:text-7xl">CONTACT</h1>
        <div className="btnBox">
          <button
            onClick={() =>
              window.open('https://www.linkedin.com/in/hyunji-son-6aa053261/')
            }
          >
            LinkdIn
          </button>
          <button onClick={() => handleCopyClick('sji12251225@gmail.com')}>
            Mail
          </button>
          <button onClick={() => window.open('https://github.com/LAIIonKING')}>
            Github
          </button>
        </div>
      </div>
    </div>
  );
}

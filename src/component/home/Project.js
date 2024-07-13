import React from 'react';
import ailabs1 from '../../asset/img/ailabs1.png';
import ailabs2 from '../../asset/img/ailabs2.png';
import ailabs3 from '../../asset/img/ailabs3.png';

import './Project.css';

export default function Project() {
  return (
    <>
      <div style={{ position: 'absolute', height: '50vh', width: '100%' }}>
        <div className="projectTopBg" />
      </div>
      <div className="projectBg">
        <div className="projectBox">
          <div className="flex items-baseline gap-3">
            <h1 className="font-oi text-8xl">AI Labs</h1>
            <p>/2024</p>
          </div>
          <div className="flex mt-3 mb-4 gap-3">
            <div className="bg-main-orange px-4 rounded-xl">UI/UX</div>
            <div className="bg-main-orange px-4 rounded-xl">React</div>
          </div>
          <h3 className="text-2xl font-semibold">
            사이버 위협 인텔리전스 플랫폼
          </h3>
          <p>
            전체 웹디자인, UI/UX, 프론트엔드를 전담하였습니다. React를 기반으로
            개발하였고 Styled-component, zustand, MUI 등 라이브러리를
            사용했습니다. 일반적인 웹사이트의 기능 뿐만아니라 보안 관련 데이터를
            보기 좋게 정제하여 보여주는 작업이 주로 많았어서 그에 따른 대시보드,
            표, 그래프를 많이 개발했습니다.
          </p>
          <p>
            40페이지나 되는 크기와 방대한 데이터를 받아오기 때문에 로딩이
            오래걸리는 문제점이 있었습니다. 그리하여 webpack과 gzip 활용하고,
            React의 lazy suspense를 사용하여 로딩 속도를 70% 감소시켰습니다. 또
            항목별로 스켈레톤을 각각 적용하여 사용자의 이탈률을 줄였습니다.
          </p>
          <img src={ailabs1} className="rounded-2xl mt-3 w-full" />
          <div className="img2">
            <div>
              <img src={ailabs2} className="rounded-xl mt-3 object-contain" />
            </div>
            <div>
              <img src={ailabs3} className="rounded-xl mt-3 object-contain" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React from 'react';
import './Detail.css';

export default function Detail() {
  return (
    <div className="detailBox" style={{ padding: '30vh 1.25rem 0px 1.25rem' }}>
      <div className="detailLeft">
        <h1 className="text-3xl font-semibold mb-5 leading-normal md:text-5xl md:leading-normal">
          넘치는 에너지와 열정을 가진 <br />
          Front_end 개발자입니다.
        </h1>
        <h3 className="text-xl md:text-2xl">
          무한한 성장과 남다른 추진력으로 개발하겠습니다.
        </h3>
      </div>
      <div className="detailRight">
        <p className="mb-4">
          비, 흙탕물, 눈물, 이슬 등 물은 쓰임새에 따라 이름이 천차만별입니다.
          각기다른 작은 방울이 모여 바다가 되었습니다. 지식의 바다 위에서
          끊임없이 도전하겠습니다. 급류에 휩쓸려도 끄떡없이 버틸 자신이
          있습니다.
        </p>
        <p>
          소통과 이해, 기획과 개발
          <br /> 원활한 이해를 바탕으로, 효율적으로 설계하고 팀원 간 활발한
          소통으로 사용자 곁에 파도치는 웹페이지를 구현하고자 합니다.
        </p>
      </div>
    </div>
  );
}

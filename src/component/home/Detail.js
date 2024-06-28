import React from 'react';

export default function Detail() {
  return (
    <div
      className="flex justify-between gap-32 text-white align-text-top"
      style={{ padding: '30vh 1.25rem 0px 1.25rem' }}
    >
      <div className="w-2/3">
        <h1 className="text-7xl font-bold leading-normal mb-5">
          무한한 성장의 잠재력을 가진 Front End 개발자입니다
        </h1>
        <h3 className="text-2xl">
          사용자의 시선으로 기획하고, 감각적인 경험을 제공하겠습니다.
        </h3>
      </div>
      <div className="w-1/3">
        <p>
          성장과 적응이 빠르다는 칭찬을 많이 들어서 우주 공간 까지의 한계 없는
          성장을 한다는 의미를 담아 포트폴리오 컨셉을 잡았습니다. 끊임없는
          도전을 통해 차원을 넘을 수 있을 때 까지 성장하겠습니다.
        </p>
        <p>
          사용자의 정확한 이해와 공감을 바탕으로 '어떻게'를 찾아 설계하고 일관성
          있는 UX/UI를 구현하고자 합니다. 이에 감각적인 디자인도 놓치지 않는
          디자이너가 되겠습니다.
        </p>
      </div>
    </div>
  );
}

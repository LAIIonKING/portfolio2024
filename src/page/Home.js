import React, { useEffect, useRef } from 'react';
import Main from '../component/home/Main';
import Detail from '../component/home/Detail';
import Skills from '../component/home/Skills';
import Project from '../component/home/Project';
import Footer from '../component/home/Footer';
import useStore from '../useStore';

export default function Home() {
  const mainRef = useRef();
  const projectRef = useRef();
  const footerRef = useRef();

  const { navigatorClick } = useStore((state) => state);

  useEffect(() => {
    // const scrollTo = (ref) => {
    //   setTimeout(
    //     () =>
    //       ref.current.scrollIntoView({ inline: 'center', behavior: 'smooth' }),
    //     777
    //   );
    // };
    console.log(navigatorClick);
    if (navigatorClick === 'home') {
      mainRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (navigatorClick === 'project') {
      projectRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (navigatorClick === 'footer') {
      footerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [navigatorClick]);

  return (
    <div>
      <div ref={mainRef}></div>
      <Main />
      <Detail />
      <Skills />
      <div ref={projectRef}></div>
      <Project />
      <div ref={footerRef}></div>
      <Footer />
    </div>
  );
}

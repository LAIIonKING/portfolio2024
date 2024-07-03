import React from 'react';
import Main from '../component/home/Main';
import Detail from '../component/home/Detail';
import Skills from '../component/home/Skills';
import Project from '../component/home/Project';
import Footer from '../component/home/Footer';

export default function Home() {
  return (
    <div>
      <Main />
      <Detail />
      <Skills />
      <Project />
      <Footer />
    </div>
  );
}

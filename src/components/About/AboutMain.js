import React, {Component} from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import TestimonialThree from '../HomeThree/TestimonialSectionThree';
import About from '../HomeTwo/AboutSection';
import WhyChoose from '../HomeTwo/WhyChooseSection';
import Counter from '../Elements/Counter/CounterStyleTwo';
import Banner from '../Home/BannerSection';
import dynamic from 'next/dynamic';

const BrandWithNoSSR = dynamic(() => import('../Elements/Brand/BrandSection'), {
  ssr: false,
});

class AboutMain extends Component {
  render() {
    return (
      <main>
        <Breadcrumb pageTitle="About" />

        <div className="mt-30">
          <About />
        </div>
        <BrandWithNoSSR />
        <TestimonialThree />
        <WhyChoose />
        <Counter />
        <Banner />
      </main>
    );
  }
}

export default AboutMain;
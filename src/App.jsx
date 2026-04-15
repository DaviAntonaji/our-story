import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { SLIDE_IDS } from './data/constants';
import { useIsMobile } from './hooks';

import ButterfliesFloating from './components/animations/ButterfliesFloating';
import SlideThemedAmbience from './components/animations/SlideThemedAmbience';
import NavDots from './components/ui/NavDots';
import CookieConsent from './components/ui/CookieConsent';

import LandingPage from './components/slides/LandingPage';
import IntroSlide from './components/slides/IntroSlide';
import AntesDepoisSlide from './components/slides/AntesDepoisSlide';
import TimerSlide from './components/slides/TimerSlide';
import MusicaSlide from './components/slides/MusicaSlide';
import CartaSlide from './components/slides/CartaSlide';
import TagsSlide from './components/slides/TagsSlide';
import VersiculoSlide from './components/slides/VersiculoSlide';
import MomentosSlide from './components/slides/MomentosSlide';
import HistoriaSlide from './components/slides/HistoriaSlide';
import PromessasSlide from './components/slides/PromessasSlide';
import FuturoSlide from './components/slides/FuturoSlide';
import RecadoSlide from './components/slides/RecadoSlide';
import FinalSlide from './components/slides/FinalSlide';

export default function App() {
  const [revelado, setRevelado] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const isMobile = useIsMobile();

  // Active slide tracking
  useEffect(() => {
    if (!revelado) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const idx = SLIDE_IDS.indexOf(e.target.id);
            if (idx !== -1) setActiveSlide(idx);
          }
        });
      },
      { threshold: 0.3 },
    );
    SLIDE_IDS.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [revelado]);

  return (
    <>
      <CookieConsent />
      {!revelado ? (
        <LandingPage onReveal={setRevelado} />
      ) : (
        <>
          {typeof document !== 'undefined' && createPortal(<ButterfliesFloating isMobile={isMobile} />, document.body)}
          {typeof document !== 'undefined' && createPortal(<SlideThemedAmbience activeIndex={activeSlide} isMobile={isMobile} />, document.body)}
          {typeof document !== 'undefined' && createPortal(<NavDots active={activeSlide} />, document.body)}

          <div>
            <IntroSlide />
            <TimerSlide />
            <AntesDepoisSlide />
            <MusicaSlide />
            <CartaSlide />
            <TagsSlide />
            <VersiculoSlide />
            <MomentosSlide />
            <HistoriaSlide />
            <PromessasSlide />
            <FuturoSlide />
            <RecadoSlide />
            <FinalSlide />
          </div>
        </>
      )}
    </>
  );
}

import { useState, useEffect, lazy, Suspense, useMemo, memo } from 'react';
import { createPortal } from 'react-dom';
import { MotionConfig } from 'framer-motion';

import { useIsMobile } from './hooks';
import { SLIDE_IDS } from './data/constants';

import ButterfliesFloating from './components/animations/ButterfliesFloating';
import SlideThemedAmbience from './components/animations/SlideThemedAmbience';
import ChapterRibbon from './components/ui/ChapterRibbon';
import CookieConsent from './components/ui/CookieConsent';
import ChapterIndex from './components/ui/ChapterIndex';
import Lightbox from './components/ui/Lightbox';
import TodayPill from './components/ui/TodayPill';
import ConquistaUnlock from './components/ui/ConquistaUnlock';
import ErrorBoundary from './components/ui/ErrorBoundary';
import { LightboxProvider } from './context/LightboxContext';

import LandingPage from './components/slides/LandingPage';
import IntroSlide from './components/slides/IntroSlide';
import AntesDepoisSlide from './components/slides/AntesDepoisSlide';
import TimerSlide from './components/slides/TimerSlide';
import MusicaSlide from './components/slides/MusicaSlide';
import CartaSlide from './components/slides/CartaSlide';
import TagsSlide from './components/slides/TagsSlide';
import VersiculoSlide from './components/slides/VersiculoSlide';
import MomentosSlide from './components/slides/MomentosSlide';
import PresenteFotosSlide from './components/slides/PresenteFotosSlide';
import PromessasSlide from './components/slides/PromessasSlide';
import MotivosSlide from './components/slides/MotivosSlide';
import FuturoSlide from './components/slides/FuturoSlide';
import RecadoSlide from './components/slides/RecadoSlide';
import CreditosSlide from './components/slides/CreditosSlide';
import CartasLacradasSlide from './components/slides/CartasLacradasSlide';
import BucketListSlide from './components/slides/BucketListSlide';
import FinalSlide from './components/slides/FinalSlide';
import SlideSkeleton from './components/ui/SlideSkeleton';

const HistoriaSlide   = lazy(() => import('./components/slides/HistoriaSlide'));
const MapaSlide       = lazy(() => import('./components/slides/MapaSlide'));
const ConquistasSlide = lazy(() => import('./components/slides/ConquistasSlide'));

// ─── Portais estáticos (borboletas) ─────────────────────────────────────────
// Componente separado com memo: não re-renderiza a cada mudança de activeSlide.
const StaticPortals = memo(function StaticPortals({ isMobile }) {
  return createPortal(<ButterfliesFloating isMobile={isMobile} />, document.body);
});

const DynamicPortals = memo(function DynamicPortals({ activeSlide, setActiveSlide, isMobile }) {
  return createPortal(
    <>
      <SlideThemedAmbience activeIndex={activeSlide} isMobile={isMobile} />
      <ChapterRibbon active={activeSlide} />
      <ChapterIndex activeSlide={activeSlide} setActiveSlide={setActiveSlide} />
    </>,
    document.body,
  );
});

// Fallback exibido se o MapaSlide lançar um erro (Leaflet, tile layer, etc.)
function MapaFallback() {
  return (
    <section className="snap-slide scene-dark scene-deep flex items-center justify-center">
      <p className="t-muted text-sm">O mapa não pôde ser carregado.</p>
    </section>
  );
}

export default function App() {
  const [revelado, setRevelado] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const isMobile = useIsMobile();

  // ─── Rastreamento do capítulo ativo ─────────────────────────────────────
  // O índice vem do id do <section> via SLIDE_IDS, não da posição no DOM:
  // assim os capítulos lazy (História, Mapa, Conquistas) não desalinham a
  // fita de navegação enquanto carregam.
  // threshold múltiplo + cobertura de viewport: compensa capítulos mais altos
  // que a tela, que nunca atingiriam 20% de si mesmos.
  useEffect(() => {
    if (!revelado) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          const viewportCoverage = e.intersectionRect.height / window.innerHeight;
          if (e.intersectionRatio >= 0.2 || viewportCoverage >= 0.5) {
            const idx = SLIDE_IDS.indexOf(e.target.id);
            if (idx !== -1) setActiveSlide(idx);
          }
        });
      },
      { threshold: [0.1, 0.2, 0.3, 0.5] },
    );

    const observados = new WeakSet();
    const observarNovos = () => {
      document.querySelectorAll('[data-slide]').forEach(el => {
        if (observados.has(el)) return;
        observados.add(el);
        obs.observe(el);
      });
    };
    observarNovos();

    // Capítulos lazy entram no DOM depois: observa os que aparecerem.
    const mo = new MutationObserver(observarNovos);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      obs.disconnect();
    };
  }, [revelado]);

  // setActiveSlide é referência estável do useState; memoizamos para deixar explícito
  // que DynamicPortals não recebe uma nova função a cada render.
  const stableSet = useMemo(() => setActiveSlide, []);

  return (
    // reducedMotion="user" respeita a preferência do sistema operacional:
    // desativa/reduz animações Framer Motion para quem ativou "Reduzir movimento".
    <MotionConfig reducedMotion="user">
      <LightboxProvider>
        <Lightbox />
        <CookieConsent />
        {!revelado ? (
          <LandingPage onReveal={setRevelado} />
        ) : (
          <>
            <StaticPortals isMobile={isMobile} />
            <DynamicPortals activeSlide={activeSlide} setActiveSlide={stableSet} isMobile={isMobile} />
            {createPortal(<TodayPill />, document.body)}
            {createPortal(<ConquistaUnlock />, document.body)}

            <div>
              <IntroSlide />
              <TimerSlide />
              <AntesDepoisSlide />
              <MusicaSlide />
              <CartaSlide />
              <TagsSlide />
              <VersiculoSlide />
              <MomentosSlide />
              <Suspense fallback={<SlideSkeleton scene="scene-cream" />}>
                <HistoriaSlide />
              </Suspense>
              <ErrorBoundary fallback={<MapaFallback />}>
                <Suspense fallback={<SlideSkeleton scene="scene-dark scene-deep" />}>
                  <MapaSlide />
                </Suspense>
              </ErrorBoundary>
              <PresenteFotosSlide />
              <PromessasSlide />
              <MotivosSlide />
              <FuturoSlide />
              <RecadoSlide />
              <CreditosSlide />
              <CartasLacradasSlide />
              <BucketListSlide />
              <Suspense fallback={<SlideSkeleton scene="scene-dark scene-cosmos" />}>
                <ConquistasSlide />
              </Suspense>
              <FinalSlide />
            </div>
          </>
        )}
      </LightboxProvider>
    </MotionConfig>
  );
}

import React, { useLayoutEffect, useRef } from 'react';
import './ScrollStack.css';

export interface ScrollStackItemProps {
  children: React.ReactNode;
  itemClassName?: string;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = '',
}) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

export interface ScrollStackProps {
  children: React.ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  mobileOnly?: boolean;
  onStackComplete?: () => void;
}

interface CardTransform {
  translateY: number;
  scale: number;
  rotation: number;
  blur: number;
}

const STACK_MEDIA_QUERY =
  '(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

const calculateProgress = (scrollTop: number, start: number, end: number) => {
  if (scrollTop < start) return 0;
  if (scrollTop > end) return 1;
  if (start === end) return 1;
  return (scrollTop - start) / (end - start);
};

const parsePosition = (value: string | number, containerHeight: number) => {
  if (typeof value === 'string' && value.includes('%')) {
    return (parseFloat(value) / 100) * containerHeight;
  }
  return typeof value === 'number' ? value : parseFloat(value);
};

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 80,
  itemScale = 0.03,
  itemStackDistance = 32,
  stackPosition = '15%',
  scaleEndPosition = '8%',
  baseScale = 0.88,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
  mobileOnly = false,
  onStackComplete,
}) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const stackCompletedRef = useRef(false);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    const inner = scroller?.querySelector<HTMLElement>('.scroll-stack-inner');
    const endElement = inner?.querySelector<HTMLElement>('.scroll-stack-end');
    if (!scroller || !inner || !endElement) return;

    const cards = Array.from(
      inner.querySelectorAll<HTMLElement>('.scroll-stack-card'),
    );
    const mediaQuery = window.matchMedia(STACK_MEDIA_QUERY);
    const motionQuery = window.matchMedia('(prefers-reduced-motion: no-preference)');
    const phoneQuery = window.matchMedia('(max-width: 1023px)');
    const lastTransforms = new Map<number, CardTransform>();

    let initialTops: number[] = [];
    let measuredContainerHeight = 0;
    let stackEnabled = false;
    let mobileStack = false;
    let cardHeights: number[] = [];
    let updateFrame: number | null = null;
    let measureFrame: number | null = null;
    let disposed = false;

    const getScrollTop = () =>
      useWindowScroll ? window.scrollY : scroller.scrollTop;

    const clearCardStyles = () => {
      cards.forEach((card) => {
        card.style.removeProperty('z-index');
        card.style.removeProperty('margin-bottom');
        card.style.removeProperty('will-change');
        card.style.removeProperty('transform-origin');
        card.style.removeProperty('backface-visibility');
        card.style.removeProperty('transform');
        card.style.removeProperty('filter');
        card.style.removeProperty('perspective');
      });
    };

    const updateCardTransforms = () => {
      updateFrame = null;
      if (!stackEnabled || !initialTops.length) return;

      const scrollTop = getScrollTop();
      const containerHeight = measuredContainerHeight;
      const stackPositionPx = parsePosition(stackPosition, containerHeight);
      const scaleEndPositionPx = parsePosition(scaleEndPosition, containerHeight);
      const endElementTop = useWindowScroll
        ? endElement.getBoundingClientRect().top + window.scrollY
        : endElement.offsetTop;

      cards.forEach((card, index) => {
        const cardTop = initialTops[index] ?? 0;
        if (mobileStack) {
          // Tall cards scroll fully into view before their bottom edge pins.
          const height = cardHeights[index];
          const pinTop = Math.min(24, containerHeight - height - 24);
          const lastIndex = cards.length - 1;
          const stackBottom = initialTops[lastIndex] + cardHeights[lastIndex];
          const translateY = Math.max(0, Math.min(
            scrollTop - cardTop + pinTop,
            stackBottom - cardTop - height,
          ));
          const nextTop = initialTops[index + 1];
          const progress = nextTop === undefined ? 0 : calculateProgress(
            scrollTop, nextTop - containerHeight, nextTop - 24,
          );
          card.style.transformOrigin = 'bottom center';
          card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${1 - progress * 0.04})`;
          return;
        }
        const triggerStart =
          cardTop - stackPositionPx - itemStackDistance * index;
        const triggerEnd = cardTop - scaleEndPositionPx;
        const pinStart = triggerStart;
        const pinEnd = Math.max(pinStart, endElementTop - containerHeight / 2);

        const scaleProgress = calculateProgress(
          scrollTop,
          triggerStart,
          triggerEnd,
        );
        const targetScale = baseScale + index * itemScale;
        const scale = 1 - scaleProgress * (1 - targetScale);
        const rotation = rotationAmount
          ? index * rotationAmount * scaleProgress
          : 0;

        let blur = 0;
        if (blurAmount) {
          let topCardIndex = 0;
          for (
            let comparisonIndex = 0;
            comparisonIndex < cards.length;
            comparisonIndex += 1
          ) {
            const comparisonTop = initialTops[comparisonIndex] ?? 0;
            const comparisonStart =
              comparisonTop -
              stackPositionPx -
              itemStackDistance * comparisonIndex;
            if (scrollTop >= comparisonStart) topCardIndex = comparisonIndex;
          }

          if (index < topCardIndex) {
            blur = Math.max(0, (topCardIndex - index) * blurAmount);
          }
        }

        let translateY = 0;
        if (scrollTop >= pinStart && scrollTop <= pinEnd) {
          translateY =
            scrollTop - cardTop + stackPositionPx + itemStackDistance * index;
        } else if (scrollTop > pinEnd) {
          translateY =
            pinEnd - cardTop + stackPositionPx + itemStackDistance * index;
        }

        const nextTransform: CardTransform = {
          translateY: Math.round(translateY * 100) / 100,
          scale: Math.round(scale * 1000) / 1000,
          rotation: Math.round(rotation * 100) / 100,
          blur: Math.round(blur * 100) / 100,
        };
        const previousTransform = lastTransforms.get(index);
        const changed =
          !previousTransform ||
          Math.abs(previousTransform.translateY - nextTransform.translateY) > 0.1 ||
          Math.abs(previousTransform.scale - nextTransform.scale) > 0.001 ||
          Math.abs(previousTransform.rotation - nextTransform.rotation) > 0.1 ||
          Math.abs(previousTransform.blur - nextTransform.blur) > 0.1;

        if (changed) {
          card.style.transform = `translate3d(0, ${nextTransform.translateY}px, 0) scale(${nextTransform.scale}) rotate(${nextTransform.rotation}deg)`;
          card.style.filter =
            nextTransform.blur > 0 ? `blur(${nextTransform.blur}px)` : '';
          lastTransforms.set(index, nextTransform);
        }

        if (index === cards.length - 1) {
          const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
          if (isInView && !stackCompletedRef.current) {
            stackCompletedRef.current = true;
            onStackComplete?.();
          } else if (!isInView && stackCompletedRef.current) {
            stackCompletedRef.current = false;
          }
        }
      });
    };

    const requestUpdate = () => {
      if (!stackEnabled || updateFrame !== null) return;
      updateFrame = window.requestAnimationFrame(updateCardTransforms);
    };

    const measure = () => {
      measureFrame = null;
      if (disposed) return;
      if (updateFrame !== null) {
        window.cancelAnimationFrame(updateFrame);
        updateFrame = null;
      }

      stackEnabled = !mobileOnly && mediaQuery.matches;
      mobileStack = !stackEnabled && motionQuery.matches && (!mobileOnly || phoneQuery.matches);
      if (mobileStack) stackEnabled = true;
      lastTransforms.clear();
      stackCompletedRef.current = false;

      if (!stackEnabled) {
        scroller.dataset.stackMode = 'static';
        initialTops = [];
        clearCardStyles();
        return;
      }

      if (mobileStack) {
        clearCardStyles();
        scroller.dataset.stackMode = 'mobile';
        measuredContainerHeight = useWindowScroll ? window.innerHeight : scroller.clientHeight;
        cards.forEach((card, index) => { card.style.zIndex = `${index + 1}`; });
        cardHeights = cards.map((card) => card.offsetHeight);
        initialTops = cards.map((card) => useWindowScroll
          ? card.getBoundingClientRect().top + window.scrollY : card.offsetTop);
        updateCardTransforms();
        return;
      }

      cards.forEach((card, index) => {
        card.style.removeProperty('transform');
        card.style.removeProperty('filter');
        card.style.zIndex = `${index + 1}`;
        card.style.marginBottom =
          index < cards.length - 1 ? `${itemDistance}px` : '';
        card.style.willChange = 'transform, filter';
        card.style.transformOrigin = 'top center';
        card.style.backfaceVisibility = 'hidden';
        card.style.perspective = '1000px';
      });

      measuredContainerHeight = useWindowScroll
        ? window.innerHeight
        : scroller.clientHeight;
      const firstStackPosition = parsePosition(
        stackPosition,
        measuredContainerHeight,
      );
      stackEnabled = cards.every((card, index) => {
        const targetScale = Math.min(1, baseScale + index * itemScale);
        const stackedTop = firstStackPosition + itemStackDistance * index;
        const availableHeight = measuredContainerHeight - stackedTop - 16;
        return card.getBoundingClientRect().height * targetScale <= availableHeight;
      });
      scroller.dataset.stackMode = stackEnabled ? 'animated' : 'static';

      if (!stackEnabled) {
        initialTops = [];
        clearCardStyles();
        return;
      }

      initialTops = cards.map((card) =>
        useWindowScroll
          ? card.getBoundingClientRect().top + window.scrollY
          : card.offsetTop,
      );
      updateCardTransforms();
    };

    const requestMeasure = () => {
      if (measureFrame !== null) return;
      measureFrame = window.requestAnimationFrame(measure);
    };

    const scrollTarget: Window | HTMLElement = useWindowScroll
      ? window
      : scroller;
    scrollTarget.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestMeasure, { passive: true });
    window.addEventListener('orientationchange', requestMeasure, { passive: true });
    window.addEventListener('load', requestMeasure, { once: true });
    mediaQuery.addEventListener('change', requestMeasure);
    motionQuery.addEventListener('change', requestMeasure);
    phoneQuery.addEventListener('change', requestMeasure);

    const resizeObserver = new ResizeObserver(requestMeasure);
    resizeObserver.observe(document.body);
    resizeObserver.observe(scroller);
    cards.forEach((card) => resizeObserver.observe(card));

    void document.fonts?.ready.then(() => {
      if (!disposed) requestMeasure();
    });

    measure();

    return () => {
      disposed = true;
      scrollTarget.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestMeasure);
      window.removeEventListener('orientationchange', requestMeasure);
      window.removeEventListener('load', requestMeasure);
      mediaQuery.removeEventListener('change', requestMeasure);
      motionQuery.removeEventListener('change', requestMeasure);
      phoneQuery.removeEventListener('change', requestMeasure);
      resizeObserver.disconnect();
      if (updateFrame !== null) window.cancelAnimationFrame(updateFrame);
      if (measureFrame !== null) window.cancelAnimationFrame(measureFrame);
      delete scroller.dataset.stackMode;
      clearCardStyles();
      stackCompletedRef.current = false;
    };
  }, [
    baseScale,
    blurAmount,
    itemDistance,
    itemScale,
    itemStackDistance,
    onStackComplete,
    rotationAmount,
    scaleEndPosition,
    stackPosition,
    useWindowScroll,
    mobileOnly,
  ]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;

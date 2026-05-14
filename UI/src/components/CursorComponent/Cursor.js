import { useEffect, useRef, useState } from 'react';
import './Cursor.css';

function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId;

    const moveDot = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    const animateRing = () => {
      const lag = 0.1;
      ringX += (mouseX - ringX) * lag;
      ringY += (mouseY - ringY) * lag;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      rafId = requestAnimationFrame(animateRing);
    };

    const onMouseEnter = () => setIsHidden(false);
    const onMouseLeave = () => setIsHidden(true);
    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const addHover = () => {
      const targets = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, label, .av-card, .av-cat-card, .br-brand-card, .svc-card'
      );
      targets.forEach(el => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    window.addEventListener('mousemove', moveDot);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Re-query hover targets periodically for dynamic content
    addHover();
    const hoverInterval = setInterval(addHover, 2000);

    rafId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', moveDot);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      clearInterval(hoverInterval);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className={`cur-dot${isHovering ? ' cur-dot--hover' : ''}${isClicking ? ' cur-dot--click' : ''}${isHidden ? ' cur-dot--hidden' : ''}`}
      />
      <div
        ref={ringRef}
        className={`cur-ring${isHovering ? ' cur-ring--hover' : ''}${isClicking ? ' cur-ring--click' : ''}${isHidden ? ' cur-ring--hidden' : ''}`}
      />
    </>
  );
}

export default Cursor;

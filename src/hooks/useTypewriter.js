import { useState, useEffect, useContext } from 'react';
import { MotionContext } from '../constants';

export function useTypewriter(roles = []) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(roles[0]?.length || 0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(false);
  const enabled = useContext(MotionContext);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(b => !b);
    }, 530);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    if (!enabled || !roles.length) return;
    const current = roles[index];

    if (!isDeleting && subIndex === current.length) {
      const pause = setTimeout(() => setIsDeleting(true), 1900);
      return () => clearTimeout(pause);
    }

    if (isDeleting && subIndex === 0) {
      setIsDeleting(false);
      setIndex(i => (i + 1) % roles.length);
      return;
    }

    const speed = isDeleting ? 38 : 72;
    const timer = setTimeout(() => {
      setSubIndex(s => s + (isDeleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [subIndex, index, isDeleting, enabled, roles]);

  const currentRole = roles[index] || '';
  const displayText = enabled ? currentRole.substring(0, subIndex) : currentRole;

  return { displayText, blink, enabled };
}

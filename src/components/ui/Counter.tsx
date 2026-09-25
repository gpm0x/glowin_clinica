'use client';

import { FC, useEffect, useRef } from 'react';
import { animate, useInView, useMotionValue, useTransform, motion } from 'framer-motion';
import { EASE } from '@/utils/animations';

interface Props {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
  suffixClassName?: string;
}

export const Counter: FC<Props> = ({
  to,
  suffix = '',
  duration = 2.2,
  className,
  suffixClassName,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toString());

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, to, { duration, ease: EASE });
    return () => controls.stop();
  }, [isInView, to, duration, count]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
      {suffix && <span className={suffixClassName}>{suffix}</span>}
    </span>
  );
};

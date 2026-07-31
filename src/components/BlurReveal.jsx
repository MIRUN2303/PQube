import { motion } from 'motion/react';

/**
 * BlurReveal — word-by-word scroll blur reveal.
 * Built fresh with framer-motion's whileInView (IntersectionObserver),
 * no GSAP/ScrollTrigger dependency.
 *
 * Each word starts blurred + hidden + slightly rotated, and
 * animates to crisp/visible with a stagger as the heading scrolls into view.
 */
const BlurReveal = ({
  text,
  className = '',
  as = 'h2',
  blur = 12,
  y = 24,
  rotate = 5,
  stagger = 0.12,
  duration = 0.7,
  once = true,
  amount = 0.4,
  ...rest
}) => {
  const Tag = as;
  const words = String(text).split(' ');

  return (
    <Tag className={className} {...rest}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block will-change-[transform,opacity,filter]"
          style={{ marginRight: '0.25em' }}
          initial={{ opacity: 0, y, rotate, filter: `blur(${blur}px)` }}
          whileInView={{ opacity: 1, y: 0, rotate: 0, filter: 'blur(0px)' }}
          viewport={{ once, amount }}
          transition={{
            duration,
            delay: i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
};

export default BlurReveal;

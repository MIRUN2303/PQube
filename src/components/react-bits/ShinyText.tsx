interface ShinyTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export default function ShinyText({ text, className = "", speed = 3 }: ShinyTextProps) {
  return (
    <span
      className={`bg-gradient-to-r from-white via-pqube-primary to-white bg-[length:200%_100%] bg-clip-text text-transparent animate-shine ${className}`}
      style={{
        animationDuration: `${speed}s`,
      }}
    >
      {text}
    </span>
  );
}

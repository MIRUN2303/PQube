import { ArrowRight } from 'lucide-react';

const animMap = {
  Cloud: 'anim-float',
  Globe: 'anim-spin',
  CodeXml: 'anim-pulse',
  Server: 'anim-blink',
  Workflow: 'anim-flow',
  ChartColumn: 'anim-wave',
  LayoutDashboard: 'anim-pulse',
  Sparkles: 'anim-twinkle',
  Smartphone: 'anim-vibrate',
  ShoppingCart: 'anim-bounce',
  Megaphone: 'anim-ring',
  Database: 'anim-pulse',
  Heart: 'anim-beat',
  Search: 'anim-scan',
  ClipboardCheck: 'anim-pulse',
  Hammer: 'anim-strike',
  TrendingUp: 'anim-trend',
};

export default function ServiceCard({ service }) {
  const Icon = service.icon;
  const animClass = animMap[Icon.displayName] || '';

  return (
    <a
      href={service.link}
      className="group relative overflow-hidden bg-gradient-to-br from-white via-[#F5F7FC] to-[#E9EDF7] border border-black/8 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
    >
      {/* Liquid image reveal — a soft blob of the service image blooms outward on hover */}
      <div
        className="card-liquid"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(8,12,28,0.82) 0%, rgba(14,18,40,0.62) 100%), url(${service.image})`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2B2B2B] to-[#101010] border border-[#D4A017]/40 flex items-center justify-center mb-4 shadow-md shadow-black/30 transition-transform duration-200 group-hover:scale-110">
          <span className={`icon-wrap ${animClass}`}>
            <Icon size={22} className="text-[#F0C75E]" />
          </span>
        </div>

        <h3 className="text-lg font-bold text-[var(--pqube-cyan)] mb-2 group-hover:text-[#9BDCFF] transition-colors">
          {service.title}
        </h3>
        <p className="text-sm text-[var(--pqube-gray-500)] leading-relaxed mb-4 line-clamp-3 transition-colors duration-500 group-hover:text-white group-hover:[text-shadow:0_1px_2px_rgba(10,15,40,0.65),0_3px_10px_rgba(10,15,40,0.4)]">
          {service.description}
        </p>

        {service.tag && (
          <span className="inline-block text-[10px] uppercase tracking-wider bg-[#D4A017]/10 text-[#D4A017] px-2 py-0.5 rounded mb-3">
            {service.tag}
          </span>
        )}

        <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--pqube-navy)] group-hover:text-[#D4A017] transition-colors">
          Learn more <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>

      <style>{`
        .card-liquid {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transform: scale(1.08);
          -webkit-mask-image: radial-gradient(circle at 50% 50%, black 0%, black 42%, transparent 74%);
          mask-image: radial-gradient(circle at 50% 50%, black 0%, black 42%, transparent 74%);
          -webkit-mask-size: 5% 5%;
          mask-size: 5% 5%;
          -webkit-mask-position: center;
          mask-position: center;
          transition:
            opacity 0.7s ease,
            transform 2.4s cubic-bezier(0.22, 1, 0.36, 1),
            -webkit-mask-size 2.2s cubic-bezier(0.22, 1, 0.36, 1),
            mask-size 2.2s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: mask-size, transform, opacity;
          pointer-events: none;
        }

        .group:hover .card-liquid {
          opacity: 1;
          transform: scale(1.02);
          -webkit-mask-size: 340% 340%;
          mask-size: 340% 340%;
        }

        .icon-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .group:hover .anim-float { animation: iconFloat 2s ease-in-out infinite; }
        .group:hover .anim-spin { animation: iconSpin 2s linear infinite; }
        .group:hover .anim-pulse { animation: iconPulse 1.5s ease-in-out infinite; }
        .group:hover .anim-blink { animation: iconBlink 1.2s ease-in-out infinite; }
        .group:hover .anim-flow { animation: iconFlow 1.8s ease-in-out infinite; }
        .group:hover .anim-wave { animation: iconWave 1.2s ease-in-out infinite; }
        .group:hover .anim-twinkle { animation: iconTwinkle 1s ease-in-out 1; }
        .group:hover .anim-vibrate { animation: iconVibrate 0.6s ease-in-out 1; }
        .group:hover .anim-bounce { animation: iconBounce 0.8s ease-in-out 1; }
        .group:hover .anim-ring { animation: iconRing 0.8s ease-in-out 1; }
        .group:hover .anim-beat { animation: iconBeat 1s ease-in-out infinite; }
        .group:hover .anim-scan { animation: iconScan 1.2s ease-in-out infinite; }
        .group:hover .anim-strike { animation: iconStrike 0.5s ease-in-out 1; }
        .group:hover .anim-trend { animation: iconTrend 1.2s ease-in-out infinite; }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes iconSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes iconPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.7; }
        }

        @keyframes iconBlink {
          0%, 100% { opacity: 1; }
          25% { opacity: 0.3; }
          50% { opacity: 1; }
          75% { opacity: 0.3; }
        }

        @keyframes iconFlow {
          0%, 100% { transform: translateX(0) scaleX(1); }
          25% { transform: translateX(3px) scaleX(1.1); }
          75% { transform: translateX(-3px) scaleX(0.9); }
        }

        @keyframes iconWave {
          0%, 100% { transform: scaleY(1) translateY(0); }
          25% { transform: scaleY(0.7) translateY(3px); }
          50% { transform: scaleY(1.1) translateY(-2px); }
          75% { transform: scaleY(0.85) translateY(2px); }
        }

        @keyframes iconTwinkle {
          0% { transform: scale(1); filter: brightness(1); }
          20% { transform: scale(0.85); filter: brightness(1.6); }
          40% { transform: scale(1.15); filter: brightness(1.3); }
          60% { transform: scale(0.95); filter: brightness(1.5); }
          80% { transform: scale(1.05); filter: brightness(1.1); }
          100% { transform: scale(1); filter: brightness(1); }
        }

        @keyframes iconVibrate {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-3px) rotate(-5deg); }
          30% { transform: translateX(3px) rotate(5deg); }
          45% { transform: translateX(-2px) rotate(-3deg); }
          60% { transform: translateX(2px) rotate(3deg); }
          75% { transform: translateX(-1px) rotate(-2deg); }
        }

        @keyframes iconBounce {
          0%, 100% { transform: translateY(0); }
          20% { transform: translateY(-8px); }
          40% { transform: translateY(0); }
          55% { transform: translateY(-5px); }
          70% { transform: translateY(0); }
          85% { transform: translateY(-2px); }
        }

        @keyframes iconRing {
          0%, 100% { transform: scale(1); }
          20% { transform: scale(1.2); }
          40% { transform: scale(0.9); }
          60% { transform: scale(1.1); }
          80% { transform: scale(0.95); }
        }

        @keyframes iconBeat {
          0%, 100% { transform: scale(1); }
          10% { transform: scale(1.3); }
          20% { transform: scale(1); }
          30% { transform: scale(1.2); }
          40% { transform: scale(1); }
        }

        @keyframes iconScan {
          0%, 100% { transform: translateY(0); opacity: 1; }
          25% { transform: translateY(4px); opacity: 0.5; }
          50% { transform: translateY(0); opacity: 1; }
          75% { transform: translateY(-4px); opacity: 0.5; }
        }

        @keyframes iconStrike {
          0% { transform: rotate(0deg); }
          20% { transform: rotate(-20deg); }
          40% { transform: rotate(10deg); }
          60% { transform: rotate(-5deg); }
          80% { transform: rotate(3deg); }
          100% { transform: rotate(0deg); }
        }

        @keyframes iconTrend {
          0%, 100% { transform: translateY(0) scaleY(1); }
          33% { transform: translateY(-4px) scaleY(1.1); }
          66% { transform: translateY(2px) scaleY(0.9); }
        }
      `}</style>
    </a>
  );
}

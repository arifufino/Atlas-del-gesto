/* eslint-disable @next/next/no-img-element */
import type { CharacterProfile, Signal } from "./data";
import {
  characterStill,
  classNames,
  orderLabel,
  sourceForProfile,
  stillForSignal,
} from "./utils";

export function BrandLockup() {
  return (
    <>
      <span className="brand-mark">AG</span>
      <span>Atlas del gesto</span>
    </>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <header className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      <p>{children}</p>
    </header>
  );
}

export function StarGlyph({ filled }: { filled: boolean }) {
  return <span aria-hidden="true">{filled ? "★" : "☆"}</span>;
}

export function SeasonMarks({ seasons }: { seasons: number[] }) {
  return (
    <span className="season-marks" aria-label={`Temporadas ${seasons.join(", ")}`}>
      {[1, 2, 3, 4, 5, 6].map((season) => (
        <span
          key={season}
          className={classNames("season-mark", seasons.includes(season) && "active")}
          title={`Temporada ${season}`}
        >
          {season}
        </span>
      ))}
    </span>
  );
}

export function CharacterPortrait({
  profile,
  large = false,
}: {
  profile: CharacterProfile;
  large?: boolean;
}) {
  return (
    <div className={classNames("portrait real", large && "large")}>
      <img
        src={characterStill(profile)}
        alt={`Retrato de ${profile.name}`}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

export function GesturePlate({
  profile,
  signal,
  index,
  compact = false,
}: {
  profile: CharacterProfile;
  signal: Signal;
  index: number;
  compact?: boolean;
}) {
  const facialChannel = signal.channel === "Mirada" || signal.channel === "Rostro";

  return (
    <figure className={classNames("gesture-visual", compact && "compact")}>
      <div className="gesture-image">
        <img
          src={stillForSignal(profile, signal)}
          alt={`${profile.name}: ${signal.title}. ${signal.observation}`}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: facialChannel ? "center 24%" : "center" }}
        />
        <span className="still-label">Fotograma de la serie</span>
      </div>
      <figcaption>
        <span>{orderLabel(index)}</span>
        <strong>{signal.title}</strong>
        {!compact && (
          <a href={sourceForProfile(profile)} target="_blank" rel="noreferrer">
            Fuente visual ↗
          </a>
        )}
      </figcaption>
    </figure>
  );
}

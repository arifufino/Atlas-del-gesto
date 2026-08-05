"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useState } from "react";
import {
  channels,
  profiles,
  sources,
  type CharacterProfile,
  type Signal,
} from "./data";

const seasonOptions = ["Todas", "1", "2", "3", "4", "5", "6"] as const;

const SAVED_STORAGE_KEY = "atlas-gesto-saved";

function readSavedIds(): string[] {
  let stored: string | null;
  try {
    stored = window.localStorage.getItem(SAVED_STORAGE_KEY);
  } catch (error) {
    console.warn(
      `No se pudo leer la colección guardada en "${SAVED_STORAGE_KEY}" desde localStorage.`,
      error,
    );
    return [];
  }
  if (!stored) return [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(stored);
  } catch (error) {
    console.warn(
      `La colección guardada en "${SAVED_STORAGE_KEY}" no es JSON válido; se ignora.`,
      error,
    );
    return [];
  }

  if (!Array.isArray(parsed) || !parsed.every((id) => typeof id === "string")) {
    console.warn(
      `La colección guardada en "${SAVED_STORAGE_KEY}" no tiene el formato esperado (array de textos); se ignora.`,
    );
    return [];
  }

  return parsed;
}

function writeSavedIds(ids: string[]): void {
  try {
    window.localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(ids));
  } catch (error) {
    console.warn(
      `No se pudo guardar la colección en "${SAVED_STORAGE_KEY}" en localStorage.`,
      error,
    );
  }
}

const stillExtensions: Record<string, string> = {
  "diana-mitford": "webp",
  "duke-shelby": "png",
};

const wikiSlugs: Record<string, string> = {
  "ada-shelby": "Ada_Thorne",
  "chester-campbell": "Inspector_Campbell",
  "grace-burgess": "Grace_Shelby",
  "isaiah-jesus": "Isiah_Jesus",
};

const stillOverrides: Partial<
  Record<string, Partial<Record<Signal["channel"], string>>>
> = {
  "thomas-shelby": {
    Objeto: "./stills/thomas-smoking.jpg",
    Movimiento: "./stills/thomas-walking.jpg",
    Distancia: "./stills/shelby-family.jpg",
  },
  "arthur-shelby": {
    Movimiento: "./stills/shelby-betting-shop.jpg",
    Distancia: "./stills/family-meeting.jpg",
  },
  "john-shelby": {
    Postura: "./stills/shelby-betting-shop.jpg",
    Distancia: "./stills/family-meeting.jpg",
  },
  "polly-gray": { Distancia: "./stills/polly-ada.png" },
  "ada-shelby": { Distancia: "./stills/polly-ada.png" },
  "michael-gray": { Distancia: "./stills/family-meeting.jpg" },
  "finn-shelby": { Distancia: "./stills/family-meeting.jpg" },
  "grace-burgess": { Distancia: "./stills/thomas-grace.png" },
  "lizzie-stark": { Distancia: "./stills/thomas-lizzie.png" },
  "may-carleton": { Distancia: "./stills/thomas-may.jpg" },
};

function characterStill(profile: CharacterProfile) {
  const extension = stillExtensions[profile.id] ?? "jpg";
  return `./stills/${profile.id}.${extension}`;
}

function stillForSignal(profile: CharacterProfile, signal: Signal) {
  return stillOverrides[profile.id]?.[signal.channel] ?? characterStill(profile);
}

function sourceForProfile(profile: CharacterProfile) {
  const slug = wikiSlugs[profile.id] ?? profile.name.replaceAll(" ", "_");
  return `https://peaky-blinders.fandom.com/wiki/${slug}`;
}

function SeasonMarks({ seasons }: { seasons: number[] }) {
  return (
    <span className="season-marks" aria-label={`Temporadas ${seasons.join(", ")}`}>
      {[1, 2, 3, 4, 5, 6].map((season) => (
        <span
          key={season}
          className={seasons.includes(season) ? "season-mark active" : "season-mark"}
          title={`Temporada ${season}`}
        >
          {season}
        </span>
      ))}
    </span>
  );
}

function CharacterPortrait({
  profile,
  large = false,
}: {
  profile: CharacterProfile;
  large?: boolean;
}) {
  return (
    <div className={large ? "portrait real large" : "portrait real"}>
      <img
        src={characterStill(profile)}
        alt={`Retrato de ${profile.name}`}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

function GesturePlate({
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
    <figure className={compact ? "gesture-visual compact" : "gesture-visual"}>
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
        <span>{String(index + 1).padStart(2, "0")}</span>
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
function ProfileDialog({
  profile,
  onClose,
  saved,
  onToggleSaved,
}: {
  profile: CharacterProfile;
  onClose: () => void;
  saved: boolean;
  onToggleSaved: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="dialog-backdrop" onMouseDown={onClose}>
      <article
        className="profile-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="dialog-close" onClick={onClose} aria-label="Cerrar perfil">
          ×
        </button>
        <header className="dialog-header">
          <CharacterPortrait profile={profile} large />
          <div>
            <span className="eyebrow">{profile.archetype}</span>
            <h2 id="dialog-title">{profile.name}</h2>
            <p>{profile.role}</p>
          </div>
        </header>

        <div className="signature-row">
          <div>
            <span>Firma corporal</span>
            <strong>{profile.signature}</strong>
          </div>
          <SeasonMarks seasons={profile.seasons} />
        </div>

        <section className="evolution">
          <span className="section-index">Evolución</span>
          <p>{profile.evolution}</p>
        </section>

        <section>
          <div className="dialog-section-title">
            <span className="section-index">Señales observadas</span>
            <span>{profile.signals.length} patrones</span>
          </div>
          <div className="signal-list">
            {profile.signals.map((signal, index) => (
              <article className="signal-detail" key={signal.title}>
                <div className="signal-number">{String(index + 1).padStart(2, "0")}</div>
                <GesturePlate profile={profile} signal={signal} index={index} />
                <div>
                  <span className="signal-channel">{signal.channel}</span>
                  <h3>{signal.title}</h3>
                  <dl>
                    <div>
                      <dt>Qué se ve</dt>
                      <dd>{signal.observation}</dd>
                    </div>
                    <div>
                      <dt>Qué construye</dt>
                      <dd>{signal.function}</dd>
                    </div>
                    <div>
                      <dt>Cuándo aparece</dt>
                      <dd>{signal.context}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="dialog-footer">
          <p>Interpreta el patrón completo, no un gesto aislado.</p>
          <button className={saved ? "save-button saved" : "save-button"} onClick={onToggleSaved}>
            <span aria-hidden="true">{saved ? "★" : "☆"}</span>
            {saved ? "Guardado" : "Guardar perfil"}
          </button>
        </footer>
      </article>
    </div>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [channel, setChannel] = useState<(typeof channels)[number]>("Todos");
  const [season, setSeason] = useState<(typeof seasonOptions)[number]>("Todas");
  const [selected, setSelected] = useState<CharacterProfile | null>(null);
  const [savedOnly, setSavedOnly] = useState(false);
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    const storedIds = readSavedIds();
    const timer = window.setTimeout(() => setSaved(storedIds), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const toggleSaved = (id: string) => {
    setSaved((current) => {
      const next = current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id];
      writeSavedIds(next);
      return next;
    });
  };

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("es");
    return profiles.filter((profile) => {
      const matchesQuery =
        !normalized ||
        [
          profile.name,
          profile.role,
          profile.archetype,
          profile.signature,
          profile.evolution,
          ...profile.signals.flatMap((signal) => [
            signal.title,
            signal.observation,
            signal.function,
            signal.context,
          ]),
        ]
          .join(" ")
          .toLocaleLowerCase("es")
          .includes(normalized);
      const matchesChannel =
        channel === "Todos" || profile.signals.some((signal) => signal.channel === channel);
      const matchesSeason = season === "Todas" || profile.seasons.includes(Number(season));
      const matchesSaved = !savedOnly || saved.includes(profile.id);
      return matchesQuery && matchesChannel && matchesSeason && matchesSaved;
    });
  }, [query, channel, season, savedOnly, saved]);

  const signalCount = profiles.reduce((total, profile) => total + profile.signals.length, 0);

  const scrollToSection =
    (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setSelected(null);
      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `#${id}`);
      });
    };

  return (
    <main>
      <nav className="topbar" aria-label="Navegación principal">
        <a href="#inicio" className="brand" onClick={scrollToSection("inicio")}>
          <span className="brand-mark">AG</span>
          <span>Atlas del gesto</span>
        </a>
        <div className="nav-links">
          <a href="#atlas" onClick={scrollToSection("atlas")}>Personajes</a>
          <a href="#metodo" onClick={scrollToSection("metodo")}>Método</a>
          <a href="#fuentes" onClick={scrollToSection("fuentes")}>Fuentes</a>
        </div>
        <button className="saved-nav" onClick={() => setSavedOnly((value) => !value)}>
          <span aria-hidden="true">{savedOnly ? "★" : "☆"}</span>
          Mi colección
          {saved.length > 0 && <b>{saved.length}</b>}
        </button>
      </nav>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <span className="eyebrow">Investigación de las 6 temporadas</span>
          <h1>
            El cuerpo también
            <br />
            <em>cuenta la historia.</em>
          </h1>
          <p className="hero-lead">
            Un atlas de miradas, posturas, pausas y distancias que construyen a los
            personajes de <cite>Peaky Blinders</cite>.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#atlas" onClick={scrollToSection("atlas")}>
              Explorar el atlas <span aria-hidden="true">↓</span>
            </a>
            <a className="text-link" href="#metodo" onClick={scrollToSection("metodo")}>
              Cómo leerlo
            </a>
          </div>
          <div className="hero-stats">
            <div>
              <strong>{profiles.length}</strong>
              <span>personajes</span>
            </div>
            <div>
              <strong>{signalCount}</strong>
              <span>patrones</span>
            </div>
            <div>
              <strong>6</strong>
              <span>temporadas</span>
            </div>
          </div>
        </div>

        <aside className="anatomy-card" aria-label="Canales de observación">
          <div className="anatomy-top">
            <span>ANATOMÍA DE UNA PRESENCIA</span>
            <span>01—08</span>
          </div>
          <div className="anatomy-core">
            <div className="core-word">
              <span>pre</span>
              <strong>SEN</strong>
              <span>cia</span>
            </div>
            <div className="orbit orbit-one">Mirada</div>
            <div className="orbit orbit-two">Postura</div>
            <div className="orbit orbit-three">Ritmo</div>
            <div className="orbit orbit-four">Distancia</div>
          </div>
          <p>
            Una señal cambia de sentido según quién la emite, quién la recibe y qué acaba
            de ocurrir.
          </p>
        </aside>
      </section>

      <section className="principles" aria-label="Principios de lectura">
        <div>
          <span>01</span>
          <strong>Observar</strong>
          <p>Describir primero, interpretar después.</p>
        </div>
        <div>
          <span>02</span>
          <strong>Comparar</strong>
          <p>Buscar cambios respecto al patrón habitual.</p>
        </div>
        <div>
          <span>03</span>
          <strong>Contextualizar</strong>
          <p>Leer escena, vínculo, voz y movimiento juntos.</p>
        </div>
      </section>

      <section className="atlas-section" id="atlas">
        <header className="section-heading">
          <div>
            <span className="eyebrow">Archivo de personajes</span>
            <h2>Firmas corporales</h2>
          </div>
          <p>
            Cada perfil reúne un patrón dominante, su evolución y las señales que lo
            componen.
          </p>
        </header>

        <div className="filter-panel">
          <label className="search-box">
            <span className="sr-only">Buscar personaje o gesto</span>
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Buscar personaje, gesto o intención…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {query && (
              <button onClick={() => setQuery("")} aria-label="Limpiar búsqueda">
                ×
              </button>
            )}
          </label>
          <label className="season-select">
            <span>Temporada</span>
            <select
              value={season}
              onChange={(event) => setSeason(event.target.value as typeof season)}
            >
              {seasonOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="channel-tabs" aria-label="Filtrar por canal corporal">
          {channels.map((option) => (
            <button
              key={option}
              className={channel === option ? "active" : ""}
              onClick={() => setChannel(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="result-line" aria-live="polite">
          <span>
            {filtered.length} {filtered.length === 1 ? "perfil" : "perfiles"}
            {savedOnly ? " guardados" : ""}
          </span>
          {(query || channel !== "Todos" || season !== "Todas" || savedOnly) && (
            <button
              onClick={() => {
                setQuery("");
                setChannel("Todos");
                setSeason("Todas");
                setSavedOnly(false);
              }}
            >
              Restablecer filtros
            </button>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="profile-grid">
            {filtered.map((profile, index) => {
              const featuredSignal =
                (channel !== "Todos" &&
                  profile.signals.find((signal) => signal.channel === channel)) ||
                profile.signals[0];
              const isSaved = saved.includes(profile.id);
              return (
                <article className="profile-card" key={profile.id}>
                  <div className="card-top">
                    <span className="card-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <button
                      className={isSaved ? "star-button saved" : "star-button"}
                      onClick={() => toggleSaved(profile.id)}
                      aria-label={
                        isSaved
                          ? `Quitar ${profile.name} de guardados`
                          : `Guardar ${profile.name}`
                      }
                    >
                      {isSaved ? "★" : "☆"}
                    </button>
                  </div>
                  <div className="profile-identity">
                    <CharacterPortrait profile={profile} />

                    <div>
                      <span>{profile.archetype}</span>
                      <h3>{profile.name}</h3>
                      <p>{profile.role}</p>
                    </div>
                  </div>
                  <div className="signature">
                    <span>Firma corporal</span>
                    <strong>{profile.signature}</strong>
                  </div>
                  <div className="card-gesture-gallery" aria-label={`Láminas de ${profile.name}`}>
                    {profile.signals.map((signal, signalIndex) => (
                      <GesturePlate
                        key={signal.title}
                        profile={profile}
                        signal={signal}
                        index={signalIndex}
                        compact
                      />
                    ))}
                  </div>
                  <div className="featured-signal">
                    <span>{featuredSignal.channel}</span>
                    <h4>{featuredSignal.title}</h4>
                    <p>{featuredSignal.observation}</p>
                  </div>
                  <div className="card-footer">
                    <SeasonMarks seasons={profile.seasons} />
                    <button onClick={() => setSelected(profile)}>
                      Ver perfil <span aria-hidden="true">↗</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <span>∅</span>
            <h3>No encontramos ese patrón</h3>
            <p>Prueba otro término o restablece los filtros.</p>
          </div>
        )}
      </section>

      <section className="method-section" id="metodo">
        <div className="method-intro">
          <span className="eyebrow">Método y límites</span>
          <h2>Leer patrones, no adivinar pensamientos.</h2>
        </div>
        <div className="method-content">
          <p className="method-lead">
            Este atlas analiza una interpretación audiovisual. Describe decisiones
            actorales repetidas y las relaciona con la función dramática que cumplen.
            No diagnostica a personas reales ni asigna un significado universal a un
            gesto.
          </p>
          <div className="method-grid">
            <article>
              <span>01 / Baseline</span>
              <h3>Primero, el patrón habitual</h3>
              <p>
                La quietud puede ser calma en un personaje y congelación defensiva en
                otro. Importa la diferencia respecto a su conducta habitual.
              </p>
            </article>
            <article>
              <span>02 / Conjunto</span>
              <h3>Después, varias señales</h3>
              <p>
                Mirada, voz, postura, manos, distancia y contexto deben converger antes
                de proponer una lectura.
              </p>
            </article>
            <article>
              <span>03 / Evolución</span>
              <h3>Finalmente, el cambio</h3>
              <p>
                Las pérdidas, el ascenso, la intimidad y el miedo alteran el patrón a lo
                largo de las temporadas.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="sources-section" id="fuentes">
        <header className="section-heading">
          <div>
            <span className="eyebrow">Base documental</span>
            <h2>Fuentes consultadas</h2>
          </div>
          <p>
            Guiones, notas de producción, entrevistas y literatura académica sostienen
            la observación.
          </p>
        </header>
        <p className="image-credit-note">
          Los fotogramas pertenecen a BBC / Caryn Mandabach Productions y se muestran
          con fines de análisis editorial. El archivo visual fue consultado a través de
          Peaky Blinders Wiki; cada lámina enlaza su ficha de procedencia.
        </p>
        <div className="source-list">
          {sources.map((source, index) => (
            <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{source.label}</strong>
              <em>{source.type}</em>
              <b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <div className="brand">
          <span className="brand-mark">AG</span>
          <span>Atlas del gesto</span>
        </div>
        <p>Un archivo independiente de análisis audiovisual y conducta no verbal.</p>
        <a href="#inicio" onClick={scrollToSection("inicio")}>Volver arriba ↑</a>
      </footer>

      {selected && (
        <ProfileDialog
          profile={selected}
          onClose={() => setSelected(null)}
          saved={saved.includes(selected.id)}
          onToggleSaved={() => toggleSaved(selected.id)}
        />
      )}
    </main>
  );
}

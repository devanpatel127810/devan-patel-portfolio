import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import CourtsBoard, { type BoardCard } from "@/components/motion/CourtsBoard";
import {
  profile,
  skills,
  skillCategories,
  timeline,
  certifications,
  projects,
  ownProjects,
  achievements,
  offTheClock,
} from "@/lib/data";

const MENU: { item: string; note: string }[] = [
  { item: "GenAI systems in production", note: "daily" },
  { item: "Document intelligence pipelines", note: "house" },
  { item: "LLM agents & workflows", note: "fresh" },
  { item: "Full-stack product builds", note: "end→end" },
  { item: "Client-facing delivery", note: "on site" },
];

/**
 * Board layout, carried over from the old Courts section: rows ~385px
 * apart, tilts capped at ±2°, card width min(218px, 22.5%).
 */
const CARDS: BoardCard[] = [
  {
    kicker: offTheClock[0].kicker,
    title: offTheClock[0].title,
    text: offTheClock[0].detail,
    motif: "book",
    tone: "dark",
    x: "1.5%",
    y: 10,
    r: -2,
  },
  {
    kicker: offTheClock[1].kicker,
    title: offTheClock[1].title,
    text: offTheClock[1].detail,
    motif: "dumbbell",
    tone: "orange",
    x: "25.5%",
    y: 4,
    r: 2,
  },
  {
    kicker: "The Car",
    title: "I stop for cars. always.",
    text: "Sports cars are my weakness. If it has an engine note worth hearing, I'm stopping to listen — the one traffic I'll happily sit in.",
    motif: "car",
    tone: "gold",
    x: "50%",
    y: 12,
    r: -1,
  },
  {
    kicker: "On Repeat",
    title: "Coffee",
    text: "Espresso first, everything else after. The café scene further up this page is barely an exaggeration.",
    motif: "cup",
    tone: "light",
    x: "74.5%",
    y: 6,
    r: 2,
  },
  {
    kicker: "The Kitchen Shift",
    title: "Cooking",
    text: "Meal prep on Sundays, experiments the rest of the week. The kitchen is just a lab with better snacks.",
    motif: "pan",
    tone: "court",
    x: "1.5%",
    y: 395,
    r: 1,
  },
  {
    kicker: "The Courts",
    title: "Tennis",
    text: "Baseline rallies, net on good days, and an ongoing negotiation with my second serve.",
    motif: "tennis",
    tone: "court",
    x: "25.5%",
    y: 393,
    r: -2,
  },
  {
    kicker: "The Courts",
    title: "Pickleball",
    text: "Yes, there's a second kitchen in my life now. Dinks, drops, and absolutely no mercy at the net.",
    motif: "pickleball",
    tone: "gold",
    x: "50%",
    y: 397,
    r: 2,
  },
  {
    kicker: "The Courts",
    title: "Basketball",
    text: "Pickup runs whenever there's a court, a ball, and daylight left. First to arrive, last to leave.",
    motif: "basketball",
    tone: "orange",
    x: "74.5%",
    y: 395,
    r: -1,
  },
  {
    kicker: offTheClock[2].kicker,
    title: offTheClock[2].title,
    text: offTheClock[2].detail,
    motif: "wave",
    tone: "dark",
    x: "13%",
    y: 745,
    r: -1,
  },
  {
    kicker: offTheClock[3].kicker,
    title: offTheClock[3].title,
    text: offTheClock[3].detail,
    motif: "pin",
    tone: "light",
    x: "55%",
    y: 741,
    r: 2,
  },
];

/**
 * THE DETAILS (film rebuild, Oct 26): the film journey above carries
 * one-line essences on its shot overlays; this plain-flow section
 * carries the COMPLETE record — every timeline stop, tool, work
 * card, result, dish, board card, and contact link from the old
 * card-plus-text page, word for word. Recruiters get everything in
 * normal readable form, no animation required. The nav anchors
 * (#garage, #cafe, #kitchen, #courts, #contact) land here.
 */
export default function Details() {
  const work = projects.filter((p) => p.period.includes("Deloitte"));

  return (
    <div className="details">
      <div className="detail-intro">
        <p className="kicker">The full story</p>
        <p className="lede">
          The flight above is the short version. Everything below is the complete
          record — same stops, same words, no animation required.
        </p>
      </div>

      <section className="detail-block detail-garage" id="garage">
        <p className="kicker">Scene 01 — The Garage</p>
        <h2 className="display">
          How I <em>got here.</em>
        </h2>
        <p className="lede">
          I started out curious about how things work, then got a lot more
          interested in building the things. One degree, two internships, a
          semester in Madrid, and a lot of shipped code later — this is the
          road so far.
        </p>

        <Reveal>
          <ol className="stop-list">
            {timeline.map((t) => (
              <li className="stop-item" key={`${t.period}-${t.title}`}>
                <span className="when">{t.period}</span>
                <div>
                  <h3>{t.title}</h3>
                  <p className="org">{t.org}</p>
                  <p>{t.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="tool-wall">
          <Reveal>
            <h3 className="subhead">The tool wall</h3>
            <p className="lede">
              Everything I reach for, hung up in one place — from the first
              sketch of an idea to the shipped build. Levels are honest.
            </p>
          </Reveal>
          <div className="tool-grid">
            {skillCategories.map((cat, ci) => (
              <Reveal key={cat} delay={ci * 0.05}>
                <div className="tool-group">
                  <h4>
                    <span className="tg-no">{String(ci + 1).padStart(2, "0")}</span>
                    {cat}
                  </h4>
                  <ul>
                    {skills
                      .filter((s) => s.category === cat)
                      .map((s) => (
                        <li className="tool-row" key={s.name}>
                          <span className="t-name">{s.name}</span>
                          <span className="t-rule" aria-hidden="true">
                            <i style={{ width: `${s.level}%` }} />
                          </span>
                          <span className="t-level">{s.level}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="cert-row" aria-label="Certifications">
              {certifications.map((c) => (
                <div className="cert-plaque" key={c.name}>
                  <span className="n">{c.name}</span>
                  <span className="i">{c.issuer}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="detail-block detail-cafe" id="cafe">
        <p className="kicker">Scene 02 — The Café</p>
        <h2 className="display">
          The <em>day job.</em>
        </h2>
        <p className="lede">
          I&rsquo;m a <b>Forward Deployed Engineer at Deloitte</b>, on the
          ZoraAI team since January 2025. Plain version: I sit with clients,
          figure out where AI actually helps, and ship it into their real
          workflows — then stay until it works in production.
        </p>

        <div className="cafe-grid">
          <Reveal>
            <aside className="menu-board" aria-label="What I do — café menu board">
              <h3>on the board</h3>
              <p className="mb-sub">served all day</p>
              <ul>
                {MENU.map((m) => (
                  <li key={m.item}>
                    <span>{m.item}</span>
                    <span className="dots" aria-hidden="true" />
                    <span className="price">{m.note}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>

          <div>
            {work.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <article className="work-card">
                  <div className="wc-top">
                    <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                    <h3>{p.title}</h3>
                  </div>
                  <p className="period">{p.period}</p>
                  <p>{p.description}</p>
                  {p.metric && <p className="metric">{p.metric}</p>}
                  <div className="stack">
                    {p.stack.map((s) => (
                      <span className="chip" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="ach-strip" aria-label="Results">
            {achievements.map((a) => (
              <div className="ach" key={a.label}>
                <p className="v">{a.value}</p>
                <p className="l">{a.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="detail-block detail-kitchen" id="kitchen">
        <p className="kicker">Scene 03 — The Kitchen</p>
        <h2 className="display">
          Cooked up <em>myself.</em>
        </h2>
        <p className="lede">
          The building doesn&rsquo;t stop at work. These are my own
          projects — for users, for family, and for the fun of watching an
          idea turn into a thing that runs.
        </p>

        <div className="dish-grid">
          {ownProjects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.07}>
              <article className="dish">
                <div className="d-top">
                  <span className="idx">№ {p.index}</span>
                  <span className="kind">{p.kind}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                {p.stack && (
                  <div className="stack">
                    {p.stack.map((s) => (
                      <span className="chip" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                )}
                {p.link && (
                  <a
                    className="visit"
                    href={p.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    visit {p.link.label} ↗
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="detail-block detail-courts" id="courts">
        <p className="kicker">Scene 04 — The Courts</p>
        <h2 className="display">
          Off the clock, <em>calculated chaos.</em>
        </h2>
        <p className="lede">
          Not the work version. When I&rsquo;m not shipping, it&rsquo;s some
          rotation of courts, kitchen, gym, and garage — usually with coffee
          involved.
        </p>

        <CourtsBoard cards={CARDS} />

        <div className="oc-lines" aria-label="Off the clock, the short version">
          <span>four-day upper/lower split</span>
          <span>winter arc, in progress</span>
          <span>tennis · pickleball · basketball</span>
          <span>austin based</span>
        </div>
      </section>

      <section className="detail-block detail-contact" id="contact">
        <p className="kicker">Scene 05 — Sunset</p>
        <h2 className="display">
          Let&rsquo;s build <em>something.</em>
        </h2>
        <p className="lede">
          Roles, projects, or just hi — my inbox is open and I reply fast.
          The résumé is one click away, and everything on this page is the
          real record.
        </p>

        <div className="sunset-row">
          <Reveal>
            <figure className="sunset-photo">
              <Image
                src="/profile-hd.jpg"
                alt="Portrait photograph of Devan Patel"
                width={320}
                height={400}
                sizes="148px"
              />
              <figcaption className="cap">the actual human</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.08}>
            <div>
              <div className="contact-btns">
                <a className="primary" href={`mailto:${profile.email}`}>
                  Email me
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                <a href={profile.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  Résumé
                </a>
              </div>
              <p className="shortcuts" aria-label="Keyboard shortcuts">
                psst — these work on your keyboard too: <b>G</b> GitHub ·{" "}
                <b>L</b> LinkedIn · <b>M</b> mail · <b>R</b> résumé
              </p>
            </div>
          </Reveal>
        </div>

        <footer className="footer">
          <span>
            © {new Date().getFullYear()} {profile.name} — {profile.location}
          </span>
          <span>
            painted in Austin · <a href="#top">back to the overlook ↑</a>
          </span>
        </footer>
      </section>
    </div>
  );
}

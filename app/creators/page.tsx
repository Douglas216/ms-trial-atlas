import Link from "next/link";

const creators = [
  {
    name: "Nara Michaelson, MD, MS",
    image: "/creators/nara-michaelson.png",
    role: "Assistant Professor of Neurology, Beth Israel Deaconess Medical Center / Harvard Medical School",
    x: "@narologist",
    xUrl: "https://x.com/narologist",
    linkedIn: "https://www.linkedin.com/in/nara-michaelson-md-ms-461a42286/",
  },
  {
    name: "Douglas Jiang",
    image: "/creators/douglas-jiang.png",
    role: "Master’s student in Computational Biology and Quantitative Genetics at Harvard T.H. Chan School of Public Health",
    x: "@jydouglasx",
    xUrl: "https://x.com/jydouglasx",
    linkedIn: "https://www.linkedin.com/in/douglasjiang/",
  },
];

export default function CreatorsPage() {
  return (
    <main className="creators-page">
      <nav className="creators-nav" aria-label="Page navigation">
        <Link href="/">← Back to the atlas</Link>
      </nav>
      <header className="creators-header">
        <p className="section-label">MS Trial Atlas</p>
        <h1>The creators</h1>
        <p>
          A clinical and computational collaboration grounded in the needs of people living with multiple sclerosis.
        </p>
      </header>
      <section className="creator-grid" aria-label="Creators">
        {creators.map((creator) => (
          <article className="creator-card" key={creator.name}>
            {/* Portraits use direct static paths so they remain reliable on every custom domain. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={creator.image} alt={`Portrait of ${creator.name}`} width="244" height="244" />
            <div>
              <h2>{creator.name}</h2>
              <p className="creator-role">{creator.role}</p>
              <div className="creator-links" aria-label={`${creator.name} links`}>
                <a href={creator.xUrl} target="_blank" rel="noreferrer">X {creator.x} ↗</a>
                <a href={creator.linkedIn} target="_blank" rel="noreferrer">LinkedIn ↗</a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

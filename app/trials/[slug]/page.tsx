import Link from "next/link";
import { notFound } from "next/navigation";
import { getTrialBySlug, trials } from "../../data/trials";

export function generateStaticParams() {
  return trials.map((trial) => ({ slug: trial.slug }));
}

export default async function TrialPlaceholderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trial = getTrialBySlug(slug);

  if (!trial) {
    notFound();
  }

  return (
    <main className="profile-page">
      <Link className="back-link" href="/">
        <span aria-hidden="true">←</span> Back to the atlas
      </Link>
      <div className="profile-content">
        <p className="profile-kicker">Landmark trial</p>
        <h1>{trial.studyName}</h1>
        <p className="profile-drug">{trial.drug}</p>
        <div className="profile-rule" />
        <p className="coming-soon">Trial profile coming soon</p>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildArticleSchema } from "@/app/components/schemas/articleSchema";
import { buildPageMetadata, getBaseUrl } from "@/app/lib/buildPageMetadata";
import { googleVisibilityArticle as guide } from "@/app/lib/googleVisibilityArticle";

type Props = { params: Promise<{ locale: string }> };

const heading = "mb-4 text-2xl font-bold tracking-tight sm:text-3xl";
const linkStyle = "font-medium text-primary underline underline-offset-4";
const inspectionHelp = "https://support.google.com/webmasters/answer/12482179?hl=fr";
const indexingHelp = "https://support.google.com/webmasters/answer/7440203?hl=fr";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "fr" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if ((await params).locale !== "fr") notFound();
  const metadata = buildPageMetadata({
    locale: "fr",
    title: `${guide.title} | Devsignpro`,
    description: guide.excerpt,
    route: guide.href,
    keywords: [],
    ogImagePath: guide.image,
    type: "article",
  });

  return {
    ...metadata,
    alternates: { canonical: metadata.alternates?.canonical },
    openGraph: {
      ...metadata.openGraph,
      alternateLocale: [],
      images: [{
        url: `${getBaseUrl()}${guide.image}`,
        width: guide.imageWidth,
        height: guide.imageHeight,
        alt: guide.imageAlt,
      }],
    },
  };
}

export default async function GoogleVisibilityArticle({ params }: Props) {
  if ((await params).locale !== "fr") notFound();
  const baseUrl = getBaseUrl();
  const article = buildArticleSchema({
    type: "BlogPosting",
    baseUrl,
    locale: "fr",
    path: guide.href,
    headline: guide.title,
    description: guide.excerpt,
    image: guide.image,
    datePublished: guide.published,
    section: guide.category,
    langCode: "fr-FR",
  });
  const crumbs = [
    { name: "Accueil", path: "/fr" },
    { name: "Articles", path: "/fr/articles" },
    { name: guide.title, path: `/fr${guide.href}` },
  ];
  const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map(({ name, path }, index) => ({
        "@type": "ListItem",
        name,
        item: `${baseUrl}${path}`,
        position: index + 1,
      })),
  };

  return (
    <main className="bg-background">
      {[article, breadcrumb].map((schema) => (
        <script key={schema["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      ))}
      <article className="mx-auto max-w-3xl px-4 pb-16 pt-10 sm:px-6 sm:pt-16">
        <nav aria-label="Fil d’Ariane" className="mb-8 text-sm text-muted-foreground">
          <ol className="flex flex-wrap gap-2">
            {crumbs.slice(0, 2).map(({ name, path }) => (
              <li key={path}><Link href={path} className="hover:underline">{name}</Link> <span aria-hidden="true">/</span></li>
            ))}
            <li aria-current="page">{guide.title}</li>
          </ol>
        </nav>

        <header className="mb-9">
          <p className="mb-3 text-sm font-semibold text-primary">{guide.category}</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">{guide.title}</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Par <Link href="/fr/about" className={linkStyle}>Mohammed Elghandori</Link>
            {" · "}<time dateTime={guide.published}>{guide.date}</time>{" · "}{guide.readTime}
          </p>
          <p className="mt-6 text-lg leading-relaxed">
            Votre site est en ligne, mais vous ne le trouvez pas sur Google ? Je commencerais par la page
            qui présente votre service principal. Collez son adresse dans Google Search Console pour
            savoir si Google l’a indexée. Si elle y figure déjà, regardez pour quelles recherches elle
            s’affiche. C’est souvent là qu’on trouve le premier indice.
          </p>
        </header>

        <Image
          src={guide.image}
          alt={guide.imageAlt}
          width={guide.imageWidth}
          height={guide.imageHeight}
          sizes="(min-width: 768px) 720px, (min-width: 640px) calc(100vw - 48px), calc(100vw - 32px)"
          className="mb-10 h-auto w-full rounded-2xl border border-border"
        />

        <div className="space-y-10 leading-relaxed">
          <section aria-labelledby="verifier">
            <h2 id="verifier" className={heading}>Comment savoir si ma page est indexée sur Google ?</h2>
            <p>
              Dans Search Console, sélectionnez votre site. Collez l’adresse complète de la page dans
              <strong> Inspection de l’URL</strong>, en haut de l’écran. Si vous venez de refaire votre site,
              prenez l’adresse actuelle de la page.
            </p>
            <ol className="my-4 list-decimal space-y-2 pl-6">
              <li>Lisez le verdict en haut du rapport. Si l’URL est sur Google, passez au rapport Performances.</li>
              <li>Si elle n’est pas indexée, ouvrez la rubrique <strong>Indexation de la page</strong> pour lire le motif.</li>
              <li>Si vous avez corrigé quelque chose, utilisez <strong>Tester l’URL active</strong> pour vérifier l’état de la page aujourd’hui.</li>
            </ol>
            <p>
              Vous venez de corriger la page ? Le test en direct vérifie ce que Google peut voir maintenant.
              Le rapport d’indexation peut encore afficher ce que Google avait vu avant la correction.
              {" "}<a href={inspectionHelp} className={linkStyle}>Aide Google sur l’inspection d’URL</a>.
            </p>
          </section>

          <section aria-labelledby="non-indexee">
            <h2 id="non-indexee" className={heading}>Ma page n’est pas indexée. Que dois-je vérifier ?</h2>
            <p className="mb-4">
              Google découvre une adresse, puis son robot, Googlebot, tente d’y accéder. C’est
              l’exploration. Google peut ensuite exécuter le JavaScript nécessaire pour afficher
              la page. C’est le rendu. Si Google retient la page dans son index, elle peut apparaître
              dans les résultats. Sa position dépend ensuite de la recherche.{" "}
              <a href="https://developers.google.com/search/docs/fundamentals/how-search-works?hl=fr" className={linkStyle}>Comment fonctionne la recherche Google</a>.
            </p>
            <dl className="space-y-4">
              <div className="rounded-xl border border-border bg-card p-4">
                <dt className="font-semibold">La page vient d’être publiée ou reste inconnue de Google</dt>
                <dd className="mt-1 text-muted-foreground">Ajoutez un lien interne depuis une page où le visiteur s’attend à la trouver. Par exemple, reliez une nouvelle prestation à votre page Services. Ce maillage interne aide aussi Google à découvrir la page. Vérifiez que le sitemap contient l’adresse finale.</dd>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <dt className="font-semibold">L’adresse redirige ou Google a choisi une autre version</dt>
                <dd className="mt-1 text-muted-foreground">Inspectez la destination de la redirection ou l’URL canonique, c’est-à-dire la version que Google a retenue. Si c’est bien l’adresse que vous voulez voir apparaître, utilisez-la dans vos liens internes et votre sitemap.</dd>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <dt className="font-semibold">La page est bloquée ou contient une instruction noindex</dt>
                <dd className="mt-1 text-muted-foreground">Si l’exploration est bloquée, vérifiez si une règle du fichier robots.txt empêche Googlebot de visiter la page. Si le rapport indique noindex, vérifiez le réglage de visibilité dans votre CMS. Corrigez uniquement un blocage involontaire sur une page destinée au public.</dd>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <dt className="font-semibold">Google l’a explorée, mais ne l’a pas indexée</dt>
                <dd className="mt-1 text-muted-foreground">Après un test de l’URL active, ouvrez la page testée et vérifiez que le titre et le contenu principal apparaissent dans le HTML rendu. Par exemple, si vos services s’affichent sur votre écran mais manquent dans la version testée, demandez à votre développeur de vérifier le rendu JavaScript. Si le contenu est présent, comparez la page aux autres pages de votre site qui répondent au même besoin.</dd>
              </div>
            </dl>
            <p className="mt-4">
              Après une correction, vous pouvez demander une indexation depuis l’inspection d’URL. Google
              décide quand revenir et quelle version retenir. Pour plusieurs pages importantes touchées après
              une refonte, un <Link href="/fr/services/technical-seo" className={linkStyle}>audit SEO technique</Link> peut
              aider à trouver une cause commune.{" "}
              <a href={indexingHelp} className={linkStyle}>Aide Google sur les motifs de non-indexation</a>.
            </p>
          </section>

          <section aria-labelledby="indexee">
            <h2 id="indexee" className={heading}>Mon site est indexé, mais mes clients ne le trouvent pas</h2>
            <p>
              Ouvrez <strong>Performances</strong> dans Search Console. Filtrez le rapport sur l’URL qui
              vous intéresse, puis ouvrez l’onglet <strong>Requêtes</strong>. Si vous travaillez avec des
              clients en France, ajoutez le filtre pays. Une impression indique que Google a affiché un
              résultat de votre site. Regardez les expressions qui déclenchent ces impressions et comparez-les
              aux recherches que vos clients feraient avant de vous contacter.
            </p>
            <p className="mt-4">
              Imaginez un hôtel dont la page d’accueil apparaît quand on cherche son nom. Pour une recherche
              comme « salle de séminaire à Tours », un organisateur veut connaître la capacité de la salle,
              les équipements, l’accès et la façon de demander un devis. Si ces renseignements restent
              dispersés dans une page générale, commencez par les réunir sur la page consacrée aux séminaires.
              C’est un bon point de départ pour{" "}
              <Link href="/fr/services/seo-content-optimization" className={linkStyle}>adapter vos contenus aux recherches de vos clients</Link>.
            </p>
          </section>

          <section aria-labelledby="exemple">
            <h2 id="exemple" className={heading}>Comment je choisis quoi corriger en premier</h2>
            <p>
              Après une refonte, je commence souvent par vérifier les pages qui doivent vous apporter des
              demandes de devis. Si Google retient encore une ancienne adresse, je vérifie où elle redirige.
              J’ouvre aussi votre menu et vos pages de services pour voir si des liens pointent toujours
              vers l’ancienne page.
            </p>
            <p className="mt-4">
              Quand la bonne page est indexée, je passe aux requêtes. Si elle apparaît surtout pour le nom
              de votre entreprise, je la relis comme si je découvrais votre activité. Est-ce que je comprends
              ce que vous proposez, à qui ça s’adresse et comment vous demander un devis ?
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>
                Google ne retient pas la bonne adresse ou le contenu principal manque dans la page testée ?
                Commencez par un <Link href="/fr/services/technical-seo" className={linkStyle}>audit SEO technique</Link>.
              </li>
              <li>
                La page est indexée, mais elle répond mal aux recherches de vos clients ?
                L’<Link href="/fr/services/seo-content-optimization" className={linkStyle}>optimisation de contenu SEO et GEO</Link> vous
                aide à clarifier l’offre et à répondre aux questions qui précèdent une demande de devis.
              </li>
            </ul>
          </section>

          <section aria-labelledby="aide" className="rounded-2xl border border-border bg-card p-5 sm:p-7">
            <h2 id="aide" className={heading}>Vous ne savez toujours pas quoi corriger ?</h2>
            <p>Envoyez-moi l’adresse de la page et le message que vous voyez dans Search Console. Je vous réponds sous 24 h pour vous indiquer la prochaine étape.</p>
            <Link href="/fr/contact" className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground">Demander un devis gratuit</Link>
          </section>
        </div>
      </article>
    </main>
  );
}

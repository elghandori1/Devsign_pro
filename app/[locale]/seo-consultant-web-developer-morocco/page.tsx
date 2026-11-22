// English URL of the Morocco market page. The page itself lives in
// ../consultant-seo-developpeur-web-maroc/page.tsx and renders English content
// for the `en` locale; the French URL serves `fr` only.
import MoroccoMarketPage, {
  generateMetadata,
} from "../consultant-seo-developpeur-web-maroc/page";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "en" }];
}

export { generateMetadata };
export default MoroccoMarketPage;

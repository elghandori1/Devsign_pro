"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  const segment = pathname?.split("/")[1];
  const isFrench = segment === "fr";
  const locale = isFrench ? "fr" : segment === "ar" ? "ar" : "en";
  const content = isFrench
    ? {
        title: "Désolé, cette page n'a pas été trouvée",
        description:
          "La page que vous recherchez a peut-être été supprimée, son nom a changé ou elle est temporairement indisponible.",
        buttonText: "Retour à l'accueil",
      }
    : segment === "ar"
      ? {
          title: "عذراً، لم يتم العثور على هذه الصفحة",
          description:
            "قد تكون الصفحة التي تبحث عنها قد تم حذفها، أو تم تغيير اسمها، أو أنها غير متاحة مؤقتاً.",
          buttonText: "العودة إلى الصفحة الرئيسية",
        }
      : {
          title: "Sorry, this page was not found",
          description:
            "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
          buttonText: "Back to Home",
        };

  return (
    <main className="min-h-[70vh] bg-background flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md space-y-6">
        <h1 className="text-8xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold">{content.title}</h2>
        <p className="text-muted-foreground">{content.description}</p>
        <div className="pt-4">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            {content.buttonText}
          </Link>
        </div>
      </div>
    </main>
  );
}

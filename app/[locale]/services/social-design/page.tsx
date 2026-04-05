import { getDictionary } from "@/app/lib/dictionary";
import { Locale } from "@/i18n-config";
import { i18n } from "@/i18n-config";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function SocialDesignPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const data = dict.pages.services_page.services.design;
  const isRtl = locale === "ar";
  const arrClass =
    locale === "ar" ? "rotate-180 transform -scale-y-100" : "";

  return (
    <main dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-background py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="space-y-4">
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center text-sm font-medium text-primary hover:underline gap-1"
          >
             {isRtl ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
            {dict.pages.services_page.title}
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{data.title}</h1>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-xl text-muted-foreground leading-relaxed">
            {data.description}
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Key Features</h2>
          <ul className="grid gap-3 sm:grid-cols-2 list-none p-0">
             {data.features.map((feature: string, idx: number) => (
                <li key={idx} className="flex items-center gap-2 bg-muted/50 p-3 rounded-lg border border-border">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
                    <span className="font-medium text-sm">{feature}</span>
                </li>
             ))}
          </ul>
        </div>
        
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center mt-12">
            <h3 className="text-2xl font-bold mb-4">{dict.pages.services_page.ctat_title}</h3>
            <p className="text-muted-foreground mb-6">{dict.pages.services_page.cta_desc}</p>
            <Link 
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
                {dict.pages.services_page.cta_btn}
                <ArrowRight className={arrClass} size={18} />
            </Link>
        </div>
      </div>
    </main>
  );
}
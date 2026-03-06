"use client";

import { Locale } from "@/i18n-config";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface AboutMeSectionAnimatedProps {
  imageSrc: string;
  paragraph1: string;
  paragraph2: string;
  cta: string;
  locale: Locale;
}

const imageVariant = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function AboutMeSectionAnimated({
  imageSrc,
  paragraph1,
  paragraph2,
  cta,
  locale,
}: AboutMeSectionAnimatedProps) {
  const isRtl = locale === "ar";

  return (
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <motion.div
        variants={imageVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative group w-full h-[360px] lg:h-[520px] rounded-3xl overflow-hidden border border-border shadow-xl"
      >
        <Image
          src={imageSrc}
          alt="About me"
          fill
          className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </motion.div>

      <div className={isRtl ? "text-right" : "text-left"}>
        <motion.p
          custom={1}
          variants={textVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          className="text-xl sm:text-2xl font-semibold text-foreground leading-tight mb-6"
        >
          {paragraph1}
        </motion.p>
        <motion.p
          custom={2}
          variants={textVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl"
        >
          {paragraph2}
        </motion.p>
        <motion.div
          custom={3}
          variants={textVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg hover:shadow-primary/40 hover:-translate-y-1 transition-all"
          >
            {cta}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

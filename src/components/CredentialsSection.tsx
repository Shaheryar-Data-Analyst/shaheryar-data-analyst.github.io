import { motion } from 'framer-motion';
import { portfolio } from '../content/portfolio';
import { useSitePreferences } from './SitePreferences';
import TravelMap from './TravelMap';

const arabicStrengths = [
  'التفكير المعماري على مستوى الأنظمة',
  'تحليل المشكلات المعقدة',
  'اتخاذ القرار المبني على البيانات',
  'التواصل بين فرق الهندسة والأعمال',
  'التخطيط والتنفيذ وضمان الجودة',
];

const arabicCertifications = [
  {
    title: '15 يوماً من Power BI — المعسكر التدريبي الكامل لـ Microsoft Power BI',
    description: 'تدريب عملي يغطي Power BI وتحويل البيانات ونمذجتها وDAX وتطوير لوحات المعلومات وتقارير ذكاء الأعمال.',
  },
  {
    title: 'المعسكر التدريبي الكامل لتطوير الويب المتكامل',
    description: 'تدريب في تطوير الواجهات والخدمات الخلفية وقواعد البيانات وواجهات البرمجة والمصادقة ومفاهيم النشر.',
  },
];

export function CredentialsSection() {
  const { isArabic } = useSitePreferences();
  return (
    <section
      id="education"
      className="relative w-full overflow-hidden bg-black px-6 pb-28 pt-12 text-[#E8DFD8] sm:px-12 lg:px-20"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[54rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/[0.035] blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="mb-7 flex items-center gap-4">
            <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-[#D4AF37]">
              {isArabic ? '05 / المؤهلات' : '05 / CREDENTIALS'}
            </span>
            <div className="h-px w-20 bg-gradient-to-r from-[#D4AF37]/80 to-transparent" />
          </div>
          <h2
            className="max-w-4xl text-5xl uppercase leading-[0.88] tracking-tight sm:text-6xl lg:text-[5.4rem]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="block bg-gradient-to-b from-white via-[#D5CBC0] to-[#605448] bg-clip-text text-transparent">
              {isArabic ? 'التعليم. الشهادات.' : 'EDUCATION. CERTIFICATIONS.'}
            </span>
            <span className="block bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] bg-clip-text text-transparent">
              {isArabic ? 'خبرة دولية مثبتة.' : 'PROVEN GLOBAL DELIVERY.'}
            </span>
          </h2>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="border border-[#8C6D4F]/35 bg-[#100D0B]/85 p-7 sm:p-9">
            <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.28em] text-[#D4AF37]">
              {isArabic ? 'الخلفية الأكاديمية' : 'Academic background'}
            </p>
            <div className="space-y-7">
              {portfolio.education.map((item) => (
                <article key={item.degree} className="border-l border-[#D4AF37]/40 pl-5">
                  <span className="text-[10px] font-mono tracking-[0.2em] text-[#8C6D4F]">{item.year}</span>
                  <h3
                    className="mt-2 text-3xl uppercase leading-none text-[#F7E7C4] sm:text-4xl"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {isArabic ? (item.degree.startsWith('Master') ? 'ماجستير في علم البيانات' : 'بكالوريوس هندسة البرمجيات') : item.degree}
                  </h3>
                  <p className="mt-2 text-sm text-[#BDB0A4]">{item.institution}</p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-[#D4AF37]">
                    {isArabic && item.result.includes('Distinction') ? 'تخرج بتقدير امتياز' : item.result}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            <div className="border border-[#8C6D4F]/35 bg-[#100D0B]/85 p-7 sm:p-9">
              <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.28em] text-[#D4AF37]">
                {isArabic ? 'نقاط القوة الرئيسية' : 'Key strengths'}
              </p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {(isArabic ? arabicStrengths : portfolio.strengths).map((strength) => (
                  <li key={strength} className="flex gap-3 text-xs leading-relaxed text-[#C7B8AA]">
                    <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-[#D4AF37]" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-[#8C6D4F]/35 bg-[#100D0B]/85 p-7 sm:p-9">
              <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.28em] text-[#D4AF37]">
                {isArabic ? 'السفر والخبرة الدولية' : 'Travel & international experience'}
              </p>
              <p className="mb-5 text-xs leading-relaxed text-[#A8988B]">
                {isArabic
                  ? 'رحلة دولية بدأت من باكستان وامتدت عبر أوروبا وآسيا ومنطقة الخليج.'
                  : 'An international journey beginning in Pakistan and extending across Europe, Asia, and the Gulf.'}
              </p>
              <p className="mb-4 text-[10px] uppercase tracking-[0.16em] text-[#D4AF37]">
                {isArabic ? 'بلدي الأم: باكستان' : `Home country: ${portfolio.internationalExperience.origin}`}
              </p>
              <p className="text-sm text-[#C7B8AA]">
                {isArabic ? 'مقيم حالياً في' : 'Currently based in'} <span className="text-[#F7E7C4]">{portfolio.internationalExperience.current}</span>
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.17em] text-[#D4AF37]">
                {isArabic ? 'تصريح العمل: إقامة قابلة للتحويل' : `Work authorization: ${portfolio.internationalExperience.workAuthorization}`}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 w-full">
          <TravelMap isArabic={isArabic} />
        </div>

        <div className="mt-5 border border-[#8C6D4F]/35 bg-[#100D0B]/85 p-7 sm:p-9">
          <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#D4AF37]">
              {isArabic ? 'الشهادات والتطوير المهني' : 'Certifications & professional development'}
            </p>
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#8C6D4F]">UDEMY</span>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {portfolio.certifications.map((certificate, index) => (
              <article key={certificate.title} className="relative border border-[#8C6D4F]/30 bg-[#0B0907] p-6">
                <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-[#D4AF37]/70 to-transparent" />
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#D4AF37]">
                    {certificate.provider} · {isArabic ? 'يونيو 2026' : certificate.date}
                  </span>
                  <span className="border border-[#8C6D4F]/35 px-2.5 py-1 text-[9px] uppercase tracking-[0.15em] text-[#C7B8AA]">
                    {certificate.duration}
                  </span>
                </div>
                <h3
                  className="text-2xl uppercase leading-tight text-[#F7E7C4] sm:text-3xl"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {isArabic ? arabicCertifications[index].title : certificate.title}
                </h3>
                <p className="mt-4 text-xs leading-[1.8] text-[#BDB0A4] sm:text-sm">
                  {isArabic ? arabicCertifications[index].description : certificate.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CredentialsSection;

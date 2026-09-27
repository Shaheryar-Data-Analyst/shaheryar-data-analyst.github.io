import { portfolio } from '../content/portfolio';
import React from 'react';
import { motion } from 'framer-motion';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import RepositoryCollection from './RepositoryCollection';
import { useSitePreferences } from './SitePreferences';

interface Project {
  number: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  capabilityHighlights: { label: string; value: string }[];
  highlights: string[];
}

const projects: Project[] = portfolio.projects.map((project) => ({
  number: project.number,
  title: project.title,
  category: project.category,
  description: project.description,
  tech: project.tags,
  capabilityHighlights: project.capabilityHighlights,
  highlights: 'highlights' in project ? (project.highlights ?? []) : [],
}));

const arabicProjectDescriptions = [
  'منصة مبنية باستخدام Laravel لتحليلات عروض الأسعار والمشاريع والمبيعات، تضم لوحات إدارية وتقارير Highcharts وDataTables وتقارير PDF مدعومة بالذكاء الاصطناعي.',
  'نموذج تطبيق خفيف لسير عمل الأعمال ولوحات المعلومات، مصمم لإدارة العمليات التشغيلية وإعداد التقارير.',
  'بوابة لإدارة إجازات الموظفين تدعم الطلبات والموافقات متعددة المراحل وتتبع الحالة والأرصدة والتقويم والسجلات القابلة للطباعة وعمليات الموارد البشرية.',
  'محاكاة تفاعلية لحديقة حيوانات تضم 15 حيواناً من ثلاثة أنواع، مع قواعد صحية خاصة بكل نوع وحفظ الحالة في JSON.',
  'نظام مواعيد يعتمد على البيانات لسير عمل العلاج الطبيعي واستخراج البيانات التشغيلية وتحليل اتجاهات أوقات الانتظار.',
  'تطبيق مكتبي ثنائي اللغة للشركات السعودية ينشئ فواتير PDF متوافقة مع ضريبة القيمة المضافة ويدعم رمز QR.',
];

const arabicCapabilityHighlights = [
  [
    { label: 'التسليم', value: 'من عرض السعر إلى المشروع والمبيعات' },
    { label: 'التحليلات', value: 'مؤشرات Highcharts وتقارير المناطق' },
    { label: 'التقارير', value: 'تقارير PDF مدعومة بـ OpenAI وDOMPDF' },
  ],
  [
    { label: 'النموذج', value: 'نموذج أولي خفيف لسير العمل' },
    { label: 'العمليات', value: 'لوحة لإدارة العمليات' },
    { label: 'التقارير', value: 'مراقبة العمليات وإعداد التقارير' },
  ],
  [
    { label: 'سير العمل', value: 'الموظف ← الموارد البشرية ← المدير' },
    { label: 'الموافقات', value: 'تتبع متعدد المراحل للحالة' },
    { label: 'السجلات', value: 'الأرصدة والتقويم والسجلات القابلة للطباعة' },
  ],
  [
    { label: 'النموذج', value: 'محاكاة كائنية التوجه بلغة PHP' },
    { label: 'النطاق', value: '3 أنواع · 15 حيواناً' },
    { label: 'الحالة', value: 'حفظ JSON وتتبع الصحة' },
  ],
  [
    { label: 'سير العمل', value: 'عمليات مواعيد العلاج الطبيعي' },
    { label: 'البيانات', value: 'تكامل MongoDB وREST API' },
    { label: 'التحليلات', value: 'تحليل اتجاهات الانتظار عبر Pandas' },
  ],
  [
    { label: 'المنصة', value: 'تطبيق مكتبي Python وTkinter' },
    { label: 'الامتثال', value: 'فواتير PDF متوافقة مع ضريبة القيمة المضافة' },
    { label: 'المخرجات', value: 'مستندات ثنائية اللغة ودعم QR' },
  ],
];

export const ProjectsSection: React.FC = () => {
  const { isArabic } = useSitePreferences();
  return (
    <section
      id="work"
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-20 pb-32 px-6 sm:px-12 lg:px-20"
    >
      {/* Studio Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-[36rem] h-[36rem] bg-[#D4AF37]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#8C6D4F]/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-4 mb-5"
        >
          <span
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {isArabic ? '02 / أعمال مختارة' : '02 / FEATURED WORK'}
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16"
        >
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase leading-[0.85] select-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              {isArabic ? 'مشاريع مختارة.' : 'SELECTED WORKS.'}
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
              {isArabic ? 'قيمة هندسية.' : 'ENGINEERED VALUE.'}
            </span>
          </h2>

          <p
            className="text-xs sm:text-sm font-light text-[#A8988B] max-w-sm mt-4 md:mt-0 leading-relaxed"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {isArabic ? 'استكشف نماذج سير العمل ومشاريع البرمجيات والتحليلات. اطلب التفاصيل لمعرفة المزيد عن أي مشروع.' : 'Explore workflow demos, software projects, and analytics work. Request details to learn more about any project.'}
          </p>
        </motion.div>

        {/* React Bits Stacking Deck */}
<ScrollStack
  itemDistance={20}
  itemScale={0.02}
  itemStackDistance={28}
  stackPosition="15%"
  scaleEndPosition="6%"
  baseScale={0.88}
  useWindowScroll={true}
>
          {projects.map((project, projectIndex) => (
            <ScrollStackItem key={project.title}>
              <div className="relative w-full rounded-2xl border border-[#8C6D4F]/50 bg-[#0E0C0A] p-6 sm:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.98)] group overflow-hidden transition-colors duration-500 hover:border-[#D4AF37]">
                
                {/* Top Gold Border Light Flare */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />

                {/* Corner Minimal L-Brackets */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />

                {/* Big Background Watermark Number */}
                <span
                  className="absolute -bottom-6 -right-3 text-8xl sm:text-9xl font-bold text-[#EAD8C7]/5 select-none pointer-events-none leading-none"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {project.number}
                </span>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                  
                  {/* Left Column (7 Cols) */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="text-xs font-mono font-bold text-[#D4AF37]">
                          {project.number} //
                        </span>
                        <span className="text-[10.5px] font-mono tracking-[0.25em] uppercase text-[#A8988B]">
                          {project.category}
                        </span>
                      </div>

                      <h3
                        className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-4 group-hover:text-[#F7E7C4] transition-colors uppercase leading-[0.9]"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      >
                        {project.title}
                      </h3>

                      <p
                        className="text-xs sm:text-sm md:text-[14px] font-light text-[#BDB0A4] leading-[1.85] tracking-wide mb-8 max-w-2xl"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {isArabic ? arabicProjectDescriptions[projectIndex] : project.description}
                      </p>
                      {!isArabic && project.highlights.length > 0 && (
                        <ul className="mb-8 grid gap-2 text-xs leading-[1.65] text-[#AFA093] sm:text-[13px]">
                          {project.highlights.map((highlight) => (
                            <li key={highlight} className="flex gap-3">
                              <span className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-[#D4AF37]" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 pt-6 border-t border-[#8C6D4F]/25">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 text-[10px] font-medium tracking-[0.16em] uppercase rounded-sm border border-[#8C6D4F]/40 bg-[#16120E] text-[#E8D7C5] group-hover:border-[#D4AF37]/50 transition-all duration-300"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column (5 Cols) */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6 lg:pl-6 lg:border-l lg:border-[#8C6D4F]/25">
                    <div>
                      <span className="block text-[9.5px] font-mono tracking-[0.25em] uppercase text-[#8C6D4F]">
                        {isArabic ? '// أبرز القدرات' : '// CAPABILITY HIGHLIGHTS'}
                      </span>
                      <p className="mb-4 mt-2 text-[10px] leading-relaxed tracking-[0.08em] text-[#A8988B]">
                        {isArabic ? 'أدلة مختارة على العمق التقني والتنفيذ.' : 'Selected proof of technical depth and delivery range.'}
                      </p>
                      <div className="grid gap-2.5">
                      {(isArabic ? arabicCapabilityHighlights[projectIndex] : project.capabilityHighlights).map((highlight, highlightIndex) => (
                        <div
                          key={`${highlight.label}-${highlight.value}`}
                          className="grid grid-cols-[auto_1fr] items-center gap-3 rounded-sm border border-[#8C6D4F]/25 bg-[#050403] p-3.5"
                        >
                          <span className="flex items-center gap-2 text-[9px] font-mono tracking-[0.08em] text-[#D4AF37]">
                            <span className="text-[#8C6D4F]">0{highlightIndex + 1}</span>
                            {highlight.label}
                          </span>
                          <span className="text-right text-[10.5px] font-mono font-medium leading-relaxed text-[#F7E7C4]">
                            {highlight.value}
                          </span>
                        </div>
                      ))}
                      </div>
                    </div>

                    <a
                      href={`mailto:${portfolio.email}?subject=${encodeURIComponent(`Project enquiry: ${project.title}`)}`}
                      aria-label={`Request details about ${project.title} by email`}
                      className="inline-flex items-center justify-center space-x-3 px-6 py-3.5 border border-[#8C6D4F] bg-[#16120E] hover:border-[#D4AF37] hover:bg-[#D4AF37] text-[#EAD8C7] hover:text-black text-[11px] font-medium tracking-[0.24em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      <span>{isArabic ? 'اطلب التفاصيل' : 'REQUEST DETAILS'}</span>
                      <span className="text-xs">↗</span>
                    </a>
                  </div>

                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>

        <RepositoryCollection repositories={portfolio.repositories} email={portfolio.email} isArabic={isArabic} />

      </div>
    </section>
  );
};

export default ProjectsSection;

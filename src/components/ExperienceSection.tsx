import { portfolio } from '../content/portfolio';
// src/components/ExperienceSection.tsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSitePreferences } from './SitePreferences';

interface RouteStop {
  id: string;
  year: string;
  title: string;
  organization: string;
  description: string;
  achievements: string[];
}

const journey: RouteStop[] = portfolio.experience.map((item, index) => ({
  id: String(index + 1).padStart(2, '0'),
  year: item.year,
  title: item.role.toUpperCase(),
  organization: item.company,
  description: item.place,
  achievements: item.achievements,
}));

const arabicRoles = ['محلل بيانات · المبيعات والتسويق', 'محلل بيانات', 'مهندس برمجيات · محلل بيانات', 'مهندس برمجيات', 'مهندس برمجيات مبتدئ'];
const arabicAchievements = [
  [
    'أنشأت لوحات Power BI تنفيذية للاستفسارات وعروض الأسعار وأوامر الشراء ومؤشرات الأداء الإقليمية.',
    'طورت منصة تحليلات باستخدام Laravel وMySQL تربط تقارير المشاريع والأداء التجاري.',
    'أتمت التقارير الشهرية باستخدام Python وخفضت العمل اليدوي بأكثر من 80%.',
  ],
  [
    'أنشأت لوحات Power BI وTableau لدعم قرارات أصحاب المصلحة.',
    'طورت تحليلات SQL ساهمت في زيادة المبيعات بنسبة 25%.',
    'صممت مسارات ETL أتمتت معالجة البيانات بنسبة 50%.',
  ],
  [
    'سلمت وحدات برمجية متكاملة من التخطيط والتصميم حتى التنفيذ.',
    'بنيت نموذج تعلم آلي للتنبؤ بفقد العملاء بدقة معلنة بلغت 85%.',
  ],
  [
    'نسقت تسليم الأنظمة وقُدت العمل على أنظمة تعالج 24 مليون معاملة سنوياً.',
    'حسّنت استعلامات SQL والإجراءات المخزنة واسترجاع البيانات.',
  ],
  [
    'بنيت تطبيقات فورية باستخدام Java وSpring Boot وJavaScript وAngularJS.',
    'نفذت المصادقة باستخدام OAuth وJWT وتكاملات واجهات برمجة خارجية.',
  ],
];

export const ExperienceSection: React.FC = () => {
  const { isArabic } = useSitePreferences();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 90%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-4 pb-24 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-[#D4AF37]/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-4 mb-7"
        >
          <span
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {isArabic ? '04 / الخبرة' : '04 / EXPERIENCE'}
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase leading-[0.85] select-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              {isArabic ? 'الخبرة' : 'EXPERIENCE &'}
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
              {isArabic ? 'والإنجازات.' : 'MILESTONES.'}
            </span>
          </h2>
        </motion.div>

        {/* Minimalist Route Map */}
        <div className="relative w-full">
          
          {/* Background Track */}
          <div className="absolute left-[19px] md:left-[140px] top-4 bottom-8 w-[1px] bg-[#8C6D4F]/20" />
          
          {/* Animated Gold Track */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[19px] md:left-[140px] top-4 w-[2px] bg-gradient-to-b from-[#D4AF37] via-[#C99E5D] to-[#8C6D4F]/10 shadow-[0_0_10px_#D4AF37] origin-top"
          />

          <div className="space-y-12">
            {journey.map((stop, idx) => (
              <motion.div
                key={stop.id}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: idx * 0.08 }}
                className="relative flex flex-col md:flex-row items-start group"
              >
                {/* Desktop Year (Left side of track) */}
                <div className="hidden md:block w-[140px] shrink-0 pr-8 pt-0.5 text-right">
                  <span className="text-[10px] font-mono tracking-[0.2em] text-[#8C6D4F] group-hover:text-[#D4AF37] transition-colors">
                    {stop.year}
                  </span>
                </div>

                {/* Route Node */}
                <div className="absolute left-[19px] md:left-[140px] top-1.5 -translate-x-1/2 flex items-center justify-center">
                  <div className="absolute w-6 h-6 rounded-full border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/40 group-hover:scale-150 transition-all duration-700 ease-out" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#120F0C] border border-[#8C6D4F] group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] group-hover:shadow-[0_0_12px_#D4AF37] transition-colors duration-300" />
                </div>

                {/* Content (Right side of track) */}
                <div className="ml-14 md:ml-12 pl-2">
                  {/* Mobile Year */}
                  <div className="md:hidden mb-1.5">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-[#D4AF37]">
                      {stop.year}
                    </span>
                  </div>

                  <h3
                    className="text-3xl sm:text-4xl tracking-wide text-white group-hover:text-[#F7E7C4] transition-colors mb-1 leading-none"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {isArabic ? arabicRoles[idx] : stop.title}
                  </h3>
                  
                  <span 
                    className="block text-[10px] font-medium tracking-[0.2em] uppercase text-[#8C6D4F] mb-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {stop.organization}
                  </span>
                  
                  <p 
                    className="text-xs sm:text-[13px] font-light text-[#A8988B] leading-[1.7] max-w-lg group-hover:text-[#D5CBC0] transition-colors"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {stop.description}
                  </p>
                  <ul className="mt-4 max-w-2xl space-y-2" aria-label={`${stop.title} achievements`}>
                    {(isArabic ? arabicAchievements[idx] : stop.achievements).map((achievement) => (
                      <li
                        key={achievement}
                        className="flex gap-3 text-xs sm:text-[13px] font-light leading-[1.7] text-[#A8988B] group-hover:text-[#D5CBC0] transition-colors"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        <span className="mt-[0.68em] h-1 w-1 shrink-0 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;


import { portfolio } from '../content/portfolio';
import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import watermarkImg from '../assets/watermark.png';
import HeroAtmosphere from './HeroAtmosphere';
import './HeroSection.css';
import { useSitePreferences } from './SitePreferences';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.2,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const navItems = [
  { name: 'ABOUT', arabic: 'نبذة', href: '#about' },
  { name: 'WORK', arabic: 'المشاريع', href: '#work' },
  { name: 'SKILLS', arabic: 'المهارات', href: '#skills' },
  { name: 'EXPERIENCE', arabic: 'الخبرة', href: '#experience' },
  { name: 'EDUCATION', arabic: 'المؤهلات', href: '#education' },
  { name: 'CONTACT', arabic: 'تواصل', href: '#contact' },
];

export const HeroSection: React.FC = () => {
  const { isArabic } = useSitePreferences();
  return (
    <section id="top" className="hero-section relative w-full overflow-hidden bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black">
      {/* The personal portrait is the temporary hero until the new video is ready. */}
      <div className="hero-scene pointer-events-none bg-black">
        {portfolio.heroMedia.video ? (
          <video
            key={portfolio.heroMedia.video}
            autoPlay
            muted
            loop
            playsInline
            poster={portfolio.heroMedia.image}
            className="hero-media hero-media--video"
            aria-label={`${portfolio.shortName} cinematic portrait video`}
          >
            <source src={portfolio.heroMedia.video} type="video/mp4" />
          </video>
        ) : (
          <img
            src={portfolio.heroMedia.image}
            alt={`${portfolio.name} in a black suit under a warm spotlight`}
            width={1086}
            height={1448}
            fetchPriority="high"
            className="hero-media hero-media--portrait"
          />
        )}
        <HeroAtmosphere />

        {/* Seamless Soft Left Edge Blend */}
        <div className="hero-scene-shade" aria-hidden="true" />

        {/* ================= 3. ANIMATED WATERMARK EMBLEM ================= */}
        <div className="hidden lg:flex absolute bottom-6 right-6 lg:bottom-10 lg:right-12 pointer-events-none items-center justify-center z-10">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-36 h-36 bg-black/85 rounded-full blur-xl" />

            <motion.div
              animate={{
                y: [-3, 3, -3],
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative flex items-center justify-center"
            >
              <img
                src={watermarkImg}
                alt="Insignia"
                className="w-28 h-28 lg:w-32 lg:h-32 object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.25)]"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ================= 4. CONTENT LAYER ================= */}
      <div className="hero-content relative z-10 flex flex-col justify-between h-full w-full px-6 sm:px-12 lg:px-16 pt-6 pb-8 pointer-events-none">
        
        {/* Navigation Bar */}
        <header className="hero-header relative w-full pointer-events-auto">
          <div className="flex items-center justify-between w-full">
            <a
              href="#top"
              className="text-xs sm:text-sm font-semibold tracking-[0.35em] uppercase text-[#EAD8C7] hover:opacity-75 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {portfolio.shortName.toUpperCase()}.
            </a>

            {/* Desktop Navigation Links */}
            <nav
              aria-label={isArabic ? 'أقسام الموقع' : 'Portfolio sections'}
              className="hidden lg:flex items-center space-x-5 xl:space-x-8 text-[10px] xl:text-[11px] tracking-[0.22em] xl:tracking-[0.28em] font-light uppercase text-[#C4B5A5] absolute left-1/2 -translate-x-1/2"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative group py-2 transition-colors duration-300 hover:text-[#FFF5EB] focus-visible:text-[#FFF5EB] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
                >
                  {isArabic ? item.arabic : item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37]/50 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Right Action */}
            <a
              href="#contact"
              className="group hidden lg:flex items-center space-x-2 text-[11px] tracking-[0.24em] font-light uppercase py-2 px-4 border border-[#8C6D4F]/50 hover:border-[#D4AF37] text-[#EAD8C7] transition-all duration-300 backdrop-blur-sm ml-auto md:ml-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <span>{isArabic ? 'لنتحدث' : 'LET\'S TALK'}</span>
              <span className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs">
                ↗
              </span>
            </a>
          </div>

          {/* Phone and Tablet Navigation */}
          <nav
            aria-label={isArabic ? 'أقسام الموقع' : 'Portfolio sections'}
            className="hero-mobile-nav flex lg:hidden"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {navItems.map((item) => (
              <a key={item.name} href={item.href}>
                {isArabic ? item.arabic : item.name}
              </a>
            ))}
          </nav>
        </header>

        {/* Main Hero Row */}
        <div className="hero-main relative flex flex-col md:flex-row items-center justify-between w-full pt-4 pb-2 my-auto">
          
          {/* LEFT: Balanced Headline & Actions */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-[37rem] xl:max-w-[40rem] pointer-events-auto z-20"
          >
            {/* Massive Condensed Headline */}
            <motion.div variants={fadeUpVariants} className="relative mb-3.5 select-none">
              <h1
                className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.2rem] xl:text-[7.8rem] tracking-tight uppercase leading-[0.83]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {/* Line 1: I BUILD */}
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
                  {isArabic ? 'أبني' : 'I BUILD'}
                </span>

                {/* Line 2: DIGITAL */}
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
                  {isArabic ? 'تجارب' : 'DIGITAL'}
                </span>

                {/* Line 3: EXPERIENCES */}
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#DFBE8A] via-[#9B7640] to-[#342410] drop-shadow-[0_10px_30px_rgba(155,118,64,0.4)]">
                  {isArabic ? 'رقمية' : 'EXPERIENCES'}
                </span>
              </h1>
            </motion.div>

            {/* Subtitle Technologies */}
            <motion.div variants={fadeUpVariants} className="mb-4">
              <p
                className="text-[10px] sm:text-[11px] md:text-xs font-normal tracking-[0.28em] uppercase text-[#C4B29E]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {isArabic ? 'مطور برمجيات متكامل' : 'FULL STACK DEVELOPER'} <span className="text-[#8C6D4F] mx-1">•</span> {isArabic ? 'عالم بيانات' : 'DATA SCIENTIST'} <span className="text-[#8C6D4F] mx-1">•</span> {isArabic ? 'مهندس تحليلات' : 'ANALYTICS ENGINEER'}
              </p>
            </motion.div>

            {/* 3-Line Description */}
            <motion.div
              variants={fadeUpVariants}
              className="text-xs sm:text-sm md:text-[13.5px] font-light text-[#A8988B] leading-[1.8] tracking-wide max-w-lg mb-6 space-y-1"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <p>
                {isArabic ? 'أبني برمجيات موثوقة وأنظمة تحليلية تدعم القرار وتحول البيانات التشغيلية المعقدة إلى نتائج أعمال قابلة للقياس.' : portfolio.intro}
                <br />
                
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-wrap items-center gap-3 sm:gap-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {/* Explore My Work CTA */}
              <motion.a
                href="#work"
                whileHover={{ scale: 1.02 }}
                className="relative inline-flex items-center space-x-3 px-6 sm:px-7 py-3.5 border border-[#8C6D4F] bg-[#120F0C]/80 hover:border-[#D4AF37] text-[#EAD8C7] hover:text-[#FFF5EB] text-[11px] font-medium tracking-[0.24em] uppercase transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.18)]"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E8D7C5]/40 to-transparent pointer-events-none" />
                <span>{isArabic ? 'استكشف أعمالي' : 'EXPLORE MY WORK'}</span>
                <span className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs">
                  ↗
                </span>
              </motion.a>

              {/* Download Resume Button */}
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                className="relative inline-flex items-center space-x-2 px-6 sm:px-7 py-3.5 border border-[#8C6D4F]/40 hover:border-[#8C6D4F] text-[#BFA895] hover:text-[#EAD8C7] text-[11px] font-medium tracking-[0.24em] uppercase transition-all duration-300"
              >
                <span>{isArabic ? 'تحميل السيرة الذاتية' : 'DOWNLOAD RESUME'}</span>
                <span className="transform transition-transform duration-300 group-hover:translate-y-0.5 text-xs">
                  ↓
                </span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* RIGHT: Floating Quote & Signature Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden xl:flex w-40 shrink-0 flex-col items-start pointer-events-auto ml-auto z-20 select-none"
          >
            {/* 1. Quote Mark */}
            <span className="text-xl text-[#C99E5D] leading-none font-serif mb-2">
              “
            </span>

            {/* 2. Compact Two-Line Statement */}
            <div 
              className="text-[9.5px] font-medium tracking-[0.24em] uppercase text-[#E0D3C5] space-y-1 mb-3"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <p>CODE IS MY CRAFT.</p>
              <p>IMPACT IS MY GOAL.</p>
            </div>

            {/* 3. Gold Accent Line */}
            <div className="w-28 h-[1px] bg-gradient-to-r from-[#D4AF37] via-[#E8D7C5]/70 to-transparent shadow-[0_0_8px_rgba(212,175,55,0.4)] mb-2" />

            {/* 4. Fine Monoline Calligraphy Signature */}
            <div 
              className="text-[2.2rem] text-[#D8AB64] font-normal leading-none -ml-0.5"
              style={{ 
                fontFamily: "'Herr Von Muellerhoff', 'Allura', cursive",
                letterSpacing: '0.04em',
              }}
            >
              {portfolio.shortName}
            </div>
          </motion.div>
        </div>

        {/* Bottom Spacer */}
        <div className="h-2" />
      </div>
    </section>
  );
};

export default HeroSection;


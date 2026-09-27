/* oxlint-disable react/only-export-components -- preferences and their controls form one small feature */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

type Language = 'en' | 'ar';
type Theme = 'dark' | 'light';

interface SitePreferencesValue {
  language: Language;
  theme: Theme;
  setLanguage: (language: Language) => void;
  setTheme: (theme: Theme) => void;
  isArabic: boolean;
}

const SitePreferencesContext = createContext<SitePreferencesValue | null>(null);

export function SitePreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem('portfolio-language') === 'ar' ? 'ar' : 'en'));
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('portfolio-theme') === 'light' ? 'light' : 'dark'));

  useEffect(() => {
    localStorage.setItem('portfolio-language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const value = useMemo(
    () => ({ language, theme, setLanguage, setTheme, isArabic: language === 'ar' }),
    [language, theme],
  );

  return <SitePreferencesContext.Provider value={value}>{children}</SitePreferencesContext.Provider>;
}

export function useSitePreferences() {
  const context = useContext(SitePreferencesContext);
  if (!context) throw new Error('useSitePreferences must be used inside SitePreferencesProvider');
  return context;
}

export function SiteControls() {
  const { language, theme, setLanguage, setTheme } = useSitePreferences();

  return (
    <div className="site-controls" aria-label={language === 'ar' ? 'إعدادات الموقع' : 'Site preferences'}>
      <button
        type="button"
        onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
        aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
      >
        {language === 'en' ? 'AR' : 'EN'}
      </button>
      <button
        type="button"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      >
        <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
      </button>
    </div>
  );
}

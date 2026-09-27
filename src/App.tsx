import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { CredentialsSection } from './components/CredentialsSection';
import { ContactSection } from './components/ContactSection';
import { SiteControls, SitePreferencesProvider } from './components/SitePreferences';

function App() {
  return (
    <SitePreferencesProvider>
      <div className="site-shell w-full min-h-screen bg-black text-[#E8DFD8] selection:bg-[#cbb59d] selection:text-black">
        <SiteControls />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <CredentialsSection />
        <ContactSection />
      </div>
    </SitePreferencesProvider>
  );
}

export default App;

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ProjectGrid } from "@/components/ProjectGrid";
import { SkillsSection } from "@/components/SkillsSection";
import { ContactForm } from "@/components/ContactForm";
import { useProfile, useExperiences, useProjects, useSkills } from "@/hooks/use-portfolio";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { data: profile, isLoading: loadingProfile } = useProfile();
  const { data: experiences, isLoading: loadingExp } = useExperiences();
  const { data: projects, isLoading: loadingProjects } = useProjects();
  const { data: skills, isLoading: loadingSkills } = useSkills();

  const isLoading = loadingProfile || loadingExp || loadingProjects || loadingSkills;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-primary">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin" />
          <p className="font-mono text-sm animate-pulse">Initializing System...</p>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
      <Navbar />
      
      <main className="flex flex-col gap-0">
        <Hero profile={profile} />
        
        {/* About Section - Brief Intro */}
        <section id="about" className="section-padding">
           <div className="glass p-8 md:p-12 rounded-2xl border-l-4 border-primary">
             <h2 className="text-2xl font-bold mb-6">About Me</h2>
             <div className="prose prose-invert max-w-none text-muted-foreground leading-loose">
               {profile.bio.split('\n').map((paragraph, idx) => (
                 <p key={idx} className="mb-4">{paragraph}</p>
               ))}
             </div>
           </div>
        </section>

        {experiences && <ExperienceTimeline experiences={experiences} />}
        {projects && <ProjectGrid projects={projects} />}
        {skills && <SkillsSection skills={skills} />}
        <ContactForm />
      </main>

      <footer className="py-8 border-t border-white/5 text-center text-sm text-muted-foreground">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} Mayank Chugh. All rights reserved.</p>
          <p className="mt-2 font-mono text-xs opacity-50">Built with React, Tailwind & Framer Motion</p>
        </div>
      </footer>
    </div>
  );
}

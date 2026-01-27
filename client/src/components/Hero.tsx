import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { ArrowRight, Download } from "lucide-react";
import { SocialLinks } from "./SocialLinks";
import { type Profile } from "@shared/schema";

interface HeroProps {
  profile: Profile;
}

export function Hero({ profile }: HeroProps) {
  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden pt-20">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[80px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary font-mono text-sm font-semibold tracking-wide">
            {profile.title}
          </div>
          
          <h1 className="leading-tight">
            Hi, I'm <br />
            <span className="text-gradient font-extrabold">{profile.name}</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
            {profile.bio.split(".")[0]}. Unraveling the limitless possibilities of IT and AI through enterprise architecture and data science.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link 
              to="projects" 
              smooth={true} 
              offset={-50}
              className="cursor-pointer px-8 py-4 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 group"
            >
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            {profile.resumeUrl && (
              <a 
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl font-bold border-2 border-border hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
              >
                Download CV
                <Download className="w-4 h-4" />
              </a>
            )}
          </div>

          <div className="pt-8">
             <p className="text-sm text-muted-foreground font-mono mb-4 uppercase tracking-widest">Connect with me</p>
             <SocialLinks links={profile.socialLinks} />
          </div>
        </motion.div>

        {/* Visual Element / Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative w-[450px] h-[450px] mx-auto">
            {/* Abstract tech circles */}
            <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-4 border border-dashed border-primary/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            <div className="absolute inset-12 border border-white/5 rounded-full" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              {profile.avatarUrl ? (
                 <img 
                   src={profile.avatarUrl} 
                   alt={profile.name} 
                   className="w-64 h-64 object-cover rounded-full border-4 border-background shadow-2xl shadow-primary/20"
                 />
              ) : (
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border-4 border-background shadow-2xl">
                   <span className="text-6xl font-bold text-white/20">MC</span>
                </div>
              )}
            </div>
            
            {/* Floating Badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-10 right-10 glass px-4 py-2 rounded-lg text-sm font-mono text-primary"
            >
              AI Enthusiast
            </motion.div>
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-20 left-0 glass px-4 py-2 rounded-lg text-sm font-mono text-blue-400"
            >
              Enterprise Arch
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

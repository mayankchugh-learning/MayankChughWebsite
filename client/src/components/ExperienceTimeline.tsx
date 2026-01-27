import { motion } from "framer-motion";
import { type Experience } from "@shared/schema";
import { Briefcase, Calendar } from "lucide-react";

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  // Sort experiences by order
  const sorted = [...experiences].sort((a, b) => a.order - b.order);

  return (
    <section id="experience" className="section-padding relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
          <Briefcase className="text-primary" />
          Professional Experience
        </h2>
        <div className="h-1 w-20 bg-primary rounded-full" />
      </motion.div>

      <div className="relative border-l-2 border-white/10 ml-3 md:ml-6 space-y-12 pb-12">
        {sorted.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 md:pl-12"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
            
            <div className="glass p-6 rounded-xl hover:border-primary/30 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                  <div className="text-lg text-primary font-medium">{exp.company}</div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono bg-secondary/50 px-3 py-1 rounded-md w-fit">
                  <Calendar className="w-4 h-4" />
                  {exp.duration}
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

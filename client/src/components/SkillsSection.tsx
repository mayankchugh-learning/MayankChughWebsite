import { motion } from "framer-motion";
import { type Skill } from "@shared/schema";
import { Cpu, Server, Layout, Database } from "lucide-react";

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  // Group skills by category
  const categories = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const getCategoryIcon = (category: string) => {
    const lower = category.toLowerCase();
    if (lower.includes('ai') || lower.includes('ml')) return <Cpu className="w-5 h-5 text-primary" />;
    if (lower.includes('front')) return <Layout className="w-5 h-5 text-blue-400" />;
    if (lower.includes('back')) return <Server className="w-5 h-5 text-purple-400" />;
    if (lower.includes('cloud')) return <Database className="w-5 h-5 text-orange-400" />;
    return <Cpu className="w-5 h-5" />;
  };

  return (
    <section id="skills" className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-4">Technical Proficiency</h2>
        <div className="h-1 w-20 bg-primary rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {Object.entries(categories).map(([category, items], idx) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass p-6 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
              {getCategoryIcon(category)}
              <h3 className="text-xl font-bold">{category}</h3>
            </div>
            
            <div className="space-y-6">
              {items.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-sm">{skill.name}</span>
                    <span className="text-xs font-mono text-muted-foreground">{skill.proficiency}%</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency || 0}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary to-teal-400 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.3)]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

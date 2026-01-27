import { motion } from "framer-motion";
import { type Project } from "@shared/schema";
import { ExternalLink, Github, Youtube, Star } from "lucide-react";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  // Sort: Featured first, then by ID descending (newest first assuming serial ID)
  const sorted = [...projects].sort((a, b) => {
    if (a.featured === b.featured) return b.id - a.id;
    return a.featured ? -1 : 1;
  });

  return (
    <section id="projects" className="section-padding bg-secondary/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
        <div className="h-1 w-20 bg-primary rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sorted.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group flex flex-col h-full glass rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
          >
            {/* Image Section */}
            <div className="relative h-48 overflow-hidden bg-gray-900">
              {project.imageUrl ? (
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                  <Code2Icon />
                </div>
              )}
              
              {project.featured && (
                <div className="absolute top-4 right-4 bg-yellow-500/90 text-yellow-950 px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                  <Star className="w-3 h-3 fill-current" /> Featured
                </div>
              )}
              
              {/* Overlay with links */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                {project.repoUrl && (
                  <a 
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white text-black rounded-full hover:bg-primary hover:text-white transition-colors"
                    title="View Code"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {project.demoUrl && (
                  <a 
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white text-black rounded-full hover:bg-red-600 hover:text-white transition-colors"
                    title="Watch Demo"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-6 flex-grow line-clamp-3">
                {project.description}
              </p>
              
              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.techStack?.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-2 py-1 text-xs font-mono rounded-md bg-white/5 text-primary-foreground/80 border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Code2Icon() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="48" 
      height="48" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="text-white/20"
    >
      <path d="m18 16 4-4-4-4" />
      <path d="m6 8-4 4 4 4" />
      <path d="m14.5 4-5 16" />
    </svg>
  );
}

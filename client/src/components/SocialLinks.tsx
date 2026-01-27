import { 
  Github, 
  Linkedin, 
  Youtube, 
  Newspaper, 
  Cpu 
} from "lucide-react";
import { type Profile } from "@shared/schema";

interface SocialLinksProps {
  links: Profile["socialLinks"];
  className?: string;
  iconClassName?: string;
}

export function SocialLinks({ links, className = "", iconClassName = "w-5 h-5" }: SocialLinksProps) {
  // Helper to map icon string names to Lucide components
  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'github': return <Github className={iconClassName} />;
      case 'linkedin': return <Linkedin className={iconClassName} />;
      case 'youtube': return <Youtube className={iconClassName} />;
      case 'medium': return <Newspaper className={iconClassName} />;
      case 'huggingface': return <Cpu className={iconClassName} />; // Using CPU for HuggingFace/AI
      default: return <Github className={iconClassName} />;
    }
  };

  return (
    <div className={`flex gap-4 ${className}`}>
      {links.map((link, idx) => (
        <a
          key={idx}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-primary/25"
          aria-label={link.platform}
        >
          {getIcon(link.icon || link.platform)}
        </a>
      ))}
    </div>
  );
}

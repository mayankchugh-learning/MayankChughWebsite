import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // === API ROUTES ===

  app.get(api.profile.get.path, async (req, res) => {
    const profile = await storage.getProfile();
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  });

  app.get(api.experiences.list.path, async (req, res) => {
    const experiences = await storage.getExperiences();
    res.json(experiences);
  });

  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.skills.list.path, async (req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  app.post(api.messages.create.path, async (req, res) => {
    try {
      const input = api.messages.create.input.parse(req.body);
      await storage.createMessage(input);
      res.status(201).json({ success: true, message: "Message sent successfully" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // === SEED DATA ===
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  await storage.seedProfile({
    name: "Mayank Chugh",
    title: "Generative AI Engineer ❖ AI Project Manager ❖ Visionary Solutions Architect",
    bio: "A seasoned Generative AI Engineer and Solutions Architect with over 20 years of hands-on experience in the IT landscape, specializing in orchestrating seamless software engineering, cloud migration and integration, technical project management, and business analysis. Seasoned in strategic IT leadership, cloud migration/integration, solution architecture & development.",
    avatarUrl: "/images/profile.jpeg",
    socialLinks: [
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/mchugh77", icon: "linkedin" },
      { platform: "YouTube", url: "http://www.youtube.com/@itaienthusiast", icon: "youtube" },
      { platform: "GitHub", url: "https://github.com/mayankchugh-learning", icon: "github" },
      { platform: "HuggingFace", url: "https://huggingface.co/mayankchugh-learning", icon: "brain" },
      { platform: "Medium", url: "https://medium.com/@mayankchugh.jobathk", icon: "book" }
    ]
  });

  await storage.seedExperiences([
    {
      company: "Coforge",
      role: "Senior Technical Architect / Data Analyst",
      duration: "Feb 2005 - Present",
      description: "Led cloud migration projects and implemented data analytics solutions. Modernized build systems, led diverse teams, and engaged with clients for AWS infrastructure implementation.",
      order: 1
    },
    {
      company: "Tata Consultancy Services",
      role: "Associate",
      duration: "Aug 2024 - Jan 2025",
      description: "Worked on Video Analytics, Autonomous Electric Tractors, and ML-Based Dimension Capture initiatives. Developed comprehensive business cases and solutions.",
      order: 2
    },
    {
      company: "iNeuron",
      role: "AI Intern",
      duration: "Feb 2024 - Jul 2024",
      description: "Specialized in Generative AI, LLMs, and RAG applications. Completed end-to-end projects in MLOps, Computer Vision, and NLP.",
      order: 3
    },
    {
      company: "Capgemini",
      role: "Cloud Architect",
      duration: "Oct 2021 - Dec 2023",
      description: "Contributed to IT integration strategies, orchestrated data migration to Azure, and executed data analytics frameworks.",
      order: 4
    },
    {
      company: "Deloitte",
      role: "Cloud Application Manager Architect",
      duration: "Mar 2022 - Aug 2022",
      description: "Azure Cloud SME specializing in cloud governance, DevOps strategies, and architectural solution development.",
      order: 5
    }
  ]);

  await storage.seedProjects([
    {
      title: "US Visa Approval Prediction",
      description: "Classification project predicting US Visa approvals.",
      techStack: ["Machine Learning", "Classification"],
      repoUrl: "https://github.com/mayankchugh-learning/US-Visa-Approval-Prediction.git",
      demoUrl: "https://youtu.be/p81ouOZVDTs",
      featured: true
    },
    {
      title: "Ollama RAG App",
      description: "Generative AI application using Ollama and RAG.",
      techStack: ["GenAI", "RAG", "Ollama"],
      repoUrl: "https://github.com/mayankchugh-learning/OllamaRAGApp.git",
      demoUrl: "https://youtu.be/xjdEJ_QTZJo",
      featured: true
    },
    {
      title: "Trip Planner",
      description: "AI-powered trip planner using Generative AI and CrewAI.",
      techStack: ["GenAI", "CrewAI", "Python"],
      repoUrl: "https://github.com/mayankchugh-learning/trip-planner-from-scratch.git",
      demoUrl: "https://youtu.be/uyaBoviBNtI",
      featured: true
    },
    {
      title: "Chest Disease Classification",
      description: "Deep Learning CNN project for classifying chest diseases from CT scans.",
      techStack: ["Deep Learning", "CNN", "TensorFlow"],
      repoUrl: "https://github.com/mayankchugh-learning/Chest-Disease-Classification-from-Chest-CT-Scan-Image.git",
      demoUrl: "https://youtu.be/VKRxq0-pYCw",
      featured: false
    },
    {
      title: "WhatsApp Bot",
      description: "Automated WhatsApp bot powered by Generative AI.",
      techStack: ["GenAI", "Python", "WhatsApp API"],
      repoUrl: "https://github.com/mayankchugh-learning/WhatsApp-Bot-using-GenAI.git",
      featured: false
    }
  ]);

  await storage.seedSkills([
    { name: "Python", category: "Languages", proficiency: 95 },
    { name: "Java", category: "Languages", proficiency: 90 },
    { name: "Generative AI", category: "AI/ML", proficiency: 90 },
    { name: "TensorFlow", category: "AI/ML", proficiency: 85 },
    { name: "PyTorch", category: "AI/ML", proficiency: 85 },
    { name: "AWS", category: "Cloud", proficiency: 85 },
    { name: "Azure", category: "Cloud", proficiency: 80 },
    { name: "Docker", category: "DevOps", proficiency: 85 },
    { name: "Kubernetes", category: "DevOps", proficiency: 80 },
    { name: "SQL", category: "Languages", proficiency: 90 }
  ]);
}

-- Provisioning Script: Database and Schema Creation

-- Note: This is a reference script. 
-- In development, use `npm run db:push` to sync the Drizzle schema with the database.

-- DDL: Create Tables

CREATE TABLE IF NOT EXISTS profile (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    bio TEXT NOT NULL,
    avatar_url TEXT,
    resume_url TEXT,
    social_links JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS experiences (
    id SERIAL PRIMARY KEY,
    company TEXT NOT NULL,
    role TEXT NOT NULL,
    duration TEXT NOT NULL,
    description TEXT NOT NULL,
    "order" INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    tech_stack TEXT[] NOT NULL,
    repo_url TEXT,
    demo_url TEXT,
    image_url TEXT,
    featured BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    proficiency INTEGER
);

CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS chat_sessions (
    id SERIAL PRIMARY KEY,
    email TEXT,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS chat_messages (
    id SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES chat_sessions(id),
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DML: Sample Data (Seed)

-- Reset existing data
TRUNCATE TABLE profile, experiences, projects, skills CASCADE;

-- Profile
INSERT INTO profile (name, title, bio, avatar_url, social_links) 
VALUES (
    'Mayank Chugh', 
    'Generative AI Engineer ❖ AI Project Manager ❖ Visionary Solutions Architect', 
    'A seasoned Generative AI Engineer and Solutions Architect with over 20 years of hands-on experience in the IT landscape, specializing in orchestrating seamless software engineering, cloud migration and integration, technical project management, and business analysis. Seasoned in strategic IT leadership, cloud migration/integration, solution architecture & development.', 
    '/images/profile.jpeg', 
    '[
        {"url": "https://www.linkedin.com/in/mchugh77", "icon": "linkedin", "platform": "LinkedIn"},
        {"url": "http://www.youtube.com/@itaienthusiast", "icon": "youtube", "platform": "YouTube"},
        {"url": "https://github.com/mayankchugh-learning", "icon": "github", "platform": "GitHub"},
        {"url": "https://huggingface.co/mayankchugh-learning", "icon": "brain", "platform": "HuggingFace"},
        {"url": "https://medium.com/@mayankchugh.jobathk", "icon": "book", "platform": "Medium"}
    ]'
);

-- Skills
INSERT INTO skills (name, category, proficiency) VALUES 
('Python', 'Languages', 95),
('Java', 'Languages', 90),
('Generative AI', 'AI/ML', 90),
('Microsoft Fabric', 'Data Engineering', 85),
('Vibe Coding', 'AI/ML', 80),
('TensorFlow', 'AI/ML', 85),
('PyTorch', 'AI/ML', 85),
('AWS', 'Cloud', 85),
('Azure', 'Cloud', 80),
('Docker', 'DevOps', 85),
('Kubernetes', 'DevOps', 80),
('SQL', 'Languages', 90);

-- Projects
INSERT INTO projects (title, description, tech_stack, repo_url, demo_url, featured) VALUES
('US Visa Approval Prediction', 'Classification project predicting US Visa approvals.', ARRAY['Machine Learning', 'Classification'], 'https://github.com/mayankchugh-learning/US-Visa-Approval-Prediction.git', 'https://youtu.be/p81ouOZVDTs', true),
('Ollama RAG App', 'Generative AI application using Ollama and RAG.', ARRAY['GenAI', 'RAG', 'Ollama'], 'https://github.com/mayankchugh-learning/OllamaRAGApp.git', 'https://youtu.be/xjdEJ_QTZJo', true),
('Trip Planner', 'AI-powered trip planner using Generative AI and CrewAI.', ARRAY['GenAI', 'CrewAI', 'Python'], 'https://github.com/mayankchugh-learning/trip-planner-from-scratch.git', 'https://youtu.be/uyaBoviBNtI', true),
('End-to-End Generative AI Project', 'A comprehensive guide to building end-to-end GenAI applications.', ARRAY['GenAI', 'LLM', 'Python'], NULL, 'https://www.youtube.com/watch?v=uyaBoviBNtI', true),
('Multi-Agent Systems with CrewAI', 'Building complex AI workflows using multi-agent orchestration.', ARRAY['CrewAI', 'Agents', 'Python'], NULL, 'https://www.youtube.com/watch?v=p81ouOZVDTs', true);

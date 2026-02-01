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
    'A seasoned Generative AI Engineer and Solutions Architect with over 20 years of hands-on experience...', 
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
('Generative AI', 'AI/ML', 90);

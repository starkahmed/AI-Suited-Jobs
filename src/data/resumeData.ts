
export const extractedSkills = [
  {
    name: "React",
    level: 85,
    category: "Frontend",
    suggestions: ["Add more complex state management examples to your portfolio", "Highlight experience with React hooks"]
  },
  {
    name: "TypeScript",
    level: 70,
    category: "Frontend",
    suggestions: ["Add TypeScript to more projects", "Show examples of advanced type usage"]
  },
  {
    name: "Node.js",
    level: 60,
    category: "Backend",
    suggestions: ["Demonstrate experience with Express.js", "Add API development examples"]
  },
  {
    name: "CSS",
    level: 80,
    category: "Frontend",
    suggestions: ["Showcase responsive design skills", "Add examples of animations and transitions"]
  },
  {
    name: "JavaScript",
    level: 90,
    category: "Frontend",
    suggestions: ["Highlight ES6+ features usage", "Show advanced functional programming concepts"]
  },
  {
    name: "HTML",
    level: 85,
    category: "Frontend",
    suggestions: ["Demonstrate semantic HTML knowledge", "Add accessibility considerations"]
  },
  {
    name: "SQL",
    level: 65,
    category: "Backend",
    suggestions: ["Add complex query examples", "Show database optimization skills"]
  },
  {
    name: "Git",
    level: 75,
    category: "Tools",
    suggestions: ["Highlight team collaboration workflows", "Show branching strategy experience"]
  },
  {
    name: "AWS",
    level: 50,
    category: "DevOps",
    suggestions: ["Get AWS certification", "Add more cloud deployment examples"]
  },
  {
    name: "Docker",
    level: 45,
    category: "DevOps",
    suggestions: ["Add containerization projects", "Show Docker-compose usage"]
  }
];

export const improvementSuggestions = [
  {
    category: "Work Experience",
    suggestions: [
      "Quantify your achievements with specific metrics and results",
      "Use more action verbs at the beginning of each bullet point",
      "Include specific technologies and tools you used in each role",
      "Focus on accomplishments rather than responsibilities"
    ]
  },
  {
    category: "Skills Section",
    suggestions: [
      "Group your skills by category (e.g., Programming Languages, Frameworks, Tools)",
      "Remove outdated or irrelevant technologies",
      "Add more industry-specific keywords relevant to your target jobs",
      "Consider adding a proficiency level indicator for each skill"
    ]
  },
  {
    category: "Education Section",
    suggestions: [
      "Add relevant coursework if you are a recent graduate",
      "Include any certificates or additional training",
      "Highlight academic achievements or projects related to your target field"
    ]
  },
  {
    category: "Resume Format",
    suggestions: [
      "Use a cleaner, more modern template with better use of white space",
      "Ensure consistent formatting throughout (fonts, bullet points, spacing)",
      "Keep your resume to 1-2 pages maximum",
      "Add a professional summary that highlights your unique value proposition"
    ]
  }
];

export const resumeMatchScore = {
  overall: 78,
  categories: [
    { name: "Technical Skills", score: 85 },
    { name: "Work Experience", score: 72 },
    { name: "Education", score: 90 },
    { name: "Keywords", score: 65 }
  ]
};

export const keywordMatches = [
  { keyword: "React", count: 8, important: true },
  { keyword: "TypeScript", count: 5, important: true },
  { keyword: "frontend", count: 7, important: true },
  { keyword: "UI/UX", count: 3, important: false },
  { keyword: "testing", count: 2, important: false },
  { keyword: "responsive design", count: 4, important: true }
];

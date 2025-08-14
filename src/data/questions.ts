import { Question } from "@/types/assessment";

export const questions: Question[] = [
  // Psychometric Section - Interest & Motivation
  {
    id: "psych_1",
    type: "likert",
    section: "psychometric",
    category: "interest",
    question: "I enjoy figuring out how complex systems work together.",
    likertLabels: { min: "Strongly Disagree", max: "Strongly Agree" },
    weight: 1.2
  },
  {
    id: "psych_2",
    type: "likert",
    section: "psychometric",
    category: "interest",
    question: "I find automation and process optimization exciting.",
    likertLabels: { min: "Strongly Disagree", max: "Strongly Agree" },
    weight: 1.5
  },
  {
    id: "psych_3",
    type: "multiple-choice",
    section: "psychometric",
    category: "preference",
    question: "When faced with a technical challenge, I prefer to:",
    options: [
      "Dive deep into documentation and research",
      "Start experimenting immediately",
      "Ask colleagues for guidance first",
      "Break it down into smaller problems"
    ],
    weight: 1.0
  },
  {
    id: "psych_4",
    type: "scenario",
    section: "psychometric",
    category: "resilience",
    question: "You've been debugging a deployment issue for 3 hours with no progress. What's your most likely response?",
    options: [
      "Take a break and come back with fresh perspective",
      "Keep pushing until I find the solution",
      "Ask team members for help",
      "Document what I've tried and escalate"
    ],
    weight: 1.3
  },
  {
    id: "psych_5",
    type: "likert",
    section: "psychometric",
    category: "collaboration",
    question: "I enjoy working closely with development teams to improve workflows.",
    likertLabels: { min: "Strongly Disagree", max: "Strongly Agree" },
    weight: 1.1
  },

  // Technical Section - Prerequisites & Aptitude
  {
    id: "tech_1",
    type: "multiple-choice",
    section: "technical",
    category: "linux",
    question: "Which command would you use to check running processes on a Linux system?",
    options: ["ls -la", "ps aux", "grep processes", "cat /proc"],
    weight: 1.0
  },
  {
    id: "tech_2",
    type: "multiple-choice",
    section: "technical",
    category: "networking",
    question: "What is the typical port number for HTTPS traffic?",
    options: ["80", "443", "22", "3000"],
    weight: 0.8
  },
  {
    id: "tech_3",
    type: "multiple-choice",
    section: "technical",
    category: "cloud",
    question: "IaaS (Infrastructure as a Service) typically provides:",
    options: [
      "Complete applications ready to use",
      "Development frameworks and platforms",
      "Virtual machines, storage, and networking",
      "Only database services"
    ],
    weight: 1.2
  },
  {
    id: "tech_4",
    type: "multiple-choice",
    section: "technical",
    category: "devops",
    question: "CI/CD stands for:",
    options: [
      "Code Integration / Code Deployment",
      "Continuous Integration / Continuous Deployment",
      "Container Installation / Container Distribution",
      "Cloud Infrastructure / Cloud Development"
    ],
    weight: 1.1
  },
  {
    id: "tech_5",
    type: "multiple-choice",
    section: "technical",
    category: "containers",
    question: "Docker containers differ from virtual machines primarily because they:",
    options: [
      "Are larger and use more resources",
      "Share the host OS kernel",
      "Can only run on cloud platforms",
      "Don't support networking"
    ],
    weight: 1.0
  },

  // WISCAR Framework
  {
    id: "wiscar_will_1",
    type: "likert",
    section: "wiscar",
    category: "will",
    question: "I consistently work toward long-term goals even when progress seems slow.",
    likertLabels: { min: "Never", max: "Always" },
    weight: 1.4
  },
  {
    id: "wiscar_will_2",
    type: "scenario",
    section: "wiscar",
    category: "will",
    question: "You're learning a new technology and it's more difficult than expected. How likely are you to continue?",
    options: [
      "Very likely - I enjoy challenges",
      "Likely - with some support",
      "Uncertain - depends on timeline",
      "Unlikely - I'd switch to something easier"
    ],
    weight: 1.3
  },
  {
    id: "wiscar_interest_1",
    type: "likert",
    section: "wiscar",
    category: "interest",
    question: "I genuinely enjoy learning about cloud technologies and infrastructure.",
    likertLabels: { min: "Not at all", max: "Extremely" },
    weight: 1.5
  },
  {
    id: "wiscar_skill_1",
    type: "rating",
    section: "wiscar",
    category: "skill",
    question: "Rate your current comfort level with command-line interfaces:",
    likertLabels: { min: "Complete Beginner", max: "Expert" },
    weight: 1.2
  },
  {
    id: "wiscar_cognitive_1",
    type: "multiple-choice",
    section: "wiscar",
    category: "cognitive",
    question: "You need to troubleshoot why a web application isn't loading. What's your first step?",
    options: [
      "Check server logs for errors",
      "Restart the application",
      "Verify network connectivity",
      "Check if other users have the same issue"
    ],
    weight: 1.1
  },
  {
    id: "wiscar_ability_1",
    type: "likert",
    section: "wiscar",
    category: "ability",
    question: "I actively seek feedback to improve my technical skills.",
    likertLabels: { min: "Never", max: "Always" },
    weight: 1.0
  },
  {
    id: "wiscar_realworld_1",
    type: "scenario",
    section: "wiscar",
    category: "realWorld",
    question: "In a typical week, how much time would you prefer to spend on hands-on technical work vs meetings/documentation?",
    options: [
      "90% technical, 10% meetings/docs",
      "70% technical, 30% meetings/docs", 
      "50% technical, 50% meetings/docs",
      "30% technical, 70% meetings/docs"
    ],
    weight: 1.2
  }
];

export const correctAnswers: Record<string, number> = {
  tech_1: 1, // ps aux
  tech_2: 1, // 443
  tech_3: 2, // Virtual machines, storage, and networking
  tech_4: 1, // Continuous Integration / Continuous Deployment
  tech_5: 1, // Share the host OS kernel
  wiscar_cognitive_1: 0 // Check server logs first
};
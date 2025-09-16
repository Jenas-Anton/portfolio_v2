import { GraduationCap, Award, BookOpen } from "lucide-react";
import { GitHubLogoIcon, LinkedInLogoIcon, EnvelopeClosedIcon } from "lucide-react";
export const SkillData = [
  // 🔹 Programming Languages
  { 
    name: "C++", 
    src: "/skills-icons/c.svg", 
    width: 80, 
    height: 80 
  },
  { 
    name: "Python", 
    src: "/skills-icons/python-5.svg", 
    width: 80, 
    height: 80 
  },
  { 
    name: "SQL", 
    src: "/skills-icons/sql.png", 
    width: 80, 
    height: 80 
  },
  { 
    name: "C Programming", 
    src: "/skills-icons/c-1.svg", 
    width: 80, 
    height: 80 
  },
  { 
    name: "R Programming", 
    src: "/skills-icons/r-lang.svg", 
    width: 80, 
    height: 80 
  },
  { 
    name: "Java", 
    src: "/skills-icons/Java.png", 
    width: 80, 
    height: 80 
  },


  // 🔹 AI/ML Skills
  { 
    name: "Machine Learning", 
    src: "/skills-icons/machine-learning.png", 
    width: 80, 
    height: 80 
  },
  { 
    name: "Data Mining", 
    src: "/skills-icons/data-mining.png", 
    width: 80, 
    height: 80 
  },
  { 
    name: "Data Visualization", 
    src: "/skills-icons/data-visualization.png", 
    width: 80, 
    height: 80 
  },
  { 
    name: "Web Scraping", 
    src: "/skills-icons/web-scraper.png", 
    width: 80, 
    height: 80 
  },
  { 
    name: "Computer Vision", 
    src: "/skills-icons/computer-vision.png", 
    width: 80, 
    height: 80 
  },
  { 
    name: "Generative AI", 
    src: "/skills-icons/Gen AI.png", 
    width: 80, 
    height: 80 
  },
  { 
    name: "Deep Learning", 
    src: "/skills-icons/deep-learning.png", 
    width: 80, 
    height: 80 
  },
  { 
    name: "PyTorch", 
    src: "/skills-icons/PyTorch.png", 
    width: 80, 
    height: 80 
  },
  { 
    name: "TensorFlow", 
    src: "/skills-icons/tensorflow-2.svg", 
    width: 80, 
    height: 80 
  },
];

export const projects = [
  {
    title1: "Verdict",
    title2: "AI",
    src: "/VerdictAI.png"   // ✅ remove "public/"
  },
  {
    title1: "Medical",
    title2: "Chatbot",
    src: "/MedicalChatbot.png"
  },
  {
    title1: "Image",
    title2: "Generator",
    src: "/Stable Diffusion.png"
  },
];

export const BtnList = [
  { label: "Home", link: "/#home" },
  { label: "Skills", link: "/#skills" },
  { label: "Projects", link: "/#projects" },
  {
    label: "Github",
    link: "https://github.com/Jenas-Anton",
  },
  {
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/jenas-anton/",
  },
  {
    label: "Resume",
    link: "https://drive.google.com/file/d/1e6Kkz-ol-jboVIKdGA7ASFIFCXoHTYMb/view?usp=sharing",
  },
];

export const educationData = [
  {
    year: "2020",
    institution: "New Horizon Public School",
    degree: "ICSE",
    score: "96.2%",
    icon: <BookOpen className="w-4 h-4" />,
    status: "completed",
  },
  {
    year: "2022",
    institution: "CMR National PU College",
    degree: "Stream : PCMC",
    score: "98%",
    icon: <Award className="w-4 h-4" />,
    status: "completed",
  },
  {
    year: "2026",
    institution: "MSRIT",
    degree: "BE in Artificial Intelligence & Data Science",
    score: "9.45 CGPA",
    icon: <GraduationCap className="w-4 h-4" />,
    status: "ongoing",
  },
];

export const FooterData =  [
  {
    label: "Github",
    link: "https://github.com/Jenas-Anton",
    icon: "github",
    newTab: true,
  },
  {
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/jenas-anton/",
    icon: "linkedin",
    newTab: true,
  },
  {
    label: "G-Mail",
    link: "jenasav010@gmail.com",
    icon: "mail",
    newTab: true,
  },
];
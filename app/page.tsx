"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Github, Linkedin, Mail, Twitter, ChevronDown, ExternalLink } from "lucide-react"
import { motion, useScroll, useSpring } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { SkillBadge } from "@/components/skill-badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const sections = ["home", "projects", "about", "skills", "contact"]

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      sections.forEach((section) => {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary z-50" style={{ scaleX }} />
      <header className="sticky top-0 z-40 w-full border-b glass-effect">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold inline-block gradient-text text-lg">Portfolio</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              {[
                { name: "Projects", id: "projects" },
                { name: "About", id: "about" },
                { name: "Skills", id: "skills" },
                { name: "Contact", id: "contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center text-sm font-medium transition-colors hover:text-primary relative ${
                    activeSection === item.id ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      layoutId="activeSection"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="default" size="sm" className="transition-all duration-300 hover:scale-105">
              Resume
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section id="home" className="py-24 sm:py-32 relative hero-gradient">
          <div className="container">
            <div className="flex flex-col items-center gap-8 text-center">
              {/* Profile Image */}
              <motion.div
                className="relative mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="size-40 md:size-48 lg:size-56 rounded-full overflow-hidden border-4 border-primary/30 shadow-xl shadow-primary/20 relative z-10">
                  <img
                    src="/images/profile.jpg"
                    alt="Brian Too"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative circles */}
                <div className="absolute -top-3 -left-3 size-full rounded-full border-2 border-dashed border-primary/30 animate-spin-slow"></div>
                <div className="absolute -bottom-3 -right-3 size-full rounded-full border-2 border-dotted border-primary/20 animate-spin-slow-reverse"></div>
              </motion.div>

              <motion.h1
                className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Hi, I'm <span className="gradient-text">Brian Too</span>
              </motion.h1>
              <motion.p
                className="max-w-[700px] text-lg text-muted-foreground md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                I'm a full-stack developer passionate about building modern web applications with cutting-edge
                technologies.
              </motion.p>
              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button asChild className="transition-all duration-300 hover:scale-105 group">
                  <Link
                    href="#projects"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("projects")
                    }}
                  >
                    View Projects{" "}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="outline" asChild className="transition-all duration-300 hover:scale-105">
                  <Link
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("contact")
                    }}
                  >
                    Contact Me
                  </Link>
                </Button>
              </motion.div>

              {/* Social links */}
              <motion.div
                className="flex gap-4 mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <a
                  href="https://github.com/SageBrian"
                  aria-label="Github"
                  className="bg-background/80 p-2 rounded-full transition-all duration-300 hover:text-primary hover:scale-110 hover:bg-background shadow-md"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/in/brian-too-4b57a9227"
                  aria-label="LinkedIn"
                  className="bg-background/80 p-2 rounded-full transition-all duration-300 hover:text-primary hover:scale-110 hover:bg-background shadow-md"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="bg-background/80 p-2 rounded-full transition-all duration-300 hover:text-primary hover:scale-110 hover:bg-background shadow-md"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://briankt49@gmail.com"
                  aria-label="Email"
                  className="bg-background/80 p-2 rounded-full transition-all duration-300 hover:text-primary hover:scale-110 hover:bg-background shadow-md"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </motion.div>
            </div>
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <ChevronDown
                className="h-8 w-8 text-muted-foreground animate-float"
                onClick={() => scrollToSection("projects")}
              />
            </motion.div>
          </div>
        </section>

        <section id="projects" className="section-padding container pattern-bg">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold tracking-tight gradient-text">Projects</h2>
              <p className="text-muted-foreground">Check out some of my recent work.</p>
            </div>

            {[
              {
                title: "AI-VOICE-AGENT",
                description:
                  "A voice-based chatbot that uses grog llm and eleven labs to generate responses to user queries.",
                tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "OpenAI", "ElevenLabs"],
                image: "/",
                demoUrl: "#",
                githubUrl: "#",
              },
              {
                title: "group-savings-app",
                description: "A collaborative savings app built with React-vite, and flask for the backend.",
                tags: ["React", "typeScript", "Flask", "Tailwind CSS","PostgreSQL"],
                image: "/images/readme2.png",
                demoUrl: "#",
                githubUrl: "#",
              },
              {
                title: "dental-ai appointment and inquiry system",
                description: "A voice dental appointment and inquiry system built with Next.js and Tailwind CSS, and python flask for the backend.",
                tags: ["Next.js", "React", "TypeScript", "Flask",'python',"grog llm","ElevenLabs", "Tailwind CSS"],
                image: "/images/dental-ai.png",
                demoUrl: "#",
                githubUrl: "#",
              },
              
            ].map((project, index) => (
              <motion.div
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="w-full md:w-1/2">
                  <div className="project-image">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-auto object-cover aspect-video"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 space-y-4">
                  <h3 className="text-2xl font-bold gradient-text">{project.title}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-4 pt-2">
                    {project.demoUrl && (
                      <Button
                        asChild
                        variant="default"
                        size="sm"
                        className="transition-all duration-300 hover:scale-105"
                      >
                        <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Demo
                        </Link>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="transition-all duration-300 hover:scale-105"
                      >
                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="about" className="section-padding container">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold tracking-tight gradient-text">About Me</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: "0.1s" }}>
                  I'm a passionate developer with a focus on creating clean, efficient, and user-friendly web
                  applications. With several years of experience in full-stack development, I enjoy tackling complex
                  problems and turning ideas into reality.
                </p>
                <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  My journey in software development began when I built my first website in college. Since then, I've
                  worked on various projects ranging from small business websites to complex enterprise applications.
                </p>
                <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: "0.3s" }}>
                  When I'm not coding, you can find me hiking, reading tech blogs, or experimenting with new
                  technologies. I'm always looking for new challenges and opportunities to grow as a developer.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative size-80 overflow-hidden rounded-full border-4 border-primary/30 animate-float shadow-xl shadow-primary/20">
                <img src="/placeholder.svg?height=320&width=320" alt="Profile" className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section-padding relative">
          <div className="absolute inset-0 hero-gradient opacity-50"></div>
          <div className="container relative z-10">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight gradient-text">Skills & Technologies</h2>
                <p className="text-muted-foreground">Here are some of the technologies I work with.</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                <div
                  className="flex flex-col gap-2 rounded-lg glass-effect p-6 card-hover animate-fade-in"
                  style={{ animationDelay: "0.1s" }}
                >
                  <h3 className="text-xl font-bold gradient-text">Frontend</h3>
                  <div className="flex flex-wrap gap-2 stagger-animation">
                    {["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"].map((skill, i) => (
                      <SkillBadge key={skill} name={skill} delay={0.1 * i} />
                    ))}
                  </div>
                </div>
                <div
                  className="flex flex-col gap-2 rounded-lg glass-effect p-6 card-hover animate-fade-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  <h3 className="text-xl font-bold gradient-text">Backend</h3>
                  <div className="flex flex-wrap gap-2 stagger-animation">
                    {["Node.js", "Express", "Python", "Django", "PostgreSQL", "MongoDB", "Firebase"].map((skill, i) => (
                      <SkillBadge key={skill} name={skill} delay={0.1 * i} />
                    ))}
                  </div>
                </div>
                <div
                  className="flex flex-col gap-2 rounded-lg glass-effect p-6 card-hover animate-fade-in"
                  style={{ animationDelay: "0.3s" }}
                >
                  <h3 className="text-xl font-bold gradient-text">Tools & Others</h3>
                  <div className="flex flex-wrap gap-2 stagger-animation">
                    {["Git", "GitHub", "Docker", "AWS", "Vercel", "Figma", "Jest"].map((skill, i) => (
                      <SkillBadge key={skill} name={skill} delay={0.1 * i} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section-padding container">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold tracking-tight gradient-text">Get In Touch</h2>
              <p className="text-muted-foreground">
                Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="flex flex-col gap-4 animate-slide-left">
                <div className="flex items-center gap-2 p-3 rounded-lg glass-effect transition-all duration-300 hover:bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>email@example.com</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg glass-effect transition-all duration-300 hover:bg-primary/10">
                  <Linkedin className="h-5 w-5 text-primary" />
                  <a href="#" className="hover:underline">
                    linkedin.com/in/yourname
                  </a>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg glass-effect transition-all duration-300 hover:bg-primary/10">
                  <Github className="h-5 w-5 text-primary" />
                  <a href="#" className="hover:underline">
                    github.com/yourusername
                  </a>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg glass-effect transition-all duration-300 hover:bg-primary/10">
                  <Twitter className="h-5 w-5 text-primary" />
                  <a href="#" className="hover:underline">
                    twitter.com/yourusername
                  </a>
                </div>
              </div>
              <form className="flex flex-col gap-4 glass-effect p-6 rounded-lg animate-slide-right">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Your message"
                    className="min-h-32 transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <Button type="submit" className="w-full transition-all duration-300 hover:scale-[1.02]">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8 glass-effect">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" aria-label="Github" className="transition-all duration-300 hover:text-primary hover:scale-110">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Twitter" className="transition-all duration-300 hover:text-primary hover:scale-110">
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="transition-all duration-300 hover:text-primary hover:scale-110"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
      <ScrollToTop />
    </div>
  )
}

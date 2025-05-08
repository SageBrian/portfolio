import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  image: string
  demoUrl?: string
  githubUrl?: string
  index?: number
}

export function ProjectCard({ title, description, tags, image, demoUrl, githubUrl, index = 0 }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden card-hover group animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="aspect-video overflow-hidden rounded-t-lg border border-border/50">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 shadow-sm"
        />
      </div>
      <CardHeader>
        <CardTitle className="transition-colors duration-300 group-hover:text-primary">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        {demoUrl && (
          <Button asChild variant="default" size="sm" className="transition-all duration-300 hover:scale-105">
            <Link href={demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Demo
            </Link>
          </Button>
        )}
        {githubUrl && (
          <Button asChild variant="outline" size="sm" className="transition-all duration-300 hover:scale-105">
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              Code
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

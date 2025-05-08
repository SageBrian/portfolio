import { Badge } from "@/components/ui/badge"

interface SkillBadgeProps {
  name: string
  delay?: number
}

export function SkillBadge({ name, delay = 0 }: SkillBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className="text-sm transition-all duration-300 hover:bg-primary hover:text-primary-foreground animate-fade-in"
      style={{ animationDelay: `${delay}s` }}
    >
      {name}
    </Badge>
  )
}

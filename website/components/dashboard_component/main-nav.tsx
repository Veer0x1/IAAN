import Link from "next/link"

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/invest"
        className="text-md font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Invest
      </Link>
      <Link
        href="/team"
        className="text-md font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Team
      </Link>
      
    </nav>
  )
}
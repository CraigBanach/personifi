"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboardIcon,
  CreditCardIcon,
  PiggyBankIcon,
  BarChartIcon,
  GoalIcon,
  BellIcon,
  SettingsIcon,
  HelpCircleIcon,
  MenuIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Transactions",
    href: "/transactions",
    icon: CreditCardIcon,
  },
  {
    title: "Accounts",
    href: "/accounts",
    icon: PiggyBankIcon,
  },
  {
    title: "Budget",
    href: "/budget",
    icon: BarChartIcon,
  },
  {
    title: "Goals",
    href: "/goals",
    icon: GoalIcon,
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: BellIcon,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: SettingsIcon,
  },
  {
    title: "Help & Support",
    href: "/help",
    icon: HelpCircleIcon,
  },
]

export function Sidebar({ className, ...props }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px] pr-0">
          <div className="px-2 py-6">
            <h2 className="mb-6 px-4 text-lg font-semibold tracking-tight text-finance-green">Personifi</h2>
            <div className="space-y-1">
              {sidebarLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
                    pathname === link.href ? "bg-finance-green-light text-finance-green" : "text-muted-foreground",
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className={cn("hidden border-r bg-background md:block", className)} {...props}>
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-6 px-4 text-lg font-semibold tracking-tight text-finance-green">Personifi</h2>
            <div className="space-y-1">
              {sidebarLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
                    pathname === link.href ? "bg-finance-green-light text-finance-green" : "text-muted-foreground",
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

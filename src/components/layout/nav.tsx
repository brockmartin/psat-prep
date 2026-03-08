"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, LogOut, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { useAuth } from "@/hooks/use-auth"

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/week", label: "Lessons" },
  { href: "/practice-test", label: "Practice Tests" },
] as const

export function Nav() {
  const [open, setOpen] = useState(false)
  const { user, loading, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-foreground transition-colors hover:text-primary"
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="size-4.5" />
          </div>
          PSAT Prep
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Button key={link.href} variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </nav>

        {/* Desktop right side */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          {!loading && (
            <>
              {user ? (
                <>
                  <span className="max-w-[180px] truncate text-sm text-muted-foreground">
                    {user.email}
                  </span>
                  <Button variant="ghost" size="sm" onClick={signOut} className="text-muted-foreground hover:text-foreground">
                    <LogOut className="mr-1.5 size-4" />
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/login">Log In</Link>
                  </Button>
                  <Button size="sm" className="shadow-sm shadow-primary/20" asChild>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </>
          )}
        </div>

        {/* Mobile right side */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </Button>
        </div>

        {/* Mobile sheet menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <GraduationCap className="size-4" />
                </div>
                PSAT Prep
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4 pt-4">
              {navLinks.map((link) => (
                <SheetClose key={link.href} asChild>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                </SheetClose>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-2 p-4">
              {!loading && (
                <>
                  {user ? (
                    <>
                      <p className="truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                      <SheetClose asChild>
                        <Button variant="outline" onClick={signOut}>
                          <LogOut className="mr-2 size-4" />
                          Log Out
                        </Button>
                      </SheetClose>
                    </>
                  ) : (
                    <>
                      <SheetClose asChild>
                        <Button variant="outline" asChild>
                          <Link href="/login">Log In</Link>
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button className="shadow-sm shadow-primary/20" asChild>
                          <Link href="/signup">Sign Up</Link>
                        </Button>
                      </SheetClose>
                    </>
                  )}
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

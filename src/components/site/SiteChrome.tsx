import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Heart, LifeBuoy, Mail, Menu, Phone, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { AREAS } from "@/data/services";
import { EMAIL, FACEBOOK } from "@/data/content";
import { cn } from "@/lib/utils";

const HELPLINES = [
  { name: "Emergency", detail: "Call 999", href: "tel:999" },
  { name: "Samaritans", detail: "116 123 (free, 24/7)", href: "tel:116123" },
  { name: "NHS", detail: "Call 111", href: "tel:111" },
  { name: "Shout", detail: "Text SHOUT to 85258", href: "sms:85258?body=SHOUT" },
];

function UrgentHelpDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="min-h-9">
          <LifeBuoy /> Get help now
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-3xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Urgent help</DialogTitle>
          <DialogDescription className="text-base text-foreground">
            You don't have to face this alone.
          </DialogDescription>
        </DialogHeader>
        <ul className="mt-2 space-y-3">
          {HELPLINES.map((h) => (
            <li key={h.name}>
              <a
                href={h.href}
                className="flex min-h-14 items-center gap-4 rounded-2xl bg-pink-tint px-4 py-3 transition-colors hover:bg-pink-soft"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-pink">
                  <Phone className="h-4 w-4" aria-hidden />
                </span>
                <span>
                  <span className="block font-semibold">{h.name}</span>
                  <span className="text-muted-foreground">{h.detail}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}

function TopBar() {
  return (
    <div className="bg-pink-tint">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3 px-4 py-2 text-[0.95rem]">
        <span className="font-medium">Need urgent help?</span>
        <UrgentHelpDialog />
      </div>
    </div>
  );
}

const SIZES = [
  { label: "A-", value: "100%", aria: "Smaller text" },
  { label: "A", value: "106.25%", aria: "Default text size" },
  { label: "A+", value: "118.75%", aria: "Larger text" },
];

function TextSize() {
  const [size, setSize] = useState("106.25%");
  useEffect(() => {
    const saved = localStorage.getItem("dc-text-size");
    if (saved) setSize(saved);
  }, []);
  useEffect(() => {
    document.documentElement.style.setProperty("--base-size", size);
    localStorage.setItem("dc-text-size", size);
  }, [size]);
  return (
    <div role="group" aria-label="Text size" className="flex items-center rounded-full bg-aqua-tint p-1">
      {SIZES.map((s, i) => (
        <button
          key={s.label}
          type="button"
          aria-label={s.aria}
          aria-pressed={size === s.value}
          onClick={() => setSize(s.value)}
          className={cn(
            "grid h-9 w-9 place-items-center rounded-full font-semibold transition-colors",
            i === 0 && "text-sm",
            i === 2 && "text-lg",
            size === s.value ? "bg-background shadow-soft" : "hover:bg-aqua-soft",
          )}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}

export function Wordmark() {
  return (
    <Link to="/" className="flex items-center gap-2.5 rounded-xl" aria-label="D&C Directory home">
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-aqua">
        <Heart className="h-5 w-5" aria-hidden />
      </span>
      <span className="text-xl font-bold tracking-tight">D&amp;C Directory</span>
    </Link>
  );
}

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/newsletters", label: "Newsletters" },
] as const;
const NAV_END = [
  { to: "/testimonials", label: "Testimonials & Links" },
  { to: "/contact", label: "Get in Touch" },
] as const;

const linkCls =
  "rounded-full px-3 py-2 font-medium transition-colors hover:bg-aqua-tint data-[status=active]:bg-aqua-tint";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-background transition-shadow duration-300",
        scrolled && "shadow-soft",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Wordmark />
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className={linkCls} activeOptions={{ exact: true }}>
              {n.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger className={cn(linkCls, "flex items-center gap-1")}>
              Find Support <ChevronDown className="h-4 w-4" aria-hidden />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52 rounded-2xl p-2">
              {AREAS.map((a) => (
                <DropdownMenuItem key={a.slug} asChild className="min-h-11 rounded-xl text-base">
                  <Link to="/support/$area" params={{ area: a.slug }}>
                    {a.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {NAV_END.map((n) => (
            <Link key={n.to} to={n.to} className={linkCls}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <TextSize />
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="!size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="mt-4 flex flex-col gap-1 px-4" onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}>
                {NAV.map((n) => (
                  <Link key={n.to} to={n.to} className={cn(linkCls, "min-h-11 px-4 py-3")} activeOptions={{ exact: true }}>
                    {n.label}
                  </Link>
                ))}
                <p className="mt-3 px-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Find Support</p>
                {AREAS.map((a) => (
                  <Link key={a.slug} to="/support/$area" params={{ area: a.slug }} className={cn(linkCls, "min-h-11 px-6 py-3")}>
                    {a.name}
                  </Link>
                ))}
                {NAV_END.map((n) => (
                  <Link key={n.to} to={n.to} className={cn(linkCls, "mt-1 min-h-11 px-4 py-3")}>
                    {n.label}
                  </Link>
                ))}
                <div className="mt-4 px-2">
                  <TextSize />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-aqua-tint">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div className="space-y-3">
          <Wordmark />
          <p className="text-muted-foreground">
            Mental health and wellbeing support across Plymouth, Devon and Cornwall.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-lg">Quick links</h2>
          <ul className="grid grid-cols-2 gap-1">
            {[...NAV, ...NAV_END].map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="inline-block py-1 hover:underline">
                  {n.label}
                </Link>
              </li>
            ))}
            {AREAS.map((a) => (
              <li key={a.slug}>
                <Link to="/support/$area" params={{ area: a.slug }} className="inline-block py-1 hover:underline">
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <h2 className="text-lg">Say hello</h2>
          <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 break-all text-primary hover:underline">
            <Mail className="h-4 w-4 shrink-0" aria-hidden /> {EMAIL}
          </a>
          <a href={FACEBOOK} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-primary hover:underline">
            <Facebook className="h-4 w-4" aria-hidden /> Facebook
          </a>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-5 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <span>© 2026 by D&amp;C Directory. All rights reserved.</span>
          <span>Design demo: sample listings shown for illustration</span>
        </div>
      </div>
    </footer>
  );
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <TopBar />
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

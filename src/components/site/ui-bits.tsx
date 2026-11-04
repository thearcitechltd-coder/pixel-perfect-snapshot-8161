import { useEffect, useRef, useState, type ReactNode } from "react";
import { FileText, Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function FadeUp({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={cn(seen ? "animate-fade-up" : "opacity-0", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function Section({ children, tone = "white", className, id }: { children: ReactNode; tone?: "white" | "aqua" | "pink"; className?: string; id?: string }) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden py-16 md:py-24",
        tone === "aqua" && "bg-aqua-tint",
        tone === "pink" && "bg-pink-tint",
        className,
      )}
    >
      <div className="relative z-10 mx-auto max-w-6xl px-4">{children}</div>
    </section>
  );
}

export function PageHero({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-aqua-tint py-16 md:py-20">
      <div className="blob -right-24 -top-24 h-80 w-80 bg-aqua opacity-50" />
      <div className="blob -bottom-32 left-[-6rem] h-72 w-72 bg-pink opacity-50" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 animate-fade-up">
        {eyebrow && <p className="mb-3 font-medium text-primary">{eyebrow}</p>}
        <h1 className="max-w-3xl text-4xl md:text-5xl">{title}</h1>
        {children && <div className="mt-5 max-w-2xl text-lg text-muted-foreground">{children}</div>}
      </div>
    </section>
  );
}

export function PdfPreviewDialog({ open, onOpenChange, title }: { open: boolean; onOpenChange: (o: boolean) => void; title: string }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>PDF preview</DialogTitle>
          <DialogDescription>{title}</DialogDescription>
        </DialogHeader>
        <div className="rounded-2xl bg-aqua-tint p-6">
          <div className="mx-auto aspect-[3/4] max-w-[15rem] space-y-3 rounded-xl bg-background p-5 shadow-soft">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-lg bg-aqua" />
              <span className="h-3 w-24 rounded-full bg-muted" />
            </div>
            <div className="h-4 w-3/4 rounded-full bg-pink-soft" />
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="h-2.5 rounded-full bg-muted" style={{ width: `${90 - (i % 3) * 15}%` }} />
            ))}
            <div className="h-14 rounded-lg bg-aqua-soft" />
          </div>
        </div>
        <Button
          onClick={() => {
            toast.success("This is a design demo", { description: "In the live site, the PDF would download here." });
            onOpenChange(false);
          }}
        >
          <Download /> Download PDF
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export function PdfButton({ title, label = "Download PDF version" }: { title: string; label?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <FileText /> {label}
      </Button>
      <PdfPreviewDialog open={open} onOpenChange={setOpen} title={title} />
    </>
  );
}

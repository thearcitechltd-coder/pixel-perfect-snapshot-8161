import { useSyncExternalStore, useState } from "react";
import { Globe, Heart, MapPin, Phone, Clock } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { areaName, type Service } from "@/data/services";
import { cn } from "@/lib/utils";

// Tiny in-memory "saved" store (demo only).
let saved = new Set<string>();
const subs = new Set<() => void>();
const savedStore = {
  subscribe: (f: () => void) => (subs.add(f), () => subs.delete(f)),
  get: () => saved,
  toggle: (id: string) => {
    saved = new Set(saved);
    if (saved.has(id)) saved.delete(id);
    else saved.add(id);
    subs.forEach((f) => f());
    return saved.has(id);
  },
};
const empty = new Set<string>();
function useSaved() {
  return useSyncExternalStore(savedStore.subscribe, savedStore.get, () => empty);
}

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { month: "long", year: "numeric" });

export function ServiceCard({ svc, tone = 0 }: { svc: Service; tone?: number }) {
  const s = useSaved();
  const isSaved = s.has(svc.id);
  const [open, setOpen] = useState(false);
  const toggle = () => {
    const now = savedStore.toggle(svc.id);
    toast(now ? `Saved ${svc.name}` : `Removed ${svc.name}`, { description: now ? "We'll keep it handy for you." : undefined });
  };
  return (
    <article className="card-lift flex flex-col rounded-3xl border bg-card p-6 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <Badge className={cn("rounded-full border-0 px-3 py-1 text-sm font-medium text-foreground", tone % 2 ? "bg-pink-soft" : "bg-aqua-soft")}>
          {svc.category}
        </Badge>
        <button
          type="button"
          onClick={toggle}
          aria-pressed={isSaved}
          aria-label={isSaved ? `Remove ${svc.name} from saved` : `Save ${svc.name}`}
          className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-pink-tint"
        >
          <Heart className={cn("h-5 w-5 transition-all", isSaved && "fill-pink stroke-primary")} />
        </button>
      </div>
      <h3 className="mt-3 text-xl">{svc.name}</h3>
      <p className="mt-2 flex-1 text-muted-foreground">{svc.description}</p>
      <ul className="mt-4 space-y-1.5 text-[0.95rem]">
        <li className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" aria-hidden />
          {svc.region ?? areaName(svc.area)}
        </li>
        <li className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-primary" aria-hidden />
          <a href={`tel:${svc.phone.replace(/\s/g, "")}`} className="hover:underline">{svc.phone}</a>
        </li>
        <li className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-primary" aria-hidden />
          <a href={svc.website} target="_blank" rel="noreferrer" className="truncate text-primary hover:underline">Visit website</a>
        </li>
      </ul>
      <div className="mt-5 flex items-center justify-between gap-3 border-t pt-4">
        <span className="text-sm text-muted-foreground">Last updated {fmt(svc.updated)}</span>
        <Button size="sm" variant="soft" onClick={() => setOpen(true)}>View details</Button>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          <SheetHeader>
            <Badge className="w-fit rounded-full border-0 bg-aqua-soft px-3 py-1 text-foreground">{svc.category}</Badge>
            <SheetTitle className="text-2xl">{svc.name}</SheetTitle>
            <SheetDescription className="text-base">{svc.description}</SheetDescription>
          </SheetHeader>
          <div className="space-y-4 px-4">
            {svc.openNow && (
              <p className="flex items-center gap-2 rounded-2xl bg-aqua-tint px-4 py-3"><Clock className="h-4 w-4" /> Open now</p>
            )}
            <dl className="space-y-3">
              <div><dt className="text-sm text-muted-foreground">Area</dt><dd>{svc.region ? `${svc.region}, ` : ""}{areaName(svc.area)}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Phone</dt><dd><a className="text-primary hover:underline" href={`tel:${svc.phone.replace(/\s/g, "")}`}>{svc.phone}</a></dd></div>
              <div><dt className="text-sm text-muted-foreground">Website</dt><dd><a className="break-all text-primary hover:underline" href={svc.website} target="_blank" rel="noreferrer">{svc.website}</a></dd></div>
              <div><dt className="text-sm text-muted-foreground">Last updated</dt><dd>{fmt(svc.updated)}</dd></div>
            </dl>
            <p className="rounded-2xl bg-pink-tint p-4 text-sm">Sample listing for illustration. Always check details with the service before visiting.</p>
            <Button className="w-full" variant={isSaved ? "outline" : "default"} onClick={toggle}>
              <Heart className={cn(isSaved && "fill-pink")} /> {isSaved ? "Saved" : "Save this service"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </article>
  );
}

export function EmptyState({ children }: { children?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-lg rounded-3xl bg-pink-tint p-10 text-center">
      <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-pink">
        <Heart className="h-6 w-6" aria-hidden />
      </span>
      <p className="text-lg">We couldn't find a match. Try a different word or area, or get in touch and we'll help.</p>
      {children}
    </div>
  );
}

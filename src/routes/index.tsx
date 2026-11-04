import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  ArrowRight, Bell, BookOpen, Building2, Castle, Compass, Handshake, Heart, HeartHandshake, LifeBuoy,
  MapPin, MessageCircle, Mountain, Palmtree, Quote, ShieldCheck, Sparkles, Sun, Users, Utensils, Waves, Globe2, Sprout,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchCard } from "@/components/site/SearchCard";
import { FadeUp, Section } from "@/components/site/ui-bits";
import { AREAS, CATEGORIES } from "@/data/services";
import { EMAIL, TESTIMONIALS } from "@/data/content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "D&C Directory — Find support close to home" },
      { name: "description", content: "A friendly directory of mental health and wellbeing support across Plymouth, Devon and Cornwall." },
      { property: "og:title", content: "D&C Directory — Find support close to home" },
      { property: "og:description", content: "A friendly directory of mental health and wellbeing support across Plymouth, Devon and Cornwall." },
    ],
  }),
  component: Home,
});

const QUICK = ["Crisis support", "Young adults", "Older people", "Food support", "Counselling", "Activities & groups"];
const AREA_ICONS = { plymouth: Waves, exeter: Castle, torbay: Palmtree, devon: Mountain, cornwall: Sun };
const CAT_ICONS: Record<string, typeof Heart> = {
  "Crisis support": LifeBuoy, "Mental health": Heart, "Young adults": Sparkles, "Older people": HeartHandshake,
  "Food support": Utensils, "Activities & groups": Users, Counselling: MessageCircle, "Recovery & addiction": Sprout,
  "Refugees & sanctuary": Globe2, Community: Handshake,
};

function HeroArt() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md" aria-hidden>
      <div className="blob inset-6 bg-aqua opacity-60" />
      <div className="blob bottom-0 right-0 h-2/3 w-2/3 bg-pink opacity-70" style={{ borderRadius: "58% 42% 37% 63% / 52% 44% 56% 48%" }} />
      <div className="absolute left-4 top-10 z-10 w-52 animate-float rounded-3xl bg-card p-4 shadow-lift">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-aqua"><MapPin className="h-5 w-5" /></span>
          <div><p className="font-semibold">Plymouth</p><p className="text-sm text-muted-foreground">48 services nearby</p></div>
        </div>
      </div>
      <div className="absolute bottom-14 right-2 z-10 w-60 animate-float rounded-3xl bg-card p-5 shadow-lift" style={{ animationDelay: "-3s" }}>
        <span className="rounded-full bg-pink-soft px-3 py-1 text-sm">Counselling</span>
        <p className="mt-3 font-semibold">Waterfront Counselling</p>
        <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground"><span className="h-2 w-2 rounded-full bg-primary" /> Open now</p>
      </div>
      <div className="absolute right-12 top-16 z-10 grid h-16 w-16 animate-float place-items-center rounded-full bg-pink shadow-soft" style={{ animationDelay: "-1.5s" }}>
        <Heart className="h-7 w-7 fill-background stroke-primary" />
      </div>
    </div>
  );
}

function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-aqua-tint">
        <div className="blob -left-32 -top-32 h-96 w-96 bg-aqua opacity-40" />
        <div className="blob -bottom-40 right-1/3 h-80 w-80 bg-pink opacity-40" />
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 md:py-20 lg:grid-cols-[1.25fr_1fr]">
          <div className="animate-fade-up">
            <p className="mb-4 inline-block rounded-full bg-background px-4 py-1.5 font-medium text-primary shadow-soft">
              Welcome to the D&amp;C Directory website
            </p>
            <h1 className="text-4xl leading-tight md:text-6xl">Find the support you need, close to home.</h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Get ready to explore a treasure trove of newsletters, region-specific service pages, glowing testimonials,
              and handy external links, all at your fingertips!
            </p>
            <div className="mt-8"><SearchCard /></div>
            <div className="mt-5 flex flex-wrap gap-2">
              {QUICK.map((c) => (
                <Link key={c} to="/results" search={{ q: "", area: "all", category: c, sort: "az" }}
                  className="min-h-11 rounded-full bg-background px-4 py-2.5 text-[0.95rem] font-medium transition-all hover:-translate-y-0.5 hover:bg-pink-tint">
                  {c}
                </Link>
              ))}
            </div>
            <p className="mt-6 flex items-center gap-2 text-muted-foreground">
              <Heart className="h-4 w-4 fill-pink stroke-primary" aria-hidden />
              Created from lived experience, to make finding help easier.
            </p>
          </div>
          <div className="hidden lg:block"><HeroArt /></div>
        </div>
      </section>

      <div className="border-y bg-background">
        <ul className="mx-auto grid max-w-6xl gap-4 px-4 py-6 sm:grid-cols-3">
          {[
            { i: BookOpen, t: "300+ pages of support" },
            { i: Compass, t: "Plymouth · Devon · Cornwall" },
            { i: ShieldCheck, t: "Trusted by services and professionals" },
          ].map(({ i: I, t }) => (
            <li key={t} className="flex items-center justify-center gap-3 font-medium">
              <I className="h-5 w-5 text-primary" aria-hidden /> {t}
            </li>
          ))}
        </ul>
      </div>

      <Section>
        <FadeUp>
          <h2 className="text-3xl md:text-4xl">Find support by area</h2>
          <p className="mt-2 text-muted-foreground">Choose where you are, and we'll show you what's nearby.</p>
        </FadeUp>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {AREAS.map((a, i) => {
            const I = AREA_ICONS[a.slug];
            return (
              <FadeUp key={a.slug} delay={i * 80}>
                <Link to="/support/$area" params={{ area: a.slug }}
                  className={cn("card-lift group flex h-full flex-col rounded-3xl p-6", i % 2 ? "bg-pink-soft" : "bg-aqua-soft")}>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-background"><I className="h-6 w-6 text-primary" aria-hidden /></span>
                  <h3 className="mt-5 text-xl">{a.name}</h3>
                  <p className="mt-1 flex-1 text-[0.95rem]">{a.blurb}</p>
                  <span className="mt-4 flex items-center gap-1 font-semibold text-primary">
                    Explore services <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </FadeUp>
            );
          })}
        </div>
      </Section>

      <Section tone="aqua">
        <FadeUp>
          <h2 className="text-3xl md:text-4xl">Browse by need</h2>
          <p className="mt-2 text-muted-foreground">Whatever you're going through, there's someone who can help.</p>
        </FadeUp>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((c, i) => {
            const I = CAT_ICONS[c] ?? Building2;
            return (
              <FadeUp key={c} delay={i * 40}>
                <Link to="/results" search={{ q: "", area: "all", category: c, sort: "az" }}
                  className="card-lift flex h-full flex-col items-start gap-3 rounded-3xl bg-card p-5 shadow-soft">
                  <span className={cn("grid h-11 w-11 place-items-center rounded-full", i % 2 ? "bg-pink-soft" : "bg-aqua-soft")}>
                    <I className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="font-semibold">{c}</span>
                </Link>
              </FadeUp>
            );
          })}
        </div>
      </Section>

      <Section>
        <FadeUp><h2 className="text-3xl md:text-4xl">What people say</h2></FadeUp>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.slice(0, 3).map((t, i) => (
            <FadeUp key={t.by} delay={i * 80}>
              <figure className={cn("h-full rounded-3xl p-7", i % 2 ? "bg-pink-tint" : "bg-aqua-tint")}>
                <Quote className="h-8 w-8 text-primary" aria-hidden />
                <blockquote className="mt-4 text-xl font-medium">“{t.quote}”</blockquote>
                <figcaption className="mt-4 text-muted-foreground">{t.by}</figcaption>
              </figure>
            </FadeUp>
          ))}
        </div>
        <div className="mt-8"><Button asChild variant="outline"><Link to="/testimonials">Read more kind words</Link></Button></div>
      </Section>

      <Section tone="aqua">
        <FadeUp><h2 className="text-3xl md:text-4xl">Coming soon</h2></FadeUp>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            { t: "Featured service page", d: "A spotlight on a different local service each month." },
            { t: "Noticeboard packed with the latest updates", d: "Events, groups and news from across the region." },
          ].map((c, i) => (
            <FadeUp key={c.t} delay={i * 80}>
              <div className="flex h-full flex-col rounded-3xl bg-card p-7 shadow-soft">
                <span className="w-fit rounded-full bg-pink-soft px-3 py-1 text-sm font-medium">Coming soon</span>
                <h3 className="mt-4 text-2xl">{c.t}</h3>
                <p className="mt-2 flex-1 text-muted-foreground">{c.d}</p>
                <Button className="mt-6 w-fit" onClick={() => toast.success("Thank you!", { description: "We'll let you know as soon as it's ready." })}>
                  <Bell /> Notify me
                </Button>
              </div>
            </FadeUp>
          ))}
        </div>
      </Section>

      <section className="bg-pink-tint">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-5 px-4 py-12 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-lg">
            Have questions? Don't hesitate to reach out at{" "}
            <a href={`mailto:${EMAIL}`} className="break-all font-semibold text-primary underline-offset-4 hover:underline">{EMAIL}</a>
          </p>
          <Button asChild size="lg"><Link to="/contact">Contact us</Link></Button>
        </div>
      </section>
    </>
  );
}

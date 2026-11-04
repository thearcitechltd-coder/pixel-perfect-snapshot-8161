import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AREAS, CATEGORIES } from "@/data/services";

export function SearchCard() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [area, setArea] = useState("all");
  const [category, setCategory] = useState("all");
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        navigate({ to: "/results", search: { q, area, category, sort: "az" } });
      }}
      className="rounded-3xl bg-card p-4 shadow-lift sm:p-5"
    >
      <label htmlFor="hero-q" className="sr-only">What are you looking for?</label>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <Input
          id="hero-q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="What are you looking for? e.g. anxiety support, food bank, activities"
          className="h-14 rounded-2xl border-0 bg-aqua-tint pl-12 text-base md:text-base"
        />
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <Select value={area} onValueChange={setArea}>
          <SelectTrigger aria-label="Area" className="h-12 rounded-2xl text-base"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All areas</SelectItem>
            {AREAS.map((a) => <SelectItem key={a.slug} value={a.slug}>{a.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger aria-label="Category" className="h-12 rounded-2xl text-base"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Button type="submit" size="lg" className="h-12 px-8">
          <Search /> Search
        </Button>
      </div>
    </form>
  );
}

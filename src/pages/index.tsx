import { useState, useMemo } from "react";
import playersRaw from "../data/top100.json";
import PlayerCard from "../components/PlayerCard";

type RawPlayer = typeof playersRaw[number];

export default function Home() {
  const [q, setQ]           = useState("");
  const [league, setLeague] = useState("all");
  const [nation, setNation] = useState("all");
  const [order, setOrder]   = useState<"hi"|"lo">("hi");

  /* unique filter lists */
  const leagues = useMemo(() => [...new Set(playersRaw.map(p => p.league))], []);
  const nations = useMemo(() => [...new Set(playersRaw.map(p => p.nation))], []);

  /* filtered + sorted */
  const players = useMemo(() => {
    let out: RawPlayer[] = playersRaw;

    if (q)      out = out.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));
    if (league !== "all") out = out.filter(p => p.league === league);
    if (nation !== "all") out = out.filter(p => p.nation === nation);

    return out.sort((a, b) =>
      order === "hi" ? b.rating - a.rating : a.rating - b.rating
    );
  }, [q, league, nation, order]);

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      {/* controls */}
      <div className="grid gap-3 sm:grid-cols-4">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search name..."
          className="sm:col-span-2 rounded p-2 border"
        />
        <select value={league} onChange={e => setLeague(e.target.value)} className="rounded p-2 border">
          <option value="all">All leagues</option>
          {leagues.map(l => <option key={l}>{l}</option>)}
        </select>
        <select value={nation} onChange={e => setNation(e.target.value)} className="rounded p-2 border">
          <option value="all">All nations</option>
          {nations.map(n => <option key={n}>{n}</option>)}
        </select>
        <select value={order} onChange={e => setOrder(e.target.value as any)} className="rounded p-2 border">
          <option value="hi">Rating ⬆︎</option>
          <option value="lo">Rating ⬇︎</option>
        </select>
      </div>

      {/* list */}
      <div className="grid gap-4">
        {players.map(p => <PlayerCard key={p.id} p={p} />)}
      </div>
    </main>
  );
}

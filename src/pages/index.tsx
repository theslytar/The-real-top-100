import { useState, useMemo } from 'react';
import PlayerCard from '@/components/PlayerCard';
import players from '@/data/top100-sample.json';

type Player = typeof players[number];

export default function Home() {
  const [query, setQuery]   = useState('');
  const [sortDir, setSort]  = useState<'HIGH' | 'LOW'>('HIGH');

  const list = useMemo(() => {
    let arr: Player[] = players;

    /* text search */
    if (query.trim()) {
      const q = query.toLowerCase();
      arr = arr.filter(p => p.name.toLowerCase().includes(q));
    }

    /* sort */
    arr = [...arr].sort((a, b) =>
      sortDir === 'HIGH' ? b.rating - a.rating : a.rating - b.rating
    );

    return arr;
  }, [query, sortDir]);

  return (
    <main style={{ maxWidth: 650, margin: '0 auto', padding: 24 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>
        FC 25 Top 100
      </h1>

      {/* search + sort */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search player…"
          style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
        />

        <select
          value={sortDir}
          onChange={e => setSort(e.target.value as any)}
          style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
        >
          <option value="HIGH">Rating ↓</option>
          <option value="LOW">Rating ↑</option>
        </select>
      </div>

      {/* player cards */}
      {list.map(p => <PlayerCard key={p.name} player={p} />)}
      {!list.length && <p>No players match.</p>}
    </main>
  );
}

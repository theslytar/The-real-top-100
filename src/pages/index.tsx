import { useState, useMemo } from 'react';
import PlayerCard from '@/components/PlayerCard';
import players from '@/data/top100-sample.json';

type Player = typeof players[number];   // expects each player to have league & nation

export default function Home() {
  const [query,  setQuery]  = useState('');
  const [league, setLeague] = useState('All');
  const [nation, setNation] = useState('All');
  const [order,  setOrder]  = useState<'HIGH' | 'LOW'>('HIGH');

  // build dropdown lists
  const leagues = useMemo(() => ['All', ...new Set(players.map(p => p.league))], []);
  const nations = useMemo(() => ['All', ...new Set(players.map(p => p.nation))], []);

  // filtered + sorted list
  const list = useMemo(() => {
    let arr: Player[] = players;

    if (query.trim())
      arr = arr.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    if (league !== 'All') arr = arr.filter(p => p.league === league);
    if (nation !== 'All') arr = arr.filter(p => p.nation === nation);

    arr = [...arr].sort((a, b) =>
      order === 'HIGH' ? b.rating - a.rating : a.rating - b.rating
    );
    return arr;
  }, [query, league, nation, order]);

  const sel: React.CSSProperties = { padding: 8, borderRadius: 6, border: '1px solid #ccc' };

  return (
    <main style={{ maxWidth: 700, margin: '0 auto', padding: 24 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>FC 25 Top 100</h1>

      {/* controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search player…"
          style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
        />

        <select style={sel} value={league} onChange={e => setLeague(e.target.value)}>
          {leagues.map(l => <option key={l}>{l}</option>)}
        </select>

        <select style={sel} value={nation} onChange={e => setNation(e.target.value)}>
          {nations.map(n => <option key={n}>{n}</option>)}
        </select>

        <select style={sel} value={order} onChange={e => setOrder(e.target.value as any)}>
          <option value="HIGH">Rating ↓</option>
          <option value="LOW">Rating ↑</option>
        </select>
      </div>

      {list.map(p => <PlayerCard key={p.name} player={p} />)}
      {!list.length && <p>No players match.</p>}
    </main>
  );
}

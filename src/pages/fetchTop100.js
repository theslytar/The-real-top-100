// fetchTop100.js
// ---------------------------------------------
// Usage: FUTBIN_API_KEY=your_key node fetchTop100.js
// Writes 100 enriched player objects to data/top100-sample.json

const fs   = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = process.env.FUTBIN_API_KEY;
if (!API_KEY) {
  console.error('❌  Set FUTBIN_API_KEY env var first.'); process.exit(1);
}

const url = 'https://www.futbin.com/api/fc25/players/top100';

https.get(url, { headers: { 'X-AUTH-TOKEN': API_KEY, 'User-Agent': 'fc25-fetch' } }, res => {
  let raw = '';
  res.on('data', d => raw += d);
  res.on('end', () => {
    const src = JSON.parse(raw);     // array from Futbin
    const players = src.map(p => ({
      name:   p.name,
      rating: p.rating,
      club:   p.club_long_name,
      league: p.league_name,
      nation: p.nation_name,
      faceUrl:`https://cdn.futbin.com/content/fifa25/img/players/${p.base_id}.png`,
      price:  p.prices?.ps_low || p.prices?.xbox_low || p.prices?.pc_low || null
    }));
    const out = path.join(__dirname, 'data', 'top100-sample.json');
    fs.writeFileSync(out, JSON.stringify(players, null, 2));
    console.log('✅  data/top100-sample.json updated with', players.length, 'players');
  });
}).on('error', err => {
  console.error('Fetch failed:', err.message);
});

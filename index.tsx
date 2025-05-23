
import Head from 'next/head'
import PlayerCard from '../components/PlayerCard'
import players from '../../data/top100-sample.json'

export default function Home() {
  return (
    <>
      <Head><title>FC25 Top 100</title></Head>
      <main className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {players.map((player, i) => (
          <PlayerCard key={i} player={player} />
        ))}
      </main>
    </>
  )
}

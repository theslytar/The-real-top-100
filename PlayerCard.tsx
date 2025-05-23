
export default function PlayerCard({ player }) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="font-bold">{player.name}</h2>
      <p>Rating: {player.rating}</p>
      <p>Club: {player.club}</p>
    </div>
  )
}

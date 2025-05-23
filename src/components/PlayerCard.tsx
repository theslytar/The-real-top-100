import Image from 'next/image';

type Player = {
  name: string;
  rating: number;
  club: string;
  nation: string;
  faceUrl: string;
  flagUrl: string;
};

export default function PlayerCard({ player }: { player: Player }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px',
        borderRadius: '12px',
        boxShadow: '0 2px 6px rgba(0,0,0,.1)',
        background: '#fff',
        marginBottom: '12px'
      }}
    >
      <Image
        src={player.faceUrl}
        alt={player.name}
        width={64}
        height={64}
        style={{
          borderRadius: '50%',
          border: '1px solid #ddd',
          objectFit: 'cover'
        }}
      />

      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600 }}>{player.name}</div>
        <div style={{ fontSize: 14, color: '#555' }}>{player.club}</div>
        <div style={{ fontSize: 14 }}>Rating: {player.rating}</div>
      </div>

      <Image
        src={player.flagUrl}
        alt={`${player.nation} flag`}
        width={48}
        height={36}
        style={{ borderRadius: 4, objectFit: 'cover' }}
      />
    </div>
  );
}

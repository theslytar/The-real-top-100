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
    <div className="rounded-xl shadow p-4 flex gap-3 items-center bg-white">
      {/* face photo */}
      <div className="relative w-16 h-16 shrink-0">
        <Image
          src={player.faceUrl}
          alt={player.name}
          fill
          sizes="64px"
          className="object-cover rounded-full border"
        />
      </div>

      {/* name, club, rating */}
      <div className="flex-1">
        <h3 className="font-semibold leading-5">{player.name}</h3>
        <p className="text-sm text-gray-500">{player.club}</p>
        <p className="text-sm font-medium">Rating: {player.rating}</p>
      </div>

      {/* flag */}
      <div className="w-8 h-6 shrink-0">
        <Image
          src={player.flagUrl}
          alt={`${player.nation} flag`}
          width={48}
          height={36}
          className="object-cover rounded-sm"
        />
      </div>
    </div>
  );
}

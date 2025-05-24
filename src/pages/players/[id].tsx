import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import players from "../../data/top100.json";

type Player = typeof players[number];

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: players.map(p => ({ params: { id: String(p.id) } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<{ player: Player }> = async ({ params }) => {
  const player = players.find(p => p.id === Number(params!.id));
  return { props: { player } };
};

export default function PlayerPage({ player }: { player: Player }) {
  if (!player) return null;

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-6">
        <Image
          src={player.image}
          alt={player.name}
          width={128}
          height={128}
          className="rounded-xl"
        />
        <div>
          <h1 className="text-3xl font-bold">{player.name}</h1>
          <p className="text-lg">{player.club}</p>
          <p>{player.league} · {player.nation}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border p-4 text-center">
          <p className="text-sm">Rating</p>
          <p className="text-2xl font-semibold">{player.rating}</p>
        </div>
        <div className="rounded-xl border p-4 text-center">
          <p className="text-sm">Market Price</p>
          <p className="text-2xl font-semibold">₵ {player.price.toLocaleString()}</p>
        </div>
      </div>
    </main>
  );
}

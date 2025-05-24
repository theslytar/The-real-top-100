import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import SafeImage from "../../components/SafeImage";
import players from "../../data/top100.json";

type Player = typeof players[number];

/* ----------  Static generation ---------- */

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: players.map(p => ({ params: { id: String(p.id) } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<{ player: Player }> = async ({ params }) => {
  const player = players.find(p => p.id === Number(params!.id));
  return { props: { player } };
};

/* ----------  Page component  ---------- */

export default function PlayerPage({ player }: { player: Player }) {
  if (!player) return null;

  return (
    <>
      <main className="max-w-2xl mx-auto p-6 space-y-6">
        {/* header ------------------------------------------------------ */}
        <div className="flex items-center gap-6">
          <SafeImage
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

        {/* quick stats ------------------------------------------------- */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border p-4 text-center">
            <p className="text-sm">Rating</p>
            <p className="text-2xl font-semibold">{player.rating}</p>
          </div>
          <div className="rounded-xl border p-4 text-center">
            <p className="text-sm">Market&nbsp;Price</p>
            <p className="text-2xl font-semibold">
              ₵ {player.price.toLocaleString()}
            </p>
          </div>
        </div>
      </main>

      {/* back link ----------------------------------------------------- */}
      <div className="max-w-2xl mx-auto px-6">
        <Link href="/" className="text-sm text-blue-600 underline">
          ← Back to list
        </Link>
      </div>
    </>
  );
}

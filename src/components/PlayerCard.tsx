import Link from "next/link";
import Image from "next/image";

type Player = {
  id:       number;
  name:     string;
  rating:   number;
  image:    string;
  club:     string;
  league:   string;
  nation:   string;
  price:    number;
};

export default function PlayerCard({ p }: { p: Player }) {
  return (
    <Link href={`/players/${p.id}`} className="block">
      <div className="rounded-2xl shadow p-4 flex gap-4 items-center hover:shadow-lg transition">
        <Image src={p.image} alt={p.name} width={64} height={64} className="rounded-lg" />
        <div className="flex-1">
          <h3 className="font-bold">{p.name}</h3>
          <p className="text-sm">{p.club} · {p.league} · {p.nation}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-semibold">{p.rating}</p>
          <p className="text-sm">₵ {p.price.toLocaleString()}</p>
        </div>
      </div>
    </Link>
  );
}

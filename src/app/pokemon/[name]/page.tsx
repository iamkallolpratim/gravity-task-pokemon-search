/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";

async function getPokemonDetails(name: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return response.json();
}

export default async function PokemonDetails({
  params,
}: {
  params: { name: string };
}) {
  const pokemon = await getPokemonDetails(params.name);
  console.log("pokemon", pokemon);

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="text-sm mb-4">
        <Link href="/" className="text-blue-500 hover:underline">
          Home
        </Link>{" "}
        {" > "}
        <span className="capitalize">{pokemon.name}</span>
      </nav>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-emerald-300 p-4">
          <Image
            src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
            alt={pokemon.name}
            className="w-80 h-80 mx-auto bg-transparent"
            width={200}
            height={200}
          />
        </div>
        <div className="bg-orange-200 p-4 space-y-2">
          <h2 className="text-xl font-bold mb-2 capitalize">
            Name: {pokemon.name}
          </h2>

          <div>
            <span className=" font-bold inline-block">Types:</span>

            {pokemon.types.map((type: any) => (
              <span
                className="inline-block ml-2 capitalize"
                key={type.type.name}
              >
                {type.type.name}
              </span>
            ))}
          </div>
          <div>
            <span className=" font-bold  inline-block">Stats:</span>

            {pokemon.stats.map((stat: any) => (
              <span
                key={stat.stat.name}
                className="inline-block ml-1 capitalize"
              >
                {stat.stat.name},
              </span>
            ))}
          </div>

          <div>
            <span className=" font-bold  inline-block">Abilities:</span>

            {pokemon.abilities.map((ability: any) => (
              <span
                key={ability.ability.name}
                className="inline-block ml-1 capitalize"
              >
                {ability.ability.name},
              </span>
            ))}
          </div>

          <div>
            <span className=" font-bold  inline-block">Some Moves:</span>

            {pokemon.moves.map((move: any) => (
              <span
                key={move.move.name}
                className="inline-block ml-1 capitalize"
              >
                {move.move.name},
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

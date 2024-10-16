/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import { getPokemonList } from "../lib/pokemon";
import Image from "next/image";

interface PokemonListProps {
  selectedType: string;
  searchTerm: string;
}

export default function PokemonList({
  selectedType,
  searchTerm,
}: PokemonListProps) {
  const [pokemonList, setPokemonList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastPokemonElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    setPokemonList([]);
    setPage(1);
    setHasMore(true);
  }, [selectedType, searchTerm]);

  useEffect(() => {
    async function fetchPokemon() {
      setIsLoading(true);
      try {
        const list = await getPokemonList(selectedType, searchTerm, page, 10);
        setPokemonList((prevList: any) => [...prevList, ...list]);
        setHasMore(list.length === 10);
      } catch (error) {
        console.error("Failed to fetch Pokemon:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPokemon();
  }, [selectedType, searchTerm, page]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pokemonList.map(
        (pokemon: { name: string; id: number }, index: number) => (
          <div
            key={pokemon.id}
            ref={
              index === pokemonList.length - 1 ? lastPokemonElementRef : null
            }
          >
            <Link href={`/pokemon/${pokemon.name}`}>
              <PokemonCard pokemon={pokemon} />
            </Link>
          </div>
        )
      )}
      {isLoading && (
        <div className="col-span-full text-center">
          <span className="inline-block text-2xl">Loading pokemons...</span>
        </div>
      )}
      {!isLoading && pokemonList.length === 0 && (
        <div className="col-span-full text-center">
          <span className="inline-block text-2xl">No Pokemon Found :(</span>
        </div>
      )}
    </div>
  );
}

const PokemonCard = ({
  pokemon,
}: {
  pokemon: { name: string; id: number };
}) => (
  <div className="bg-white rounded-lg shadow pt-4">
    <Image
      src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
      alt={pokemon.name}
      className="w-full h-52 object-contain mb-2"
      height={400}
      width={400}
    />
    <div className="bg-gray-100 p-4 rounded-t-none rounded min-h-52 space-y-28">
      <h3 className="text-lg font-semibold mb-2 capitalize">{pokemon.name}</h3>
      <button className="text-blue-500 hover:underline">Details →</button>
    </div>
  </div>
);

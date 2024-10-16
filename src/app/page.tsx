"use client";

import { useState } from "react";
import PokemonSearch from "./components/PokemonSearch";
import PokemonList from "./components/PokemonList";

export default function Home() {
  const [selectedType, setSelectedType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (type: string, term: string) => {
    setSelectedType(type);
    setSearchTerm(term);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Find a Pokemon</h1>
      <PokemonSearch onSearch={handleSearch} />
      <PokemonList selectedType={selectedType} searchTerm={searchTerm} />
    </main>
  );
}

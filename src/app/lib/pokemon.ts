/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
export async function getPokemonList(
  type?: string,
  search?: string,
  page = 1,
  limit = 10
) {
  const offset = (page - 1) * limit;
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

  if (type) {
    const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const typeData = await typeResponse.json();
    const pokemonUrls = typeData.pokemon
      .slice(offset, offset + limit)
      .map((p: any) => p.pokemon.url);
    const pokemonPromises = pokemonUrls.map((url: string) =>
      fetch(url).then((res) => res.json())
    );
    const pokemonData = await Promise.all(pokemonPromises);

    return pokemonData
      .filter(
        (pokemon: any) => !search || pokemon.name.includes(search.toLowerCase())
      )
      .map((pokemon: any) => ({
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.front_default,
      }));
  }

  const response = await fetch(url);
  const data = await response.json();

  const pokemonPromises = data.results.map((pokemon: any) =>
    fetch(pokemon.url).then((res) => res.json())
  );
  const pokemonData = await Promise.all(pokemonPromises);

  return pokemonData
    .filter(
      (pokemon: any) => !search || pokemon.name.includes(search.toLowerCase())
    )
    .map((pokemon: any) => ({
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.front_default,
    }));
}

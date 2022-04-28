import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { getPokemonsApi, getPokemonDetailsByUrlApi } from "../api/pokemon";
import PokemonList from "../components/PokemonList";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);

  useEffect(() => {
    //para hacer el render cuando se cargen los primeros 20 y los siguientes 20 pokemones
    (async () => {
      await loadPokemons();
    })();
  }, []);

  const loadPokemons = async () => {
    try {
      const response = await getPokemonsApi(nextUrl); //manda el estado nuevo que contiene el end pint
      setNextUrl(response.next); //al terminar de cargar poquemons actualizamos el estado con response.next (el siguiente endpoint)

      const pokemonsArray = [];
      for await (const pokemon of response.results) {
        //el for se ejecutara para los 20 pokemons
        const pokemonDetails = await getPokemonDetailsByUrlApi(pokemon.url);

        pokemonsArray.push({
          //crea un nuevo elemnto del array
          id: pokemonDetails.id,
          name: pokemonDetails.name,
          type: pokemonDetails.types[0].type.name,
          order: pokemonDetails.order,
          image: pokemonDetails.sprites.other["official-artwork"].front_default,
        });
      }

      setPokemons([...pokemons, ...pokemonsArray]); //toma lo ya existente en el estado de pokemons y agrega los nuevos del pokemonsArray
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
      <PokemonList
        pokemons={pokemons}
        loadPokemons={loadPokemons}
        isNext={nextUrl}
      />
    </SafeAreaView>
  );
}

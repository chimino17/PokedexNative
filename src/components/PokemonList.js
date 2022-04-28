import React from "react";
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
} from "react-native";
import PokemonCard from "./PokemonCard";

export default function PokemonList(props) {
  const { pokemons, loadPokemons, isNext } = props;

  const laodMore = () => {
    loadPokemons(); //llama de nuevo a la funcion para cargar mas pokemons
  };

  return (
    <FlatList
      data={pokemons}
      numColumns={2} //columnas a mostrar
      showsVerticalScrollIndicator={false} //visivilidad del scrol
      keyExtractor={(pokemon) => String(pokemon.id)}
      renderItem={({ item }) => <PokemonCard pokemon={item} />}
      contentContainerStyle={styles.flatListContentContainer}
      onEndReached={isNext && laodMore} //si existe isNext hace la regarga de mas pokemones si mo hemos llegado al final. onEndReached para cuando el escrol llegue al final
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        //agregando spiner de carga
        isNext && (
          <ActivityIndicator
            size="large"
            style={styles.spinner}
            color="#AEAEAE"
          />
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 5,
    marginTop: Platform.OS === "android" ? 30 : 0,
  },
  spinner: {
    marginTop: 20,
    marginBottom: Platform.OS === "android" ? 90 : 60,
  },
});

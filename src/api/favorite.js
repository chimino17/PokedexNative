import AsyncStorage from "@react-native-async-storage/async-storage";
import { includes, pull } from "lodash";
import { FAVORITE_STORAGE } from "../utils/constants";

export async function getPokemonsFavoriteApi() {
  try {
    const response = await AsyncStorage.getItem(FAVORITE_STORAGE);
    return JSON.parse(response || "[]"); //obtiene el JSON de favoritos y si no existe lo deja vacio []
    // return response ? JSON.parse(response) : [];
  } catch (error) {
    throw error;
  }
}

export async function addPokemonFavoriteApi(id) {
  try {
    const favorites = await getPokemonsFavoriteApi(); // recupera el json de favoritos
    favorites.push(id); //agrega el id del nuevo pokemon
    await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(favorites));
  } catch (error) {
    throw error;
  }
}

export async function isPokemonFavoriteApi(id) {
  try {
    const response = await getPokemonsFavoriteApi();
    return includes(response, id); //revisa si la id esta incluida dentro de response
  } catch (error) {
    throw error;
  }
}

export async function removePokemonFavoriteApi(id) {
  try {
    const favorites = await getPokemonsFavoriteApi();
    const newFavorites = pull(favorites, id); //quita la id de favoritos
    await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(newFavorites));
  } catch (error) {
    throw error;
  }
}

import {
  CLEAR_DECK_IN_SESSION,
  SET_DECK_IN_SESSION,
  GET_PUBLIC_DECKS,
  GET_PERSONAL_DECKS,
  READ_DECK,
  DELETE_DECK,
  GET_DECK_BY_ID,
  UPDATE_DECK,
} from "../types";
import {axiosWithAuth} from "../../utils/axios";

const action = (type, payload = null) => {
  if (payload) return {type, payload};
  return {type};
};

export const clearDeckInPlaySession = () => dispatch => {
  dispatch(action(CLEAR_DECK_IN_SESSION));
};

export const storeUnfinishedSession = sessionData => dispatch => {
  localStorage.setItem("unfinished_session", JSON.stringify(sessionData));
  dispatch(action(CLEAR_DECK_IN_SESSION));
};

export const fetchDeckById = deckId => async dispatch => {
  try {
    const response = await axiosWithAuth().get(`/decks/${deckId}`);
    const {deck} = response.data;
    dispatch(action(SET_DECK_IN_SESSION, deck));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPublicDecks = () => async dispatch => {
  try {
    const response = await axiosWithAuth().get("/decks/public");
    console.log("public", response);
    dispatch({
      type: GET_PUBLIC_DECKS,
      payload: response.data.data,
    });
  } catch (err) {
    throw err;
  }
};

export const getPersonalDecks = () => async dispatch => {
  try {
    const response = await axiosWithAuth().get("/decks");
    console.log("personal", response);
    dispatch({
      type: GET_PERSONAL_DECKS,
      payload: response.data.data,
    });
  } catch (err) {
    throw err;
  }
};

export const getAllDecks = () => async dispatch => {
  try {
    const response = await axiosWithAuth().get("/decks");
    dispatch({
      type: READ_DECK,
      payload: response.data.data,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteDeck = id => async dispatch => {
  try {
    const response = await axiosWithAuth().delete("/decks/" + id);
    console.log(response);
    dispatch({
      type: DELETE_DECK,
      payload: id,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getDeckById = id => async dispatch => {
  try {
    const response = await axiosWithAuth().get("/decks/" + id);
    dispatch({
      type: GET_DECK_BY_ID,
      payload: response.data.deck,
    });
  } catch (err) {
    throw err;
  }
};

export const editCurrentDeck = id => {
  axiosWithAuth().get("/decks" + id);
};

export const updateDeck = (id, deck) => async dispatch => {
  try {
    const response = await axiosWithAuth().put("/decks/" + id, deck);
    dispatch({
      type: UPDATE_DECK,
      payload: response.data,
    });
  } catch (err) {
    throw err;
  }
};

import { stationService } from "../services/station.service.js"
import { store } from "./store.js"
import {
  ADD_STATION,
  REMOVE_SONG,
  REMOVE_STATION,
  SET_CURRENT_STATION,
  SET_SEARCHRES,
  SET_STATIONS,
  UPDATE_STATION,
} from "./station.reducer.js"

// Action Creators:
export function getActionRemoveStation(stationId) {
  return {
    type: REMOVE_STATION,
    stationId,
  }
}
export function getActionAddStation(station) {
  return {
    type: ADD_STATION,
    station,
  }
}
export function getActionUpdateStation(station) {
  return {
    type: UPDATE_STATION,
    station,
  }
}

export function setCurrStation(currStation) {
  store.dispatch({ type: SET_CURRENT_STATION, currStation })
}

export function setSearchRes(searchRes) {
  store.dispatch({ type: SET_SEARCHRES, searchRes })
}

export async function removeSong(songId, currStation) {
  try {
    stationService.removeSong(songId, currStation)
    await store.dispatch({ type: REMOVE_SONG, currStation })
  } catch (err) {
    console.error("Could not remove song", err)
  }
}

export async function loadStations() {
  try {
    const stations = await stationService.query()
    store.dispatch({
      type: SET_STATIONS,
      stations,
    })
  } catch (err) {
    console.error("Cannot load stations", err)
    throw err
  }
}

export async function removeStation(stationId) {
  try {
    await stationService.remove(stationId)
    store.dispatch(getActionRemoveStation(stationId))
  } catch (err) {
    console.error("Cannot remove station", err)
    throw err
  }
}

export async function addStation(station) {
  try {
    const savedStation = await stationService.save(station)
    setCurrStation(savedStation)
    return savedStation
  } catch (err) {
    console.error("Cannot add station", err)
    throw err
  }
}

export async function updateStation(station) {
  try {
    const savedStation = await stationService.save(station)
    if (station.name !== "Liked Songs") setCurrStation(savedStation)
    return savedStation
  } catch (err) {
    console.error("Cannot save station", err)
    throw err
  }
}

export const utilService = {
  convertTime,
  getRandomIntInclusive,
  debounce,
  randomPastTime,
  saveToStorage,
  loadFromStorage,
  getGreetings,
  handleChange,
  getRandomSongIndex,
}

function convertTime(time) {
  if (typeof time !== "number") {
    return null
  }
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomPastTime() {
  const HOUR = 1000 * 60 * 60
  const DAY = 1000 * 60 * 60 * 24
  const WEEK = 1000 * 60 * 60 * 24 * 7

  const pastTime = getRandomIntInclusive(HOUR, WEEK)
  return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

function getGreetings() {
  var myDate = new Date()
  var hrs = myDate.getHours()
  let greet

  if (hrs < 12) {
    greet = "Good Morning"
  } else if (hrs >= 12 && hrs <= 17) {
    greet = "Good Afternoon"
  } else if (hrs >= 17 && hrs <= 24) {
    greet = "Good Evening"
  }
  return greet
}

function handleChange({ target }) {
  const field = target.name
  const value = target.type === "number" ? +target.value || "" : target.value
}

function getRandomSongIndex(songArray) {
  const minIndex = 0
  const maxIndex = songArray.length - 1
  return Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex
}

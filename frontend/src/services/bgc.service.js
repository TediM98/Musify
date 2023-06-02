import { FastAverageColor } from 'fast-average-color'

export const bgcService = {
  getColorFromUrl

}

export async function getColorFromUrl(url) {
  try {
    const fac = new FastAverageColor();
    const color = await fac.getColorAsync(url);
    console.log('color', color);
    return color;
  } catch (error) {
    console.log('Could not load bgc:', error);
    throw error; // Rethrow the error to propagate it to the caller if needed
  }
}

// export async function getColorFromUrl(url) {
//   try {
//     const fac = new FastAverageColor()
//     const color = await fac.getColorAsync(url)
//     console.log('color', color)
//     return color
//   }
//   catch (err) {
//     console.log('Could not load bgc:', err);
//   }
// }

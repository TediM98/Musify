import { FastAverageColor } from 'fast-average-color'

export const bgcService = {
  getColorFromUrl

}

export async function getColorFromUrl(url) {
  try {
    const fac = new FastAverageColor();
    const color = await fac.getColorAsync(url);
    return color;
  } catch (err) {
    console.log('Could not load bgc:', err);
    throw err
  }
}

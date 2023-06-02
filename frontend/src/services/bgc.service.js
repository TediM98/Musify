import { FastAverageColor } from 'fast-average-color'

export const bgcService = {
  getColorFromUrl

}

export async function getColorFromUrl(url) {

  const fac = new FastAverageColor()
  fac.crossOrigin = 'anonymous';
  try {
    const color = await fac.getColorAsync(url)
    return color.hex
  }
  catch {
    console.log('Could not load bgc')
  }
}

export class Urls {
  #baseURL

  /** @param {URL} baseURL */
  constructor(baseURL) {
    this.#baseURL = baseURL
  }

  home = () => new URL('', this.#baseURL)
  manifest = () => new URL('/manifest.webmanifest', this.#baseURL)
}

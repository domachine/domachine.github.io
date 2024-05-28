import { Urls } from './urls.js'

export interface AppContext {
  logger: import('pino').Logger
  clock: { now(): Date }
  urls: Urls
}

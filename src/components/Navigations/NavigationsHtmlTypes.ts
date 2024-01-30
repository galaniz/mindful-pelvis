/**
 * Components - Navigations Html Types
 */

export interface NavigationsReturn {
  [key: string]: string
}

export interface NavigationArgs {
  navigations: NavigationsReturn
  props: {
    location?: string
    title?: string
  }
}

export interface Logtype extends Console {
  red: (val: string) => string
  yellow: (val: string) => string
  mark: (val: string) => string
  green: (val: string) => string
  blue: (val: string) => string
}

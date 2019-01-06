export function find<T>(haystack: T[], pred: (item: T) => boolean): T {
  for(let i = 0; i < haystack.length; i++) {
    if (pred(haystack[i])) {
      return haystack[i]
    }
  }
  return undefined
}

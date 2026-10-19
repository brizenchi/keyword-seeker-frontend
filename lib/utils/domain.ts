export const isDomain = (input: string) => {
  const value = input.trim().toLowerCase()
  return !value.includes(' ') && /^(https?:\/\/)?[\w-]+(\.[\w-]+)+/.test(value)
}

export const cleanDomain = (input: string) =>
  input.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0]

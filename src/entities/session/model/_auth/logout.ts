export async function logout() {
  const data = await fetch('/api/logout', { method: 'POST' })
  return data
}

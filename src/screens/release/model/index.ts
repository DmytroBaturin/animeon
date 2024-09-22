export const useReleaseModel = () => {
  const getOrderFromHash = () => {
    const { hash } = window.location
    return hash ? hash.replace('#', '') : 1
  }

  const initOrder = getOrderFromHash()

  return { getOrderFromHash, initOrder }
}

const isExternalActivity = (type: string) => {
  const types = {}
  return !!types[type]
}
export default isExternalActivity

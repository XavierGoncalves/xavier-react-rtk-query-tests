const getNavHeaderTitle = (name?: string, phones?: string[]) => name || (phones && phones[0])

export default getNavHeaderTitle

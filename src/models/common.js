const makeObjectsFromList = (dictList, ClassType) => {
  return dictList.map(x => new ClassType(x))
}

export {
  makeObjectsFromList
}

import { Annotation } from './models/annotation'
import { makeObjectsFromList } from './models/common'

import * as data from './annotations.json'

const annotations = makeObjectsFromList(data, Annotation)

export {
  annotations
}

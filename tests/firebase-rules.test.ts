import {
  assertSucceeds,
  // assertFails,
  // RulesTestEnvironment,
  initializeTestEnvironment
} from '@firebase/rules-unit-testing'
import { setDoc } from 'firebase/firestore'

const testEnv = await initializeTestEnvironment({
  projectId: 'demo-project-1234'
})
const alice = testEnv.authenticatedContext('alice')
await assertSucceeds(setDoc(alice.firestore(), '/users/alice'))

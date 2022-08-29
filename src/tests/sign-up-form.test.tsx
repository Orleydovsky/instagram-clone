import renderer from 'react-test-renderer'
import { it, expect } from 'vitest'
import { BrowserRouter as Router } from 'react-router-dom'
import SignUpForm from '../components/sign-up-form'

it('renders SignUpForm', () => {
  const tree = renderer
    .create(
      <Router>
        <SignUpForm/>
      </Router>
    )
    .toJSON()
  expect(tree).matchSnapshot()
})

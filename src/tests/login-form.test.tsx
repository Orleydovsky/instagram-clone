import renderer from 'react-test-renderer'
import { it, expect } from 'vitest'
import { BrowserRouter as Router } from 'react-router-dom'
import LoginForm from '../components/login-form'

it('renders LoginForm', () => {
  const tree = renderer
    .create(
      <Router>
        <LoginForm/>
      </Router>
    )
    .toJSON()
  expect(tree).matchSnapshot()
})

import renderer from 'react-test-renderer'
import { it, expect, vi } from 'vitest'
import { Avatar, Input, NoPostsYet, NotFollowing, NoUserFound, Spinner, FullPageSpinner } from '../components/lib'
import { BrowserRouter as Router } from 'react-router-dom'

it('renders Input', () => {
  const onChange = vi.fn
  const tree = renderer
    .create(<Input name='name' placeholder='placeholder' type={'text' || 'password'} onChange={onChange}/>)
    .toJSON()
  expect(tree).matchSnapshot()
})
it('renders Avatar', () => {
  const tree = renderer
    .create(<Avatar picture='src' size={'small' || 'medium' || 'large'}/>)
    .toJSON()
  expect(tree).matchSnapshot()
})
it('renders NoPostsYet', () => {
  const tree = renderer
    .create(<NoPostsYet/>)
    .toJSON()
  expect(tree).matchSnapshot()
})
it('renders NotFollowing', () => {
  const tree = renderer
    .create(<NotFollowing/>)
    .toJSON()
  expect(tree).matchSnapshot()
})
it('renders NoUserFound', () => {
  const tree = renderer
    .create(
      <Router>
        <NoUserFound/>
      </Router>
    )
    .toJSON()
  expect(tree).matchSnapshot()
})
it('renders Spinner', () => {
  const tree = renderer
    .create(<Spinner/>)
    .toJSON()
  expect(tree).matchSnapshot()
})
it('renders FullPageSpinner', () => {
  const tree = renderer
    .create(<FullPageSpinner/>)
    .toJSON()
  expect(tree).matchSnapshot()
})

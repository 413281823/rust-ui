import { render } from '@testing-library/vue'
import LinkComponent from '../src/linkComponent'

describe('linkComponent test', () => {
  test('linkComponent init render', async () => {
    const { getByRole } = render(LinkComponent)
    getByRole('linkComponent')
  })
})

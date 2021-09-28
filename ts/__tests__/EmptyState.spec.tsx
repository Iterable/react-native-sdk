import React from 'react'
import EmptyState from '../../inbox/components/EmptyState/EmptyState'

import { render } from '@testing-library/react-native'

beforeEach(() => {
   jest.clearAllMocks()
})

describe('Testing EmptyState Component', () => {
   it('EmptyState renders correctly', async () => {
      const { getByTestId } = render(<EmptyState/>)

      expect(getByTestId('title').children[0]).toEqual('No saved messages')
      expect(getByTestId('subtitle').children[0]).toEqual('Check again later!') 
   })
})
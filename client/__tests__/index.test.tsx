import { render, screen } from '@testing-library/react'
import Index from '../pages'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Index />)
    expect(screen.getByText('Next.js + NestJS + AWS Fargate')).toBeTruthy()
  })
})

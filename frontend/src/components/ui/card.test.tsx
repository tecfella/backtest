import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card'

describe('Card Components', () => {
  describe('Card', () => {
    it('should render card component', () => {
      render(<Card data-testid="card">Card Content</Card>)
      const card = screen.getByTestId('card')
      expect(card).toBeInTheDocument()
    })

    it('should apply default card styles', () => {
      render(<Card data-testid="card">Content</Card>)
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('rounded-xl', 'border', 'bg-card', 'text-card-foreground', 'shadow')
    })

    it('should accept custom className', () => {
      render(
        <Card data-testid="card" className="custom-class">
          Content
        </Card>
      )
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('custom-class', 'rounded-xl')
    })

    it('should forward ref correctly', () => {
      const ref = vi.fn()
      render(<Card ref={ref}>Content</Card>)
      expect(ref).toHaveBeenCalled()
    })

    it('should render children correctly', () => {
      render(
        <Card>
          <div>Child content</div>
        </Card>
      )
      expect(screen.getByText('Child content')).toBeInTheDocument()
    })
  })

  describe('CardHeader', () => {
    it('should render card header', () => {
      render(<CardHeader data-testid="header">Header</CardHeader>)
      const header = screen.getByTestId('header')
      expect(header).toBeInTheDocument()
    })

    it('should apply header styles', () => {
      render(<CardHeader data-testid="header">Header</CardHeader>)
      const header = screen.getByTestId('header')
      expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6')
    })

    it('should accept custom className', () => {
      render(
        <CardHeader data-testid="header" className="custom-header">
          Header
        </CardHeader>
      )
      const header = screen.getByTestId('header')
      expect(header).toHaveClass('custom-header', 'flex')
    })
  })

  describe('CardTitle', () => {
    it('should render card title', () => {
      render(<CardTitle>Title Text</CardTitle>)
      expect(screen.getByText('Title Text')).toBeInTheDocument()
    })

    it('should apply title styles', () => {
      render(<CardTitle data-testid="title">Title</CardTitle>)
      const title = screen.getByTestId('title')
      expect(title).toHaveClass('font-semibold', 'leading-none', 'tracking-tight')
    })

    it('should accept custom className', () => {
      render(
        <CardTitle data-testid="title" className="custom-title">
          Title
        </CardTitle>
      )
      const title = screen.getByTestId('title')
      expect(title).toHaveClass('custom-title', 'font-semibold')
    })
  })

  describe('CardDescription', () => {
    it('should render card description', () => {
      render(<CardDescription>Description text</CardDescription>)
      expect(screen.getByText('Description text')).toBeInTheDocument()
    })

    it('should apply description styles', () => {
      render(<CardDescription data-testid="description">Description</CardDescription>)
      const description = screen.getByTestId('description')
      expect(description).toHaveClass('text-sm', 'text-muted-foreground')
    })

    it('should accept custom className', () => {
      render(
        <CardDescription data-testid="description" className="custom-desc">
          Description
        </CardDescription>
      )
      const description = screen.getByTestId('description')
      expect(description).toHaveClass('custom-desc', 'text-sm')
    })
  })

  describe('CardContent', () => {
    it('should render card content', () => {
      render(<CardContent>Content text</CardContent>)
      expect(screen.getByText('Content text')).toBeInTheDocument()
    })

    it('should apply content styles', () => {
      render(<CardContent data-testid="content">Content</CardContent>)
      const content = screen.getByTestId('content')
      expect(content).toHaveClass('p-6', 'pt-0')
    })

    it('should accept custom className', () => {
      render(
        <CardContent data-testid="content" className="custom-content">
          Content
        </CardContent>
      )
      const content = screen.getByTestId('content')
      expect(content).toHaveClass('custom-content', 'p-6')
    })
  })

  describe('CardFooter', () => {
    it('should render card footer', () => {
      render(<CardFooter>Footer text</CardFooter>)
      expect(screen.getByText('Footer text')).toBeInTheDocument()
    })

    it('should apply footer styles', () => {
      render(<CardFooter data-testid="footer">Footer</CardFooter>)
      const footer = screen.getByTestId('footer')
      expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0')
    })

    it('should accept custom className', () => {
      render(
        <CardFooter data-testid="footer" className="custom-footer">
          Footer
        </CardFooter>
      )
      const footer = screen.getByTestId('footer')
      expect(footer).toHaveClass('custom-footer', 'flex')
    })
  })

  describe('Card Component Integration', () => {
    it('should render complete card with all subcomponents', () => {
      render(
        <Card data-testid="card">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>Card Content</CardContent>
          <CardFooter>Card Footer</CardFooter>
        </Card>
      )

      expect(screen.getByTestId('card')).toBeInTheDocument()
      expect(screen.getByText('Card Title')).toBeInTheDocument()
      expect(screen.getByText('Card Description')).toBeInTheDocument()
      expect(screen.getByText('Card Content')).toBeInTheDocument()
      expect(screen.getByText('Card Footer')).toBeInTheDocument()
    })

    it('should render card without optional components', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Title Only</CardTitle>
          </CardHeader>
          <CardContent>Content Only</CardContent>
        </Card>
      )

      expect(screen.getByText('Title Only')).toBeInTheDocument()
      expect(screen.getByText('Content Only')).toBeInTheDocument()
      expect(screen.queryByText('Description')).not.toBeInTheDocument()
      expect(screen.queryByText('Footer')).not.toBeInTheDocument()
    })

    it('should support nested HTML elements', () => {
      render(
        <Card>
          <CardContent>
            <p>Paragraph content</p>
            <button type="button">Button</button>
          </CardContent>
        </Card>
      )

      expect(screen.getByText('Paragraph content')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /button/i })).toBeInTheDocument()
    })
  })
})

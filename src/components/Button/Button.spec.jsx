import { render, screen } from '@testing-library/react'
import { Button } from '.'

describe('<Button />', () => {
    it('shold render the button with the text "Load more"', () => {
        render(<Button text="Load more"/>)
    
        expect.assertions(1)
        const button = screen.getByRole('button', { name: /load more/i })
        expect(button).toBeInTheDocument()
    })

    it('shold be disabled when disabled is true', () => {
        render(<Button text="Load more" disabled={true}/>)

        const button = screen.getByRole('button', { name: /load more/i });
        
        expect(button).toBeDisabled();
    })

    it('shold be disabled when disabled is false', () => {
        render(<Button text="Load more" disabled={false}/>)

        const button = screen.getByRole('button', { name: /load more/i });
        
        expect(button).toBeEnabled();
    })
})
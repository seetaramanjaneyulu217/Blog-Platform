import { fireEvent, render, screen } from '@testing-library/react'

import Header from '../components/Header'
import { BrowserRouter } from 'react-router-dom'

test('Should load the header with Signup button', () => {
    render(
        <BrowserRouter>
            <Header />
        </BrowserRouter>
    )
    const signUpButton = screen.getByRole("link", { name: 'SignUp' })
    expect(signUpButton).toBeInTheDocument()
})


test('Should get logout button when i click button signup', () => {
    const { queryByText } = render(
        <BrowserRouter>
            <Header />
        </BrowserRouter>
    )

    expect(screen.getByRole("link")).toBeInTheDocument()
    fireEvent.click(screen.getByRole("link"))
    expect(queryByText('SignUp')).not.toBeInTheDocument()
})
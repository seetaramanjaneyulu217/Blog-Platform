const { render, screen, fireEvent, waitFor } = require("@testing-library/react")
const { BrowserRouter } = require("react-router-dom")
const { default: SignUp } = require("../components/SignUp")
import { wait } from '@testing-library/user-event/dist/utils/index.js'
import handleUserSignUp from '../utils/handleUserSignUp.js'
import * as postMethodFetchModule from '../utils/postMethodFetch.js';

jest.mock('../utils/handleUserSignUp.js')
jest.mock('../utils/postMethodFetch.js')


test('should load the form of signup', () => { 
    render(<BrowserRouter>
       <SignUp/>
    </BrowserRouter>)

    const signUpText = screen.getByText('SignUp to experience the blog power')
    expect(signUpText).toBeInTheDocument()
})


test('Username validation should Pass', () => {
    render(<BrowserRouter>
       <SignUp/>
    </BrowserRouter>)

    const username = screen.getByPlaceholderText('Username')
    fireEvent.change(username, { target: { value: 'SeetaRam' } })

    expect(username.value.length).toBeGreaterThanOrEqual(7)
    expect(username.value.length).toBeLessThan(20)
})

test('Email validation should Pass', () => {
    render(<BrowserRouter>
       <SignUp/>
    </BrowserRouter>)

    const email = screen.getByPlaceholderText('Email')
    fireEvent.change(email, { target: { value: 'user@gmail.com' } })

    expect(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)).toBe(true)
})

test('Password validation should Pass', () => {
    render(<BrowserRouter>
       <SignUp/>
    </BrowserRouter>)

    const password = screen.getByPlaceholderText('Password')
    fireEvent.change(password, { target: { value: 'User@12345' } })

    expect(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password.value)).toBe(true)
})

test('Should show the Logout button on the header after clicking the Signup button', async () => {

    render(<BrowserRouter>
       <SignUp />
    </BrowserRouter>)

    postMethodFetchModule.default.mockResolvedValue({ msg: 'Registered SuccessFully' });
    
    const signUpButton = screen.getByRole("button")
    fireEvent.click(signUpButton)
    await wait(() => expect(handleUserSignUp).toHaveBeenCalledTimes(1))

    const logoutButton = screen.getByRole("button")
    expect(logoutButton).toBeInTheDocument()
})
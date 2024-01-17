const { BrowserRouter } = require("react-router-dom")
const { default: SignUp } = require("../components/SignUp");
const { render, screen, fireEvent } = require("@testing-library/react");
import { wait } from '@testing-library/user-event/dist/utils/index.js'
import handleUserSignUp from '../utils/handleUserSignUp.js'
import * as postMethodFetchModule from '../utils/postMethodFetch.js';

jest.mock('../utils/handleUserSignUp.js')
jest.mock('../utils/postMethodFetch.js')

test('Should render SignUp form with SignIn button when isSignUpForm is false', () => {
    render(
        <BrowserRouter>
            <SignUp />
        </BrowserRouter>
    );

    const switchToSignInLink = screen.getByText("SignIn");
    fireEvent.click(switchToSignInLink);

    const signInButton = screen.getByRole("button")
    expect(signInButton).toBeInTheDocument()
});

test('Email validation should Pass', () => {
    render(<BrowserRouter>
        <SignUp />
    </BrowserRouter>)

    const email = screen.getByPlaceholderText('Email')
    fireEvent.change(email, { target: { value: 'user@gmail.com' } })

    expect(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)).toBe(true)
})

test('Password validation should Pass', () => {
    render(<BrowserRouter>
        <SignUp />
    </BrowserRouter>)

    const password = screen.getByPlaceholderText('Password')
    fireEvent.change(password, { target: { value: 'User@12345' } })

    expect(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password.value)).toBe(true)
})

test('Should show the Logout button on the header after clicking the SignIn button', async () => {

    render(<BrowserRouter>
       <SignUp />
    </BrowserRouter>)

    postMethodFetchModule.default.mockResolvedValue({ msg: 'Login SuccessFull' });

    const signIn = screen.getByText("SignIn")
    fireEvent.click(signIn)
    
    const signInButton = screen.getByRole("button")
    fireEvent.click(signInButton)
    await wait(() => expect(handleUserSignUp).toHaveBeenCalledTimes(1))

    const logoutButton = screen.getByRole("button")
    expect(logoutButton).toBeInTheDocument()
})
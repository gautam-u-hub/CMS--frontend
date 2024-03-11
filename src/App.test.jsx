import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
    

    it('renders AllPolicies component on "/all-policies" path', () => {
        render(
            <MemoryRouter initialEntries={['/all-policies']}>
                <App />
            </MemoryRouter>
        );

        const allPoliciesElement = screen.getByTestId('all-policies');

        expect(allPoliciesElement).toBeInTheDocument();
    });

    it('renders Login component on "/login" path', () => {
        render(
            <MemoryRouter initialEntries={['/login']}>
                <App />
            </MemoryRouter>
        );

        const loginElement = screen.getByTestId('login');

        expect(loginElement).toBeInTheDocument();
    });

    it('renders Register component on "/register" path', () => {
        render(
            <MemoryRouter initialEntries={['/register']}>
                <App />
            </MemoryRouter>
        );

        const registerElement = screen.getByTestId('register');

        expect(registerElement).toBeInTheDocument();
    });

    // Add more test cases for other non-protected routes
});

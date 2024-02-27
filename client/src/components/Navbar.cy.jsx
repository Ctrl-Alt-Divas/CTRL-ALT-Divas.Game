import React from 'react';
import Navbar from './Navbar';
import store from '../app/store';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

describe('<Navbar />', () => {
    beforeEach(() => {
        cy.mount(
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </Provider>
        );
    });

    it('should show header', () => {
        cy.get('.text-2xl').contains('CTRL-ALT-DIVAS');
    });

    it('should show home', () => {
        cy.get('.gap-10 > [href="/"] > .flex').contains('Home');
    });

    it('should show leaderboard', () => {
        cy.get('[href="/leaderboard"] > .flex').contains('Leaderboard');
    });

    it('should show login', () => {
        cy.get('[href="/login"] > .flex').contains('Login');
    });
});

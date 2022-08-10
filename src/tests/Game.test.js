import React from "react";
import App from "../App";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
const { questionsResponse, invalidTokenQuestionsResponse } = require('../../cypress/mocks/questions')

const name = 'Manuela';
const email = 'alguem@email.com';

jest.useFakeTimers()

describe('', () => {
    beforeEach( () => {
        jest.restoreAllMocks()
    })
    it('', async () => {
        renderWithRouterAndRedux(<App />)
        
        const apiResponse = Promise.resolve({
            json: () => Promise.resolve(questionsResponse),
            ok: true,   
          });

        const fetiche = jest
        .spyOn(global, "fetch")
        .mockImplementation(() => apiResponse);

        const inputName = screen.getByRole('textbox', {  name: /name/i});
        userEvent.type(inputName, name)
        const inputEmail = screen.getByRole('textbox', {  name: /email/i});
        userEvent.type(inputEmail, email)
        const btnPlay = screen.getByRole('button', {  name: /play/i});
        userEvent.click(btnPlay);
        await waitFor(() => expect(fetiche).toHaveBeenCalled() );
        userEvent.click(screen.getByTestId('correct-answer'));
        userEvent.click(screen.getByRole('button', {  name: /next/i}));
        userEvent.click(screen.getByTestId('correct-answer'));
        userEvent.click(screen.getByRole('button', {  name: /next/i}));
        userEvent.click(screen.getByTestId('correct-answer'));
        userEvent.click(screen.getByRole('button', {  name: /next/i}));
        userEvent.click(screen.getByTestId('correct-answer'));
        userEvent.click(screen.getByRole('button', {  name: /next/i}));
        jest.runAllTimers()
        userEvent.click(screen.getByRole('button', {  name: /next/i}));
        userEvent.click(screen.getByRole('button', {  name: /ranking/i}));
        userEvent.click(screen.getByRole('button', {  name: /play again/i}));
    })

    it('', async ()=> {
        renderWithRouterAndRedux(<App />)

        const apiResponse = Promise.resolve({
            json: () => Promise.resolve(invalidTokenQuestionsResponse),
            ok: true,   
          });

        const fetiche = jest
        .spyOn(global, "fetch")
        .mockImplementation(() => apiResponse);

        const inputName = screen.getByRole('textbox', {  name: /name/i});
        userEvent.type(inputName, name)
        const inputEmail = screen.getByRole('textbox', {  name: /email/i});
        userEvent.type(inputEmail, email)
        const btnPlay = screen.getByRole('button', {  name: /play/i});
        userEvent.click(btnPlay);
        await waitFor(() => expect(fetiche).toHaveBeenCalled() );



    })
})
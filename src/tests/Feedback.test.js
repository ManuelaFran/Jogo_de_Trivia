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
        userEvent.click(screen.getByRole('button', {  name: /play again/i}));
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
        const first = screen.getAllByTestId(/wrong/i);
        userEvent.click(first[0]);
        userEvent.click(screen.getByRole('button', {  name: /next/i}));
        const second = screen.getAllByTestId(/wrong/i);
        userEvent.click(second[0]);
        userEvent.click(screen.getByRole('button', {  name: /next/i}));
        const third = screen.getAllByTestId(/wrong/i);
        userEvent.click(third[0]);
        userEvent.click(screen.getByRole('button', {  name: /next/i}));
        const fourth = screen.getAllByTestId(/wrong/i);
        userEvent.click(fourth[0]);
        userEvent.click(screen.getByRole('button', {  name: /next/i}));
        jest.runAllTimers()
        userEvent.click(screen.getByRole('button', {  name: /next/i}));
        userEvent.click(screen.getByRole('button', {  name: /play again/i}));
    })
})
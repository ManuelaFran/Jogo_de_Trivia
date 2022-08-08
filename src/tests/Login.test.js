import React from "react";
import App from "../App";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

const name = 'Manuela';
const email = 'alguem@email.com';

describe('Testando o componente Login', () => {
  it('Testa os inputs e buttons', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByRole('textbox', {  name: /name/i});
    userEvent.type(inputName, name)
    const inputEmail = screen.getByRole('textbox', {  name: /email/i});
    userEvent.type(inputName, email)
  });

  it('Testa botão play', async () => {
    renderWithRouterAndRedux(<App />);
    const btnPlay = screen.getByRole('button', {  name: /play/i});
    expect(btnPlay).toHaveProperty('disabled', true);
    const inputName = screen.getByRole('textbox', {  name: /name/i});
    userEvent.type(inputName, name)
    const inputEmail = screen.getByRole('textbox', {  name: /email/i});
    userEvent.type(inputEmail, email)
    expect(btnPlay).toHaveProperty('disabled', false);
    userEvent.click(btnPlay);
    expect(await screen.findByText(/score/i));
    
  });

  it('Testa botão settings', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const btnSettings = screen.getByRole('button', {  name: /settings/i});
    userEvent.click(btnSettings);
    const { location: {pathname} } = history;
    expect(pathname).toBe('/settings');
  });
});
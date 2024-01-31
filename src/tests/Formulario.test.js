import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Formulario from "../components/Formulario";
import { emailValidation } from "../components/Formulario";

describe('emailValidation function', () => {
  test('devuelve un booleano', () => {
    expect(typeof emailValidation('example@example.com')).toBe('boolean');
  });

  test('devuelve true si el formato es el correcto', () => {
    expect(emailValidation('example@example.com')).toBe(true);
  });

  test('devuelve false si el formato es el incorrecto', () => {
    expect(emailValidation('invalid_email')).toBe(false);
  });
});

describe('Formulario component', () => {
  test('renderiza los elementos', () => {
    render(<Formulario />);
    expect(screen.getByText('Rellena el formulario')).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Validar' })).toBeInTheDocument();
  });

  test('renderiza el alt="ok" cuando se hace bien el formulario', () => {
    render(<Formulario />);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'example@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: 'Validar' }));
    expect(screen.getByAltText('ok')).toBeInTheDocument();
  });

  test('renderiza el alt="wrong" cuando se hace mal el formulario', () => {
    render(<Formulario />);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'invalid_email' } });
    fireEvent.click(screen.getByRole('button', { name: 'Validar' }));
    expect(screen.getByAltText('wrong')).toBeInTheDocument();
  });
});

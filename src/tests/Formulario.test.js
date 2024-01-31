import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Formulario from "../components/Formulario";
import { emailValidation } from "../components/Formulario";

describe('emailValidation function', () => {
  test('should return a boolean value', () => {
    expect(typeof emailValidation('example@example.com')).toBe('boolean');
  });

  test('should return true for a valid email format', () => {
    expect(emailValidation('example@example.com')).toBe(true);
  });

  test('should return false for an invalid email format', () => {
    expect(emailValidation('invalid_email')).toBe(false);
  });
});

describe('Formulario component', () => {
  test('renders form elements', () => {
    render(<Formulario />);
    expect(screen.getByText('Rellena el formulario')).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Validar' })).toBeInTheDocument();
  });

  test('renders "ok" image for valid email', () => {
    render(<Formulario />);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'example@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: 'Validar' }));
    expect(screen.getByAltText('ok')).toBeInTheDocument();
  });

  test('renders "wrong" image for invalid email', () => {
    render(<Formulario />);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'invalid_email' } });
    fireEvent.click(screen.getByRole('button', { name: 'Validar' }));
    expect(screen.getByAltText('wrong')).toBeInTheDocument();
  });
});

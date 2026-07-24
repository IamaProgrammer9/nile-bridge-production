import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { SignIn } from '../pages/signin.tsx';
import { renderWithProviders } from '../../test-utils.tsx';
import { server } from '../../mocks/server.ts';

describe('SignIn Page', () => {
  it('renders the sign in form with email and password fields', () => {
    renderWithProviders(<SignIn />);

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByText('Create account')).toBeInTheDocument();
  });

  it('allows typing into email and password fields', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SignIn />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    await user.type(emailInput, 'test@test.com');
    await user.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@test.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('displays error message on failed login', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SignIn />);

    await user.type(screen.getByPlaceholderText('Email'), 'wrong@test.com');
    await user.type(screen.getByPlaceholderText('Password'), 'wrongpass');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
    });
  });

  it('shows loading state while submitting', async () => {
    server.use(
      http.post('http://localhost:3000/api/auth/signin', async ({ request }) => {
        const body = (await request.json()) as { email: string; password: string };
        await new Promise((r) => setTimeout(r, 100));
        if (body.email === 'test@test.com' && body.password === 'password123') {
          return HttpResponse.json({ id: 1, name: 'Test User', isAdmin: false });
        }
        return HttpResponse.text('Invalid email or password', { status: 401 });
      }),
    );

    const user = userEvent.setup();
    renderWithProviders(<SignIn />);

    await user.type(screen.getByPlaceholderText('Email'), 'test@test.com');
    await user.type(screen.getByPlaceholderText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /signing in/i })).toBeDisabled();
    });
  });

  it('displays server error message', async () => {
    server.use(
      http.post('http://localhost:3000/api/auth/signin', () => {
        return HttpResponse.text('Account locked', { status: 403 });
      }),
    );

    const user = userEvent.setup();
    renderWithProviders(<SignIn />);

    await user.type(screen.getByPlaceholderText('Email'), 'locked@test.com');
    await user.type(screen.getByPlaceholderText('Password'), 'pass');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText('Account locked')).toBeInTheDocument();
    });
  });
});

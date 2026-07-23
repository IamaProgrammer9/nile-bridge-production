import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { AppHeader } from '../header.tsx';
import { renderWithProviders } from '../../test-utils.tsx';
import { server } from '../../mocks/server.ts';

describe('AppHeader', () => {
  it('renders search bar and auth buttons when not authenticated', async () => {
    server.use(
      http.get('http://localhost:3000/api/auth/', () => {
        return HttpResponse.json(
          { message: 'Not authenticated' },
          { status: 401 },
        );
      }),
    );

    renderWithProviders(<AppHeader onSearch={vi.fn()} />);

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('Join us')).toBeInTheDocument();
  });

  it('calls onSearch when typing in search input', async () => {
    server.use(
      http.get('http://localhost:3000/api/auth/', () => {
        return HttpResponse.json(
          { message: 'Not authenticated' },
          { status: 401 },
        );
      }),
    );

    const onSearch = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<AppHeader onSearch={onSearch} />);

    await user.type(screen.getByPlaceholderText('Search'), 'laptop');

    expect(onSearch).toHaveBeenCalledWith('laptop');
  });

  it('renders user name and profile button when authenticated', async () => {
    server.use(
      http.get('http://localhost:3000/api/auth/', () => {
        return HttpResponse.json({ id: 1, name: 'Alice', isAdmin: false });
      }),
    );

    renderWithProviders(<AppHeader onSearch={vi.fn()} />);

    expect(await screen.findByText('Alice')).toBeInTheDocument();
    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
  });

  it('renders Admin link when user is admin', async () => {
    server.use(
      http.get('http://localhost:3000/api/auth/', () => {
        return HttpResponse.json({ id: 1, name: 'Admin', isAdmin: true });
      }),
    );

    renderWithProviders(<AppHeader onSearch={vi.fn()} />);

    expect(await screen.findByRole('link', { name: 'Admin' })).toBeInTheDocument();
  });

  it('toggles profile dropdown on avatar click', async () => {
    server.use(
      http.get('http://localhost:3000/api/auth/', () => {
        return HttpResponse.json({ id: 1, name: 'Bob', isAdmin: false });
      }),
    );

    const user = userEvent.setup();
    renderWithProviders(<AppHeader onSearch={vi.fn()} />);

    await screen.findByText('Bob');

    const avatar = screen.getByAltText('person');
    await user.click(avatar);

    expect(screen.getByText('Cart')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});

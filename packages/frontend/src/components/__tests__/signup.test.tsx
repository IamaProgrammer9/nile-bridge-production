import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test-utils.tsx";
import SignUp from "../pages/signup.tsx";

describe("Signup page", () => {
    it("should display all fields correctly", async () => {
        renderWithProviders(<SignUp />);

        expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText("Confirm password"),
        ).toBeInTheDocument();
    });
    it('should detect non-matching passwords', async () => {
        renderWithProviders(<SignUp />);

        const emailInput = screen.getByPlaceholderText('Email');
        const nameInput = screen.getByPlaceholderText('Name');
        const passwordInput = screen.getByPlaceholderText('Password');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm password');
        const submitButton = screen.getByText('Create account');

        await userEvent.type(emailInput, "test@mail.com");
        await userEvent.type(nameInput, "Test user");
        await userEvent.type(passwordInput, "password");
        await userEvent.type(confirmPasswordInput, "different");
        await userEvent.click(submitButton);

        expect(screen.getByText("Passwords do not match.")).toBeInTheDocument();
    });
});

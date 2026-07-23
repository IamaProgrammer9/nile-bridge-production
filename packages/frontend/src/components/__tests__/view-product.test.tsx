import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils.tsx";
import { ViewProduct } from "../pages/view-product.tsx";

describe("ViewProduct", () => {
    it("should render the component data correctly", async () => {
        renderWithProviders(<ViewProduct />);

        setTimeout(() => {
            expect(screen.getByText("Macbook Pro")).toBeInTheDocument();
        }, 300);
    });
    it("Should render reviews correctly", async () => {
        renderWithProviders(<ViewProduct />);
        setTimeout(() => {
            expect(screen.getByText("It's not bad but it's not worth the money either")).toBeInTheDocument();
        }, 300);
    });
});

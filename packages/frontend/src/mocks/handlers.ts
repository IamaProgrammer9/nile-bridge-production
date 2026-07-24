import { http, HttpResponse } from "msw";

const BASE = "http://localhost:3000";

export const handlers = [
    http.get(`${BASE}/api/auth/`, () => {
        return HttpResponse.json({ id: 1, name: "Test User", isAdmin: false });
    }),

    http.post(`${BASE}/api/auth/refresh`, () => {
        return HttpResponse.json({ success: true });
    }),

    http.post(`${BASE}/api/auth/signin`, async ({ request }) => {
        const body = (await request.json()) as {
            email: string;
            password: string;
        };
        if (body.email === "test@test.com" && body.password === "password123") {
            return HttpResponse.json({
                id: 1,
                name: "Test User",
                isAdmin: false,
            });
        }
        return HttpResponse.text("Invalid email or password", { status: 401 });
    }),

    http.post(`${BASE}/api/auth/signup`, async ({ request }) => {
        const body = (await request.json()) as { email: string; name: string };
        return HttpResponse.json({
            id: 2,
            name: body.name,
            email: body.email,
        });
    }),

    http.post(`${BASE}/api/auth/logout`, () => {
        return HttpResponse.json({ success: true });
    }),

    http.get(`${BASE}/api/products`, ({ request }) => {
        const url = new URL(request.url);
        const page = Number(url.searchParams.get("page")) || 1;
        const take = Number(url.searchParams.get("take")) || 10;
        const products = Array.from({ length: take }, (_, i) => ({
            id: `${(page - 1) * take + i + 1}`,
            name: `Product ${(page - 1) * take + i + 1}`,
            price: 199.99,
            rating: 4.5,
            image: "https://via.placeholder.com/300",
            description: "A great product",
            categoryId: 1,
        }));
        return HttpResponse.json(products);
    }),

    http.get(`${BASE}/api/products/categories/`, () => {
        return HttpResponse.json([
            { id: 1, name: "Electronics" },
            { id: 2, name: "Clothing" },
        ]);
    }),

    http.get(`${BASE}/api/products/product`, ({ request }) => {
        const url = new URL(request.url);
        const id = url.searchParams.get("id");
        return HttpResponse.json({
            id,
            name: "Test Product",
            price: 299.99,
            rating: 4.0,
            image: "https://via.placeholder.com/300",
            description: "A test product description",
            categoryId: 1,
        });
    }),

    http.post(`${BASE}/api/cart/add`, async ({ request }) => {
        const body = (await request.json()) as { productId: string };
        return HttpResponse.json({ success: true, productId: body.productId });
    }),

    http.get(`${BASE}/api/cart/`, () => {
        return HttpResponse.json([
            { id: "1", name: "Product 1", price: 199.99, quantity: 1 },
        ]);
    }),

    http.get("/api/products/product", () => {
        return HttpResponse.json({
            id: 12,
            name: "Macbook Pro",
            price: 100000,
            imagesUrl: [
                "uploads/1784700556817-macbook pro image.webp",
                "uploads/1784700556817-ipad-bg.jpg",
                "uploads/1784700556820-PlaygroundImage2.jpeg",
            ],
            description: "Very good please buy",
            categoryId: 5,
            createdAt: "2026-07-22T10:12:43.732Z",
            rating: 0,
        });
    }),

    http.get("/api/products/reviews", () => {
        return HttpResponse.json([
            {
                id: "6a61bfb697df486133775bed",
                rating: 3.5,
                comment: "It's not bad but it's not worth the money either",
                createdAt: "2026-07-23T07:16:06.360Z",
                userName: "Omar Admin",
                userId: 2,
                productId: 12,
            },
        ]);
    }),
];

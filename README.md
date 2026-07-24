# NileBridge
This is a fullstack, tested, e-commerce platform as a graduation project for Level 5 Web in DECI.

LINK: `git clone https://github.com/IamaProgrammer9/nile-bridge-production`

## How this project was made
This project took over 20 hours of hard work to get working, it uses
1. React
2. Vite
3. React Testing Library
4. MSW
5. Express
6. Prisma
7. Docker
8. Supertest
9. Jest

AI was only used to explore/understand new topics, debug code, fix errors, or write boilerplate code or harder code.

## Prerequisites
1. You must have docker
2. Download or pull the repo.
3. If you want nodemailer to work, head to backend/.env and configure your app password there.
## How to run
1. Open the project in your preferred IDE or in the terminal.
2. Run `docker compose up --build`.
3. If it doesn't work, try rebooting the docker desktop using `docker desktop restart`.
4. Head to `http://localhost:5173` and you should see the webbsite Inshaa Allah.
## Project URLs
1. "/" Home page, accessible to customer and admin.
2. "/signin", Sign in with an existing account.
3. "/signup", Create a new account.
4. "/admin", Admin dashboard to create new products, accessible to admin only.
5. "/cart", View your cart, accessible to customer and admin.
## Running the tests
1. Run `npm run test` to run the tests <strong>While the container is running</strong>.
## Authentication
1. To create a new user, click on the Join Us button, and specify if you want him as an admin or not.
## User roles
### Admin
1. Admin users can can edit/delete products directly in the home page.
2. On the top right, you should see a Link to /admin page, and you can add new products there.
3. Admin users can also act as customers by pressing the Home link on the top right.
### Customer
1. A customer may not edit/delete/add any product.
## Cart handling
Press on your profile and go to cart to see your cart or place an order.
## Logging out
Press on your profile press logout to logout.

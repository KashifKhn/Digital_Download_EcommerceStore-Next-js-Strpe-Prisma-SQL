# Digital Download E-commerce Store

Welcome to the **Digital Download E-commerce Store** project! This repository contains the source code for an e-commerce platform that allows users to purchase and download digital products. The project is built using modern web development technologies, including Next.js, Stripe, Prisma, and PostgreSQL.

## Features

- **Product Management**: Add, update, and manage digital products through an admin interface.
- **Checkout**: Seamless payment integration with Stripe for secure transactions.
- **Digital Downloads**: Instant access to purchased digital products with secure download links.
- **Order History**: Users can view their order history and re-download purchased products.

## Tech Stack

- **Next.js**: A React framework for building server-rendered applications and static websites.
- **Stripe**: A powerful payment processing platform for handling transactions.
- **Prisma**: An ORM for interacting with the database in a type-safe way.
- **SQL**: The relational database management system used for storing application data.
- **Neo**: An open-source toolkit used alongside Prisma to simplify the database schema setup and migrations.
- **shadcn**: A component library used for building consistent and accessible UI components.
- **Tailwind CSS**: A utility-first CSS framework for styling the application.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- PostgreSQL

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/KashifKhn/Digital_Download_EcommerceStore-Next-js-Strpe-Prisma-SQL.git
   cd Digital_Download_EcommerceStore-Next-js-Strpe-Prisma-SQL
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:

   Copy the `.env.example` file to `.env` and fill in your environment variables:

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file with your database connection string, Stripe keys, and other necessary environment variables:

4. Set up the database:

   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at `http://localhost:3000`.

### Running Stripe Webhook and Email Server

- To listen to Stripe webhooks:

  ```bash
  npm run stripe
  ```

- To start the email development server:

  ```bash
  npm run email
  ```

## Deployment

To deploy the application to a production environment, follow the standard Next.js deployment process. You can deploy to Vercel, Heroku, or any other cloud provider that supports Node.js.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt) file for more details.

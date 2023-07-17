---
title: Art Cafe Backend  (Strapi) 
description: Welcome to the backend repository of our e-commerce website specialized in selling coffee machine parts, refurbished coffee machines, and offering repair services for coffee machines. This backend, powered by Strapi using a Postgres database and aws s3 for uploads, acts as the headless CMS, managing product listings, descriptions, and more.
tags:
  - strapi
  - postgresql
  - cms
  - javascript
  - stripe
  - aws s3
---



# Art Cafe Backend  (Strapi)  



## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
  - [Data Models](#data-models)
  - [API Endpoints](#api-endpoints)
  - [Authentication and Permissions](#authentication-and-permissions)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
Our backend is built using Strapi, a powerful headless CMS that enables easy content management and data modeling. It serves as the data source for our Next.js frontend, providing product information, and other crucial content.

## ✨ Features

- Strapi
- Postgres
- aws s3
- stripe
- graphql



### Data Models
We have set up various data models in Strapi to efficiently manage our e-commerce website's content. These models include Products, Categories, Reviews, and Repair Services, among others. Each model is designed to store the relevant information for smooth frontend functionality.

### API Endpoints
Strapi automatically generates RESTful APIs based on the defined data models. These APIs allow seamless communication between the frontend and backend, ensuring that product data, reviews, and other content are easily accessible.

### Authentication and Permissions
I have implemented user authentication and set appropriate permissions for different user roles. This ensures that only authorized users can access sensitive operations, such as adding new products or managing repair services.

## Getting Started

### Installation
To set up the backend locally, follow these steps:

1. Clone this repository: `git clone https://github.com/nate-mal/strapi`
2. Change to the project directory: `cd strapi`
3. Install dependencies: `npm install`

### Configuration
Before running the backend, you'll need to configure some environment variables:

1. Create a `.env` file at the root of the project.
2. Add the necessary environment variables, such as database credentials, MeiliSearch URL, and API secret.

Here's an example `.env` file:

```
# keys for strapi (read strapi docs)
HOST=0.0.0.0
PORT=1338
APP_KEYS=app_keys(4>)
API_TOKEN_SALT=app_key
ADMIN_JWT_SECRET=your_jwt_key
JWT_SECRET=you_jwt_secret_key


 
PGDATABASE=databasename
PGHOST=pg_host
PGPASSWORD=database_password
PGPORT=pg_port
PGUSER=pg_usename

# PAYMENT
STRIPE_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:3000
STRAPI_URL=http://localhost:1337

LOCATION_KEY=your_location_key_must_be_the_same_for_frontend



EMAIL_PROVIDER=_your_email_provider_
EMAIL_SMTP_HOST=_email_host_
EMAIL_SMTP_PORT=_port_
EMAIL_SMTP_USER=your_email
EMAIL_SMTP_PASS=your_email_password
EMAIL_ADDRESS_FROM=Art Cafe <yournorepryemail@domain.com>
EMAIL_ADDRESS_REPLY=yourrepplyemail

ENV_PATH=./.env.production NODE_ENV=production npm run start


#settings
SHIPPING_TAX=set_shipping_tax_in_cents
MIN_FREE_SHIPPING=_set_min_free_shipping_tax_in_cents_



AWS_ACCESS_KEY_ID=your_aws_acces_key
AWS_ACCESS_SECRET=your_aws_secret_key
AWS_REGION=your_region
AWS_BUCKET=yourbucketname
```
3. Populate strapi with data using export_.... file (see strapi docs on using export/import)
4. Set up meilisearch and config strapi meiliseach plugin accordingly to cascade on data update (see meilisearch plugin page)
5. Set up google OAuth and update keys in strapi dashboard

## 💁‍♀️ Usage
To start the Strapi server, run: `npm run develop`

Visit `http://localhost:1337/admin` in your web browser to access the Strapi admin panel.

## Contributing
I welcome contributions from the community! If you find any issues or have suggestions for improvement, please submit a pull request or open an issue in this repository.

## License

The project is licensed under the [MIT License](LICENSE).

For the frontend repository and instructions on setting up the entire project, please visit [ArtCafe Frontend Repository](https://github.com/nate-mal/art-cafe-frontend)

Thank you for your contributions to our e-commerce website backend! Together with the frontend, we hope to create a delightful shopping experience for coffee machine enthusiasts.























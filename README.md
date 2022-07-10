# WiseFoodSB

<img src="https://user-images.githubusercontent.com/30029618/178159089-d435faf2-e962-4b68-b9a2-d902d3c69858.png" width="700">

<img src="https://user-images.githubusercontent.com/30029618/178159098-fd0e8c98-c025-43a2-8415-165c4c26eebe.png" width="700">

<img src="https://user-images.githubusercontent.com/30029618/178159161-0bd725bf-622d-4f7c-a30c-a795a40aa176.png" width="700">



This app is hosted at: https://wisefoodsb.herokuapp.com/


## What is WiseFoodSB?

WiseFoodSB is an application used for selling food, in the Tokyo area, that is close to its expiration date for a discounted price.

## Why this application?

Government information from Japan states that there is about 6 million tons of food waste each year. This application hopes to reduce the amount of food wasted by providing discounts on products that are about to expire. The application also aims to give Japanese markets a simple interface where they can sell their products.

# Main Features

## Features for sellers
- Full CRUD functionality for listed products
  - Sellers can add products for sale
  - Sellers can edit and delete products after they're added
- Statistics on their profile page, including:
  - Amount of food saved
  - Amount of money earned
  - Details of products sold
  
## Feature for buyers
- Listed products by sellers, including filtering and sorting logic for easier navigation
- Information on products sold, including: 
  - Original and discounted prices
  - Expiration date
  - Store name
  - Picture of product
- Cart system to add and remove products for purchase
- Safe online payment with stripe
  - Integration with Stripe API provides secure payment for products
- Statistics on their profile page, including:
  - Amount of food saved
  - Amount of money saved
  - Details of products bought

# How to use it

## For sellers
- Sign up for a free account as a SELLER
- Add your store details
- Once a store is set, start listing products for sale

## For buyers
- Sign up for a free account as a BUYER
- Add a name in your profile
- Check out products listed
- Add products to cart and pay with Stripe
- Check profile to get pickup information (store address)


# For Developers

## Getting Started

### Prerequisites

You will need Node.js installed with a package manger such as npm and a PostgreSQL database available locally to install.

After starting PostgreSQL, create a database from the command line

```
CREATE DATABASE wisefoodsb_db
```
### Server environmental variables (```.env``` file)
- Create a ```.env``` file in the root directory of your project and paste the following values

```
NODE_ENV=development
DATABASE_URL=postgresql://<your psql username>:<your psql password>@localhost:5432/wisefoodsb_db
JWT_ACCESS_SECRET=<your JWT access secret key (this set of characters will help create and validate your jwt tokens)>
JWT_REFRESH_SECRET=<your JWT refresh secret key (this set of characters will help create and validate your jwt tokens)>
STRIPE_KEY=<your Stripe API secret key>
AWS_S3_ACCESS_KEY_ID=<your AWS S3 access key id>
AWS_S3_SECRET_ACCESS_KEY=<your AWS S3 secret access key>
```
  
### Client Environmental variables (```.env``` file)
- Create a ```.env``` file in the /web directory and paste the following values
```
REACT_APP_BASE_URL=<url for server location (if app deployed)>
REACT_APP_LOCAL_URL=<url for server location in local machine>
REACT_APP_ISDEV=<true or false>
REACT_APP_STRIPE_KEY=<your Stripe API publishable key>
```

### Setup & Installation

Browse to a folder where this project will be saved and open a command line.

```
git clone <repo-url>
```

Install dependencies for server by opening a terminal in the root directory and executing

```
npm install
```

Install dependencies for server by opening the /web directory and executing

```
npm install
```

## Development

### For Server

Navigate to root directory and open a terminal

- run ```npx prisma migrate dev --<name of migration> init``` to run migrations for the database
- run ```npm run dev``` to start server


### For Client

Navigate to the /web directory and open a terminal

- run ```npm run start``` to start the react app 
  * **Note:** Keep in mind that a proxy is setup on ```package.json``` in order to send requests to the backend. Update the url according to the PORT used in your server. 

## Built With

### Front-End

- React
- Redux / Redux Toolkit
- Material UI

### Back-End

- Node.js / Express
- PostgresSQL
- Prisma ORM
- TypeScript

### API
- Stripe API
- AWS S3 bucket storage

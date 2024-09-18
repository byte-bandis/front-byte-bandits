# I Craft You

I Craft You is a digital marketplace for craftswomen, craftsmen and small stores.

## SPA application

I Craft You is a React Single Page Application (SPA) built with Vite.

### Advantages

- Improved User Experience
- Real-time Interactivity
- Fast and Efficient Loading
- Smooth Transitions Between Screens
- Enhanced Perception of Modernity
- Adaptability for Mobile Applications
- Reduced Server Load

## Starting the app

To start the application, first configure the required environment variables as outlined in the .env.example file. Then, install the necessary dependencies by running the following command:

```sh
npm install
```

## The core of I Craft You

The application is built around four core features and the relationships established between them, which vary depending on whether the user is authenticated or not:

- Authentication
- The Users collection
- The Ads collection
- The Chat engine

### Authentication

When a user registers for the service, their information is saved in a MongoDB database by the back-end. Simultaneously, the user is automatically logged in and receives a JWT token from the server. This token is then included in all subsequent requests made from the client side.

### Open areas

There are several actions a user can take without needing to be authenticated or even registered:

- Browse and filter the list of ads
- View details of individual ads
- Access public profiles of registered users
- Switch languages between English and Spanish
- Register for the service
- Log in to the service

### Restricted areas

Here are the actions a user can take once they are registered and logged in:

- Post new ads
- Like, comment on and rate other users ads
- Order and accept/reject transactions
- Access and review transactions history
- Edit or delete their own ads
- Initiate and participate in chats with other users
- View chat history
- Manage their public profile
- Manage their account settings
- Delete their account

## User Registration and Login

### User Registration Process

Here's an example of the user registration process:

<img src="./docs/assets/register.PNG" alt="User Registration" width="50%">

### User Login

Once a user has registered, they can use the regular login form to access their account:

<img src="./docs/assets/login.PNG" alt="User Login" width="50%">

## The Ads Showcase

## The Ads Showcase

The ads panel is the main component that populates the Home page:

<img src="./docs/assets/adsshowcase.PNG" alt="Ads Showcase" width="100%">

This feature is complemented by a paginator:

<img src="./docs/assets/paginator.PNG" alt="Ads Paginator" width="50%">

## The Ads Filter Component

The ads filter component is a key feature located in the header, providing multiple filtering options:

<img src="./docs/assets/filter.PNG" alt="Ads Paginator" width="100%">

## The Ads Detail View

When authenticated, users can access the following features in the Ads Detail View:

- Like the product
- Comment on the product
- Rate the product
- Start a chat with the product owner
- Buy the product

<img src="./docs/assets/addetail.PNG" alt="Ad Detail" width="50%">

## User Profiles

### Not Authenticated

Unauthenticated users can access the public profiles of other users, where they can view public images and product listings:

<img src="./docs/assets/publicprofile.PNG" alt="Public Profile" width="80%">

## Private Area

After logging in, users can access their private area to perform several actions:

- Update their public profile
- View and update their private data
- Check reserved products
- View sales history
- View purchase history
- Manage their wishlist
- Access the chat
- Execute sensitive account-related actions

### Edit Public Profile

Authenticated users have the ability to edit their own public profiles, including updating images and descriptions:

<img src="./docs/assets/editpublicprofile.png" alt="Edit Public Profile" width="80%">

### View and update private data

#### Personal Information

Manage your identification and contact details:

<img src="./docs/assets/myData.PNG" alt="Edit User Data" width="80%">

#### Address

Manage your postal address information:

<img src="./docs/assets/address.PNG" alt="Edit Address" width="80%">

#### Credit Card

Update your payment method details:

<img src="./docs/assets/creditcard.PNG" alt="Edit Credit Card" width="80%">

## Check Reserved Products

When a user clicks the "Buy" button on a product, the ad owner receives a purchase request, which is displayed in their "Reserved" section.

<img src="./docs/assets/orderreceived.PNG" alt="Reserved Products" width="80%">

## View Sales History

In the Sales section, users can view the list of items they have already sold, as well as those currently available for sale.

<img src="./docs/assets/orderreceived.PNG" alt="Reserved Products" width="80%">

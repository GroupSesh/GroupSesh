# GroupSesh

*smoke with me*

## Overview 
Adoe consolidates and curates all foundations and charities through a single centralized platform where all donations are made easy. Our application reinvents the process of donating by eliminating the hassle of creating multiple accounts, re-entering credit card information, and maneuvring through the vast world of charities. With Adoe, foundations don't need to waste valuable dollars and time building and marketing their own app. We take care of the app so foundations can take care of what they do best. 

What GroupSesh Offers:
 * Highlighting applicable foundations related to current disasters
 * Curating charities by pass through rate
 * Single time payment information entry
 * Easy tax receipts exported on your desired taxing software or simple pdf
 * Fundraiser hosting, bringing your donors to you in a single click 

# API Reference 

Below are the live server specifications for accessing our "Adoe" internal API. 

## User

### `POST` Register User
`url: https://polar-sands-99108.herokuapp.com/api/users/register`

#### Input 
```javascript
{
 "name": String, *Required
 "email": String, *Required
 "password": String, *Required
 "phoneNumber": String,
 "streetAddress": String,
 "city": String,
 "ustate": String,
 "zipCode": String,
 "country": String
}
```

**Success Response**: 200 - `{success: true}`

**Failure Responses**:

* 400 - `{"success":false, "error": "Name Required"}`
* 400 - `{"success":false, "error": "Email Required"}`
* 400 - `{"success":false, "error": "password Required"}`
* 400 - `{"success":false, "error": "Phone number already being used"}`
* 400 - `{"success":false, "error": "Email already being used"}`

### `POST` Login User
`url: https://polar-sands-99108.herokuapp.com/api/users/login`

#### Input 
```javascript
{
 "email": String 
 "password": String 
}
```
**Success Response**: 200 - `{"success": true, "token": String}`

**Failure Responses**:

* 400 - `{"success":false, "error": "Invalid email or passsword"}`

### `POST` Add a credit card to the User's account
`url: https://polar-sands-99108.herokuapp.com/api/users/addcreditcard`

#### Input 
```javascript
{
 "authToken": String, //user authentication token
 "number": String, //credit card number
 "month": Number, //credit card expiration month
 "year": Number, //credit card expiration year
 "cvc": Number
}
```
**Success Response**: 200 - `{"success": true}`

**Failure Responses**:

* 400 - `{"success":false, "error": "Invalid authentication token"}`
* 400 - `{"success":false, "error": "Invalid credit card submission"}`

### `POST` Charge a users card
`url: https://polar-sands-99108.herokuapp.com/api/users/chargeCard`

#### Input 
```javascript
{
 "authToken": String, //user authentication token
 "foundation": mongoose.Schema.Types.ObjectId //This represents the ID of the foundations. (passed in from login route)
 "amount": Number // amount of money to be donated in cents
}
```
**Success Response**: 200 - `{"success": true}`

**Failure Responses**:

* 400 - `{"success":false, "error": "Invalid authentication token"}`
* 400 - `{"success":false, "error": "Foundation not found"}`

### `POST` Newsfeed
`url: https://polar-sands-99108.herokuapp.com/api/users/newsfeed`

* This request will give you an array of all foundations, each foundation in an object

#### Input 
```javascript
{
 "authToken": String, //user authentication token
}
```
**Success Response**: 200 - 
``` javascript 
[
 {
  "name": String,
  "email": String,
  "phoneNumber": String,
  "description": String,
  "logo": String
  }
]
```
**Failure Responses**:

* 400 - `{"success":false, "error": "Invalid authentication token"}`

### `POST` Tax Receipts
`url: https://polar-sands-99108.herokuapp.com/api/users/taxReceipts`

* This request will return an array of donations for user to use for taxes

#### Input 
```javascript
{
 "authToken": String, //user authentication token
}
```
**Success Response**: 200 - 
``` javascript 
[
 {
  "foundation": String,
  "date": String,
  "amount": String
  }
]
```
**Failure Responses**:

* 400 - `{"success":false, "error": "Invalid authentication token"}`


## Foundations

### `GET` Register/Login Foundation
`url: https://polar-sands-99108.herokuapp.com/api/foundations/login`

* This get request will present the main page for the foundations web app

### `POST` Register Foundation
`url: https://polar-sands-99108.herokuapp.com/api/foundations/register`

#### Input 
```javascript
{
 "name": String, *Required
 "email": String, *Required
 "password": String, *Required
 "phoneNumber": String,
 "streetAddress": String,
 "city": String,
 "ustate": String,
 "zipCode": String,
 "Country": String,
 "description": String
 }
```
**Success Response**: 200 - `{"success": true}`  //redirected to GET login

**Failure Responses**:

* 400 - `{"success":false, "error": "Name Required"}`
* 400 - `{"success":false, "error": "Email Required"}`
* 400 - `{"success":false, "error": "password Required"}`
* 400 - `{"success":false, "error": "Phone number already being used"}`
* 400 - `{"success":false, "error": "Email already being used"}`

## `POST` Login Foundation
`url: https://polar-sands-99108.herokuapp.com/api/foundations/login`

#### Input 
```javascript
{
 "email": String 
 "password": String 
}
```
**Success Response**: 200 - `{"success": true}`  
*Redirects to GET home 
*Sessions will keep foundations logged in for 10 days as calculated in app.js line 66

**Failure Responses**:

* 400 - `{"success":false, "error": "Invalid email or passsword"}`


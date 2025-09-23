---
title: Sample API Documentation
layout: default
---

# Sample API Docs - OPD Disc Trading

[Back](work_samples.html)

The following document contains sample API endpoints and documentation for OPD Disc Golf Trading, a fictional disc golf retailer. I used ChatGPT and Gemma to create a `products.json` sheet, and to devise a basic API to use and document. I can also run a localserver and demo some of these endpoints. This project was designed as an evergreen example of the API documentation I write. 

Contact richardbashara@gmail.com if you need help writing your API docs.

> NOTE: THIS IS NOT A REAL APPLICATION, THESE STEPS ARE HERE TO DEMONSTRATE DOCUMENTATION PROWESS ONLY. ALL ATTEMPTS TO UTILIZE THIS API WILL FAIL. 

## Endpoints TOC

1. [Authentication](#authentication)
2. [GET /products](#get-products)
3. [GET /products by ID](#get-products-by-id)
4. [POST /products Create a New Product](#post-products-create-a-new-product)
5. [PATCH /products Update a Product](#patch-update-product)
6. [DELETE /products Delete a Product](#delete-delete-a-product)

## Authentication

[Back](#endpoints-toc)

All protected endpoints (POST, PATCH, and DELETE) require a Bearer token attached to the Authorization header. The token is issued by our OAuth‑2.0 client‑credentials flow and is a short‑lived JSON Web Token (JWT).

To obtain a token, follow these steps:

### Register the client

A token requires you to have a client ID / secret pair. Register your application at

https://auth.opddiscgolftrading.com/register

You will receive a response containing the following:

| Field	| Example |	Notes |
| ----- | ------- | ----- |
| `client_id`	| abcd1234	| Your public identifier. |
| `client_secret` |	fghijklmnop |	Never expose this. |
| `scope`	| products:read products:write	| Scopes you request.

### Request a token

Once registered, request a token:

```bash
POST https://auth.opddiscgolftrading.com/token
Content-Type: application/x-www-form-urlencoded
```

| Body Parameter	| Type	| Required	| Description |
| `grant_type` | String |	Required |	Must be `client_credentials`.|
| `client_id`	| String | Required |	Your client ID. |
| client_secret	| String	| Required |	Your client secret.|
| `scope`	| String | Optional | Space‑separated list of scopes. |

### Sample Request (cURL)

```bash
curl -X POST "https://auth.opddiscgolftrading.com/token" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "grant_type=client_credentials" \
     -d "client_id=demo_client_id" \
     -d "client_secret=demo_client_secret" \
     -d "scope=products:read%20products:write"

```


### Successful response (JSON)

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", 
  "token_type": "Bearer",
  "expires_in": 3600, 
  "scope": "products:read products:write" 
}

```
`access_token` - The JWT for use.
`expires_in` - Measured in seconds.
`scope` - Scopes granted to this token.

> Usage is described as needed for relevant endpoints. 

---------

## GET /products

[Back](#endpoints-toc)

Retrieve a paginated list of all products

### Request

| Field | Type | Required | Description | 
| ----- | ---- | -------- | ----------- |
| **page** | Number | Optional | Begin showing results starting on this page. Default is `1`. |
| **pageSize** | Number | Optional | Number of items returned per page. Default is `20` and max is `100`. |
| **sort** | String | Optional | Sort results according to: `productId`, `name`, `price`, and `category`. Default sort is `name`. |
| **order** | String | Optional | Order results, either ascending `asc`, or descending `desc`. The default value is `asc`. |


### URL

GET https://api.opddiscgolftrading.com/v1/products

### Headers

| Key | Value | Notes |
| --- | ----- | ----- |
| `Accept` | `application/json` | Required value. |

> GET is the HTTP verb used for this call. 

### Sample Request

```bash
curl -X GET "https://api.opddiscgolftrading.com/v1/products?pageSize=50&sort=price&order=asc" \
     -H "Accept: application/json"
```

### Responses

| Status | Description |
| ------ | ----------- |
| 200 OK | Success - A JSON object is returned containing pagination info and an array of products. |
| 400 Bad Request | Invalid query parameters. |
| 500 Internal Server Error | Unexpected server issue. Check our status page, and then contact support if the call fails repeatedly. |

#### Successful Response Example

```json
{
  "pageSize": 50,
  "total": 17,
  "items": [
    {
      "productId": "ODP10001",
      "name": "Innova Destroyer",
      "type": "Distance Driver",
      "description": "A stable distance driver.",
      "category": "Discs",
      "price": 8.99,
      "flightNumbers": {
        "speed": 12,
        "glide": 5,
        "turn": -1,
        "fade": 3
      }
    },
    /* … up to 50 items per page … */    
  ]
}
```

#### Unsuccessful Response Example

**400 Bad Request**

```json
{
  "error": {
    "code": "INVALID_QUERY",
    "message": "Check query parameters. "
  }
}
```

**500 Internal Server Error**

```json
{
  "error": {
    "code": "SERVER_ERROR",
    "message": "An unexpected error occurred. Please try again later."
  }
}
```

### Sample Use Cases

Creating a mobile app that displays a list of discs from the ODP store:

1. Call `GET /products?pageSize=20&sort=name&order=asc`. 
2. Render `items` as a scrollable list.
3. When the user reaches the bottom, increment `page` and request the next batch. 

---------

## GET /products by ID

[Back](#endpoints-toc)

Returns a specific product based on its Id value. 

### Request

| Field | Type | Required | Description | 
| ----- | ---- | -------- | ----------- |
| **{productId}** | String | Required | Returns this productId. Use `GET /products` to retrieve product Ids. Case insensitive. |

### URL

GET https://api.opddiscgolftrading.com/v1/products/{productId}

### Headers

| Key | Value | Notes |
| --- | ----- | ----- |
| `Accept` | `application/json` | Required value. |

> GET is the HTTP verb used for this call. 

### Sample Request

```bash
curl -X GET "https://api.opddiscgolftrading.com/v1/products/opd1001" \
     -H "Accept: application/json"
```

### Responses

| Status | Description |
| ------ | ----------- |
| 200 OK | Success - A JSON object is returned containing pagination info and an array of products. |
| 404 Not Found | `productId` does not exist. |

#### Successful Response Example

Returns product with Id value `OPD10001`. 

```json
{
  "productId": "OPD10001",
  "name": "Innova Destroyer",
  "type": "Distance Driver",
  "description": "A stable distance driver.",
  "category": "Discs",
  "price": 8.99,
  "flightNumbers": {
    "speed": 12,
    "glide": 5,
    "turn": -1,
    "fade": 3
  }
}

```

#### Unsuccessful Response Example

**404 Not Found**

```json
{
"error": {
"code": "NOT FOUND",
"message": "No product was found for this `productId`."
}
}
```

---------

## POST /products Create a New Product

[Back](#endpoints-toc)

Create a new product entry. Authorization is required for this admin only endpoint. 

### URL

POST https://api.opddiscgolftrading.com/v1/products

### Headers

| Key | Value | Notes |
| --- | ----- | ----- |
| `Accept` | `application/json` | Required value. |
| `Authorization` | Bearer {access_token} | Required | Admin only endpoint. |

> POST is the HTTP verb used for this call. 

### Request Body

* This API does not support bulk requests. Use one request per product to be added. 
* This POST endpoint requires authorization with `Bearer: {access_token}`. 

| Field | Type | Required | Description | 
| ----- | ---- | -------- | ----------- |
| **productId** | String | Optional | 8-character string for `productId`. If no productId is specified, or if the productId already exists, a productId will be assigned at time of creation. |
| **name** | String | Required | Product name, displayed as an H1 on the product page. Searchable. |
| **type** | String | Optional | Only for Discs. Type denotes the type of disc. Viable options include: `distance driver`, `driver`, `midrange`, `putter`. |
| **description** |  string | Optional | Item description displayed beneath the H1 tag. Searchable. |
| **flightNumbers** | Object | Optional | Flight numbers used with `discs`. Requires `speed`, `glide`, `turn`, and `fade` properties. |
| **weight** | Number | Optional | Item weight (measured in pounds.) |
| **dimensions** | Object | Optional | Item dimensions. Required for `bags` and `baskets`. Requires `L` (Length), `W` (Width), and `H` (Height) properties, each measured in inches. |
| **category** | String | Required | Item category. Viable options include: `discs`, `bags`, and `baskets`. |
| **price** | Number | Required | Price in USD. | 


**Add a New Disc**

Adds a new disc to the product catalog.

```json
{
    "productId": "OPD9999", 
    "name": "My Disc",
    "type": "Distance Driver",
    "description": "A stable distance driver.",
    "flightNumbers": {
      "speed": 12, 
      "glide": 5,
      "turn": -1,
      "fade": 3
    },
    "category": "Discs",
    "price": 19.99 
  }

```

### Responses

| Status | Description |
| ------ | ----------- |
| 201 Created | Success - A JSON object is returned containing the details of the created product. |
| 401 Unauthorized | Missing or invalid `Authorization` token. |
| 500 Internal Server Error | Unexpected server issue. Check our status page, and then contact support if the call fails repeatedly. |

#### Successful Response Example

Returns all products that meet the price restrictions, less than 10 and greater than 5. 

**Disc Created**

```json
{
  "product": {
    "productId": "OPD9999",
    "name": "My Disc",
    "type": "Distance Driver",
    "description": "A stable distance driver.",
    "flightNumbers": {
      "speed": 12, 
      "glide": 5,
      "turn": -1,
      "fade": 3
    },
    /*ETC...*/
  }
}

```

#### Unsuccessful Response Example

**401 Unauthorized**

```json
{
"error": {
"code": "UNAUTHORIZED",
"message": "Authentication credentials were missing or invalid."
}
}
```

**500 Internal Server Error**

```json
{
  "error": {
    "code": "SERVER_ERROR",
    "message": "An unexpected error occurred. Please try again later."
  }
}
```

---------


## PATCH Update Product

[Back](#endpoints-toc)

Update a product entry. Authorization is required for this admin only endpoint.

### URL

PATCH https://api.opddiscgolftrading.com/v1/products/{productId}

### Headers

| Key | Value | Notes |
| --- | ----- | ----- |
| `Accept` | `application/json` | Required value. |
| `Authorization` | Bearer {access_token} | Optional. Necessary only for privileged calls (admin filters.)|

> PATCH is the HTTP verb used for this call. 

### Request Body

* This API does not support bulk requests. Use one request per product to be added. 
* This endpoint only updates fields you include.
* This PATCH endpoint requires authorization with `Bearer: {access_token}`. 

| Field | Type | Required | Description | 
| ----- | ---- | -------- | ----------- |
| **productId** | String | Required | 8-character string for `productId` to update. Begins with `OPD`, case insensitive.  |
| **name** | String | Optional | Product name, displayed as an H1 on the product page. Searchable. |
| **type** | String | Optional | Only for Discs. Type denotes the type of disc. Viable options include: `distance driver`, `driver`, `midrange`, `putter`. |
| **description** |  string | Optional | Item description displayed beneath the H1 tag. Searchable. |
| **flightNumbers** | Object | Optional | Flight numbers used with `discs`. Requires `speed`, `glide`, `turn`, and `fade` properties. |
| **weight** | Number | Optional | Weight of the item (measured in pounds.) |
| **dimensions** | Object | Optional | Dimensions of the item. Required for `bags` and `baskets`. Requires `L` (Length), `W` (Width), and `H` (Height), properties, each measured in inches. |
| **category** | String | Optional | Item category. Viable options include: `discs`, `bags`, and `baskets`. |
| **price** | Number | Optional | Price in USD. | 


**Update a Disc**

Changes the price of an existing disc from the product catalog.

```json
{
    "productId": "OPD9999", 
    "price": 17.99 
  }

```



### Responses

| Status | Description |
| ------ | ----------- |
| 200 OK | Success - A JSON object is returned containing the details of the product Id supplied. |
| 400 Bad Request | Invalid query parameters. Check types sent for possible errors. |
| 401 Unauthorized | Missing or invalid `Authorization` token. |
| 404 Not Found | `productId` does not exist. |

#### Successful Response Example

This example shows the new json object with updated price: 

**Disc Updated**

```json
{
  "product": {
    "productId": "OPD9999",
    "name": "My Disc",
    "type": "Distance Driver",
    "description": "A stable distance driver.",
    "category": "Discs",
    "price": 17.99,
    "flightNumbers": { "speed": 12, "glide": 5, "turn": -1, "fade": 3 }
  }
}

```

#### Unsuccessful Response Example

**400 Bad Request**

```json
{
  "error": {
    "code": "INVALID_QUERY",
    "message": "Check query parameters. "
  }
}
```

**401 Unauthorized**

```json
{
"error": {
"code": "UNAUTHORIZED",
"message": "Authentication credentials were missing or invalid."
}
}
```

**404 Not Found**

```json
{
"error": {
"code": "NOT FOUND",
"message": "No product was found for this `productId`."
}
}
```

---------

## DELETE Delete a Product

[Back](#endpoints-toc)

Delete a product from the product catalog. Authorization is required for this admin only endpoint. 

### URL

DELETE https://api.opddiscgolftrading.com/v1/products/{productId}

### Headers

| Key | Value | Notes |
| --- | ----- | ----- |
| `Accept` | `application/json` | Required value. |
| `Authorization` | Bearer {access_token} | Optional. Required for admin requests.)|

> DELETE is the HTTP verb used for this call.

### Sample Request

```bash
curl -X DELETE "https://api.opddiscgolftrading.com/v1/products/OPD99999" \
     -H "Accept: application/json" \
     -H "Authorization: Bearer{my_secret_token}"
```

### Responses

| Status | Description |
| ------ | ----------- |
| 204 No Content | Success - A message is returned confirming deletion of the productId. |
| 401 Unauthorized | Missing or invalid `Authorization` token. |
| 404 Not Found | No product exists for the specified `productId`. |

#### Successful Response Example

**Delete a Disc from the Catalog**

```json
{
  "message": "Disc with productId OPD99999 successfully deleted."
}

```

#### Unsuccessful Response Example

**401 Unauthorized**

```json
{
"error": {
"code": "UNAUTHORIZED",
"message": "Authentication credentials were missing or invalid."
}
}
```

**404 Not Found**

```json
{
"error": {
"code": "NOT FOUND",
"message": "No product was found for this `productId`."
}
}
```


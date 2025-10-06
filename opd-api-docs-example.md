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
    1. [Register Your Client](#register-your-client)
    2. [Request a Token](#request-a-token)
2. [API Endpoints](#api-endpoints)
    1. [GET /products by ID](#get-products-by-id)
    2. [POST /products Create a New Product](#post-products-create-a-new-product)
    3. [PATCH /products Update a Product](#patch-update-product)
    4. [DELETE /products Delete a Product](#delete-a-product)
3. [Best Practices](#best-practices)


<h2 id="authentication">Authentication</h2>


All protected endpoints (POST, PATCH, and DELETE) require a Bearer token attached to the Authorization header. The token is issued by our OAuth‑2.0 client‑credentials flow and is a short‑lived JSON Web Token (JWT).

To obtain a token, You need to already have an account with OPD developer services. In addition, you must also:

- Authenticate your device by a publicly identifiable `client_id`.
    
- Request a token to make changes with your registered device.
    

Follow these steps to get started:
<details>
<summary>
<h3 id="register-your-client"> Step One | Register Your client_id</h3>
</summary>
<div markdown="1">

The first step is to send a POST request to the following URL:

``` bash
curl -X POST "https://auth.opddiscgolftrading.com/register"
 ```

These fields are required:

| Field | Type | Example | Notes |
| --- | --- | --- | --- |
| `client_id` | string | `myClient` | The publicly available name that will be assigned to your device. You choose this. |
| `username` | string | `username` | The username you used when you registered as an OPD developer. |
| `password` | string | `password` | The password you used to sign up for OPD developer services. |

This example POST request contains all required fields:

``` bash
curl -X POST "https://auth.opddiscgolftrading.com/token" \  
     -H "Content-Type: application/x-www-form-urlencoded" \  
     -d "client_id=clientId" \  
     -d "username=username" \
     -d "password=password"
 ```

You will receive a response containing the following elements:

| Field | Type | Example | Notes |
| --- | --- | --- | --- |
| `client_id` | string | `myClient` | Your public identifier. |
| `client_secret` | string | `clientSecret` | Never expose this. |
| `scope` | string | `products:write`, `products:delete` | A comma separated list of scopes granted to your `client_id`. |


### Response Examples

| Status | Description |
| ------ | ----------- |
| 201 Created | Success - A JSON object is returned containing relevant details for your device, inclduing your `client_secret`. |
| 400 Bad Request | Invalid query parameters. Check the `username` and `password`. |
| 401 Unauthorized | You do not have authorization to access developer resources. |
| 500 Internal Server Error | Unexpected server issue. Check our status page, and then contact support if the call fails repeatedly. |

A successful response when requesting a client secret for your device looks like this:

``` json
{
  "client_id": "myClient", 
  "client_secret": "clientSecret",
  "expires_in": 3600, 
  "scope": "products:write, products:delete" 
}

 ```
</div>
</details>

<details>
<summary>
<h3 id="request-a-token">Step Two | Request a Token</h3>
</summary>
<div markdown="1">

Once your `client_id` has been registered with a `client_secret`, you can use both to request a token:

``` bash
curl -X POST "https://auth.opddiscgolftrading.com/token" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "client_id=clientId" \
     -d "client_secret=clientSecret" 
 ```

Your request must include all required values listed below:

| Body Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `client_id` | String | Required | Your client ID. |
| `client_secret` | String | Required | Your client secret. |

The successful JSON response looks like this:

``` json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", 
  "token_type": "Bearer",
  "expires_in": 3600, 
  "scope": "products:write products:delete" 
}
 ```

A successful response always contains these elements:

| Field | Type | Example | Description |
| --- | --- | --- | --- |
| `access_token` | string | `"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."` | Your access token. Never reveal this. |
| `token_type` | string | `"bearer"` |  |
| `expires_in` | number | `3600` | measured in seconds. Default is 3600, or 1 hour |
| `scope` | string | `"products:write products:delete"` | The token is authorized to utilize endpoints within these scopes. |

> Usage is described as needed for relevant endpoints.

---------
</div>
</details>

## API Endpoints

---------
### GET /products by ID

Returns a specific product based on its Id value. 

<details>
<summary>
<h4> Request Details</h4>
</summary>
<div markdown="1">

| Field | Type | Required | Description | 
| ----- | ---- | -------- | ----------- |
| **{productId}** | String | Required | Returns this productId. Use `GET /products` to retrieve product Ids. Case insensitive. |


#### URL

```bash
curl -X GET https://api.opddiscgolftrading.com/v1/products/{productId}
```


#### Headers

| Key | Value | Notes |
| --- | ----- | ----- |
| `Accept` | `application/json` | Required value. |

> GET is the HTTP verb used for this call. 


#### Sample Request

```bash
curl -X GET "https://api.opddiscgolftrading.com/v1/products/opd1001" \
     -H "Accept: application/json"
```

#### Responses

| Status | Description |
| ------ | ----------- |
| 200 OK | Success - A JSON object is returned containing pagination info and an array of products. |
| 404 Not Found | `productId` does not exist. |

##### Successful Response Example

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

##### Unsuccessful Response Example

**404 Not Found**

```json
{
"error": {
"code": "NOT FOUND",
"message": "No product was found for this `productId`."
}
}
```

</div>
</details>

---------


### POST /products Create a New Product

Create a new product entry. [Authorization](#authentication) is required for this admin only endpoint. Use of `v1` endpoint for single requests is recommended for responsiveness. Use `v2` endpoint to add multiple items with a single request. 

<details>
<summary>
<h4> Request Details</h4>
</summary>
<div markdown="1">

**v1 Endpoint to Add a Single Item**

```bash

curl -X POST "https://api.opddiscgolftrading.com/v1/products"
```

**v2 Endpoint to Add Multiple Items**

```bash

curl -X POST "https://api.opddiscgolftrading.com/v2/products"
```


#### Headers

| Key | Value | Notes |
| --- | ----- | ----- |
| `Accept` | `application/json` | Required value. |
| `Authorization` | Bearer {access_token} | Required | Admin only endpoint. See [Authentication](#authentication) for instructions. |

> POST is the HTTP verb used for this call. 


#### Request Body

* In `v1`, this API did not support bulk requests. Bulk POSTS are possible in `v2` of our API. Separate each request with a comma.  
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


**Add a New Disc (v1)**

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

**Add a New Disc (v2)**

Adds a new disc to the product catalog.

```json
 {
    "productId": "OPD9998", 
    "name": "First Disc",
    "type": "Distance Driver",
    "description": "A high-speed distance driver made for throwing into wind.",
    "flightNumbers": {
      "speed": 15, 
      "glide": 4,
      "turn": -1,
      "fade": 2
    },
    "category": "Discs",
    "price": 19.99 
  },
 {
    "productId": "OPD9999", 
    "name": "Second Disc",
    "type": "Midrange",
    "description": "A midrange approach that curves left.",
    "flightNumbers": {
      "speed": 6, 
      "glide": 4,
      "turn": 0,
      "fade": 3
    },
    "category": "Discs",
    "price": 19.99 
  }

```


#### Responses

| Status | Description |
| ------ | ----------- |
| 201 Created | Success - A JSON object is returned containing the details of the created product. |
| 401 Unauthorized | Missing or invalid `Authorization` token. |
| 500 Internal Server Error | Unexpected server issue. Check our status page, and then contact support if the call fails repeatedly. |


##### Successful Response Example

Returns all products that meet the price restrictions, less than 10 and greater than 5. 

**Disc Created (v1)**

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

**Disc Created (v2)**

```json
 {
    "productId": "OPD9998", 
    "name": "First Disc",
    "type": "Distance Driver",
    "description": "A high-speed distance driver made for throwing into wind.",
    "flightNumbers": {
      "speed": 15, 
      "glide": 4,
      "turn": -1,
      "fade": 2
    },
    "category": "Discs",
    "price": 19.99 
  },
 {
    "productId": "OPD9999", 
    "name": "Second Disc",
    "type": "Midrange",
    "description": "A midrange approach that curves left.",
    "flightNumbers": {
      "speed": 6, 
      "glide": 4,
      "turn": 0,
      "fade": 3
    },
    "category": "Discs",
    "price": 19.99 
  }

```


##### Unsuccessful Response Example

**401 Unauthorized**

```json
{
"error": {
"code": "UNAUTHORIZED",
"message": "Authentication credentials were missing or invalid."
}
}
```

</div>
</details>
---------

### PATCH Update Product

Update a product entry. Authorization is required for this admin only endpoint.


<details>
<summary>
<h4> Request Details</h4>
</summary>
<div markdown="1">

**URL**

PATCH https://api.opddiscgolftrading.com/v1/products/{productId}


#### Headers

| Key | Value | Notes |
| --- | ----- | ----- |
| `Accept` | `application/json` | Required value. |
| `Authorization` | Bearer {access_token} | Optional. Necessary only for privileged calls (admin filters.)|

> PATCH is the HTTP verb used for this call. 


#### Request Body

* This API does not support bulk requests. Use one request per product to be changed. 
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


#### Responses

| Status | Description |
| ------ | ----------- |
| 202 Accepted | Success - A JSON object is returned containing the all details of the product Id supplied. |
| 400 Bad Request | Invalid query parameters. Check types sent for possible errors. |
| 401 Unauthorized | Missing or invalid `Authorization` token. |
| 404 Not Found | `productId` does not exist. |


##### Successful Response Example

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


##### Unsuccessful Response Example

**404 Not Found**

```json
{
"error": {
"code": "NOT FOUND",
"message": "No product was found for this `productId`."
}
}
```

</div>
</details>
---------

### DELETE a Product 

Delete a product from the product catalog. Authorization is required for this admin only endpoint. 


<details>
<summary>
<h4> Request Details</h4>
</summary>
<div markdown="1">

**URL**

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
</div>
</details>

------

<details>
<summary>
<h2 id="best-practices"> Best Practices</h2>
</summary>
<div markdown="1">

The following best practices are recommend when utilizing our API for development purposes:

1. Reduce usage when posting products through utilization of the `v2` endpoint.
2. Usage is limited to 200 calls per minute. Structure requests accordingly. 
</div>
</details>
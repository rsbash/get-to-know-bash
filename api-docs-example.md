## GET /products

Retrieve a paginated list of all products

### Request

| Field | Type | Required | Description | 
| ----- | ---- | -------- | ----------- |
| **page** | integer | Optional | Page number to return with the query. The default value is `1`. |
| **pageSize** | integer | Optional | Adjust the number of items returned per page. The default value is `20` and the max value is `100`. |
| **sort** | string | Optional | Sort results according to these possible fields: `productId`, `name`, `price`, and `category`. The default sort method uses `name`. |
| **order** | string | Optional | Order results, either ascending `asc`, or descending `desc`. The default value is `asc`. |


### URL

GET https://api.opddiscgolftrading.com/v1/

### Headers

| Key | Value | Notes |
| --- | ----- | ----- |
| `Accept` | `application/json` | Required value. |
| `Authorization` | Bearer {access_token} | Optional. Necessary only for privileged calls (admin filters.)|

### Sample Request

```bash
curl -X GET "https://api.opddiscgolftrading.com/v1/products?page=1&pageSize=50&sort=price&order=asc" \
     -H "Accept: application/json"
```

### Responses

| Status | Description |
| ------ | ----------- |
| 200 OK | Success - A JSON object is returned containing pagination info and an array of products. |
| 400 Bad Request | Invalid query parameters. Check types sent for possible errors. |
| 401 Unauthorized | Missing or invalid `Authorization` token. |
| 500 Internal Server Error | Unexpected server issue. Check our status page, and then contact support if the call fails repeatedly. |

#### Successful Response Example

```json
{
  "page": 1,
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
    {
      "productId": "ODP10002",
      "name": "Innova Rogue",
      "type": "Distance Driver",
      "description": "A stable driver with a moderate fade.",
      "category": "Discs",
      "price": 8.99,
      "flightNumbers": {
        "speed": 14,
        "glide": 5,
        "turn": 0,
        "fade": 3
      }
    }
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
    "message": "The 'pageSize' query parameter must be a positive integer."
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

1. Call `GET /products?page=1&pageSize=20&sort=name&order=asc`. 
2. Render `items` as a scrollable list.
3. When the user reaches the bottom, increment `page` and request the next batch. 


## GET /products By Category

Retrieves a list of products filtered by category available in the store. 

### Request

| Field | Type | Required | Description | 
| ----- | ---- | -------- | ----------- |
| **category** | string | Required| Can be one of these values: `Discs`, `Bags`, and `Baskets`. `Discs` includes all discs, from putter to distance drivers, `Bags` includes all disc golf bags, and `Baskets` returns all available disc golf baskets. Case insensitive. | 
| **type** | string | Optional | Use when `category=Discs`. Can be one of these values: `distance driver`, `driver`, `midrange`, `putter`. Returns all discs of any type when not supplied. |
| **page** | integer | Optional | Page number to return with the query. The default value is `1`. |
| **pageSize** | integer | Optional | Adjust the number of items returned per page. The default value is `20` and the max value is `100`. |

### URL

GET https://api.opddiscgolftrading.com/v1/products?category=Discs

### Headers

| Key | Value | Notes |
| --- | ----- | ----- |
| **Method** | GET | The HTTP verb used for this call. |
| `Accept` | `application/json` | Required value. This is a default value, no other types are supported. |


### Sample Request

```bash
curl -X GET "https://api.opddiscgolftrading.com/v1/products?category=Discs" 
     -H "Accept: application/json"
```

### Responses

| Status | Description |
| ------ | ----------- |
| 200 OK | Success - A JSON object is returned containing pagination info and an array of products. |
| 400 Bad Request | Invalid query parameters. Check types sent for possible errors. |
| 401 Unauthorized | Missing or invalid `Authorization` token. |
| 429 Too Many Requests | Rate Limit Exceeded |
| 500 Internal Server Error | Unexpected server issue. Check our status page, and then contact support if the call fails repeatedly. |

#### Successful Response Example

Returning all products in the `Discs` category.

```json
{
  "page": 1,
  "pageSize": 50,
  "total": 12,
  "items": [
    {
      "productId": "ODP10001",
      "name": "Innova Destroyer",
      "type": "Distance Driver",
      "description": "A stable distance driver.",
      "category": "Discs",
      "price": 8.99,
      "flightNumbers": { "speed": 12, "glide": 5, "turn": -1, "fade": 3 }
    },
    {
      "productId": "ODP10002",
      "name": "Innova Rogue",
      "type": "Distance Driver",
      "description": "A stable driver with a moderate fade.",
      "category": "Discs",
      "price": 8.99,
      "flightNumbers": { "speed": 14, "glide": 5, "turn": 0, "fade": 3 }
    },
    /* …10 more disc items… */
    {
      "productId": "ODP10012",
      "name": "Innova Nukes",
      "type": "Putter",
      "description": "A stable putter with a slow flight.",
      "category": "Discs",
      "price": 8.99,
      "flightNumbers": { "speed": 3, "glide": 3, "turn": 0, "fade": 0 }
    }
  ]
}

```

#### Unsuccessful Response Example

**400 Bad Request**

```json
{
  "error": {
    "code": "INVALID_QUERY",
    "message": "The 'category' query parameter must be of type string."
  }
}
```

**429 Too Many Requests**

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "The rate limit for this endpoint has been exceeded."
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


## GET /products Price Filter

Returns a `json` array of all products that fall within the user defined maximum and minimum ranges. 

### Request

| Field | Type | Required | Description | 
| ----- | ---- | -------- | ----------- |
| **price_lt** | float | Required | The maximum product price defined in this range. All products returned must be lower than this value. Range from `0.00` to `999.99` is possible. |
| **price_gt** | float | Required | The minimum product price defined in this range. All products returned must be greater than this value. Range from `0.00` to `999.99` is possible. |
| **category** | string | Optional | Applies price range filter to one of these possible categories: `Discs`, `Bags`, and `Baskets`. When not supplied, all product categories may be returned. |
| **page** | integer | Optional | Page number to return with the query. The default value is `1`. |
| **pageSize** | integer | Optional | Adjust the number of items returned per page. The default value is `20` and the max value is `100`. |
| **sort** | string | Optional | Sort results according to these possible fields: `productId`, `name`, `price`, and `category`. The default sort method uses `name`. |
| **order** | string | Optional | Order results, either ascending `asc`, or descending `desc`. The default value is `asc`. | 
  

### URL

GET https://api.opddiscgolftrading.com/v1/products?price_lt=10&price_gt=5

### Headers

| Key | Value | Notes |
| --- | ----- | ----- |
| **Method** | GET | The HTTP verb used for this call. |
| `Accept` | `application/json` | Required value. This is a default value, no other types are supported. |

### Sample Request

```bash
curl -X GET "https://api.opddiscgolftrading.com/v1/products?price_lt=10&price_gt=5" 
     -H "Accept: application/json"
```

### Responses

| Status | Description |
| ------ | ----------- |
| 200 OK | Success - A JSON object is returned containing products filtered to include only those within the defined range, regardless of category. |
| 400 Bad Request | Invalid query parameters. Check types sent for possible errors. |
| 429 Too Many Requests | Rate limit exceeded. Limit calls to a maximum of 200 per minute. |
| 500 Internal Server Error | Unexpected server issue. Check our status page, and then contact support if the call fails repeatedly. |

#### Successful Response Example

Returns all products that meet the price restrictions, less than 10 and greater than 5. 

```json
{
  "page": 1,
  "pageSize": 50,
  "total": 12,
  "items": [
    {
      "productId": "ODP10001",
      "name": "Innova Destroyer",
      "type": "Distance Driver",
      "description": "A stable distance driver.",
      "category": "Discs",
      "price": 8.99,
      "flightNumbers": { "speed": 12, "glide": 5, "turn": -1, "fade": 3 }
    },
    /* …10 more disc items… */
    {
      "productId": "ODP10012",
      "name": "Innova Nukes",
      "type": "Putter",
      "description": "A stable putter with a slow flight.",
      "category": "Discs",
      "price": 8.99,
      "flightNumbers": { "speed": 3, "glide": 3, "turn": 0, "fade": 0 }
    }
  ]
}

```

#### Unsuccessful Response Example

**400 Bad Request**

```json
{
  "error": {
    "code": "INVALID_QUERY",
    "message": "`price_lt` and `price_gt` queries must be of type float. Both queries are required when using this endpoint."
  }
}
```

**429 Too Many Requests**

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "The rate limit for this endpoint has been exceeded."
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


## GET /products Search by Keyword

Retrieves all products that match the keyword provided from either the product name or description.

### Request

| Field | Type | Required | Description | 
| ----- | ---- | -------- | ----------- |
| **search** | string | Required | A keyword to be matched from either the product `name` or `description`. |
| **category** | string | Optional| Can be one of these values: `Discs`, `Bags`, and `Baskets`. `Discs` includes all discs, from putter to distance drivers, `Bags` includes all disc golf bags, and `Baskets` returns all available disc golf baskets. Case insensitive. | 
| **type** | string | Optional | Use when `category=Discs`. Can be one of these values: `distance driver`, `driver`, `midrange`, `putter`. Returns all discs of any type when not supplied. |
| **page** | integer | Optional | Page number to return with the query. The default value is `1`. |
| **pageSize** | integer | Optional | Adjust the number of items returned per page. The default value is `20` and the max value is `100`. |

### URL

GET https://api.opddiscgolftrading.com/v1/products?search=Destroyer

### Headers

| Key | Value | Notes |
| --- | ----- | ----- |
| **Method** | GET | The HTTP verb used for this call. |
| `Accept` | `application/json` | Required value. |

### Sample Request

```bash
curl -X GET "https://api.opddiscgolftrading.com/v1/products?search=Destroyer" \
     -H "Accept: application/json"
```

### Responses

| Status | Description |
| ------ | ----------- |
| 200 OK | Success - A JSON object is returned containing pagination info and an array of products. |
| 400 Bad Request | Invalid query parameters. Check types sent for possible errors. |
| 429 Too Many Requests | Rate limit exceeded. Limit calls to a maximum of 200 per minute. |
| 500 Internal Server Error | Unexpected server issue. Check our status page, and then contact support if the call fails repeatedly. |

#### Successful Response Example

Returns all products that include the search keyword in either the product `name` or `description`.

```json
{
  "page": 1,
  "pageSize": 50,
  "total": 1,
  "items": [
    {
      "productId": "ODP10001",
      "name": "Innova Destroyer",
      "type": "Distance Driver",
      "description": "A stable distance driver.",
      "category": "Discs",
      "price": 8.99,
      "flightNumbers": { "speed": 12, "glide": 5, "turn": -1, "fade": 3 }
    }
  ]
}
```

#### Unsuccessful Response Example

**400 Bad Request**

```json
{
  "error": {
    "code": "INVALID_QUERY",
    "message": "The 'search' query parameter must be of type string."
  }
}
```

**429 Too Many Requests**

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "The rate limit for this endpoint has been exceeded."
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


## GET /products by ID

Returns a specific product based on its Id value. 

### Request

| Field | Type | Required | Description | 
| ----- | ---- | -------- | ----------- |
| **{productId}** | string | Required | Returns the product that has this Id. See product catalog or use `GET /products` to retrieve product Ids. Case insensitive. |

### URL

GET https://api.opddiscgolftrading.com/v1/products/{productId}

### Headers

| Key | Value | Notes |
| --- | ----- | ----- |
| **Method** | GET | The HTTP verb used for this call. |
| `Accept` | `application/json` | Required value. |

### Sample Request

```bash
curl -X GET "https://api.OPDdiscgolftrading.com/v1/products/opd1001" \
     -H "Accept: application/json"
```

### Responses

| Status | Description |
| ------ | ----------- |
| 200 OK | Success - A JSON object is returned containing pagination info and an array of products. |
| 400 Bad Request | Invalid query parameters. Check types sent for possible errors. |
| 429 Too Many Requests | Rate limit exceeded. Limit calls to a maximum of 200 per minute. |
| 500 Internal Server Error | Unexpected server issue. Check our status page, and then contact support if the call fails repeatedly. |

#### Successful Response Example

Returns product with Id value OPD10001. 

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

**400 Bad Request**

```json
{
  "error": {
    "code": "INVALID_QUERY",
    "message": "The '{productId}' value must be of type string. Check product Id and try again."
  }
}
```

**429 Too Many Requests**

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "The rate limit for this endpoint has been exceeded."
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


## GET /products/compare Two Products

Retrieves two product Ids for price and attribute comparison. 

* Specifically provides a `priceChange` value as float when a price change has occurred. 
* Returns `null` when a `priceChange` has not occurred. 
* Returns a minimum and maximum listed price of the two products, and an average price for both. 
* The two products must be comma-separated, but do NOT need to be from the same category.

### Request

| Field | Type | Required | Description | 
| ----- | ---- | -------- | ----------- |
| **ids** | string | Required | Returns a maximum of two products by Id, comma-separated. See product catalog or use `GET /products` to retrieve product Ids. Case insensitive. |

### URL

GET https://api.OPDdiscgolftrading.com/v1/products/compare?ids=OPD10001,OPD10002

### Headers

| Key | Value | Notes |
| --- | ----- | ----- |
| **Method** | GET | The HTTP verb used for this call. |
| `Accept` | `application/json` | Required value. |

### Sample Request

```bash
curl -X GET "https://api.OPDdiscgolftrading.com/v1/products/compare?ids=OPD10001,OPD10002" 
     -H "Accept: application/json"
```

### Responses

| Status | Description |
| ------ | ----------- |
| 200 OK | Success - A JSON object is returned containing pagination info and an array of products. |
| 400 Bad Request | Invalid query parameters. Check types sent for possible errors. |
| 429 Too Many Requests | Rate limit exceeded. Limit calls to a maximum of 200 per minute. |
| 500 Internal Server Error | Unexpected server issue. Check our status page, and then contact support if the call fails repeatedly. |

#### Successful Response Example

Returns all products that meet the price restrictions, less than 10 and greater than 5. 

```json
{
  "comparison": [
    {
      "productId": "OPD10001",
      "name": "Innova Destroyer",
      "price": 8.99,
      "priceChange": null
    },
    {
      "productId": "OPD10002",
      "name": "Innova Rogue",
      "price": 8.99,
      "priceChange": null
    }
  ],
  "summary": {
    "minPrice": 8.99,
    "maxPrice": 8.99,
    "averagePrice": 8.99
  }
}

```

#### Unsuccessful Response Example

**400 Bad Request**

```json
{
  "error": {
    "code": "INVALID_QUERY",
    "message": "The 'ids' query parameter must be of type string, must include two values, and must be comma-separated. Check `ids` and try again."
  }
}
```

**429 Too Many Requests**

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "The rate limit for this endpoint has been exceeded."
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


## POST Create a New Product

### URL

POST https://api.OPDdiscgolftrading.com/v1/

### Headers

| Key | Value | Notes |
| --- | ----- | ----- |
| `Accept` | `application/json` | Required value. |
| `Authorization` | Bearer {access_token} | Optional. Necessary only for privileged calls (admin filters.)|

### Sample Request

```bash
curl -X GET "https://api.OPDdiscgolftrading.com/v1/products?price_lt=10&price_gt=5" \
     -H "Accept: application/json"
```

### Responses

| Status | Description |
| ------ | ----------- |
| 200 OK | Success - A JSON object is returned containing pagination info and an array of products. |
| 400 Bad Request | Invalid query parameters. Check types sent for possible errors. |
| 401 Unauthorized | Missing or invalid `Authorization` token. |
| 500 Internal Server Error | Unexpected server issue. Check our status page, and then contact support if the call fails repeatedly. |

#### Successful Response Example

Returns all products that meet the price restrictions, less than 10 and greater than 5. 

```json
{
  "page": 1,
  "pageSize": 50,
  "total": 12,
  "items": [
    {
      "productId": "ODP10001",
      "name": "Innova Destroyer",
      "type": "Distance Driver",
      "description": "A stable distance driver.",
      "category": "Discs",
      "price": 8.99,
      "flightNumbers": { "speed": 12, "glide": 5, "turn": -1, "fade": 3 }
    },
    /* …10 more disc items… */
    {
      "productId": "ODP10012",
      "name": "Innova Nukes",
      "type": "Putter",
      "description": "A stable putter with a slow flight.",
      "category": "Discs",
      "price": 8.99,
      "flightNumbers": { "speed": 3, "glide": 3, "turn": 0, "fade": 0 }
    }
  ]
}

```

#### Unsuccessful Response Example

**400 Bad Request**

```json
{
  "error": {
    "code": "INVALID_QUERY",
    "message": "The 'category' query parameter must be of type string."
  }
}
```

**429 Too Many Requests**

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "The rate limit for this endpoint has been exceeded."
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


## PATCH Update Product

### URL

POST https://api.OPDdiscgolftrading.com/v1/

### Headers

| Key | Value | Notes |
| --- | ----- | ----- |
| `Accept` | `application/json` | Required value. |
| `Authorization` | Bearer {access_token} | Optional. Necessary only for privileged calls (admin filters.)|

### Sample Request

```bash
curl -X GET "https://api.OPDdiscgolftrading.com/v1/products?price_lt=10&price_gt=5" \
     -H "Accept: application/json"
```

### Responses

| Status | Description |
| ------ | ----------- |
| 200 OK | Success - A JSON object is returned containing pagination info and an array of products. |
| 400 Bad Request | Invalid query parameters. Check types sent for possible errors. |
| 401 Unauthorized | Missing or invalid `Authorization` token. |
| 500 Internal Server Error | Unexpected server issue. Check our status page, and then contact support if the call fails repeatedly. |

#### Successful Response Example

Returns all products that meet the price restrictions, less than 10 and greater than 5. 

```json
{
  "page": 1,
  "pageSize": 50,
  "total": 12,
  "items": [
    {
      "productId": "ODP10001",
      "name": "Innova Destroyer",
      "type": "Distance Driver",
      "description": "A stable distance driver.",
      "category": "Discs",
      "price": 8.99,
      "flightNumbers": { "speed": 12, "glide": 5, "turn": -1, "fade": 3 }
    },
    /* …10 more disc items… */
    {
      "productId": "ODP10012",
      "name": "Innova Nukes",
      "type": "Putter",
      "description": "A stable putter with a slow flight.",
      "category": "Discs",
      "price": 8.99,
      "flightNumbers": { "speed": 3, "glide": 3, "turn": 0, "fade": 0 }
    }
  ]
}

```

#### Unsuccessful Response Example

**400 Bad Request**

```json
{
  "error": {
    "code": "INVALID_QUERY",
    "message": "The 'category' query parameter must be of type string."
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

**429 Too Many Requests**

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "The rate limit for this endpoint has been exceeded."
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

## DELETE Delete a Product

### URL

DELETE https://api.OPDdiscgolftrading.com/v1/

### Headers

| Key | Value | Notes |
| --- | ----- | ----- |
| `Accept` | `application/json` | Required value. |
| `Authorization` | Bearer {access_token} | Optional. Necessary only for privileged calls (admin filters.)|

### Sample Request

```bash
curl -X GET "https://api.OPDdiscgolftrading.com/v1/products?price_lt=10&price_gt=5" \
     -H "Accept: application/json"
```

### Responses

| Status | Description |
| ------ | ----------- |
| 200 OK | Success - A JSON object is returned containing pagination info and an array of products. |
| 400 Bad Request | Invalid query parameters. Check types sent for possible errors. |
| 401 Unauthorized | Missing or invalid `Authorization` token. |
| 500 Internal Server Error | Unexpected server issue. Check our status page, and then contact support if the call fails repeatedly. |

#### Successful Response Example

Returns all products that meet the price restrictions, less than 10 and greater than 5. 

```json
{
  "page": 1,
  "pageSize": 50,
  "total": 12,
  "items": [
    {
      "productId": "ODP10001",
      "name": "Innova Destroyer",
      "type": "Distance Driver",
      "description": "A stable distance driver.",
      "category": "Discs",
      "price": 8.99,
      "flightNumbers": { "speed": 12, "glide": 5, "turn": -1, "fade": 3 }
    },
    /* …10 more disc items… */
    {
      "productId": "ODP10012",
      "name": "Innova Nukes",
      "type": "Putter",
      "description": "A stable putter with a slow flight.",
      "category": "Discs",
      "price": 8.99,
      "flightNumbers": { "speed": 3, "glide": 3, "turn": 0, "fade": 0 }
    }
  ]
}

```

#### Unsuccessful Response Example

**400 Bad Request**

```json
{
  "error": {
    "code": "INVALID_QUERY",
    "message": "The 'category' query parameter must be of type string."
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

**429 Too Many Requests**

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "The rate limit for this endpoint has been exceeded."
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
---
title: Axiomatic API Example
layout: default
---

# Sample API Docs - OPD Disc Trading

[Back](/work_samples.html)

The following document contains sample API endpoints and documentation for the Axiomatic Compass, a real application (but not a real API). This API example was created by ChatGPT and Gemma as an example of my documentation skills. 

Contact richardbashara@gmail.com if you need help writing your API docs.

> NOTE: THESE STEPS ARE HERE TO DEMONSTRATE DOCUMENTATION PROWESS ONLY. ALL ATTEMPTS TO UTILIZE THIS API WILL FAIL. 


## Authentication

[Back](#endpoints-toc)

All protected endpoints (POST, PATCH, and DELETE) require a Bearer token attached to the Authorization header, which is issued by our OAuth‑2.0 client‑credentials flow. 

* You are issued a JSON Web Token (JWT)
* The token is short lived

Request tokens as follows:


### Step One | Client Registration

A token requires you to have a client ID / secret pair. Register your application at

https://auth.axiomaticcompass.com/register

The response you receive will contain the following:

| Field	| Example |	Notes |
| ----- | ------- | ----- |
| `client_id`	| abcd1234	| Your public identifier. |
| `client_secret` |	fghijklmnop |	Never expose this. |
| `scope`	| `products:read products:write`	| Scopes you request.


### Step Two | Request a Token and Define Scope

Once registered, request a token:

| Body Parameter	| Type	| Required	| Description |
| `grant_type` | String |	Required |	Must be `client_credentials`.|
| `client_id`	| String | Required |	Your client ID. |
| `client_secret`	| String	| Required | Your client secret.|
| `scope`	| String | Optional | Space‑separated list of scopes. |

Sample request follows (cURL):

```bash
curl -X POST "https://auth.axiomaticcompass.com/token" \
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

> Usage is described as needed for each relevant endpoint.


## GET /v1/compass/heading

Retrieve the device’s current heading, using `type`. Viable options include: `magnetic` or `true` navigation. 


### Headers

This endpoint uses the GET method. This header is required:

* `Accept: application/json` 


### URL

GET https://api.axiomaticcompass.com/v1/compass/heading


### Example Request

| Name	| Type	| Required	| Description |
| `type`	| String | No | Selects `magnetic` or `true` navigation modes. (default: magnetic). See [support guide](./_site/axiomatic-example.html) for details. |
| `includeAccuracy` | Boolean |	No |  Returns accuracy in `degrees` if `true`.|

```bash
GET "https://api.axiomaticcompass.com/v1/compass/heading?type=magnetic&includeAccuracy=true"
  -H "Accept: application/json" 

```


### Example Response

```json
{
  "heading": 78.3,
  "accuracy": 0.5,
  "unit": "degrees",
  "type": "magnetic"
}
```


## POST /v1/compass/settings/general

Toggles user preferences.


### URL

POST https://api.axiomaticcompass.com/v1/compass/settings/general


### Headers

This endpoint uses the POST method, and is protected. These headers are required:

* `Content-Type: application/json`
* `Authorization: Bearer <access_token>`
* `Accept: application/json` - Optional, but recommended


### Example Request

| Name | Type | Required | Description |
| ---- | -------- | ---- | ----------- |
| `showMagneticField` | Boolean | No | Toggles display phone's magnetic field strength. |
| `keepScreenOn` | Boolean | No |  Toggles screen display. | 

```bash
POST "https://api.axiomaticcompass.com/v1/compass/settings/general" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{"showMagneticField":"false","keepScreenOn":"true"}' 

```


### Example Response

Response, `200 OK`:

```json
{
  "status": "success",
  "updatedAt": "2025-09-22T14:37:00Z"
}

```


## POST /v1/compass/calibrate

Initiates the calibration routine. See [documentation for details](./axiomatic-example.html).


### URL

POST https://api.axiomaticcompass.com/v1/compass/calibrate


### Headers

This endpoint uses the POST method, and is protected. These headers are required:

* `Accept: application/json` 
* `Authorization: Bearer <access_token>` 


### Example Request

| Name | Type | Required | Description |
| ---- | -------- | ---- | ----------- |
| `mode` | String | Yes | Viable options include: `full` and `quick`. See [documentation for details](./axiomatic-example.html). | 

```bash
POST "https://api.axiomaticcompass.com/v1/compass/calibrate?mode=full"
  -H "Accept: application/json"
  -H "Authorization: Bearer <access_token>" 

```


### Example Response

```json
{
  "calibrationId": "abc123",
  "status": "inProgress",
  "estimatedDuration": 15   
}
```

`estimatedDuration` - Measured in seconds.


## Common Errors

| Status Code | Detail | Example Response |
| ----------- | ------ | ---------------- |
| 400 Bad Request. | Invalid query parameters. | `{"error": {"code": "INVALID_QUERY","message": "..."}}` |
| 401 Unauthorized | Missing or invalid `Authorization` token | `{"error": {"code": "UNAUTHORIZED","message": "..."}}`|
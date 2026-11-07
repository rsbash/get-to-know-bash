Tutorial: Delete companies with the Kustomer API

You can delete a company by updating the company’s deleted attribute to true. Use the single-company update endpoint when you need to delete one company, or use the bulk company update endpoint when you need to delete multiple companies in one request.

Deleting a company this way marks the company as deleted. It does not use a separate DELETE endpoint.
Before you start

Before deleting companies, make sure you have:

    A valid Kustomer API key.
    Permission to update companies.
    The company ID for each company you want to delete.

Delete a single company

To delete one company, send a PUT request to the Update company attributes endpoint and set deleted to true.

Endpoint

PUT https://api.kustomerapp.com/v1/companies/{id}

Python example

import os
import requests

API_KEY = os.environ["KUSTOMER_API_KEY"]
COMPANY_ID = "COMPANY_ID"

url = f"https://api.kustomerapp.com/v1/companies/{COMPANY_ID}"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
}

payload = {
    "deleted": True
}

response = requests.put(url, headers=headers, json=payload)
response.raise_for_status()

print(response.json())

A successful response returns the updated company resource.
Delete multiple companies in a batch

To delete multiple companies in one request, send a PUT request to the Bulk batch update companies endpoint. Include each company ID in the request body and set deleted to true for each company.

Endpoint

PUT https://api.kustomerapp.com/v1/companies/bulk

Python example

import os
import requests

API_KEY = os.environ["KUSTOMER_API_KEY"]

url = "https://api.kustomerapp.com/v1/companies/bulk"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
}

payload = [
    {
        "id": "COMPANY_ID_1",
        "deleted": True
    },
    {
        "id": "COMPANY_ID_2",
        "deleted": True
    },
    {
        "id": "COMPANY_ID_3",
        "deleted": True
    }
]

response = requests.put(url, headers=headers, json=payload)
response.raise_for_status()

print(response.json())

The bulk batch update endpoint accepts up to 100 companies per request.
Delete multiple companies with the same update payload

You can also pass company IDs in the ids query parameter and send one shared update payload. Use this format when every company should receive the same update.

Python example

import os
import requests

API_KEY = os.environ["KUSTOMER_API_KEY"]

company_ids = [
    "COMPANY_ID_1",
    "COMPANY_ID_2",
    "COMPANY_ID_3",
]

url = "https://api.kustomerapp.com/v1/companies/bulk"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
}

params = {
    "ids": ",".join(company_ids)
}

payload = {
    "deleted": True
}

response = requests.put(url, headers=headers, params=params, json=payload)
response.raise_for_status()

print(response.json())

Recommended workflow

    Confirm that each company ID is correct before sending the request.
    For one company, use PUT /v1/companies/{id}.
    For multiple companies, use PUT /v1/companies/bulk.
    For large sets of companies, split the request into batches of 100 or fewer companies.
    Log the response from each request so you can confirm which update was submitted.

Handle errors

Use standard API error handling for failed requests. For example, catch request errors and print the response body so you can inspect validation or permission errors.

import os
import requests

API_KEY = os.environ["KUSTOMER_API_KEY"]
COMPANY_ID = "COMPANY_ID"

url = f"https://api.kustomerapp.com/v1/companies/{COMPANY_ID}"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
}

payload = {
    "deleted": True
}

try:
    response = requests.put(url, headers=headers, json=payload)
    response.raise_for_status()
except requests.HTTPError as error:
    print("Request failed")
    print("Status code:", response.status_code)
    print("Response:", response.text)
    raise error

print(response.json())

Notes

    The single-company update endpoint is subject to object rate limiting.
    The bulk batch update endpoint is recommended when deleting multiple companies.
    The batch body format requires an id for each company.
    The bulk batch update endpoint accepts a maximum of 100 companies per request.
    Setting deleted to true marks the company as deleted.


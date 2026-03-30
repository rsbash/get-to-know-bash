> The point of this exercise was to utilize AI to write a quickstart guide for a real product. I have broke this excercise down into these steps:
>
> 1. First, craft an intro that outlines starting requirements and briefly discusses the point of the guide. 
> 2. Craft each step in a similar technical style, manually reviewing and testing each step and correcting for hallucinations.
> 3. Final technical pass, including QA test to break. 

## Quick‑Start: Adding a Customer with Kustomer’s Node SDK  

Use this short guide to create a single customer record inside your Kustomer account with the official **Node.js SDK**. This guide covers only the essentials:

* Installing the correct packages
* Setting up authentication
* Running a script to push a customer record to the API.  

This project is configured to communicate with the Kustomer sandbox. Target production by replacing the base URL from your environment variable (`KUSTOMER_API_BASE_URL`) with your own production endpoint. 

**What you need before you begin:**

| Item | Why it matters |
|------|----------------|
| **Node.js (v18+)** | Used to run the SDK in a Node runtime. |
| **npm or Yarn** | Installs the `@kustomer/sdk` package. |
| **Kustomer account** | A required workspace to create data in. |
| **API key** (or OAuth token) | Authenticates every request made to the API. |
| **Text editor** | Used to write code for this example. |

For this workflow you will execute a single JavaScript file and then see a new customer appear in your Kustomer console. 

Let's begin. 

### Step 1 – Install the Node SDK and Add Your API Key 

Before we begin, make sure a project folder has been created:

   ```bash
   mkdir kustomer‑node‑quickstart
   cd kustomer‑node‑quickstart
   ```

1. **Initialize the Project**

Create a fresh `package.json` for the SDK and its dependencies:  

   ```bash
   npm init -y          # (or `yarn init -y` if you prefer Yarn)
   ```

> These instructions proceed as though you are using `npm`.


2. **Install the Official Kustomer SDK**  

   ```bash
   npm install @kustomer/sdk
   ```


3. **Add Your API Key**  
   
   The Kustomer SDK looks for the key in the `KUSTOMER_API_KEY` environment variable.  
   
   Using MacOS/Linux, run the following:  

   ```bash
   export KUSTOMER_API_KEY="YOUR‑SANDBOX‑API‑KEY"
   ```

   Using Windows PowerShell, run the following:
     
   ```powershell
   $env:KUSTOMER_API_KEY = "YOUR-SANDBOX-API-KEY"
   ```

   > **Tip**
   >
   > For local testing, you can place the key in a `.env` file and load it with `dotenv`, but the shell export is used in this quickstart guide for simplicity.


4. **Point the SDK to the sandbox**.  
   
   Because the SDK defaults to production (`https://api.kustomer.com`), we will override the setting `KUSTOMER_API_BASE_URL` and point it to the sandbox endpoint:

  Using MacOS/Linux, run the following:

   ```bash
   export KUSTOMER_API_BASE_URL="https://api-sandbox.kustomer.com"
   ```

   Using Windows PowerShell, run the following:

   ```powershell
   $env:KUSTOMER_API_BASE_URL = "https://api-sandbox.kustomer.com"
   ```

> **Scope checklist**  
> Your API key must have the `org.permission.customer.create` permission before you can create a record. To review your user's scope:
> 1. Login to Kustomer and navigate to **Kustomer Admin**.
> 2. Click **API keys**. Locate your API Key. 
> 3. Click **Permissions** to view the permissions granted to your API key.

---

### What’s Next?

With the SDK installed and the environment variables set, you’re ready to create a script that pushes a customer to your sandbox. The next step walks through that file.


## Step 2 – Write & Run the “Create Customer” Script

Below is a fully commented single‑file example called `create-customer.js`. This minimal script creates a customer in the sandbox environment. 

```js
/**
 * create-customer.js
 * ------------------
 * A minimal Node.js script that uses the Kustomer SDK to create a customer
 * in your sandbox environment.
 */
 
// 1️⃣  Imports the Kustomer SDK
const Kustomer = require('@kustomer/sdk');

// 2️⃣  Instantiates a client.  
//     The SDK automatically reads `KUSTOMER_API_KEY` 
//     and (if present) `KUSTOMER_API_BASE_URL` from the environment.
const client = new Kustomer();

// 3️⃣  Build a customer payload.
//     Kustomer’s Customer resource requires the following minimal fields:
//       • firstName  – The customer’s first name
//       • lastName   – The customer’s last name
//       • email      – The customer’s email address
//
//     You can add more optional fields (phoneNumber, tags, etc.) if needed.
//     See 
const newCustomer = {
  firstName: 'Jane',
  lastName:  'Doe',
  email:     'jane.doe@example.com'
};

// 4️⃣  Call the SDK to create the customer.
//     `client.customers.create` returns a Promise that resolves
//     with the complete Customer object returned by the API.
client.customers.create(newCustomer)
  .then(customer => {
    // ✅ Success – log the returned customer ID and name.
    console.log('Customer created successfully!');
    console.log(`ID:   ${customer.id}`);
    console.log(`Name: ${customer.firstName} ${customer.lastName}`);
  })
  .catch(error => {
    // ⚠️  If the API returns an error (validation, auth, etc.), it lands here.
    console.error('Failed to create customer.');
    console.error('Error details:', error);
  });
```

### How to Run the Script

   Before you begin: **Make sure the environment variables are still loaded**. If you closed the terminal, re‑export them or reopen the terminal session.

2. **Execute the Script Using Node:**

   ```bash
   node create-customer.js
   ```

3. **Observe the Output** 

   On success, you should see an output similar to this:

   ```
   Customer created successfully!
   ID:   c_1kz8f3T3...
   Name: Jane Doe
   ```

   On failure, an error object is printed that typically contains:
   
   * A `message` field that describes the error
   * A `response` object with HTTP status codes and validation details

That’s it! You’ve just fired up the Kustomer SDK from a Node script and created a customer in your sandbox. 🎉

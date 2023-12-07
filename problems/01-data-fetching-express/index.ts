import express from "express";

/*************************************************/
// Types
/*************************************************/

// Create Types here

/*************************************************/
// Main
/*************************************************/
const app = express();
const PORT = 3001;

/*
- /companies
- /companies/{companyId} 
- /companies/{companyId}/users
- /companies/{companyId}/users/{userId}
- /companies/{companyId}/users/{userId}/cards (Monetary values included in the response are in USD)
- /currency - Returns a single result of the USD-MXN conversion rate

The base URL is: https://6265c93563e0f38256791978.mockapi.io/jeeves

Output:
-------

{
    companyName: "Titus co.",
    currencyCode: 'MXN',
    usersWithSpend: [
      {
        userName: "Anne Berkeley",
        cards: [
          {
            lastFour: "5526"
          }
        ],
        availableSpend: 96200
        // in MXN
      },
      {
        userName: "Jimmy Smits",
        cards: [
          {
            lastFour: "7338"
          }
        ],
        availableSpend: 37400
        // in MXN
      }
    ],
    usersWithoutSpend: [
      {
        userName: "Taylor Reed",
        cards: [
          {
            lastFour: "2383"
          }
        ],
        availableSpend: 0
      }
    ]
  }
*/

app.get("/", async (_, res) => {
  // Build the solution here.
  res.send("Hello world!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

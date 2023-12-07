/*
We have the following API routes (REST-based):

- /companies
- /companies/{companyId} 
- /companies/{companyId}/users
- /companies/{companyId}/users/{userId}
- /companies/{companyId}/users/{userId}/cards (Monetary values included in the response are in USD)
- /currency - Returns a single result of the USD-MXN conversion rate

The base URL is: https://6265c93563e0f38256791978.mockapi.io/jeeves

> Create a function that returns a list of objects that contain a user-readable company name, currency code, and two collections. 
> One collection should contain users with available spend and the other collection should contain users that do not have available spend. 
> All entries should be sorted alphabetically. 
> Each entry in the collection should show a username, a list of all cards with the last four digits of the card number, and the available spend in the local currency (MXN). 
> The remaining spend can be determined by subtracting the balance from the spend limit. 
> If the available spend is less than zero, we should render zero for the available spend instead of negative numbers.

Below is an example of how the result should look like:

[
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
]


// /companies/{companyId}/users/{userId}/cards
[{"createdAt":"2022-05-02T11:13:47.255Z","currency":"MXN","cardInfo":{"cardNumber":"6304533018585378","CVV":"876","spendLimit":88401,"balance":30807},"id":"1","userId":"1"},{"createdAt":"2022-05-01T20:18:45.068Z","currency":"MXN","cardInfo":{"cardNumber":"3675-439004-8561","CVV":"715","spendLimit":59801,"balance":79816},"id":"12","userId":"1"},{"createdAt":"2022-05-02T07:56:33.189Z","currency":"MXN","cardInfo":{"cardNumber":"6381-6463-1827-3170","CVV":"698","spendLimit":61225,"balance":8415},"id":"23","userId":"1"}]

[
  {
    "createdAt": "2022-05-02T11:13:47.255Z",
    "currency": "MXN",
    "cardInfo": {
      "cardNumber": "6304533018585378",
      "CVV": "876",
      "spendLimit": 88401,
      "balance": 30807
    },
    "id": "1",
    "userId": "1"
  },
  {
    "createdAt": "2022-05-01T20:18:45.068Z",
    "currency": "MXN",
    "cardInfo": {
      "cardNumber": "3675-439004-8561",
      "CVV": "715",
      "spendLimit": 59801,
      "balance": 79816
    },
    "id": "12",
    "userId": "1"
  },
  {
    "createdAt": "2022-05-02T07:56:33.189Z",
    "currency": "MXN",
    "cardInfo": {
      "cardNumber": "6381-6463-1827-3170",
      "CVV": "698",
      "spendLimit": 61225,
      "balance": 8415
    },
    "id": "23",
    "userId": "1"
  }
]

*/

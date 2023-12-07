import express from "express";
import axios from "axios";

/*************************************************/
// Types
/*************************************************/
interface Company {
  createdAt: string;
  name: string;
  active: boolean;
  id: `${number}`;
}

interface UserWithOrWithoutSpend {
  userName: string;
  cards: {
    lastFour: `${number}` | string;
  }[];
  availableSpend: number;
}

interface Card {
  createdAt: string;
  currency: string;
  cardInfo: {
    cardNumber: `${number}`;
    CVV: `${number}`;
    spendLimit: number;
    balance: number;
  };
  id: `${number}`;
  userId: `${number}`;
}

interface Currency {
  createdAt: string;
  conversionRate: number;
  id: `${number}`;
}

interface OutputObject {
  companyName: string;
  currencyCode: string;
  usersWithSpend: UserWithOrWithoutSpend[];
  usersWithoutSpend: UserWithOrWithoutSpend[];
}

/*************************************************/
// Main
/*************************************************/
const app = express();
const PORT = 3001;
const baseURL = `https://6265c93563e0f38256791978.mockapi.io/jeeves`;

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
  try {
    const { data: companies }: { data: Company[] } = await axios.get(
      `${baseURL}/companies`
    );
    const { data: currency }: { data: Currency[] } = await axios.get(
      `${baseURL}/currency`
    );

    const output: OutputObject[] = [];
    for (const { name: companyName, id } of companies) {
      const { data: users } = await axios.get(
        `${baseURL}/companies/${id}/users`
      );

      const usersWithSpend: UserWithOrWithoutSpend[] = [];
      const usersWithoutSpend: UserWithOrWithoutSpend[] = [];
      for (const user of users) {
        const { data: cards }: { data: Card[] } = await axios.get(
          `${baseURL}/companies/${id}/users/${user.id}/cards`
        );

        let availableSpend = cards.reduce(
          (acc, { cardInfo }) =>
            acc +
            (cardInfo.spendLimit - cardInfo.balance) *
              currency[0].conversionRate,
          0
        );
        availableSpend = availableSpend < 0 ? 0 : availableSpend;

        (availableSpend === 0 ? usersWithoutSpend : usersWithSpend).push({
          userName: user.name,
          cards: cards.map(({ cardInfo: { cardNumber } }) => {
            const parsedCardNumber = cardNumber.replace(/-/g, "");

            return {
              lastFour: parsedCardNumber.slice(parsedCardNumber.length - 4),
            };
          }),
          availableSpend,
        });
      }

      output.push({
        companyName,
        currencyCode: "MXN",
        usersWithSpend,
        usersWithoutSpend,
      });
    }
    res.json(output.sort((a, b) => a.companyName.localeCompare(b.companyName)));
  } catch (e) {
    if (e instanceof Error) console.error(e.message);
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

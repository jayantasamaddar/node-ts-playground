# 00 - Data Fetching Basics

This API: "https://restcountries.com/v3.1/all" returns a list of country objects with their properties as shown in [countries.json](./countries.json).

**Do the following**:

- Fetch this list using `fetch` or `axios`.
- Print out a list of countries with the following attributes:
  - `name`: official name of the country
  - `languages`: List of languages (three-letter acronym)
  - `dialcodes`: The available dialcodes of a country.

**Sample response**:

```js
[
  {
    name: "Ukraine",
    languages: ["ukr"],
    dialcodes: ["+380"],
  },
  {
    ...
  }
];
```

// Define Types

interface Country {
  name: {
    official: string;
  };
  languages?: {
    [k: string]: string;
  };
  idd: {
    root: `+${number}`;
    suffixes?: `${number}`[];
  };
}

// Working Area
const getCountries = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countries = (await response.json()) as Country[];
    console.log(
      countries.map((country) => ({
        name: country.name.official,
        languages: Object.keys(country.languages ?? {}),
        dialcodes: country.idd.suffixes
          ? country.idd.suffixes.map((suffix) => country.idd.root + suffix)
          : [country.idd.root],
      }))
    );
  } catch (e) {
    if (e instanceof Error) console.log(e);
  }
};

getCountries();

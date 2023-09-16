
const getUrlForCoffeeStores = (latlong,query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&limit=${limit}`
}

export const fetchCoffeStores = async () => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.FOURSQUARE_API_KEY,
        }
      };
      
      const response = await fetch(
        getUrlForCoffeeStores(
        "51.570159050457534,-0.013223502530886203",
         "coffee",
         4
        ), options)

    const data = await response.json()
      
     return data.results;
    }
      

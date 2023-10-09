import { createApi } from 'unsplash-js';

const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACESS_KEY,
});

const getListofCoffeeStorePhotos = async () => {

    const photos = await unsplash.search.getPhotos({
        query: "coffee shop",
        page: 1,
        perPage: 8,
    });

    const unsplashResults = photos.response.results;
    return unsplashResults.map((result) => (result.urls['small']))


}



const getUrlForCoffeeStores = (latlong, query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&limit=${limit}`
}

export const fetchCoffeStores = async () => {
const photos = await getListofCoffeeStorePhotos()
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
            8
        ), options)

    const data = await response.json()

    return data.results.map((results, i)=>{
        return {
            ...results,
            imgUrl: photos[i],
        }
    })

    
}


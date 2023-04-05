// Reminder: Supply a valid API key or the API requests will not work!

async function getMeal() {
    const customHeader = new Headers();
    // This is where you set the api key
    const apiKey = "8d5bc60034c841b49d1476a3e39b9c6f";
    customHeader.append("x-api-key", apiKey);

    const mealIDs = [];
    let query = "burger";
    let dish_type = "snack";
    let number = "3";
    const url = "https://api.spoonacular.com/recipes/complexSearch?" + "query="
                 + query + "&type=" + dish_type + "&number=" + number;

    const response = await fetch(url, {
        headers: customHeader
    });

    const meals = await response.json();
    meals.results.forEach(result => {
        mealIDs.push(result.id);
    });

    console.log(meals); // Remove this line when getMeal has been fully tested
    return mealIDs;
}

function getMealInfos(mealIDs) {
    const customHeader = new Headers();
    // This is where you set the api key
    const apiKey = "8d5bc60034c841b49d1476a3e39b9c6f";
    customHeader.append("x-api-key", apiKey);

    let url = "";
    let response = null;
    const mealInfos = [];
    let mealInfo = "";


    for (const mealID of mealIDs) {
        url = `https://api.spoonacular.com/recipes/${mealID}/information?includeNutrition=false`;
        // This setTimeout is needed to avoid exceeding the request rate limit of spoonacular API
        // by delaying the next request to 3 seconds
        setTimeout(async() => {
            response = await fetch(url, {
                headers: customHeader
            });
            mealInfo = await response.json(); 
            mealInfos.push(mealInfo);
        }, 3000);
    }

    return mealInfos;
}

/* getMeal().then((mealIDs) => {
    console.log(mealIDs);
}); */
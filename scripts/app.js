// Reminder: Supply a valid API key or the API requests will not work!
// This is where you set the api key
const apiKey = "";

async function getMeal(query, numberOfResults) {
    const customHeader = new Headers();
    
    customHeader.append("x-api-key", apiKey);

    const mealIDs = [];
    const url = "https://api.spoonacular.com/recipes/complexSearch?" + "query="
                 + query + "&number=" + numberOfResults;

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

function getMealInfoURLs(mealInfos) {
    
}

getMeal("ice cream", "3").then((mealIDs) => {
    const mealInfosList = getMealInfos(mealIDs);
    console.log(mealInfosList);
});
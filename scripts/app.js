// Reminder: Supply a valid API key or the API requests will not work!
// This is where you set the api key
const apiKey = "";

// Returns an array of at most mealIDs. Each mealID corresponds to a specific meal
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

// Returns an array of mealInfo objects from a meal search. Each mealInfo object contains specific
// information about each meal
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

function getMealOriginalSource(mealInfos) {
    const mealOriginalSources = [];
    

    for (const mealInfo of mealInfos) {
        let mealOriginalSourceMap = new Map();
        if (mealInfo.sourceName) {
            mealOriginalSourceMap.set("sourceName", mealInfo.sourceName);
        }

        if (mealInfo.sourceUrl) {
            mealOriginalSourceMap.set("sourceURL", mealInfo.sourceUrl);
        }

        mealOriginalSources.push(mealOriginalSourceMap);
    }

    return mealOriginalSources;
}

getMeal("ice cream", "3").then((mealIDs) => {
    const mealInfosList = getMealInfos(mealIDs);
    console.log(mealInfosList);
});
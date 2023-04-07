// Reminder: Supply a valid API key or the API requests will not work!
// This is where you set the api key
const apiKey = "8d5bc60034c841b49d1476a3e39b9c6f";

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

    console.log(meals); // Remove this line when getMeal has been fully tested, Test Ok
    console.log(mealIDs); // Test Ok
    return mealIDs;
}

// Returns an array of mealInfo objects from a meal search. Each mealInfo object contains specific
// information about each meal
async function getMealInfos(mealIDs) {
    const customHeader = new Headers();
    customHeader.append("x-api-key", apiKey);

    let url = "";
    let response = null;
    const mealInfos = [];
    let mealInfo = "";

    console.log("Here are the IDs: " + mealIDs); // Test Ok
    for (const mealID of mealIDs) {
        console.log("ID is now: " + mealID); // Test ok
        url = `https://api.spoonacular.com/recipes/${mealID}/information?includeNutrition=false`;
        
            response = await fetch(url, {
                headers: customHeader
            });
            mealInfo = await response.json(); 
            mealInfos.push(mealInfo);
    }
    
        console.log("Here are all the meal infos " + mealInfos); // Test Fail
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

getMeal("fried chicken", "3").then((mealIDs) => {
     getMealInfos(mealIDs).then((mealInfosList) => {
        console.log(mealInfosList); // Test Fail
    
        console.log(mealInfosList[0].title);
        console.log(mealInfosList[0].sourceName);
        console.log(mealInfosList[0].sourceUrl);

        console.log(mealInfosList[1].title);
        console.log(mealInfosList[1].sourceName);
        console.log(mealInfosList[1].sourceUrl);

        console.log(mealInfosList[2].title);
        console.log(mealInfosList[2].sourceName);
        console.log(mealInfosList[2].sourceUrl);
    });
        
    
    /* const mealOriginalSourcesMapArray = getMealOriginalSource(mealInfosList);
    console.log(mealOriginalSourcesMapArray);
    
    mealOriginalSourcesMapArray.forEach((mealOriginalSourceMap) => {
        console.log(mealOriginalSourceMap);
    }); */
});
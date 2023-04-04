// Reminder: Supply a valid API key or this API request will not work!
async function getMeal() {
    const customHeader = new Headers();
    // This is where you set the api key
    const apiKey = "";
    customHeader.append("x-api-key", apiKey);

    const mealID = [];
    let query = "corn dog";
    let dish_type = "snack";
    let number = "3";
    const url = "https://api.spoonacular.com/recipes/complexSearch?" + "query="
                 + query + "&type=" + dish_type + "&number=" + number;

    const response = await fetch(url, {
        headers: customHeader
    });
    const meals = await response.json();
    meals.results.forEach(result => {
        mealID.push(result.id);
    });

    console.log(meals);
    return mealID;
}

async function getMealURL(mealID) {
    
}

// getMeal();
let isBreadAvailable = true;
let isCheeseAvailable = true;
let isCucumberAvailable = true;
let isTomatoAvailable = false;

function createSandwich(){
    checkBread(checkCucumber)
};

function checkBread(cb){
    if(isBreadAvailable===true){
        cb(checkCucumber);

    }
    else{
        console.log("Bred is not available");
    }
};

function checkCheese(cb){
    if(isCheeseAvailable===true){
        cb(checkTomato);

    }
    else{
        console.log("Cheese is not available.");
    }
};

function checkCucumber(cb){
    if(isCucumberAvailable===true){
        cb(checkCheese);

    }
    else{
        console.log("Cucumber is not available.");
    }
};

function checkTomato(){
    if(isTomatoAvailable===true){
        console.log("Bread is ready...!");

    }
    else{
        console.log("Tomato is not available");
    }
}
createSandwich();
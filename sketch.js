//Create variables here
var dog, happyDog, database, foodS, foodStock;
var Dog;
var database;
var dbref;
var feed;
var fedTime,lastFeed;
var addFood;
var foodObj;
function preload()
{
  //load images here
  dog=loadImage("images/dogimg.png");
 happyDog =loadImage("images/dogimg1.png")
}

function setup() {
	createCanvas(1000, 500);
  database=firebase.database();
  Dog=createSprite(850,390,20,20);
  Dog.addImage(dog);
  Dog.scale=0.3;
  foodObj=new Food();
  
 readstock();

feed=createButton("Feed the dog");
feed.position(700,95);
// if(foodObj.foodStock!=undefined){
feed.mousePressed(feedDog());

addFood=createButton("Add Food");
addFood.position(800,95);
// addFood.mousePressed(addFoods);

 
}


function draw() {  
background(46, 139, 87);
  drawSprites();



// fedTime=database.ref("FeedTime");
/* fedTime.on("value",function(data){
  lastFed=data.val();

});*/
// fill("black");
// textSize(20);
 // text("foodstockavailable:"+foodS,120,50);

//  foodObj.display();
}




async function readstock(){
  foodStock=await database.ref("Food").once("value");
  if(foodStock.exists()){
  // foodStock.on("value",readstock);
  foodS=foodStock.val();
  console.log(foodS);
  foodObj.updateFoodStock(foodS);
  }
}

function feedDog(){
  Dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  var x=foodObj.getFoodStock()
  console.log(x);
  database.ref("/").update({
    Food:x
  })
}


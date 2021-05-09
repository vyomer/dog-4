var dog, happyDog, database, foodS, foodStock
var dogImg, dogHappyImg;
var milk, milkImg;
var gameState;
var currentTime;
var lastFeed;

function preload()
{
  dogImg = loadImage("Dog.png");
  dogHappyImg = loadImage("happydog.png");
  milkImg = loadImage("milk.png");
  bedroom = loadImage("Bed Room.png")
  washroom = loadImage("Wash Room.png")
  garden =  loadImage("Garden.png")
  sad = loadImage("Lazy.png")
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;

 feedTime=database.ref("feedTime")
 feedTime.on("value",function(data){
   lastFeed=data.val()
 })

  dish = new Food()
  feed = createButton("^")
  feed.position(800,450)
  feed.mousePressed(feeddog)
  emo = createSprite(200,200,1,1);
  
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  foodStock.set(50);
  
  milk = createSprite(140,435,10,10);
  milk.addImage(milkImg);
  milk.scale = 0.025;

  milk1 = createSprite(210,280,10,10);
  milk1.addImage(milkImg);
  milk1.scale = 0.025;
  milk1.visible = false;


  for (var i = 5; i < 500; i=i+10) 
{

var dot = createSprite(i, 5, 3, 3);
dot.shapeColor = "blue";

}
for (var i = 5; i < 500; i=i+10) 
{

var dot1 = createSprite(i, 495, 3, 3);
dot1.shapeColor = "blue";

}
for (var i = 5; i < 500; i=i+10) 
{

var dot1 = createSprite(495,i, 3, 3);
dot1.shapeColor = "blue";

}
for (var i = 5; i < 500; i=i+10) 
{

var dot1 = createSprite(5,i, 3, 3);
dot1.shapeColor = "blue";

}
}


function draw() {  
  background("pink")
currentTime=hour()
  if(currentTime==(lastFeed+1)){
    dish.garden();
    update("playing")

  }else if(currentTime==(lastFeed+2)){
    dish.bedroom();
    update("sleeping")
  }else if(currentTime>(lastFeed+2)&&currentTime<(lastFeed+1)){
    dish.washroom();
    update("bathing")
  }else{
    update("hungry")
    dish.display();
  } 
  if(gameState!="hungry"){
    feed.hide();
    dog.remove();
  }else{
    feed.show()
    dog.addImage(sad)
  }



if(foodS == 0){
  
  dog.addImage(dogImg);
  foodS = 50;

}  

  drawSprites();
  textSize(17);
  
  text("Milk Bottles Remaining  "+foodS,170,440);
}

function readStock(data)
{
  foodS = data.val();
  dish.updateFoodStock(foodS)
}

function feeddog(){
  dog.addImage(dogHappyImg)
  dish.updateFoodStock(dish.getFoodStock())
  database.ref("/").update({
    feedTime:hour(),
    gameState:"hungry"
  })
  writeStock(dish.getFoodStock())
}

function update(state){
  database.ref("/").update({
  gameState:state
  })
}

function readDatabase(){
  read = database.ref("gameState")
  read.on("value",(data)=>{
  gameState = data.val()
  })
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }else{
    x=x-1
  }

  database.ref('/').update({
    food:x
  })
}


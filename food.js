class Food{
constructor(){
this.foodStock=0,
this.lastFed
this.milk=loadImage("milk.png")
}



getFoodStock(){
    return this.foodStock
}

updateFoodStock(foodStock){
      this.foodStock=foodStock
}
    
bedroom(){
  background(bedroom,100,100,199,199)
}
washroom(){
  background(washroom,100,100,199,199)
}
garden(){
  background(garden,100,100,199,199)
}

display(){
    var x = 75
    var y = 100
   
    if(foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
        if(i%10==0){
            x=75
            y=y+50
        }
        image(this.milk,x,y,50,50)
        x=x+30
        }
    }
}

}


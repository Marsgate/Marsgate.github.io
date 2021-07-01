
//fetch sun element
var sun = document.getElementById("sun");

var sunSize = 200;
var margin;

var sunDot = document.createElement("div");

//setting sun properties
sunDot.id = "sunDot";
sunDot.style.width = sunSize + "px";
sunDot.style.height = sunSize + "px";
sunDot.style.backgroundColor = "#ffffff";

//add the sun
sun.appendChild(sunDot);

rings(sunSize,1);


function rings(size,thisNum){
    //get the elements
    var sun = document.getElementById("sun");
    var ring = document.createElement("div");
    var container = document.createElement("div");

    

    //ring properties
    ring.className = "ring";
    
    //setting the margin between the sun and the rings
    thisNum = thisNum + 1;
    margin = 100;
    
    //width and height
    ring.style.width = size + margin + "px";
    ring.style.height = size + margin + "px";

    //set container properties
    container.id = "container";

    //random start position
    ring.style.WebkitTransform = "rotate("+Math.round(Math.random() * 359) +"deg)";
    
    //random orbit speed
    ring.style.WebkitAnimationDuration = margin/10 + "s"
    
    //create the planet
    var planet = document.createElement("div");
    planet.className = "planet";
    planet.style.marginTop = parseInt(ring.style.height)/2 - 13 + "px";
    planet.style.marginLeft = "-13px";
    
    //add ring to container
    container.appendChild(ring);
    
    //add ring to the document
    sun.appendChild(container);
    
    //add the planet to the ring
    ring.appendChild(planet);
}

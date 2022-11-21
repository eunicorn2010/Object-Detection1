img = '';
status = '';
objects = [];

function preload()
{
    img = loadImage('dog_cat.jpg');
}

function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function draw()
{
    image(video, 0, 0, 380, 380);
  if(status!=""){
      r=random(255);
      g=random(255);
      b=random(255);
    objectDetector.detect(video, gotResult);
      for(i = 0; i < objects.length; i++){
          document.getElementById("status").innerHTML= "STATUS: Objects Detected";
          document.getElementById("number_of_objects").innerHTML= "Number of objects DETECTED are" + objects.length;
          fill(r,g,b);
          per = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + per + "%", objects[i].x, objects[i].y);
          noFill();
          stroke(r,g,b);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      }
  }
}

function modelLoaded()
{
    console.log('Model is LOADED');
    status = true;
}

function gotResult(error, results)
{
 if(error){
     console.log(error);
 }   
 else{
     console.log(results);
     objects = results;
 }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = 'STATUS: Detecting objects';
}

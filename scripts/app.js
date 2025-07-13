 let img1 = document.querySelector('#img1');
    let img2 = document.querySelector('#img2');

    //Drop 
    img1.style.top = "150px";
    img2.style.top = "150px";

    //Split  
    setTimeout(() => {
      img1.style.left = "15%";
      img2.style.left = "85%";
    }, 1000); // 1 second matches transition time


    //text-timers
    setTimeout(function() {
    document.querySelector('#left').innerHTML = "left";
}, 2000);
 setTimeout(function() {
    document.querySelector('#right').innerHTML = "right";
}, 2000);

 setTimeout(function() {
    document.querySelector('#hTitle').innerHTML = "Welcome to the Portfolio Page of Tom Pikula";
}, 2000);
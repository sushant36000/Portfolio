// navbar js 

$(document).ready(function(){
    $(window).scroll(function(){
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        if(this.scrollY > 100){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    })
});
$('.scroll-up-btn').click(function(){
    $('html').animate({scrollTop:0});
});

// toogle menu script
$('.menu-btn').click(function(){
    $('.navbar .menu').toggleClass("active");
    $('.menu-btn i').toggleClass("active");
});

// Gallery js 

let galleryImages = document.querySelectorAll(".gallery-image");
let getLatestOpenedImg;
let windowWidth = window.innerWidth;

if(galleryImages){
    galleryImages.forEach(function(image, index){
        image.onclick = function(){
            let getElementCss = window.getComputedStyle(image);
            let getFullImgUrl = getElementCss.getPropertyValue("background-image");
            let getImgUrlPos = getFullImgUrl.split("/images/thumbs/");
            let setNewImgUrl = getImgUrlPos[1].replace('")', '');
         
            getLatestOpenedImg = index + 1;

            let container = document.body;
            let newImgWindow = document.createElement("div");
            container.appendChild(newImgWindow);
            newImgWindow.setAttribute("class", "img-window");
            newImgWindow.setAttribute("onclick", "closeImg()");


            let newImg = document.createElement("img");
            newImgWindow.appendChild(newImg);
            newImg.setAttribute("src", "images/"+ setNewImgUrl);
            newImg.setAttribute("id", "current-img");



            newImg.onload = function(){

                let imgWidth = this.width;
                let calcImgToEdge = ((windowWidth - imgWidth) / 2) -80;


                let newNextBtn = document.createElement("a");
                let btnNextText = document.createTextNode("Next");
                newNextBtn.appendChild(btnNextText);
                container.appendChild(newNextBtn);
                newNextBtn.setAttribute("class", "img-btn-next");
                newNextBtn.setAttribute("onclick", "changeImg(1)");
                newNextBtn.style.cssText = "right: "+ calcImgToEdge +"px;";

                let newPrevBtn = document.createElement("a");
                let btnPrevText = document.createTextNode("Prev");
                newPrevBtn.appendChild(btnPrevText);
                container.appendChild(newPrevBtn);
                newPrevBtn.setAttribute("class", "img-btn-prev");
                newPrevBtn.setAttribute("onclick", "changeImg(0)");
                newPrevBtn.style.cssText = "left: "+ calcImgToEdge +"px;";

                                
            }
            

        }
    });
}


function closeImg() {
    document.querySelector(".img-window").remove();
    document.querySelector(".img-btn-next").remove();
    document.querySelector(".img-btn-prev").remove();
    
}

function changeImg(changeDir){
    document.querySelector("#current-img").remove();
    
    let getImgWindow = document.querySelector(".img-window");
    let newImg = document.createElement("img");
    getImgWindow.appendChild(newImg);

    let calcNewImg;
    if(changeDir === 1){

        calcNewImg = getLatestOpenedImg + 1;
        if(calcNewImg > galleryImages.length){
            calcNewImg =1;
        }
    }

    else if(changeDir ===0){
        calcNewImg = getLatestOpenedImg - 1;
        if(calcNewImg < 1){
            calcNewImg = galleryImages.length;            
        }

    }

    newImg.setAttribute("src", "images/img" + calcNewImg + ".jpg");
    newImg.setAttribute("id", "current-img");

    getLatestOpenedImg =calcNewImg;

    newImg.onload = function(){
        let imgWidth = this.width;
        let calcImgToEdge = ((windowWidth - imgWidth) / 2) -80;

        let nextBtn = document.querySelector(".img-btn-next");
        nextBtn.style.cssText = "right: "+ calcImgToEdge +"px;";
        
        let prevBtn = document.querySelector(".img-btn-prev");
        prevBtn.style.cssText = "left: "+ calcImgToEdge + "px;";

    }
}

    // animateing text 
    // var typed = new Typed(".typing", {
    //     strings: ["Lighting Artist", "LookDev Artist"],
    //     typeSpeed: 200,
    //     backSpeed: 200,
    //     loop: true
    // });
    // var typed = new Typed(".typing-2", {
    //     strings: ["Lighting Artist", "LookDev Artist"],
    //     typeSpeed: 200,
    //     backSpeed: 200,
    //     loop: true
    // });


    // send Mail JS 

    var form = document.getElementById("my-form");
    
    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        status.classList.add('success')
        status.innerHTML = "Thanks for your submission!";
        form.reset()
      }).catch(error => {
        status.classList.add('error')
        status.innerHTML = "Oops! There was a problem submitting your form"
      });
    }
    form.addEventListener("submit", handleSubmit)
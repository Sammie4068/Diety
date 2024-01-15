const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const dot = document.querySelector('.dot');

navToggle.addEventListener('click', ()=>{
    document.body.classList.toggle('open');
    document.body.style.overflow=document.body.style.overflow== 'hidden' ? 'auto': 'hidden'
})

navLinks.forEach(link =>{
   link.addEventListener('click', ()=>{
   document.body.classList.remove('open');
   document.body.style.overflow='initial'   
  
   })
})

dot.addEventListener('click', ()=>{
   document.body.classList.toggle('open-dot');
   document.body.style.overflow=document.body.style.overflow== 'hidden' ? 'auto': 'hidden'
})

function scrollr() {
    var right = document.querySelector('.header-back-container');
    right.scrollBy(300, 0)
}
function scrolll() {
   var left = document.querySelector('.header-back-container');
   left.scrollBy(-300, 0)
}

function scrolln() {
   var next = document.querySelector('.horiz-container-sec');
   next.scrollBy(300, 0)
}
function scrollp() {
  var prev = document.querySelector('.horiz-container-sec');
  prev.scrollBy(-300, 0)
}
function scrollN() {
   var Next = document.querySelector('.horiz-container');
   Next.scrollBy(300, 0)
}
function scrollP() {
  var Prev = document.querySelector('.horiz-container');
  Prev.scrollBy(-300, 0)
}
function scrollf0() {
   var f0 = document.querySelector('.team-secondary-container');
   f0.scrollBy(300, 0)
}
function scrollb0() {
  var b0 = document.querySelector('.team-secondary-container');
  b0.scrollBy(-300, 0)
  
}
function scrollfr() {
   var fr = document.querySelector('.best-container');
   fr.scrollBy(150, 0)
}
function scrollbk() {
  var bk = document.querySelector('.best-container');
  bk.scrollBy(-150, 0)
}
function scrollf1() {
   var F1 = document.querySelector('.recomended-container');
   F1.scrollBy(180, 0)
}
function scrollb1() {
  var B1 = document.querySelector('.recomended-container');
  B1.scrollBy(-180, 0)
}

function scrollf2() {
   var F2 = document.querySelector('.deal-container');
   F2.scrollBy(180, 0)
}
function scrollb2() {
  var B2 = document.querySelector('.deal-container');
  B2.scrollBy(-180, 0)
}

var bigImg = document.getElementById("big-img");  
var smallImg = document.getElementsByClassName("small-img");

smallImg[0].addEventListener('click', ()=>{
   bigImg.src = smallImg[0].src
});
smallImg[1].addEventListener('click', ()=>{
   bigImg.src = smallImg[1].src
});
smallImg[2].addEventListener('click', ()=>{
   bigImg.src = smallImg[2].src
});
smallImg[3].addEventListener('click', ()=>{
   bigImg.src = smallImg[3].src
});
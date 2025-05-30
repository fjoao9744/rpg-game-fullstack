async function loadingTransition() {
  
sendLog("loading...")

function AnimateDiv() {
 const div1 = document.createElement("div")
 const div2 = document.createElement("div")

 function loadingAnimateLoop() {
    const states = {
      "loading": "loading.",
      "loading.": "loading..",
      "loading..": "loading...",
      "loading...": "loading"
    };

    const span = div2.querySelector(".smogon");
    const currentText = span ? span.textContent : "loading";

    const nextText = states[currentText] || "loading";
    span.textContent = nextText;
  }

  div2.innerHTML = "<span class='smogon'>loading</span>";

  setInterval(loadingAnimateLoop, 800);
   
  div1.classList.add("transition-window__area", "transition-window__top")
  div2.classList.add("transition-window__area", "transition-window__bottom")

  document.getElementById("root").appendChild(div1);
  document.getElementById("root").appendChild(div2);
  document.getElementById("root").style.overflow = "hidden"
  
  return [div1, div2]
  
}

function reverseAnimation(div1, div2) {
    div1.classList.remove("transition-window__top", "transition-window__reverse");
    div2.classList.remove("transition-window__bottom", "transition-window__reverse");
    
    void div1.offsetWidth;
    void div2.offsetWidth;

    div1.classList.add("transition-window__bottom", "transition-window__reverse");
    div2.classList.add("transition-window__top", "transition-window__reverse");
}

const [div1, div2] = AnimateDiv();
await new Promise(resolve => setTimeout(resolve, 2500))
reverseAnimation(div1, div2)
await new Promise(resolve => setTimeout(resolve, 5000))

document.getElementById("root").removeChild(div1);
document.getElementById("root").removeChild(div2);  
}

function monsterAnimation() {
  let geralAnimation = document.querySelector("#monster__image").animate(
    [
        {offset: 0, transform: "translateX(0)"},
        {offset: .2, transform: "translate(-5px)"},
        {offset: .4, transform: "translate(5px)"},
        {offset: .6, transform: "translate(-5px)"},
        {offset: .8, transform: "translate(5px)"},
        {offset: 1, transform: "translate(0)"}
    ],
    {
        duration: 10000,
        iterations: Infinity,
        easing: 'ease'
    }
  )
}
function damageAnimate() {
  document.querySelector("#monster__image").animate(
      { transform: ['translateX(0)', 
          'translateX(5%)', 
          'translateX(-5%)', 
          'translateX(5%)', 
          'translateX(-5%)', 
          'translateX(0)'] 
      },
      { 
          duration: 300, 
          easing: 'ease-in-out' 
      }
)
}

function damageLetterAnimation() {
  let letter = document.querySelector(".damage-letter")
  letter.style.display = "block";
  letter.animate(
    [
     {offset: 0, transform: "translateY(0)", opacity: "0", scale: "0"},
     {offset: .3, transform: "translateY(-200%)", opacity: "1", scale: "1"},
     {offset: .7, transform: "translateY(-180%)", opacity: "1", scale: "1"},
     {offset: 1, transform: "translateY(-180%)", opacity: "0", scale: "0.9"}
    ],
    {
      duration: 900,
      easing: 'ease-in-out',
      iterations: Infinity
    }
  )
}

async function monsterDeathAnimation() {
  await document.getElementById("test").animate(
    [
      {offset: 0, transform: "translateY(0px)", backgroundColor: "red"},
      {offset: .3, transform: "translateY(50px)", backgroundColor: "black"},
      {offset: .5, transform: "translateY(50px) rotate(45deg)", scale: "0.7"},
      {offset: .7, transform: "translateY(0px) rotate(80deg)", opacity: "1", backgroundColor: "black", scale: "0.7"},
      {offset: 1, transform: "translateY(50px) rotate(70deg)", opacity: "0", backgroundColor: "black", scale: "0.7"}
    ],
    {
      duration: 1500,
      easing: "ease"
    }
  ).finished
}

// animação pro tung tung sahur --->

// function damageLetterAnimation() {
//   let letter = document.querySelector(".damage-letter")
//   letter.style.display = "block";
//   letter.animate(
//     [
//      {offset: 0, transform: "translateY(0) translateX(0)", opacity: "0", scale: "0"},
//      {offset: .3, transform: "translateY(25%) translateX(20px)", opacity: "1", scale: "1"},
//      {offset: .7, transform: "translateY(20%) translateX(-20px)", opacity: "1", scale: "1"},
//      {offset: 1, transform: "translateY(0) translateX(0)", opacity: "0", scale: "0"}
//     ],
//     {
//       duration: 900,
//       easing: 'ease-in-out',
//       iterations: Infinity
//     }
//   )
// }
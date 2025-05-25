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
        {offset: 1, tramsform: "translate(0)"}
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
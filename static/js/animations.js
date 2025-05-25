async function loadingTransition() {

function AnimateDiv() {
 const div1 = document.createElement("div")
 const div2 = document.createElement("div")
 
  div2.textContent = "Loading...";
  
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
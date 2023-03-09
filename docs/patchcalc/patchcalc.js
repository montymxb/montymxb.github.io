let memory = []

let patchCalcElm = undefined

// adds a patch that corresponds a name to a function
const addPatch = name => fn => {
  patchCalcElm.insertAdjacentHTML('beforeend', "<button class='calc-button' onclick="+fn+">"+name+"</button>")
}

window.onload = () => {
  patchCalcElm = document.getElementById("console-id")
  addPatch("log2") ("log2")
  // ln
  // log10
  // P(x|y)

  // add single input
}

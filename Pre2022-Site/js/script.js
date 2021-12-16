/* general scripts for the site */

window.onload = (function () {
  // detect whether we have any 'proof' or 'todo' elements left
  let e1 = document.getElementsByTagName("PROOF");
  let e2 = document.getElementsByTagName("TODO");

  if(e1.length != 0) {
    // alert we have unproofread stuff
    console.warn("[UPHW] This document still has PROOF sections.");
  }

  if(e2.length != 0) {
    console.warn("[UPHW] This document still has TODO sections.");
  }

})

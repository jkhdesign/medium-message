let currentHandle = null;
let mouseStartX = null;
let mouseX = null;

let columns = document.querySelectorAll(".medium");
let handles = document.querySelectorAll(".handle");
let iframes = document.querySelectorAll("iframe");

handles.forEach(handle => {
  handle.onmousedown = event => {
    currentHandle = event.target;
    mouseStartX = event.clientX;
	iframes.forEach(iframe => iframe.style = "pointer-events: none");
  };
});

document.onmouseup = event => {
	currentHandle = null;
	iframes.forEach(iframe => iframe.style = "pointer-events: all");
};
document.onmousemove = event => mouseX = event.clientX;

function update() {
  if(currentHandle !== null) {
	
    // we are holding a handle, resize the columns
    let handleIndex = [].indexOf.call(handles, currentHandle);
    let expandingColumn = columns[handleIndex];
    let shrinkingColumn = columns[handleIndex + 1];
	
    expandingColumn.style = `width: calc(20% + ${mouseX - mouseStartX }px)`;
	shrinkingColumn.style = `width: calc(20% - ${mouseX - mouseStartX}px)`;
	
	console.log(shrinkingColumn.lastWidth);
  }
  requestAnimationFrame(update); // calls update() once per frame (preferred over setInterval for browser optimisation when in background)
}
update();

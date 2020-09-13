let theHandleWeAreCurrentlyResizing = null;
let theHorizontalCoordinateOfTheMouseWhenAHandleIsClicked = null;
let theCurrentHorizontalCoordinateOfTheMouse = null;

let columns = document.querySelectorAll(".medium");
let everyHandleElementOnThePage = document.querySelectorAll(".handle");

everyHandleElementOnThePage.forEach(handle => {
  handle.onmousedown = event => {
    theHandleWeAreCurrentlyResizing = event.target;
    theHorizontalCoordinateOfTheMouseWhenAHandleIsClicked = event.clientX;
  };
});

document.onmouseup = event => theHandleWeAreCurrentlyResizing = null;
document.onmousemove = event => theCurrentHorizontalCoordinateOfTheMouse = event.clientX;

function update() {
  if(theHandleWeAreCurrentlyResizing !== null) {
    // we are holding a handle, resize the columns
    let theIndexOfTheHandleElementThatWeAreCurrentlyResizing = [].indexOf.call(everyHandleElementOnThePage, theHandleWeAreCurrentlyResizing);
    let columnWeAreGoingToExpand = columns[theIndexOfTheHandleElementThatWeAreCurrentlyResizing];
    let columnWeAreGoingToShrink = columns[theIndexOfTheHandleElementThatWeAreCurrentlyResizing + 1];
    columnWeAreGoingToExpand.style = "width: calc(20% + " + (theCurrentHorizontalCoordinateOfTheMouse - theHorizontalCoordinateOfTheMouseWhenAHandleIsClicked) + "px)";
    columnWeAreGoingToShrink.style = "width: calc(20% - " + (theCurrentHorizontalCoordinateOfTheMouse - theHorizontalCoordinateOfTheMouseWhenAHandleIsClicked) + "px)";
  }
  requestAnimationFrame(update); // calls update() once per frame (preferred over setInterval for browser optimisation when in background)
}
update();

document.addEventListener("DOMContentLoaded", function() {

    var elementNumber = 20,
      sortContainer = document.getElementById('sortContainer'),
      sortButton = document.getElementById('sortButton'),
      divArray = [],
      newArray,
      globalIndex = 0;


    function createDivList(arr) {
      for (let index = 0; index < elementNumber; index++) {
        let div = document.createElement("div");
        let color = "rgb(" + (index + 1) * 10 + ", 40, 100)";
        div.style.backgroundColor = color;
        div.style.width = (index+1)*400/elementNumber + 'px';
        div.dataset.number = index;
        arr.push(div);
      }
    }

    function randomize(arr) {  
      var tempValue;
      for (let index = 0; index < arr.length; index++) {
        let randomIndex = Math.floor(Math.random() * index);
        swap(arr, index, randomIndex);
      }
    }

    function draw(arr) {
      for (let index = 0; index < arr.length; index++) {
        sortContainer.appendChild(arr[index]);
      }
    }

    function sort(arr) {
      var lastUnsorted = arr.length - 1;
      for (let index = 0; index < arr.length; index++) {
          for (let i = 0; i < (arr.length-index-1); i++) {
            globalIndex++;
            doTimeout(arr, i, index);
          }
      }
    }

    function doTimeout(arr, i, index) {
      setTimeout(function(){
          if (Number(arr[i].dataset.number) > Number(arr[i + 1].dataset.number)) {
            swap(arr, i, i+1);
            draw(arr);
          }
      }, (index*elementNumber+i)*1);
    }

    function swap(arr, currentIndex, nextIndex){
      var temp = arr[currentIndex];
      arr[currentIndex] = arr[nextIndex];
      arr[nextIndex] = temp;
    }

    function removeAllChilds(parentContainer) {
      while (parentContainer.firstChild) {
        parentContainer.removeChild(parentContainer.firstChild);
      }
    }

    function start() {
      newArray = [].slice.call(sortContainer.childNodes);
      sort(newArray);
    }

  sortButton.addEventListener('click', function(){
    start();
  });

  createDivList(divArray);
  randomize(divArray);
  draw(divArray);
  
});
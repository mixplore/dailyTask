document.addEventListener("DOMContentLoaded", function() {
    
    var elementNumber = 20,
      sortContainer = document.getElementById('sortContainer'),
      sortButton = document.getElementById('sortButton'),
      divArray = [],
      newArray,
      globalIndex = 0;

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

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

    async function draw(arr) {
      for (let index = 0; index < arr.length; index++) {
        sortContainer.appendChild(arr[index]);
      }
      await sleep(100);
    }

    // //Quicksort
    // function sort(array, less) {
      
    //    async function swap(i, j) {
    //      var t = array[i];
    //      array[i] = array[j];
    //      array[j] = t;
    //      await draw(array);
    //    }
      
    //    async function quicksort(left, right) {
      
    //      if (left < right) {
    //        var pivot = array[left + Math.floor((right - left) / 2)],
    //            left_new = left,
    //            right_new = right;
      
    //        do {
    //          while (less(array[left_new], pivot)) {
    //            left_new += 1;
    //          }
    //          while (less(pivot, array[right_new])) {
    //            right_new -= 1;
    //          }
    //          if (left_new <= right_new) {
    //            await swap(left_new, right_new);
    //            left_new += 1;
    //            right_new -= 1;
    //          }
    //        } while (left_new <= right_new);
      
    //        quicksort(left, right_new);
    //        quicksort(left_new, right);
      
    //      }
    //    }
      
    //    quicksort(0, array.length - 1);
      
    //    return array;
    // }

    async function quickSort(arr, left, right){
        var len = arr.length, 
        pivot,
        partitionIndex;
     
     
       if(left < right){
         pivot = right;
         partitionIndex = await partition(arr, pivot, left, right);
         
        //sort left and right
        quickSort(arr, left, partitionIndex - 1);
        quickSort(arr, partitionIndex + 1, right);
       }
       return arr;
    }  

    async function partition(arr, pivot, left, right){
        var pivotValue = Number(arr[pivot].dataset.number),
            partitionIndex = left;
     
        for(var i = left; i < right; i++){
         if(Number(arr[i].dataset.number) < pivotValue){
           await swap(arr, i, partitionIndex);
           partitionIndex++;
         }
       }
       await swap(arr, right, partitionIndex);
       return partitionIndex;
     }
                        
    async function swap(arr, currentIndex, nextIndex){
        var temp = arr[currentIndex];
        arr[currentIndex] = arr[nextIndex];
        arr[nextIndex] = temp;
        await draw(arr);
    }

    function doTimeout(arr, i, index) {
      setTimeout(function(){
          if (Number(arr[i].dataset.number) > Number(arr[i + 1].dataset.number)) {
            swap(arr, i, i+1);
            draw(arr);
          }
      }, (index*elementNumber+i)*1);
    }

    function removeAllChilds(parentContainer) {
      while (parentContainer.firstChild) {
        parentContainer.removeChild(parentContainer.firstChild);
      }
    }

    function start() {
      newArray = [].slice.call(sortContainer.childNodes);
      quickSort(newArray, 0, newArray.length-1);
    }

  sortButton.addEventListener('click', function(){
    start();
  });

  createDivList(divArray);
  randomize(divArray);
  draw(divArray);
  
});
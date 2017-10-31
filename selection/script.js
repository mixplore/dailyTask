document.addEventListener("DOMContentLoaded", function() {

  var setWidth = [50,90,30,10,40,110];
  var sorted = sort(setWidth);
  createElements(setWidth);
    
  function createElements(setWidth){
    console.log(setWidth);

    for(var i=0; i<setWidth.length; i++){
      var iDiv = document.createElement('div');
      document.getElementById("content").appendChild(iDiv);

      iDiv.className = 'block';
      iDiv.id = 'block_'+i;
      iDiv.style.width= setWidth[i]+"px";
    }
  }

  function sort(arr){
    var minIdx, temp, 
        len = arr.length;
    for(var i = 0; i < len; i++){
      minIdx = i;

      for(var  j = i+1; j<len; j++){
         if(arr[j]<arr[minIdx]){
            minIdx = j;
         }
      }
      temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
    }
  }    
});

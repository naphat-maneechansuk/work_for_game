type numberArray = number[];
let inputArray: numberArray = [1, 20, 3, 4, 20];
function number_of_max(arr:numberArray):number|string {
    let maxNum = Math.max(...arr);
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === maxNum) {
            count++;
        }
    }
    return count > 1 ? count : "Not Duplicate";
}

console.log(number_of_max(inputArray));

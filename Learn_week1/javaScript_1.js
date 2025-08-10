
// const myprint = require("./myprint");
import {addTwo} from "./myprint.js";

let value1
let value2 = null
let value3 = 0

console.log(value1, value2, value3);
let result = value1 || value2 || value3;
console.log(result);

let obj = {
    value: value1 || value2 || value3,
    result
};

console.log(obj);

if(false||console.log("hello")){}
x > 0 ? console.log("True") : console.log("False")

x > 0 && console.log("True")

(() => {
    console.log("Hello from IIFE");
})();

let a = () =>{
    console.log("a");
}

//myprint('TEST')
console.log(addTwo(1));
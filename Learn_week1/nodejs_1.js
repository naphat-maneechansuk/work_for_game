console.log("start")
setTimeout(() => {
    console.log("timeout 1")
    }, 0);
setTimeout(() => {
    console.log("timeout 2")
},100);

setImmediate(() => {
    console.log("immediate 1")
});
setImmediate(() => {
    console.log("immediate 2")
});

process.nextTick(() => {
    console.log("Next Tick 1")
});

process.nextTick(() => {
    console.log("Next Tick 2")
});

console.log("end")
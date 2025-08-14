let message:string = "Hello, TypeScript!";
console.log(message);

let price;
console.log(typeof price , price);
price = 9.95;
console.log(typeof price , price);
price = 0b100;
console.log(typeof price , price);
price = 0XA;
console.log(typeof price , price);
console.log(price)

let skill : [string|number,number|string]
skill = ['Programming', 5];
skill = [5 , 'Programming'];

type name = string
let fname:name;
/*
function a():never{
    console.log('Test')
    while(true){}
}
a()
*/
function a(message:string=""): void {
    console.log('test',message);
}

a()
a('Hello World')

function b(...input:number[]){
    console.log(input);
}

b(1, 2, 3)
b()
b(1)


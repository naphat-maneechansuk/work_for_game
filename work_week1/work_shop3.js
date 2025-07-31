/*
ให้นิสิตทำการสร้างฟังก์ชัน number_of_max เป็นฟังก์ชันที่มีการรับค่า ชุดตัวเลข โดยจะนำเข้าเป็นตัวเลขและเว้นวรรค ไปเรื่อยๆ 
จนกว่าจะจบบรรทัด เพื่อหาจำนวนของค่าที่มากที่สุดที่ซ้ำกันใน Array และคืนค่าจำนวนที่ได้ออกมา แต่ถ้าไม่มีจำนวน ที่ซ้ำกันเลยให้แสดงข้อความ
"Not Duplicate"
ตัวอย่างเช่น
Input 1 20 3 4 20
Output 2
เพราะว่า มีค่ามากที่สุด คือ 20 และ ซ้ำกันอยู่ 2 จำนวน จึงได้ผลลัพธ์เป็น 2
 */
import { createInterface } from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

/*
function number_of_max(arry) {
    const max = Math.max(...arry);
    const count = arry.filter(num => num === max).length;
    return count > 1 ? "output " + count : "Not Duplicate";
}
*/

function main() {
    const rl = createInterface({ input, output });
    rl.question("Enter numbers: ", (input) => {
        const numbers = input.split(" ").map(Number);
        const result = number_of_max(numbers);
        console.log(result);
        rl.close();
    });
}


function number_of_max(arry) {
    const max = 0;
    if (arry.length === 0) {
        return "Not Duplicate";
    }else{
        const count = 0
        for (let i = 0; i < arry.length; i++) {
            if (arry[i] > max) {
                max = arry[i];
                count = 1;
            } else if (arry[i] === max) {
                count++;
            }
        }
    }
    
}
main();



/*
ให้นิสิตเขียนโปรแกรมที่รับหมายเลขวันในสัปดาห์ (1-7) และแสดงชื่อวันนั้น
โดยถ้าเป็นเลข 1 จะแสดงวันอาทิตย์ และเลข 7 เป็นวันเสาร์
 */

import { createInterface } from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

const rl = createInterface({input, output});

rl.question("Enter day : " ,(day) => {
    switch(parseInt(day)) {
        case 1:
            console.log("วันนี้เป็นวันจันทร์");
            break;
        case 2:
            console.log("วันนี้เป็นวันอังคาร");
            break;
        case 3:
            console.log("วันนี้เป็นวันพุธ");
            break;
        case 4:
            console.log("วันนี้เป็นวันพฤหัสบดี");
            break;
        case 5:
            console.log("วันนี้เป็นวันศุกร์");
            break;
        case 6:
            console.log("วันนี้เป็นวันเสาร์");
            break;
        case 7:
            console.log("วันนี้เป็นวันอาทิตย์");
            break;
        default:
            console.log("กวนเหรอ?");
            break;
    }
    rl.close();  
});
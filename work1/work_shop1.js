import { createInterface } from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

const rl = createInterface({input, output});

rl.question("Enter your age: " ,(age) => {
    console.log(age)
    switch(true) {
        case age > 0 && age < 13:
            console.log("คุณยังเป็นเด็กอยู่");
            break;
        case age >= 13 && age < 20:
            console.log("คุณเป็นวัยรุ่น");
            break;
        case age >= 20:
            console.log("คุณเป็นผู้ใหญ่");
            break;
        default:
            console.log("ไม่ใช่มนุษย์ละ");
            break;
    }
    rl.close();  
});
/*
ให้นิสิตเขียนโปรแกรมที่ตรวจสอบอายุของผู้ใช้และแสดงข้อความตามช่วงอายุ (เด็ก, วัยรุ่น, ผู้ใหญ่) โดยจะรับข้อมูลมาเป็น อายุ และจะแสดงผมตามนี้
ถ้าอายุน้อยกว่า 13 ปี ให้แสดงเป็นคำว่า คุณเป็นเด็ก
ถ้าอายุมากกว่า 13 แต่ น้อยกว่า 20 ปี ให้แสดงเป็นคำว่า คุณเป็นวัยรุ่น
ถ้าอายุมากกว่า 20 ปี ให้แสดงคำว่า คุณเป็นผู้ใหญ่
*/
import { createInterface } from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

const rl = createInterface({input, output});

rl.question("Enter your age: " ,(age) => {
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
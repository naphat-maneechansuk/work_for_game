// นำเข้า mysql2/promise สำหรับเชื่อมต่อฐานข้อมูล MySQL แบบ async
import mysql, {PoolOptions} from "mysql2/promise";

// กำหนดค่าการเชื่อมต่อฐานข้อมูล โดยใช้ตัวแปรแวดล้อมหรือค่าเริ่มต้น
const config:PoolOptions = {
    host: process.env.DB_HOST || 'localhost', // ชื่อ host ของฐานข้อมูล
    user: process.env.DB_USER || 'root', // ชื่อผู้ใช้
    password: process.env.DB_PASSWORD || '', // รหัสผ่าน
    database: process.env.DB_NAME || 'webdb', // ชื่อฐานข้อมูล
    port: Number(process.env.DB_PORT || 3306) // พอร์ต
}

// สร้าง connection pool สำหรับใช้งานกับฐานข้อมูล
const db = mysql.createPool(config);

// ส่งออก db เพื่อใช้เชื่อมต่อฐานข้อมูลในไฟล์อื่น
export default db;
// นำเข้า db สำหรับเชื่อมต่อฐานข้อมูล MySQL
import db from './conection';
// นำเข้า type สำหรับผลลัพธ์ query จาก mysql2
import { RowDataPacket, OkPacket } from 'mysql2';

/**
 * ดึงข้อมูลผู้ใช้ทั้งหมด พร้อมชื่อคำนำหน้า
 * คืนค่าเป็นอาร์เรย์ของผู้ใช้แต่ละคน
 */
export async function getUserAll() {
  const [rows] = await db.query(`
    SELECT u.*, t.tit_name
    FROM users u
    LEFT JOIN titles t ON u.us_tit_id = t.tit_id
    ORDER BY u.us_id DESC
  `);
  return rows as RowDataPacket[];
}

/**
 * ดึงข้อมูลผู้ใช้ตาม id พร้อมชื่อคำนำหน้า
 * คืนค่าเป็น object ของผู้ใช้ (หรือ undefined ถ้าไม่พบ)
 */
export async function getUserById(id: number) {
  const [rows] = await db.query(`
    SELECT u.*, t.tit_name
    FROM users u
    LEFT JOIN titles t ON u.us_tit_id = t.tit_id
    WHERE u.us_id = ?
    LIMIT 1
  `, [id]);
  return (rows as RowDataPacket[])[0];
}


/**
 * สร้างผู้ใช้ใหม่
 * รับข้อมูลผู้ใช้เป็น object
 * คืนค่า OkPacket สำหรับดู insertId
 */
export async function createUser(user: {
  us_tit_id?: number | null;
  us_fname?: string | null;
  us_lname?: string | null;
  us_avatar?: string | null;
  us_username: string;
  us_password: string;
}) {
  const [result] = await db.query(`
    INSERT INTO users (us_tit_id, us_fname, us_lname, us_avatar, us_username, us_password)
    VALUES (?, ?, ?, ?, ?, ?)
  `, [
    user.us_tit_id ?? null,
    user.us_fname ?? null,
    user.us_lname ?? null,
    user.us_avatar ?? null,
    user.us_username,
    user.us_password
  ]);
  return result as OkPacket;
}

/**
 * อัปเดตข้อมูลผู้ใช้ตาม id
 * รับ id และ object ข้อมูลที่ต้องการอัปเดต
 * คืนค่า OkPacket สำหรับดู affectedRows
 */
export async function updateUser(id: number, user: {
  us_tit_id?: number | null;
  us_fname?: string | null;
  us_lname?: string | null;
  us_avatar?: string | null;
  us_username?: string;
  us_password?: string;
}) {
  const fields = [];
  const params = [];
  if (user.us_tit_id !== undefined) { fields.push('us_tit_id = ?'); params.push(user.us_tit_id); }
  if (user.us_fname !== undefined) { fields.push('us_fname = ?'); params.push(user.us_fname); }
  if (user.us_lname !== undefined) { fields.push('us_lname = ?'); params.push(user.us_lname); }
  if (user.us_avatar !== undefined) { fields.push('us_avatar = ?'); params.push(user.us_avatar); }
  if (user.us_username !== undefined) { fields.push('us_username = ?'); params.push(user.us_username); }
  if (user.us_password !== undefined) { fields.push('us_password = ?'); params.push(user.us_password); }
  if (!fields.length) return { affectedRows: 0 };
  params.push(id);
  const [result] = await db.query(`UPDATE users SET ${fields.join(', ')} WHERE us_id = ?`, params);
  return result as OkPacket;
}

/**
 * ลบผู้ใช้ตาม id
 * คืนค่า OkPacket สำหรับดู affectedRows
 */
export async function deleteUser(id: number) {
  const [result] = await db.query(`DELETE FROM users WHERE us_id = ?`, [id]);
  return result as OkPacket;
}

/**
 * ตรวจสอบว่ามี us_username ซ้ำหรือไม่
 */
export async function isUsernameExists(us_username: string): Promise<boolean> {
  const [rows] = await db.query(
    'SELECT COUNT(*) as count FROM users WHERE us_username = ?',
    [us_username]
  );
  const row = (rows as RowDataPacket[])[0];
  return row ? row.count > 0 : false;
}

// ส่งออกฟังก์ชันทั้งหมดสำหรับใช้งานกับข้อมูลผู้ใช้
export default { getUserAll, getUserById, createUser, updateUser, deleteUser, isUsernameExists };

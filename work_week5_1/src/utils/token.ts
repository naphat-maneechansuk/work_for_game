import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "this_is_a_secret_key" as string;
const expiresIn = process.env.JWT_EXPIRES_IN || "1h";

export const generateToken = (payload: any) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: 60 * 60 }); 
};
//คือค่า โดนหมดอายุ 1 ชั่วโมง
//60*60 = 1 hour
export const checkToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return { valid: true, payload: decoded };
    } catch (err: any) {
        if (err.name === 'TokenExpiredError') {
            return { expired: true, message: 'Token has expired' };
        }
        if (err.name === 'JsonWebTokenError') {
            return { error: 'JsonWebTokenError', message: 'Invalid token' };
        }
        return { error: 'UnknownError', message: err.message };
    }
};


// ทดสอบการสร้างและตรวจสอบ token
/*
const token = generateToken({ username: "username001" });
console.log("Generated token:", token);
console.log("CheckToken result:", checkToken(token));
console.log("JWT_SECRET:", JWT_SECRET);
*/
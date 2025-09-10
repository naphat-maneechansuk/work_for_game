import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "this_is_a_secret_key" as string;
const expiresIn = process.env.JWT_EXPIRES_IN || "1h";

export const generateToken = (payload: any) => {
    return jwt.sign({ payload }, JWT_SECRET, { expiresIn: 60 * 60 });
};
//คือค่า โดนหมดอายุ 1 ชั่วโมง
//60*60 = 1 hour
export const checkToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err: any) {
        if (err.name === 'TokenExpiredError') {
            return { error: 'TokenExpiredError', message: 'Token has expired' };
        }
        if (err.name === 'JsonWebTokenError') {
            return { error: 'JsonWebTokenError', message: 'Invalid token' };
        }
        return { error: 'UnknownError', message: err.message };
    }
};

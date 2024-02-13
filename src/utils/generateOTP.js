import bcryptjs from "bcryptjs";

export const generateOTP = () => {
    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); 
    // hash OTP
    const hashOTP = bcryptjs.hashSync(otp, parseInt(process.env.SALT_ROUND));
    return hashOTP;
};

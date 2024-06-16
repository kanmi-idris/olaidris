const generateOTP = () => {
  const otp = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit random number
  return otp.toString();
};
export default generateOTP;

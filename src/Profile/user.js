import { sample } from 'lodash';

// ----------------------------------------------------------------------

export const users = [...Array(24)].map((_, index) => ({
  id: Int32Array,
  firstName:String,
  email: String,
  lastName: String,
  password: String,
  role: sample([
    'UI/UX Designer',
    'Backend Developer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
}));
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'arahmouny0@gmail.com',
    pass: 'ayarah@123',
  },
});
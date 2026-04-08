import bcrypt from 'bcryptjs';

const password = 'sifre123';
const hash = bcrypt.hashSync(password, 12);
console.log('Password:', password);
console.log('Hash:', hash);
console.log('Verify:', bcrypt.compareSync(password, hash));

import fs from 'fs';

const p1 = fs.readFileSync('src/assets/photos/anjali_photo1.jpg').toString('base64');
const p2 = fs.readFileSync('src/assets/photos/couple_photo.jpg').toString('base64');
const p3 = fs.readFileSync('src/assets/photos/anjali_photo2.png').toString('base64');
const p4 = fs.readFileSync('src/assets/photos/anjali_photo3.png').toString('base64');

const content = `export const photoAnjali1 = 'data:image/jpeg;base64,${p1}';
export const photoCouple = 'data:image/jpeg;base64,${p2}';
export const photoAnjali2 = 'data:image/png;base64,${p3}';
export const photoAnjali3 = 'data:image/png;base64,${p4}';
`;

fs.writeFileSync('src/services/photoBase64.js', content);
console.log('Successfully created inline base64 photos!');

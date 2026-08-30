import fs from 'fs';
import path from 'path';
import https from 'https';

const categories = [
  { name: 'retail', url: 'https://unsplash.com/s/photos/boutique' },
  { name: 'gyms', url: 'https://unsplash.com/s/photos/fitness-woman-gym' },
  { name: 'restaurants', url: 'https://unsplash.com/s/photos/fine-dining' },
  { name: 'educators', url: 'https://unsplash.com/s/photos/public-speaking' }
];

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
      }
      
      const file = fs.createWriteStream(filepath);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
};

async function main() {
  const publicImagesDir = path.join(process.cwd(), 'public', 'images');
  
  if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
  }

  for (const cat of categories) {
    console.log(`Processing category: ${cat.name}...`);
    const catDir = path.join(publicImagesDir, cat.name);
    if (!fs.existsSync(catDir)) {
      fs.mkdirSync(catDir, { recursive: true });
    }

    try {
      const response = await fetch(cat.url);
      const text = await response.text();
      const matches = text.match(/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+/g);
      if (matches) {
        const uniqueIds = [...new Set(matches)].slice(0, 7); // 1 avatar, 6 posts
        console.log(`Found ${uniqueIds.length} images for ${cat.name}`);
        
        for (let i = 0; i < uniqueIds.length; i++) {
          const imgUrl = `https://${uniqueIds[i]}?w=400&q=80`;
          const filename = i === 0 ? 'avatar.jpg' : `post${i}.jpg`;
          const filepath = path.join(catDir, filename);
          
          console.log(`Downloading ${filename} for ${cat.name}...`);
          await downloadImage(imgUrl, filepath);
        }
      }
    } catch (err) {
      console.error(`Error processing ${cat.name}:`, err);
    }
  }
  
  console.log('All images downloaded successfully.');
}

main();

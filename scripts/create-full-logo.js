const sharp = require('sharp');
const path = require('path');

async function createFullLogo() {
  try {
    console.log('🎨 Création du logo complet avec image + textes...');
    
    const originalLogoPath = path.join(__dirname, '../public/logo-jardins-original.jpg');
    
    // Lire les dimensions de l'image originale
    const metadata = await sharp(originalLogoPath).metadata();
    console.log(`📐 Dimensions originales: ${metadata.width}x${metadata.height}`);
    
    // Créer un SVG avec l'image et les textes
    const svgLogo = `
    <svg width="1200" height="900" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&amp;family=Montserrat:wght@300;400&amp;display=swap');
          
          .title {
            font-family: 'Playfair Display', serif;
            font-size: 72px;
            font-weight: 700;
            fill: #2d5016;
            letter-spacing: 3px;
          }
          
          .subtitle {
            font-family: 'Montserrat', sans-serif;
            font-size: 24px;
            font-weight: 300;
            fill: #5a7c3e;
            letter-spacing: 10px;
          }
        </style>
      </defs>
      
      <!-- Image du logo en haut -->
      <image href="logo-jardins-original.jpg" x="100" y="50" width="1000" height="560"/>
      
      <!-- Texte "Les Jardins d'Alexandre" -->
      <text x="600" y="720" text-anchor="middle" class="title">Les Jardins d'Alexandre</text>
      
      <!-- Ligne décorative -->
      <line x1="300" y1="760" x2="900" y2="760" stroke="#6b8e4e" stroke-width="2" opacity="0.6"/>
      
      <!-- Sous-titre "ENTRETIEN - CRÉATION - ÉLAGAGE" -->
      <text x="600" y="820" text-anchor="middle" class="subtitle">ENTRETIEN - CRÉATION - ÉLAGAGE</text>
    </svg>`;
    
    const svgPath = path.join(__dirname, '../public/logo-final.svg');
    const fs = require('fs');
    fs.writeFileSync(svgPath, svgLogo);
    console.log('✅ SVG créé : logo-final.svg');
    
    // Convertir en AVIF
    const outputAvifPath = path.join(__dirname, '../public/logo-final.avif');
    await sharp(Buffer.from(svgLogo))
      .resize(1200, 900)
      .avif({
        quality: 90,
        effort: 6,
      })
      .toFile(outputAvifPath);
    
    console.log('✅ Logo final AVIF créé : public/logo-final.avif');
    
    // Version PNG
    const outputPngPath = path.join(__dirname, '../public/logo-final.png');
    await sharp(Buffer.from(svgLogo))
      .resize(1200, 900)
      .png({ quality: 100 })
      .toFile(outputPngPath);
    
    console.log('✅ Logo final PNG créé : public/logo-final.png');
    
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

createFullLogo();

const sharp = require('sharp');
const path = require('path');

async function createCompositeLogoWithText() {
  try {
    console.log('🎨 Création du logo avec image + textes (composition)...');
    
    const originalLogoPath = path.join(__dirname, '../public/logo-jardins-original.jpg');
    
    // 1. Redimensionner l'image originale
    const resizedLogo = await sharp(originalLogoPath)
      .resize(1200, null, { fit: 'inside' })
      .toBuffer();
    
    const logoMetadata = await sharp(resizedLogo).metadata();
    console.log(`📐 Logo redimensionné: ${logoMetadata.width}x${logoMetadata.height}`);
    
    // 2. Créer un SVG avec juste les textes
    const textHeight = 250; // Espace pour les textes
    const totalHeight = logoMetadata.height + textHeight;
    
    const svgText = `
    <svg width="${logoMetadata.width}" height="${textHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&amp;family=Montserrat:wght@300&amp;display=swap');
          
          .title {
            font-family: 'Playfair Display', serif;
            font-size: 64px;
            font-weight: 700;
            fill: #000000;
            letter-spacing: 2px;
          }
          
          .subtitle {
            font-family: 'Montserrat', sans-serif;
            font-size: 22px;
            font-weight: 300;
            fill: #5a7c3e;
            letter-spacing: 8px;
          }
        </style>
      </defs>
      
      <!-- Rectangle blanc de fond -->
      <rect width="${logoMetadata.width}" height="${textHeight}" fill="white"/>
      
      <!-- Texte "Les Jardins d'Alexandre" -->
      <text x="${logoMetadata.width / 2}" y="100" text-anchor="middle" class="title">Les Jardins d'Alexandre</text>
      
      <!-- Ligne décorative -->
      <line x1="${logoMetadata.width / 4}" y1="140" x2="${logoMetadata.width * 3 / 4}" y2="140" 
            stroke="#6b8e4e" stroke-width="2" opacity="0.6"/>
      
      <!-- Sous-titre -->
      <text x="${logoMetadata.width / 2}" y="190" text-anchor="middle" class="subtitle">ENTRETIEN - CRÉATION - ÉLAGAGE</text>
    </svg>`;
    
    // 3. Convertir le SVG des textes en buffer
    const textBuffer = await sharp(Buffer.from(svgText))
      .resize(logoMetadata.width, textHeight)
      .toBuffer();
    
    console.log('✅ Textes générés');
    
    // 4. Composer l'image finale (logo + textes)
    const finalComposite = sharp({
      create: {
        width: logoMetadata.width,
        height: totalHeight,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    })
    .composite([
      {
        input: resizedLogo,
        top: 0,
        left: 0
      },
      {
        input: textBuffer,
        top: logoMetadata.height,
        left: 0
      }
    ]);
    
    console.log('✅ Image composite créée');
    
    // 5. Sauvegarder en AVIF
    const outputAvifPath = path.join(__dirname, '../public/logo-final.avif');
    await finalComposite
      .clone()
      .avif({
        quality: 90,
        effort: 6,
      })
      .toFile(outputAvifPath);
    
    console.log('✅ Logo final AVIF : public/logo-final.avif');
    
    // 6. Sauvegarder en PNG
    const outputPngPath = path.join(__dirname, '../public/logo-final.png');
    await finalComposite
      .clone()
      .png({ quality: 100 })
      .toFile(outputPngPath);
    
    console.log('✅ Logo final PNG : public/logo-final.png');
    
    console.log(`\n📏 Dimensions finales: ${logoMetadata.width}x${totalHeight}px`);
    
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

createCompositeLogoWithText();

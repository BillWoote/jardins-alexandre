const sharp = require('sharp');
const path = require('path');

async function convertLogo() {
  try {
    const svgPath = path.join(__dirname, '../public/logo-complet.svg');
    const outputPath = path.join(__dirname, '../public/logo-complet.avif');
    
    console.log('🎨 Conversion du logo SVG vers AVIF...');
    
    await sharp(svgPath)
      .resize(1600, 800) // Haute résolution pour netteté
      .avif({
        quality: 90,
        effort: 6,
      })
      .toFile(outputPath);
    
    console.log('✅ Logo converti avec succès : public/logo-complet.avif');
    
    // Créer aussi une version PNG pour fallback
    const pngPath = path.join(__dirname, '../public/logo-complet.png');
    await sharp(svgPath)
      .resize(1600, 800)
      .png({ quality: 100 })
      .toFile(pngPath);
    
    console.log('✅ Version PNG créée : public/logo-complet.png');
    
  } catch (error) {
    console.error('❌ Erreur lors de la conversion:', error);
    process.exit(1);
  }
}

convertLogo();

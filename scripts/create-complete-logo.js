const sharp = require('sharp');
const path = require('path');

async function createCompleteLogo() {
  try {
    const originalLogoPath = path.join(__dirname, '../public/logo-jardins-original.jpg');
    const outputAvifPath = path.join(__dirname, '../public/logo-jardins-complet.avif');
    const outputPngPath = path.join(__dirname, '../public/logo-jardins-complet.png');
    
    console.log('🎨 Création du logo complet avec image et textes...');
    
    // D'abord, créer la version AVIF de l'image originale
    await sharp(originalLogoPath)
      .resize(1200, null, { // Largeur 1200px, hauteur auto
        fit: 'inside',
        withoutEnlargement: false
      })
      .avif({
        quality: 90,
        effort: 6,
      })
      .toFile(outputAvifPath);
    
    console.log('✅ Logo converti en AVIF : public/logo-jardins-complet.avif');
    
    // Créer aussi une version PNG pour fallback
    await sharp(originalLogoPath)
      .resize(1200, null, {
        fit: 'inside',
        withoutEnlargement: false
      })
      .png({ quality: 100 })
      .toFile(outputPngPath);
    
    console.log('✅ Version PNG créée : public/logo-jardins-complet.png');
    
    // Créer également une version optimisée pour le header (plus petite)
    const headerLogoPath = path.join(__dirname, '../public/logo-header.avif');
    await sharp(originalLogoPath)
      .resize(600, null, {
        fit: 'inside',
        withoutEnlargement: false
      })
      .avif({
        quality: 85,
        effort: 5,
      })
      .toFile(headerLogoPath);
    
    console.log('✅ Logo header créé : public/logo-header.avif');
    
  } catch (error) {
    console.error('❌ Erreur lors de la création:', error);
    process.exit(1);
  }
}

createCompleteLogo();

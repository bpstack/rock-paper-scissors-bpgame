const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const sizes = [72, 96, 128, 144, 152, 192, 384, 512]
const inputSvg = 'public/icons/icon.svg'
const outputDir = 'public/icons'

async function generateIcons() {
  console.log('Generando iconos PNG...')

  for (const size of sizes) {
    const outputPath = path.join(outputDir, `icon-${size}.png`)

    await sharp(inputSvg)
      .resize(size, size)
      .png()
      .toFile(outputPath)

    console.log(`✓ Generado: icon-${size}.png (${size}x${size})`)
  }

  console.log('\n¡Iconos generados exitosamente!')
}

generateIcons().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})

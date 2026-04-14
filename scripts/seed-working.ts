import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

// WORKING SOLUTION: Use default constructor
const prisma = new PrismaClient();

// Product images organized by category
const productImages = {
  /**
   * MoskyAudio Products
   */

  // Imagenes del G III blue purple
  moskyAudio_g_iii_blue_purple_photo_0: "https://i.ibb.co/B2x84PRc/667d0e69a626e.jpg",
  // Imagenes del overdrive dolphin
  moskyAudio_overdrive_dolphin_photo_0: "https://i.ibb.co/KxdDJMGw/64632ad9ec563.jpg",
  moskyAudio_overdrive_dolphin_photo_1: "https://i.ibb.co/60fvZzf6/64632ad9eb555.jpg",
  moskyAudio_overdrive_dolphin_photo_2: "https://i.ibb.co/XfDtnBv7/64632ad9eb964.jpg",
  moskyAudio_overdrive_dolphin_photo_3: "https://i.ibb.co/kgXKzKvB/64632ad9ead27.jpg",
  /// Imagenes del lm741 preamp
  moskyAudio_lm741_preamp_0: "https://i.ibb.co/TDhQ6VhS/64632fa74e960.jpg",
  moskyAudio_lm741_preamp_1: "https://i.ibb.co/wr3THDSf/646d744603bc2.jpg",
  moskyAudio_lm741_preamp_2: "https://i.ibb.co/3m3NffCC/646d7446044aa.jpg",
  moskyAudio_lm741_preamp_3: "https://i.ibb.co/WJ25xD0/646d744604dc2.jpg",
  // Imagenes del cosmic blue
  moskyAudio_cosmic_blue: "https://i.ibb.co/m5bKVvVK/64632f712b227.jpg",
  // Imagenes del iso10 power supply
  moskyAudio_iso10_power_supply_0: "https://i.ibb.co/JWndDC9j/60da957db51c0.jpg",
  moskyAudio_iso10_power_supply_1: "https://i.ibb.co/mVF967tY/60da957db5a53.jpg",
  moskyAudio_iso10_power_supply_2: "https://i.ibb.co/cSzbTJq0/60da957db56c3.jpg",

  // Imagenes del sky reverb delay
  moskyAudio_sky_reverb_delay_0: "https://i.ibb.co/0RGvg21Z/5fe45bc5363dd.jpg",
  moskyAudio_sky_reverb_delay_1: "https://i.ibb.co/hFf5wVj1/5fe45bc536993.jpg",
  moskyAudio_sky_reverb_delay_2: "https://i.ibb.co/jkqsnBYB/5fe45bc53747f.jpg",

  // Imagenes del sol918 multi effects
  moskyAudio_sol918_multi_effects_photo_0: "https://i.ibb.co/s9PBjFv2/60da9377a8597.jpg",
  moskyAudio_sol918_multi_effects_photo_1: "https://i.ibb.co/GQ9yyTnD/60da9377a7d6c.jpg",
  moskyAudio_sol918_multi_effects_photo_2: "https://i.ibb.co/hxBFwvFh/60da9377a766c.jpg",
  // Imagenes del blue ocean chorus
  moskyAudio_blue_ocean_chorus_0: "https://i.ibb.co/QFYmn9Xf/60da8feaaaca0.jpg",
  moskyAudio_blue_ocean_chorus_1: "https://i.ibb.co/3Yrsgy5H/60da8feaab6fb.jpg",
  moskyAudio_blue_ocean_chorus_2: "https://i.ibb.co/HfTJKJ9W/60da8feaabf45.jpg",

  // Imagenes del mad cow
  moskyAudio_mad_cow_0: "https://i.ibb.co/0ypv03vF/65f402af36bdd.jpg",
  moskyAudio_mad_cow_1: "https://i.ibb.co/JWtWCqL7/65faa0e789bb6.jpg",
  moskyAudio_mad_cow_2: "https://i.ibb.co/Q75Nt253/65faa0e7962c5.jpg",
  moskyAudio_mad_cow_3: "https://i.ibb.co/C5HPhKNj/65faa0e796d59.jpg",

  // Imagenes del effect pedal cable
  moskyAudio_effect_pedal_cable: "https://i.ibb.co/kgVHnnhr/581c4ce5297da.png",
  
  /**
   * M-VAVE Products
   */
  // Imagenes del pedal mini Universe
  mvave_mini_universe_photo_0: "https://img.website.xin/contents/sitefiles3604/18022920/images/10339783.jpg",
  mvave_mini_universe_photo_1: "https://img.website.xin/contents/sitefiles3604/18022920/images/10339785.jpg",
  mvave_mini_universe_photo_2: "https://img.website.xin/contents/sitefiles3604/18022920/images/11019448.jpg",
  // Imagenes del pedal Elemental
  mvave_elemental_photo_0: "https://img.website.xin/contents/sitefiles3604/18022920/images/9719731.jpg",
  mvave_elemental_photo_1: "https://img.website.xin/contents/sitefiles3604/18022920/images/9719728.jpg",
  mvave_elemental_photo_2: "https://img.website.xin/contents/sitefiles3604/18022920/images/9719730.jpg",
  // Imagenes del Annblackbox
  mvave_annblackbox_photo_0: "https://img.website.xin/contents/sitefiles3604/18022920/images/10219104.jpg",
  mvave_annblackbox_photo_1: "https://img.website.xin/contents/sitefiles3604/18022920/images/10219108.jpg",
  mvave_annblackbox_photo_2:  "https://img.website.xin/contents/sitefiles3604/18022920/images/10219107.jpg",
  // Imagenes del IR BOX
  mvave_ir_box_phot_0: "https://img.website.xin/contents/sitefiles3604/18022920/images/9720172.jpg",
  mvave_ir_box_phot_1: "https://img.website.xin/contents/sitefiles3604/18022920/images/9720176.jpg",
  mvave_ir_box_phot_2: "https://img.website.xin/contents/sitefiles3604/18022920/images/9720173.jpg",
  // Imagenes del M VAVE CUBE BABY
  mvave_baby_photo_0: "https://img.website.xin/contents/sitefiles3604/18022920/images/8570933.png",
  mvave_baby_photo_1: "https://img.website.xin/contents/sitefiles3604/18022920/images/8570936.jpg",
  mvave_baby_photo_2: "https://img.website.xin/contents/sitefiles3604/18022920/images/8570935.jpg",
  // Imagenes de M VAVE TANK G
  mvave_tank_g_photo_0: "https://img.website.xin/contents/sitefiles3604/18022920/images/8376698.png",
  mvave_tank_g_photo_1: "https://img.website.xin/contents/sitefiles3604/18022920/images/8376699.png",
  mvave_tank_g_photo_2: "https://img.website.xin/contents/sitefiles3604/18022920/images/8376700.png",
  // Imagenes de M VAVE TANK B 
  mvave_tank_b_photo_0: "https://img.website.xin/contents/sitefiles3604/18022920/images/8376701.png",
  mvave_tank_b_photo_1: "https://img.website.xin/contents/sitefiles3604/18022920/images/8376702.png",
  mvave_tank_b_photo_2: "https://img.website.xin/contents/sitefiles3604/18022920/images/8376700.png",
  // Imagenes de M VAVE CHOCOLATE 
  mvave_chocolate_photo_0: "https://img.website.xin/contents/sitefiles3604/18022920/images/11350155.jpg",
  mvave_chocolate_photo_1: "https://img.website.xin/contents/sitefiles3604/18022920/images/11350157.jpg",
  mvave_chocolate_photo_2: "https://img.website.xin/contents/sitefiles3604/18022920/images/11350158.jpg",
  // Imagenes de M VAVE PEDAL POWER
  mvave_pedal_power_photo_0: "https://img.website.xin/contents/sitefiles3604/18022920/images/8596626.png",
  // Imagenes de M VAVE WP 9
  mvave_wp_9_photo_0: "https://img.website.xin/contents/sitefiles3604/18022920/images/9720023.jpg",
  mvave_wp_9_photo_1: "https://img.website.xin/contents/sitefiles3604/18022920/images/9720024.jpg",
  // Imagenes de wireless in ear monitor_system
  mvave_wireless_in_ear_monitor_system: "https://img.website.xin/contents/sitefiles3604/18022920/images/10710519.jpg",
  // Imagenes de wp 8 wireless system
  mvave_wp_8_wireless_system: "https://img.website.xin/contents/sitefiles3604/18022920/images/8595897.jpg",
};

// Helper function to create products
async function createProduct(
    id: string,
    name: string,
    description: string,
    price: number,
    stock: number,
    categoryId: string,
    images: string[]
  ) {
  return await prisma.product.upsert({
    where: { id },
    update: {},
    create: {
      id,
      name,
      description,
      price,
      stock,
      categoryId,
      images: JSON.stringify(images),
    },
  });
}

// Helper function to create albums
async function createAlbum(
    id: string,
    title: string,
    description: string,
    coverImage?: string
  ) {
  return await prisma.album.upsert({
    where: { id },
    update: {},
    create: {
      id,
      title,
      description,
      coverImage,
    },
  });
}

// Helper function to add photos to album
async function addAlbumPhoto(
    albumId: string,
    productId: string,
    caption?: string,
    sortOrder: number = 0
  ) {
  return await prisma.albumPhoto.create({
    data: {
      albumId,
      productId,
      caption,
      sortOrder,
    },
  });
}

async function main() {
  try {
    console.log('🌱 Starting seed...');

    // Create admin user
    console.log('Creating admin user...');
    const hashedPassword = await bcrypt.hash('johndoe123', 10);
    
    const adminUser = await prisma.user.upsert({
      where: { email: 'john@doe.com' },
      update: {},
      create: {
        email: 'john@doe.com',
        password: hashedPassword,
        name: 'John Doe',
        role: 'ADMIN',
      },
    });
    console.log('✅ Admin user created:', adminUser.email);

    // Create categories
    console.log('Creating categories...');
    const electronica = await prisma.category.upsert({
      where: { slug: 'electronica' },
      update: {},
      create: {
        name: 'Electrónica',
        slug: 'electronica',
        description: 'Dispositivos electrónicos y tecnología de última generación',
      },
    });
    const accessory = await prisma.category.upsert({
      where: { slug: 'accesorios' },
      update: {},
      create: {
        name: 'Accesorios',
        slug: 'accesorios',
        description: 'Herramientas y complementos más avanzados que tenemos',
      },
    });

    const pedal_effect = await prisma.category.upsert({
      where: { slug: 'pedal_effect' },
      update: {},
      create: {
        name: 'Pedales de Efectos',
        slug: 'pedal_effect',
        description: 'Los mejores pedales de efectos que tenemos',
      },
    });

    console.log('✅ Categories created');
    console.log('✅ Seed completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Mochi Club database...");

  // Clean existing data
  await prisma.productImage.deleteMany();
  await prisma.review.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Create Categories
  const categoriesData = [
    {
      name: "Snacks & Bebidas",
      slug: "snacks",
      description: "Dulces, papitas, ramens y bebidas de Japón, Corea y Taiwán",
      imageUrl: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?q=80&w=800&auto=format&fit=crop",
      sortOrder: 1,
    },
    {
      name: "Peluches",
      slug: "peluches",
      description: "Peluches ultra suaves Kawaii, Sanrio, Pokémon y Mochi Cats",
      imageUrl: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=800&auto=format&fit=crop",
      sortOrder: 2,
    },
    {
      name: "K-pop",
      slug: "k-pop",
      description: "Álbumes oficiales, Lightsticks, merch y coleccionables",
      imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
      sortOrder: 3,
    },
    {
      name: "Anime",
      slug: "anime",
      description: "Figuras, llaveros, standees de acrílico y accesorios",
      imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop",
      sortOrder: 4,
    },
    {
      name: "Beauty & Skincare",
      slug: "beauty",
      description: "Mascarillas K-Beauty, lip tints y cosmética asiática adorable",
      imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
      sortOrder: 6,
    },
    {
      name: "Decoración",
      slug: "decoracion",
      description: "Lámparas LED, poster bento, papelería Kawaii y tazas decorativas",
      imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop",
      sortOrder: 7,
    },
    {
      name: "Pancartas & Cheering",
      slug: "pancartas",
      description: "Banners, pancartas de conciertos y accesorios de apoyo fan",
      imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
      sortOrder: 8,
    },
    {
      name: "Otros",
      slug: "otros",
      description: "Sorpresas, bolsas misteriosas y accesorios varios",
      imageUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800&auto=format&fit=crop",
      sortOrder: 9,
    },
  ];

  const categories = await Promise.all(
    categoriesData.map((cat) => prisma.category.create({ data: cat }))
  );

  const catMap = new Map(categories.map((c) => [c.slug, c.id]));

  // Products Data
  const productsData = [
    {
      name: "Pocky Strawberry Cookie Crisp (Edición Japón)",
      slug: "pocky-strawberry-cookie-crisp",
      description: "Palitos de galleta crujiente cubiertos con crema de frutilla real y trocitos de galleta.",
      price: 2490,
      compareAtPrice: 2990,
      stock: 24,
      isFeatured: true,
      brand: "Glico",
      categoryId: catMap.get("snacks")!,
      images: [
        "https://images.unsplash.com/photo-1582293041079-7814c2f12063?q=80&w=800&auto=format&fit=crop",
      ],
    },
    {
      name: "Bebida Ramune Sabor Melón Tradicional 200ml",
      slug: "bebida-ramune-melon-200ml",
      description: "Clásica bebida con bolita de vidrio (canica) sabor a dulce melón japonés.",
      price: 1990,
      stock: 40,
      isFeatured: true,
      brand: "Sangaria",
      categoryId: catMap.get("snacks")!,
      images: [
        "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop",
      ],
    },
    {
      name: "Peluche Mochi Cat Giant Pink Marshmallow",
      slug: "peluche-mochi-cat-giant-pink",
      description: "Peluche ultra mullidito y elástico tipo mochi. Medidas: 45cm. Súper abrazable.",
      price: 14990,
      compareAtPrice: 17990,
      stock: 8,
      isFeatured: true,
      brand: "Mochi Club Exclusive",
      categoryId: catMap.get("peluches")!,
      images: [
        "https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=800&auto=format&fit=crop",
      ],
    },
    {
      name: "Lightstick Oficial K-Pop Stray Kids Ver 2",
      slug: "lightstick-stray-kids-ver2",
      description: "Nachoimbab oficial con conexión Bluetooth para sincronizar en conciertos.",
      price: 64990,
      stock: 3,
      isFeatured: true,
      brand: "JYP Entertainment",
      categoryId: catMap.get("k-pop")!,
      images: [
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
      ],
    },
    {
      name: "Figura Acrílica Nezuko Demon Slayer Standee 15cm",
      slug: "figura-acrilica-nezuko-demon-slayer",
      description: "Standee de acrílico HD de Nezuko Kamado con base transparente decorada.",
      price: 5990,
      stock: 12,
      isFeatured: false,
      brand: "Aniplex",
      categoryId: catMap.get("anime")!,
      images: [
        "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop",
      ],
    },
    {
      name: "Binder Photocards Pastel Pink Holográfico (64 bolsillos)",
      slug: "binder-photocards-pink-holografico",
      description: "Álbum binder portátil tamaño A5 para proteger y lucir tus photocards favoritas.",
      price: 8990,
      compareAtPrice: 10990,
      stock: 15,
      isFeatured: true,
      brand: "K-Collect",
      categoryId: catMap.get("k-pop")!,
      images: [
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
      ],
    },
    {
      name: "Mascarilla Sheet Mask Peach & Honey Glowing Skin",
      slug: "mascarilla-peach-honey-skincare",
      description: "Mascarilla hidratante de extracto de durazno dulce y miel de abeja para rostro radiante.",
      price: 1490,
      stock: 50,
      isFeatured: false,
      brand: "Innisfree",
      categoryId: catMap.get("beauty")!,
      images: [
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
      ],
    },
    {
      name: "Lámpara Nube LED Kawaii Sensible al Tacto",
      slug: "lampara-nube-led-kawaii",
      description: "Lámpara de noche recargable por USB en silicona suave con 7 colores intercambiables.",
      price: 11990,
      stock: 0, // Out of stock to test "Recuérdame" feature!
      isFeatured: false,
      brand: "Sanrio Style",
      categoryId: catMap.get("decoracion")!,
      images: [
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop",
      ],
    },
  ];

  for (const prod of productsData) {
    const { images, ...prodFields } = prod;
    const createdProduct = await prisma.product.create({
      data: prodFields,
    });

    for (let i = 0; i < images.length; i++) {
      await prisma.productImage.create({
        data: {
          productId: createdProduct.id,
          url: images[i],
          sortOrder: i,
        },
      });
    }
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

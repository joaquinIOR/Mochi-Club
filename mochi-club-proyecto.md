# Mochi Club — Documento de Proyecto y Arquitectura

> Documento de referencia para iniciar el desarrollo en un entorno con asistencia de IA (Claude Code, Cursor, etc.). Contiene todos los requerimientos, decisiones técnicas y de negocio definidas antes de escribir código.

---

## 1. Contexto del negocio

**Mochi Club** es una tienda de **cultura asiática** (no solo anime): comida/snacks asiáticos, bebidas, peluches, K-pop, photocards, productos anime, belleza asiática, decoración y otros.

- Instagram de referencia: https://www.instagram.com/mochiclub.cl/
- Local físico: **Galería Escorial, Plaza Vergara, Viña del Mar**. Horario: **11:00 a 20:00**.
- Identidad visual buscada: **cute + cultura asiática + e-commerce moderno**. Evitar estética "otaku/cyberpunk" excesiva.
- Doble propósito: negocio real operativo + proyecto de portafolio de Ingeniería Informática.

---

## 2. Alcance del MVP (versión 1)

### Incluido en MVP

| Módulo | Alcance |
|---|---|
| Landing page | Hero, categorías destacadas, más vendidos, recién llegados, CTA a catálogo |
| Catálogo | Listado, categorías/subcategorías, búsqueda, filtros (precio, disponibilidad), orden (recientes, precio, A-Z) |
| Producto | Ficha individual, galería, precio (IVA incluido), stock, botón agregar al carrito, botón "Recuérdame" si sin stock |
| Auth | Solo login con Google (sin registro tradicional con contraseña) |
| Carrito | Persistente, asociado a usuario logueado (login obligatorio) |
| Checkout | Retiro en tienda o Uber (gestionado por el cliente). Selección de fecha de retiro |
| Pagos | Mercado Pago Checkout Pro (redirección), webhook de confirmación |
| Pedidos | Estados: Pendiente → Pagado → Preparando → Listo para retiro → Entregado. También: Cancelado, Reembolsado |
| Emails transaccionales | Confirmación de compra, confirmación de pago, cambio de estado, "producto disponible" (restock) |
| Cuenta usuario | Perfil básico, historial de pedidos |
| Wishlist | Solo con sesión iniciada, notifica por correo si el producto baja de precio |
| Reviews | Solo comprador verificado (order_item entregado), publicación automática, admin puede ocultar |
| Admin | CRUD productos/categorías, gestión de stock, cambio de estado de pedido, dashboard básico |
| Legal | Aviso de no-retracto visible en checkout/producto (ver sección Devoluciones) |

### Fuera del MVP (fases futuras)

| Función | Fase | Motivo |
|---|---|---|
| Variantes de producto (sabor, edición, etc.) | Futuro, sin fase asignada | Definido explícitamente como "más adelante" |
| Módulo de devoluciones automatizado | Futuro | Proceso manual por ahora |
| Newsletter / marketing masivo | Fase 4 | No bloquea la primera venta |
| Recuperación de carrito abandonado | Fase 4 | Requiere volumen de datos |
| Cupones (primera compra / primer review) | Fase 4 | Requiere lógica de triggers |
| Multi-idioma (ES/EN) | Fase 4-5 | Preparar con i18n desde el inicio, traducir después |
| Notificación WhatsApp | Fase 4 | Requiere verificación de negocio en Meta Cloud API |
| Integración real Uber Direct API | No planificada | Depende de partnership externo con Uber |
| Boleta electrónica automatizada | Fase 4-5 | Manual vía portal SII mientras el volumen sea bajo |
| Roles admin diferenciados (soporte, editor) | No planificada | Solo existe rol "admin" por decisión explícita |
| Chatbot de atención al cliente (IA) | Fase 5 | Requiere base de conocimiento madura |
| Recomendación de productos (IA) | Fase 5 | Requiere volumen real de pedidos/reviews |
| Búsqueda semántica avanzada | Fase 5 | Meilisearch/Typesense si el catálogo crece mucho |

---

## 3. Requerimientos funcionales detallados

### 3.1 Categorías

```
Snacks (incluye bebidas)
Peluches
K-pop
Anime
Photocards
Beauty
Decoración
Pancartas
Otros
```
Administrables desde el panel admin (crear, editar, desactivar, ordenar).

### 3.2 Catálogo — filtros y orden

- **Búsqueda:** por nombre, categoría, marca, descripción.
- **Filtros combinables:** categoría, precio mínimo/máximo, disponibilidad (en stock/oferta).
- **Orden:** más vendidos, más recientes, precio asc/desc, A-Z.
- **Sin filtro profundo por variante** (decisión explícita).
- **Búsqueda sin resultados:** mensaje simple, sin sugerencias automáticas (decisión explícita).
- URLs con query params para mantener/compartir filtros: `/productos?categoria=snacks&orden=precio-asc`.

### 3.3 Producto — reglas de negocio

- Sin límite de unidades por compra.
- Si un producto se queda sin stock: se muestra con botón **"Recuérdame"** → captura interés del usuario → email automático cuando vuelve a haber stock.
- Si el producto **no tiene restock** y el admin decide no reponerlo: se **elimina del catálogo** (decisión manual del admin, no automática por tiempo).
- Sin variantes en el MVP (mismo producto = mismo precio = mismo stock, sin opciones de sabor/talla/edición).

### 3.4 Checkout — retiro en tienda

- Modalidades: **Retiro en tienda** o **Uber** (el cliente gestiona su propio Uber tras la compra — no hay integración con Uber Direct API).
- El cliente selecciona **fecha de retiro** en el checkout.
- El local acepta pedidos **a cualquier hora del día**, sin restricción.
- Regla de fecha sugerida:
  - Si la hora actual es **antes del cierre (20:00)** → fecha de retiro sugerida por defecto = hoy.
  - Si la hora actual es **después del cierre (20:00)** → fecha de retiro sugerida por defecto = mañana.
  - El cliente puede elegir una fecha posterior si lo prefiere.

### 3.5 Cancelación de pedidos

- El cliente puede cancelar su propio pedido **únicamente mientras el estado es `Pendiente`** (antes de pagar).
- Una vez el estado pasa a `Pagado`, **solo el admin** puede cancelar/reembolsar.

### 3.6 Pagos

- Proveedor: **Mercado Pago**, misma cuenta comercial que el POS físico existente en tienda.
- Modalidad: **Checkout Pro** (redirección a Mercado Pago, no embebido).
- El pago es **siempre online**, independiente de si la modalidad es retiro o Uber — no existe pago presencial en el flujo del e-commerce (el POS físico sigue usándose solo para ventas presenciales normales, fuera del sistema).
- **Regla de seguridad crítica:** la confirmación real del pago se procesa vía **webhook** de Mercado Pago hacia el backend. Nunca se confirma un pago basándose en lo que el navegador reporta al volver del checkout.
- El backend **siempre recalcula el total desde la base de datos** al crear la orden — nunca confía en el precio enviado por el frontend.

### 3.7 Moneda e impuestos

- Moneda única: **CLP** (sin soporte multi-moneda).
- Precios mostrados **con IVA incluido** (precio final visible al cliente).
- Formato: enteros, sin decimales, separador de miles con punto (ej: `$2.990`).

### 3.8 Boleta electrónica

- **MVP:** emisión **manual** vía portal MIPYME del SII, usando los datos ya registrados en `orders`/`payments`.
- **Requisito legal previo (fuera del sistema):** Mochi Club debe estar inscrito como contribuyente en el SII y autorizado como facturador electrónico antes de poder emitir boletas válidas, incluso manualmente.
- **Futuro:** integrar proveedor con API (ej. OpenFactura/Haulmer, Bsale) para automatizar la emisión al confirmarse el pago, sin cambiar el modelo de datos.

### 3.9 Wishlist (favoritos)

- Requiere **sesión iniciada** (sin modo invitado).
- **Notificación por email** si un producto guardado baja de precio o entra en oferta.
- **Privada únicamente**, sin opción de compartir vía link público.

### 3.10 Reviews

- Solo pueden dejar review los **compradores verificados** (usuario con un `order_item` en estado `Entregado` para ese producto específico — validado en backend, no solo en frontend).
- **Publicación automática**, sin cola de aprobación previa.
- **Moderación reactiva:** el admin puede ocultar/eliminar una review después de publicada (campo `status`: `published`/`hidden`).
- No confundir con reseñas de Google Maps: estas son **por producto**, dentro del propio sistema. Google Maps podría mostrarse aparte como reseñas del local físico, pero no está incluido como requerimiento activo.

### 3.11 Devoluciones

- **No existe derecho a retracto por arrepentimiento.** Las devoluciones proceden **únicamente por producto defectuoso o con falla**.
- **Categorías excluidas de devolución (ni por falla):** productos **comestibles** (snacks, bebidas) — por razones de higiene/seguridad, no se reingresan al inventario.
- **Categorías que sí admiten devolución por falla:** peluches, k-pop, photocards, beauty, decoración, pancartas, otros.
- **Proceso 100% manual:** el cliente contacta por correo/redes, se evalúa caso a caso, la devolución/entrega es presencial en el local físico (no hay logística de envío de devolución, ya que el modelo de venta es retiro en tienda).
- **Sin módulo propio en el sistema.** Solo se usan los estados de pedido ya existentes: `Reembolsado` / `Cancelado`.
- ⚠️ **Nota legal:** la Ley del Consumidor chilena (Ley 19.496) establece el derecho a retracto por defecto en compras online. Para excluirlo legalmente es necesario informarlo de forma expresa y clara **antes de la compra** (aviso visible en checkout/ficha de producto) o que aplique una excepción reconocida (ej. productos perecibles/higiene). Se recomienda validar el texto legal con asesoría antes de producción — esto no bloquea el desarrollo del sistema.

### 3.12 Roles administrativos

- Solo existe el rol **admin** (único). No hay rol de "soporte" diferenciado ni permisos limitados en esta versión.
- El modelo de datos contempla un campo `role` en `users` desde el inicio (aunque solo tenga un valor por ahora), para poder añadir roles después sin rediseñar el esquema.

### 3.13 Notificaciones

- **MVP:** notificaciones por **email** (confirmación de compra, pago, cambio de estado, restock, wishlist con descuento).
- **Futuro (Fase 4):** notificación adicional por **WhatsApp** cuando el pedido esté listo para retiro. Requiere integración vía **Meta Cloud API (WhatsApp Business API)** con verificación de negocio y plantillas de mensaje pre-aprobadas. Se descarta el uso de librerías no oficiales (ej. whatsapp-web.js) por riesgo de baneo del número y violación de términos de servicio.

---

## 4. Stack tecnológico

| Capa | Tecnología | Justificación |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | SSR/SSG nativo para SEO de producto, Server Components reducen JS al cliente |
| Lenguaje | **TypeScript** | Tipado en todo el flujo, crítico en checkout/pagos |
| UI | **Tailwind CSS + shadcn/ui** | Componentes copiados al repo (no dependencia externa) → control total del diseño, evita look de "template" |
| Animaciones | **Motion** (ex-Framer Motion) + **View Transitions API** | Microinteracciones y transiciones entre páginas, sensación "app nativa" |
| Estado global | **Zustand** | Estado de carrito, ligero, sin boilerplate de Redux |
| Data fetching/cache | **TanStack Query** | Sincronización de carrito/wishlist/stock sin recargar página |
| ORM | **Prisma** | DX, migraciones, tipado end-to-end con TypeScript |
| Base de datos | **PostgreSQL vía Supabase** | Gestionado, incluye Auth y Storage integrados |
| Auth | **Supabase Auth** (Google OAuth) | Nativo con la DB, evita gestionar Auth.js por separado |
| Storage de imágenes | **Supabase Storage** + `next/image` | Reemplaza Cloudinary — suficiente para catálogo de fotos de producto, sin costo adicional ni integración extra |
| Pagos | **Mercado Pago Checkout Pro** | Redirección, misma cuenta comercial que el POS físico |
| Emails | **Resend + React Email** | Emails transaccionales como componentes React |
| Búsqueda (MVP) | **Postgres full-text search** | Suficiente para el volumen inicial, sin infraestructura adicional |
| Búsqueda (futuro) | Meilisearch/Typesense | Si el catálogo crece y se requiere tolerancia a errores de tipeo |
| Reviews de Google (si se activa) | Google Places API | Cachear resultados para no exceder cuota gratuita |
| Deploy frontend/backend | **Vercel** | CDN global, preview deploys, integración nativa con Next.js |
| Monitoreo de errores | **Sentry** (free tier) | Alertas de fallos en producción |
| Rate limiting | **Upstash Ratelimit** | Proteger rutas sensibles (login, checkout, creación de reviews) |

**Descartado deliberadamente para el MVP:** microservicios, GraphQL, base de datos vectorial, IA de recomendaciones/chatbot — todo correctamente ubicado en fases futuras, no aporta valor real sin volumen de datos.

**Nota sobre Oracle Cloud:** el usuario cuenta con Oracle Cloud Free Tier (4 OCPU/24GB RAM Ampere A1). Se evaluó como hosting de Postgres self-hosted, pero se decidió usar **Supabase** por menor carga operativa (gestionado, incluye Auth+Storage). Oracle Cloud queda disponible como recurso libre para uso futuro (ej. hosting de chatbot IA, automatizaciones tipo n8n).

---

## 5. Modelo de datos (entidades principales)

```
users
  id, email, name, avatar_url, role, marketing_opt_in, created_at

products
  id, name, slug, description, price, compare_at_price, sku,
  category_id, brand, stock, is_featured, is_active, created_at

categories
  id, name, slug, description, image_url, sort_order, is_active

product_images
  id, product_id, url, sort_order

orders
  id, user_id, status, subtotal, discount, total,
  pickup_method (retiro/uber), pickup_date,
  payment_id, created_at

order_items
  id, order_id, product_id, quantity, unit_price

payments
  id, order_id, provider (mercado_pago), status,
  amount, transaction_id, paid_at

favorites (wishlist)
  id, user_id, product_id, created_at

reviews
  id, user_id, product_id, order_item_id, rating, comment,
  status (published/hidden), created_at

restock_requests ("Recuérdame")
  id, user_id, product_id, notified, created_at

newsletter_subscribers
  id, email, user_id (nullable), subscribed_at

coupons (Fase 4)
  id, code, type, value, usage_limit, expires_at
```

**Relaciones clave:**
- `User` 1—N `Orders`, `Favorites`, `Reviews`
- `Category` 1—N `Products`
- `Product` 1—N `ProductImages`, `OrderItems`, `Favorites`, `Reviews`, `RestockRequests`
- `Order` 1—N `OrderItems`, 1—1 `Payment`

**Reglas de integridad importantes:**
- Descuento de stock debe ser **transacción atómica** en Postgres (evitar condición de carrera si dos usuarios compran el último producto simultáneamente).
- `reviews` solo se crea si existe un `order_item` asociado en estado `Entregado` para ese `user_id` + `product_id`.

---

## 6. Sitemap

```
/                          → Landing page
/productos                 → Catálogo (con query params de filtro/orden)
/productos/[slug]          → Ficha de producto
/carrito                   → Carrito
/checkout                  → Checkout (retiro/Uber, fecha, pago)
/cuenta                    → Dashboard usuario
/cuenta/pedidos            → Historial de pedidos
/cuenta/favoritos          → Wishlist
/cuenta/perfil             → Datos personales
/login                     → Login con Google

/admin                     → Dashboard admin
/admin/productos           → CRUD productos
/admin/categorias          → CRUD categorías
/admin/pedidos             → Gestión de pedidos
/admin/clientes            → Listado de clientes
/admin/inventario          → Stock y alertas
```

---

## 7. Flujo de usuario (compra)

```
Landing
  → Explorar categoría / buscar producto
  → Ficha de producto
  → Agregar al carrito (requiere login con Google)
  → Carrito → Checkout
  → Elegir modalidad: Retiro en tienda / Uber
  → Elegir fecha de retiro (sugerida según horario de cierre)
  → Redirección a Mercado Pago (Checkout Pro)
  → Pago confirmado vía webhook
  → Pedido pasa a "Pagado" → email de confirmación
  → Admin cambia estado: Preparando → Listo para retiro → Entregado
  → (Futuro) Notificación WhatsApp cuando esté listo
```

## 8. Flujo de administración

```
Login admin
  → Dashboard (ventas del día/mes, pedidos, stock bajo)
  → Gestionar productos (crear/editar/stock/destacado)
  → Gestionar categorías
  → Ver y cambiar estado de pedidos
  → Ver clientes e historial
  → Moderar reviews (ocultar si corresponde)
  → Atender solicitudes de "Recuérdame" al reponer stock
```

---

## 9. Seguridad — checklist aplicado

| Riesgo | Medida |
|---|---|
| Robo de sesión | Cookies `httpOnly`, `secure`, `sameSite=strict`; expiración corta + refresh token |
| Manipulación de precio en checkout | Backend recalcula total desde la DB, nunca confía en el frontend |
| Webhook de pago falsificado | Validar firma/secreto del webhook de Mercado Pago antes de marcar como pagado |
| Acceso no autorizado a `/admin` | Middleware server-side que verifica rol `admin` en cada request |
| Exposición de base de datos | Acceso restringido por reglas de Supabase (RLS - Row Level Security) |
| SQL Injection | Prisma usa queries parametrizadas por diseño |
| XSS en reviews/inputs | Sanitizar/escapar todo texto de usuario antes de renderizar |
| Rate limiting | Limitar por IP en login, checkout, creación de reviews (Upstash) |
| Condición de carrera en stock | Transacción atómica al descontar inventario |
| CORS | Restringir `Access-Control-Allow-Origin` solo al dominio de producción |
| Secretos/API keys | Variables de entorno (`.env` en `.gitignore`), nunca hardcodeadas, gestionadas en Vercel |
| Suplantación de emails | Configurar SPF/DKIM/DMARC al verificar dominio en Resend |
| Reviews falsas | Validar en backend que existe `order_item` entregado asociado, no solo en frontend |
| Fuerza bruta en login | Mitigado estructuralmente: solo login con Google OAuth, sin contraseñas propias |

---

## 10. Roadmap por fases

### Fase 1 — MVP
Landing, catálogo, categorías, filtros, producto, carrito, login Google, checkout, Mercado Pago, pedidos, emails transaccionales, wishlist, reviews, panel admin básico.

### Fase 2 — Consolidación operativa
Refinamiento de dashboard admin, alertas de stock bajo, mejoras de UX en checkout.

### Fase 3 — (reservada, sin contenido específico definido aún)

### Fase 4 — Marketing y notificaciones extendidas
Newsletter, correos promocionales, recuperación de carrito abandonado, cupones (primera compra / primer review), notificación WhatsApp (Meta Cloud API), boleta electrónica automatizada, multi-idioma (ES/EN).

### Fase 5 — Funcionalidades avanzadas / IA
Chatbot de atención al cliente, recomendación de productos, búsqueda semántica avanzada (Meilisearch/Typesense si el catálogo lo justifica).

---

## 11. Checklist de infraestructura (para cuando se llegue a despliegue)

1. Cuenta Vercel — conectar repo, variables de entorno por ambiente
2. Cuenta Supabase — crear proyecto (DB + Auth + Storage)
3. Google Cloud Console — proyecto para OAuth (Client ID/Secret)
4. Cuenta Mercado Pago Developers — Access Token y Public Key (misma cuenta del POS)
5. Cuenta Resend — verificar dominio propio (SPF/DKIM/DMARC)
6. Dominio propio (ej. NIC Chile `.cl`) — apuntar DNS a Vercel
7. Sentry — monitoreo de errores en producción
8. Upstash — rate limiting
9. CI/CD — Vercel deploy automático desde `main`, previews por rama

---

## 12. Costos esperados (orientativo)

| Servicio | Costo mientras el volumen es bajo |
|---|---|
| Vercel, Supabase (free tier), Google OAuth, Sentry, Upstash | $0 |
| Mercado Pago | Sin costo de integración, comisión variable por transacción (~3.5-5%, verificar tarifa vigente) |
| Resend | Gratis hasta 3.000 emails/mes |
| Dominio `.cl` | ~$10-15 USD/año |
| Boleta electrónica automatizada (futuro) | Plan mensual del proveedor elegido (ej. OpenFactura) |

---

*Documento generado a partir de la sesión de definición de requerimientos. Sirve como fuente de verdad inicial para comenzar el desarrollo — cualquier decisión aquí documentada puede evolucionar, pero cambios importantes deberían reflejarse también en este documento.*

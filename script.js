const PRODUCTS = [
  { 
    id: 'p1', 
    name: 'Full Frontal Chocolate Color', 
    imgs: [
      'images/IMG-ful-frontal-chocolate-color.jpg', 
      'images/IMG-ful-frontal-chocolate-color.jpg', 
      'images/IMG-ful-frontal-chocolate-color.jpg'
    ],
    variants:['8in','8in DD','10in','10in DD','12in','14in','16in','18in','20in','22in','24in','26in','28in','30in'],
    prices: [550,650,750,850,850,1190,1319,1590,1790,1890,2290,2590,2790,2990]
  },
  { 
    id: 'p2', 
    name: 'Human Hair Black Straight Weave', 
    imgs: [
      'images/IMG-huma-hair-black-.jpg',
      'images/IMG-human-black.jpg',
      'images/IMG-human-hair-black-straight.jpg'
    ],
    variants:['8in','8in DD','10in','10in DD','12in','14in','16in','18in','20in','22in','24in','26in','28in','30in'],
    prices: [550,650,750,850,850,1190,1319,1590,1790,1890,2290,2590,2790,2990]
  },
  { 
    id: 'p3', 
    name: 'Full Frontal Human Hair Weave Piano Color',
    imgs: [
      'images/images/IMG-20251113-WA0038.jpg', 
      'images/IMG-frontal-human-hair weave-piano-color.jpg',
      'images/IMG-human-hair-piano-color.jpg'
    ],
    variants:['8in','8in DD','10in','10in DD','12in','14in','16in','18in','20in','22in','24in','26in','28in','30in'],
    prices: [550,650,750,850,850,1190,1319,1590,1790,1890,2290,2590,2790,2990]
  },
  { 
    id: 'p4', 
    name: 'Jerry Curls Weave Human Hair Brazilian Frontal', 
    imgs: [
      'images/IMG-brazilian.jpg',
      'images/IMG-brazilian (2).jpg',
      'images/IMG-jerry curls weave.brszilian.jpg'
    ],
    variants:['8in','8in DD','10in','10in DD','12in','14in','16in','18in','20in','22in','24in','26in','28in','30in'],
    prices: [550,650,750,850,850,1190,1319,1590,1790,1890,2290,2590,2790,2990]
  },
  { 
    id: 'p5', 
    name: 'Human Hair Water Weave Curls Full Frontal (Transparent lace)',
    imgs: [
      'images/IMG-human hair wayer wave curls.jpg',
      'images/IMG-human hair wayer wave curls.jpg',
      'images/IMG-human hair wayer wave curls.jpg',
    ],
    variants:['8in','8in DD','10in','10in DD','12in','14in','16in','18in','20in','22in','24in','26in','28in','30in'],
    prices: [550,650,750,850,850,1190,1319,1590,1790,1890,2290,2590,2790,2990]
  },
];

const DELIVERY_FEES = { paxi: 60, courier: 110 };
const FREE_DELIVERY_THRESHOLD = 2500;
let cart = {};

function formatR(v){ return 'R ' + v.toFixed(2); }

// ====== CART ELEMENTS ======
const cartDrawer = document.getElementById('cartDrawer');
const cartItemsEl = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const subtotalEl = document.getElementById('subtotal');
const deliveryFeeEl = document.getElementById('deliveryFee');
const totalEl = document.getElementById('total');
const deliverySelect = document.getElementById('deliveryOption');

if (deliverySelect) deliverySelect.addEventListener('change', updateCartUI);

// ====== CREATE PRODUCT CARD ======
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';    

// ====== Image slider =======
const slider = document.createElement('div');
slider.className = 'slider';

const slidesContainer = document.createElement('div');
slidesContainer.className = 'slider-container';
slidesContainer.style.display = 'flex';
slidesContainer.style.transition = 'transform 0.3s ease-in-out';  

product.imgs.forEach(src => {
  const slide = document.createElement('div');
  slide.className = 'slide';
  slide.style.flex = '0 0 100%';
  const img = document.createElement('img');
  img.src = src;
  img.alt = product.name;
  img.loading = 'lazy';
  img.style.width = '100%';
  img.style.borderRadius = '8px';
  slide.appendChild(img);

  slidesContainer.appendChild(slide);
});

let currentIndex = 0;
function showSlide() {
  slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

   const prevBtn = document.createElement('button');
  prevBtn.className = 'slide-btn prev';
  prevBtn.textContent = '‹';
  prevBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + product.imgs.length) % product.imgs.length;
    showSlide();
  };

  const nextBtn = document.createElement('button');
  nextBtn.className = 'slide-btn next';
  nextBtn.textContent = '›';
  nextBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % product.imgs.length;
    showSlide();
  };

  // assemble slider
  slider.appendChild(prevBtn);
  slider.appendChild(slidesContainer);
  slider.appendChild(nextBtn);
  card.appendChild(slider);

  // ===== Product title =====
  const title = document.createElement('h3');
  title.textContent = product.name;
  card.appendChild(title);

  // ===== Price display =====
  const priceEl = document.createElement('p');
  priceEl.className = 'price';
  priceEl.textContent = 'R ' + product.prices[0].toFixed(2);
  card.appendChild(priceEl);

  // ===== Variant dropdown =====
  const sel = document.createElement('select');
  product.variants.forEach(v => sel.appendChild(new Option(v, v)));
  card.appendChild(sel);

  // ===== Quantity input =====
  const qty = document.createElement('input');
  qty.type = 'number';
  qty.value = 1;
  qty.min = 1;
  qty.style.width = '70px';
  card.appendChild(qty);

  // ===== Add to Cart button =====
  const addBtn = document.createElement('button');
  addBtn.className = 'btn primary';
  addBtn.textContent = 'Add to Cart';
  addBtn.onclick = () => {
    const variant = sel.value;
    const variantIdx = product.variants.indexOf(variant);
    const price = product.prices[variantIdx];
    addToCart(product.id, variant, Number(qty.value), product.name, price);
  };
  card.appendChild(addBtn);

  // Update price when variant changes
  sel.addEventListener('change', () => {
    const variantIdx = product.variants.indexOf(sel.value);
    priceEl.textContent = 'R ' + product.prices[variantIdx].toFixed(2);
  });

  return card;
}
// ====== RENDER PRODUCTS ======
window.addEventListener('DOMContentLoaded', () => {
  const productsGrid = document.getElementById('productsGrid');
  PRODUCTS.forEach(p => productsGrid.appendChild(createProductCard(p)));
});

// ====== ADD TO CART ======
function addToCart(productId, variant, qty, name, price) {
  const k = productId + '___' + variant;
  if (cart[k]) cart[k].qty += qty;
  else cart[k] = { productId, variant, qty, price, name };
  updateCartUI();
  showCart();
}

// ====== TOTALS ======
function calcTotals(){
  let subtotal = 0;
  Object.values(cart).forEach(i => subtotal += i.price * i.qty);
  let delivery = 0;
  if (subtotal > 0 && subtotal < FREE_DELIVERY_THRESHOLD) {
    const selected = deliverySelect?.value || 'paxi';
    delivery = DELIVERY_FEES[selected];
  }
  return { subtotal, delivery, total: subtotal + delivery };
}

// ====== UPDATE CART ======
function updateCartUI(){
  cartItemsEl.innerHTML = ''; 
  let count = 0;
  Object.entries(cart).forEach(([k, i]) => {
    count += i.qty;
    const div = document.createElement('div'); 
    div.className = 'cart-item';
    div.innerHTML = `
      <div class="mini-thumb">${i.variant}</div>
      <div class="ci-meta">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div><div style="font-weight:700">${i.name}</div><div class="small">${i.variant}</div></div>
          <div style="text-align:right"><div class="small">Unit</div><div>${formatR(i.price)}</div></div>
        </div>
        <div style="display:flex;gap:8px;margin-top:8px;align-items:center">
          <input type="number" min="1" value="${i.qty}" style="width:68px;padding:6px;border-radius:8px;background:#fff;border:1px solid #ccc"/>
          <button class="btn" data-key="${k}" style="padding:6px 10px">Remove</button>
        </div>
      </div>`;
    const qtyInput = div.querySelector('input[type="number"]'); 
    qtyInput.onchange = e => { cart[k].qty = Math.max(1, Number(e.target.value) || 1); updateCartUI(); };
    div.querySelector('button[data-key]').onclick = () => { delete cart[k]; updateCartUI(); };
    cartItemsEl.appendChild(div);
  });
  cartCount.textContent = count;
  const totals = calcTotals();
  subtotalEl.textContent = formatR(totals.subtotal);
  deliveryFeeEl.textContent = totals.delivery === 0 ? 'Free' : formatR(totals.delivery);
  totalEl.textContent = formatR(totals.total);
}

// ====== CART DRAWER ======
function showCart(){ cartDrawer.classList.add('show'); cartDrawer.setAttribute('aria-hidden','false'); }
function hideCart(){ cartDrawer.classList.remove('show'); cartDrawer.setAttribute('aria-hidden','true'); }

document.getElementById('openCart').addEventListener('click',showCart);
document.getElementById('closeCart').addEventListener('click',hideCart);

// ====== WHATSAPP CHECKOUT ======
document.getElementById('whatsappCheckout').addEventListener('click',()=>{
  const totals = calcTotals();
  if (totals.subtotal === 0){ alert('Cart is empty'); return; }

  const deliveryType = totals.delivery===0?'Free':(deliverySelect.value==='courier'?'Courier':'PAXI');

  const lines = [
    'AM Collection - New Order',
    '------------------------',
    ...Object.values(cart).map(it => `${it.name} (${it.variant}) x ${it.qty} — ${formatR(it.price * it.qty)}`),
    '------------------------',
    `Subtotal: ${formatR(totals.subtotal)}`,
    `Delivery: ${deliveryType} - ${totals.delivery===0?'Free':formatR(totals.delivery)}`,
    `Total: ${formatR(totals.total)}`,
    '',
    'Payment via bank transfer to:',
    'Bank: Capitec Bank',
    'Account Name: Saving',
    'Account Holder: A.Mkongi',
    'Account Number: 2109530525',
    '',
    'Customer name:',
    'Delivery address:',
    'Phone/WhatsApp:'
  ];

  openWhatsAppMessage(lines.join('\n'));
});

function openWhatsAppMessage(msg){
  const businessPhone='27834939704';
  window.open(`https://wa.me/${businessPhone}?text=${encodeURIComponent(msg)}`,'_blank');
}




/**
 * Farms.ge — Agricultural Marketplace JavaScript Logic
 * Features: Live search, category/region filter, shopping cart drawer,
 * wishlist toggle, quick-view modal, auth modal & toast notifications.
 */

// ==========================================
// 1. Mock Data: Products & Farmers
// ==========================================
const productsData = [
  {
    id: 1,
    title: "ქართული ნატურალური თაფლი",
    category: "honey",
    region: "კახეთი",
    subRegion: "ლაგოდეხი",
    farmer: "მელაძის საფუტკრე",
    farmerId: 1,
    price: 25,
    unit: "₾ / კგ",
    rating: 5.0,
    reviews: 48,
    badge: "ალპური ზონა",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
    description: "ლაგოდეხის დაცული ტერიტორიის ველურ ყვავილებსა და ალპურ მდელოებზე მოპოვებული 100% ნატურალური, ბიო-სერტიფიცირებული თაფლი. გაუფილტრავი, მდიდარი სამკურნალო თვისებებით."
  },
  {
    id: 2,
    title: "სოფლის იმერული ყველი",
    category: "dairy",
    region: "იმერეთი",
    subRegion: "ტყიბული",
    farmer: "იმერული რძე",
    farmerId: 2,
    price: 30,
    unit: "₾ / კგ",
    rating: 5.0,
    reviews: 62,
    badge: "დილის წველა",
    image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=600&q=80",
    description: "მზადდება ტყიბულის მთიან საძოვრებზე გაზრდილი ქართული ჯიშის ძროხების დილის ნედლი რძით. ნაზი, ზომიერად მარილიანი და წარმოუდგენლად წვნიანი."
  },
  {
    id: 3,
    title: "სეზონური ბოსტნეულის კალათა",
    category: "produce",
    region: "ქვემო ქართლი",
    subRegion: "მარნეული",
    farmer: "აგრო ქართლი",
    farmerId: 4,
    price: 20,
    unit: "₾ / კალათა",
    rating: 4.8,
    reviews: 34,
    badge: "სეზონური ნაკრები",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    description: "ახალმოკრეფილი ვარდისფერი პომიდორი (2კგ), ხრაშუნა კიტრი (1.5კგ), ბულგარული წიწაკა და სურნელოვანი მწვანილის დიდი კონა. ქიმიური სასუქების გარეშე."
  },
  {
    id: 4,
    title: "ქვევრის საფერავი 2022 (ბიო)",
    category: "wine",
    region: "კახეთი",
    subRegion: "ყვარელი",
    farmer: "ხუციშვილის მარანი",
    farmerId: 3,
    price: 45,
    unit: "₾ / ბოთლი",
    rating: 4.95,
    reviews: 51,
    badge: "ქვევრის ღვინო",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80",
    description: "8000-წლიანი კახური ტრადიციით ქვევრში 6 თვე ჭაჭაზე დავარგებული გაუფილტრავი მშრალი წითელი ღვინო. მუქი ლალისფერი, მაყვლისა და მუხის ტონებით."
  },
  {
    id: 5,
    title: "შებოლილი მეგრული სულგუნი",
    category: "dairy",
    region: "სამეგრელო",
    subRegion: "ზუგდიდი",
    farmer: "მეგრული ტრადიცია",
    farmerId: 2,
    price: 35,
    unit: "₾ / კგ",
    rating: 4.9,
    reviews: 78,
    badge: "ხის კვამლზე",
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80",
    description: "ნამდვილი ზუგდიდური შებოლილი სულგუნი, გამომშრალი მურყნის (თხილის) ნატურალურ კვამლზე. ოქროსფერი ქერქით და ელასტიკური შიგთავსით."
  },
  {
    id: 6,
    title: "ქართლური ვაშლი 'მკვრივი წითელი'",
    category: "produce",
    region: "შიდა ქართლი",
    subRegion: "გორი",
    farmer: "გორის ბაღები",
    farmerId: 4,
    price: 4.5,
    unit: "₾ / კგ",
    rating: 4.7,
    reviews: 29,
    badge: "100% ორგანული",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80",
    description: "გორის მზიან ბაღებში მოყვანილი ხრაშუნა, წვნიანი და არომატული წითელი ვაშლი. მოკრეფილია ხელით, დაუზიანებლად."
  },
  {
    id: 7,
    title: "რაჭული ტრადიციული ლორი",
    category: "meat",
    region: "რაჭა-ლეჩხუმი",
    subRegion: "ამბროლაური",
    farmer: "რაჭის საგანძური",
    farmerId: 1,
    price: 55,
    unit: "₾ / კგ",
    rating: 5.0,
    reviews: 41,
    badge: "ნატურალური შებოლილი",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    description: "რაჭის მთებში წიფლისა და მუხის ხის კვამლზე სპეციალური ტექნოლოგიით შებოლილი ღორის ხორცი. შეუდარებელი გემო და არომატი ლობიანისთვის და სუფრისთვის."
  },
  {
    id: 8,
    title: "ნატურალური ჩურჩხელა & კაკლის მურაბა",
    category: "honey",
    region: "კახეთი",
    subRegion: "თელავი",
    farmer: "თელავის ნუგბარი",
    farmerId: 3,
    price: 15,
    unit: "₾ / შეკვრა",
    rating: 4.9,
    reviews: 39,
    badge: "შაქრის გარეშე",
    image: "https://images.unsplash.com/photo-1568471173242-461f0a730452?auto=format&fit=crop&w=600&q=80",
    description: "საფერავის ნატურალური ბადაგითა და ქართული კაკლით დამზადებული 3 ცალი ჩურჩხელა და 350გ მწვანე კაკლის ტრადიციული მურაბა."
  }
];

// ==========================================
// 2. Application State (LocalStorage sync)
// ==========================================
let cart = JSON.parse(localStorage.getItem('farms_ge_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('farms_ge_wishlist')) || [];
let currentCategoryFilter = 'all';
let currentRegionFilter = 'all';
let currentSearchQuery = '';

// ==========================================
// 3. Initialization
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();
  updateWishlistUI();
  setupEventListeners();
  initStickyHeader();
});

// ==========================================
// 4. Product Rendering & Marketplace
// ==========================================
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const filtered = productsData.filter(product => {
    // Category match
    const categoryMatch = currentCategoryFilter === 'all' || product.category === currentCategoryFilter;
    
    // Region match
    const regionMatch = currentRegionFilter === 'all' || 
                        product.region.toLowerCase().includes(currentRegionFilter.toLowerCase());

    // Search query match
    const q = currentSearchQuery.trim().toLowerCase();
    const queryMatch = !q || 
                       product.title.toLowerCase().includes(q) ||
                       product.farmer.toLowerCase().includes(q) ||
                       product.region.toLowerCase().includes(q) ||
                       product.description.toLowerCase().includes(q);

    return categoryMatch && regionMatch && queryMatch;
  });

  // Filter feedback bar
  const feedbackBar = document.getElementById('activeFilterBar');
  const feedbackText = document.getElementById('activeFilterText');
  if (currentCategoryFilter !== 'all' || currentRegionFilter !== 'all' || currentSearchQuery) {
    feedbackBar.classList.remove('hidden');
    let summaryParts = [];
    if (currentSearchQuery) summaryParts.push(`ძებნა: „${currentSearchQuery}“`);
    if (currentCategoryFilter !== 'all') summaryParts.push(`კატეგორია: ${getCategoryLabel(currentCategoryFilter)}`);
    if (currentRegionFilter !== 'all') summaryParts.push(`რეგიონი: ${currentRegionFilter}`);
    feedbackText.textContent = `ნაპოვნია ${filtered.length} პროდუქტი (${summaryParts.join(' • ')})`;
  } else {
    feedbackBar.classList.add('hidden');
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <div style="font-size: 3rem; margin-bottom: 12px;">🔍</div>
        <h3 style="font-size: 1.3rem; color: var(--primary-dark); margin-bottom: 8px;">პროდუქტი ვერ მოიძებნა</h3>
        <p style="color: var(--text-muted); margin-bottom: 20px;">სცადეთ სხვა საძიებო სიტყვა ან შეცვალეთ რეგიონი/კატეგორია.</p>
        <button class="btn-primary" onclick="resetFilters()">ყველა პროდუქტის ნახვა</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(product => {
    const isFav = wishlist.includes(product.id);
    return `
      <div class="product-card" data-id="${product.id}">
        <div class="product-img-wrap" onclick="openQuickView(${product.id})">
          <img src="${product.image}" alt="${product.title}" loading="lazy">
          <span class="product-badge-tag">${product.badge}</span>
          <button class="product-fav-btn ${isFav ? 'active' : ''}" 
                  onclick="event.stopPropagation(); toggleWishlist(${product.id})" 
                  aria-label="რჩეულებში დამატება" 
                  title="რჩეულებში დამატება">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>

        <div class="product-card-body">
          <div class="product-region-row">
            <div class="product-region">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>${product.region}</span>
            </div>
            <span class="product-farmer" title="მწარმოებელი ფერმერი">${product.farmer}</span>
          </div>

          <h3 class="product-title" onclick="openQuickView(${product.id})">${product.title}</h3>

          <div class="product-rating-row">
            <span class="star-icons">★★★★★</span>
            <span class="rating-number">${product.rating}</span>
            <span class="reviews-count">(${product.reviews})</span>
          </div>

          <div class="product-card-footer">
            <div class="product-price-box">
              <span class="price-main">${product.price} ₾</span>
              <span class="price-unit">${product.unit}</span>
            </div>

            <button class="btn-add-cart" onclick="addToCart(${product.id})" aria-label="კალათაში დამატება">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <span>დამატება</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function getCategoryLabel(catKey) {
  const map = {
    produce: 'ბოსტნეული და ხილი',
    honey: 'თაფლი და მეფუტკრეობა',
    dairy: 'რძის პროდუქტები',
    wine: 'ღვინო და მარანი',
    meat: 'ხორცი და ფრინველი',
    machinery: 'აგროტექნიკა',
    seeds: 'თესლი და ნერგები',
    tourism: 'აგროტურიზმი'
  };
  return map[catKey] || catKey;
}

// ==========================================
// 5. Filter & Search Handlers
// ==========================================
function filterByCategory(categoryKey) {
  currentCategoryFilter = categoryKey;
  
  // Update category pills state
  document.querySelectorAll('.filter-pills-row .pill-btn').forEach(btn => {
    if (btn.getAttribute('data-filter') === categoryKey) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  renderProducts();
  scrollToSection('products');
}

function filterByRegion(regionName) {
  currentRegionFilter = regionName;
  const heroSelect = document.getElementById('heroRegionSelect');
  if (heroSelect) heroSelect.value = regionName;

  const currentRegionLabel = document.getElementById('currentRegionLabel');
  if (currentRegionLabel) currentRegionLabel.textContent = regionName;

  renderProducts();
  scrollToSection('products');
}

function handleHeroSearch() {
  const input = document.getElementById('heroSearchInput');
  const regionSelect = document.getElementById('heroRegionSelect');
  
  if (input) currentSearchQuery = input.value;
  if (regionSelect) {
    currentRegionFilter = regionSelect.value;
    const currentRegionLabel = document.getElementById('currentRegionLabel');
    if (currentRegionLabel) {
      currentRegionLabel.textContent = regionSelect.value === 'all' ? 'ყველა რეგიონი' : regionSelect.value;
    }
  }

  renderProducts();
  scrollToSection('products');
}

function handleSearch(e) {
  if (e) e.preventDefault();
  const headerInput = document.getElementById('headerSearchInput');
  if (headerInput) {
    currentSearchQuery = headerInput.value;
    renderProducts();
    scrollToSection('products');
  }
}

function handleMobileSearch() {
  const input = document.getElementById('mobileSearchInput');
  if (input) {
    currentSearchQuery = input.value;
    closeMobileDrawer();
    renderProducts();
    scrollToSection('products');
  }
}

function quickSearch(tag) {
  currentSearchQuery = tag;
  const heroInput = document.getElementById('heroSearchInput');
  if (heroInput) heroInput.value = tag;
  renderProducts();
  scrollToSection('products');
}

function resetFilters() {
  currentCategoryFilter = 'all';
  currentRegionFilter = 'all';
  currentSearchQuery = '';

  const heroInput = document.getElementById('heroSearchInput');
  if (heroInput) heroInput.value = '';

  const headerInput = document.getElementById('headerSearchInput');
  if (headerInput) headerInput.value = '';

  const heroRegionSelect = document.getElementById('heroRegionSelect');
  if (heroRegionSelect) heroRegionSelect.value = 'all';

  const currentRegionLabel = document.getElementById('currentRegionLabel');
  if (currentRegionLabel) currentRegionLabel.textContent = 'ყველა რეგიონი';

  document.querySelectorAll('.filter-pills-row .pill-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-filter') === 'all');
  });

  renderProducts();
}

function toggleAllProducts() {
  resetFilters();
  scrollToSection('products');
  showNotification('ყველა პროდუქტი ჩატვირთულია!');
}

// ==========================================
// 6. Shopping Cart Logic
// ==========================================
function addToCart(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  const existingIndex = cart.findIndex(item => item.id === productId);
  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      unit: product.unit,
      farmer: product.farmer,
      image: product.image,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();
  showNotification(`„${product.title}“ დაემატა კალათაში!`);
  
  // Animate cart button
  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) {
    cartBtn.style.transform = 'scale(1.2)';
    setTimeout(() => cartBtn.style.transform = '', 200);
  }
}

function updateCartQty(productId, delta) {
  const itemIndex = cart.findIndex(item => item.id === productId);
  if (itemIndex > -1) {
    cart[itemIndex].quantity += delta;
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }
  }
  saveCart();
  updateCartUI();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
  showNotification('პროდუქტი ამოიშალა კალათიდან');
}

function saveCart() {
  localStorage.setItem('farms_ge_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const cartCount = document.getElementById('cartCount');
  const cartDrawerCount = document.getElementById('cartDrawerCount');
  const itemsContainer = document.getElementById('cartItemsContainer');
  const subtotalElem = document.getElementById('cartSubtotalAmount');
  const deliveryElem = document.getElementById('cartDeliveryAmount');
  const totalElem = document.getElementById('cartTotalAmount');
  const progressBar = document.getElementById('shippingProgressBar');
  const shippingText = document.getElementById('shippingText');

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCount) cartCount.textContent = totalQuantity;
  if (cartDrawerCount) cartDrawerCount.textContent = `(${totalQuantity})`;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const freeShippingThreshold = 50;
  const isFreeDelivery = subtotal >= freeShippingThreshold;
  const deliveryFee = subtotal > 0 ? (isFreeDelivery ? 0 : 5) : 0;
  const grandTotal = subtotal + deliveryFee;

  if (subtotalElem) subtotalElem.textContent = `${subtotal.toFixed(2)} ₾`;
  if (deliveryElem) deliveryElem.textContent = isFreeDelivery ? 'უფასო' : `${deliveryFee} ₾`;
  if (totalElem) totalElem.textContent = `${grandTotal.toFixed(2)} ₾`;

  // Free shipping progress
  if (progressBar && shippingText) {
    if (subtotal === 0) {
      progressBar.style.width = '0%';
      shippingText.textContent = `დაამატეთ 50 ₾-ის პროდუქცია უფასო მიწოდებისთვის`;
    } else if (isFreeDelivery) {
      progressBar.style.width = '100%';
      shippingText.textContent = `🎉 გილოცავთ! თქვენ მიიღეთ უფასო მიწოდება!`;
    } else {
      const left = freeShippingThreshold - subtotal;
      const pct = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
      progressBar.style.width = `${pct}%`;
      shippingText.textContent = `დაამატეთ კიდევ ${left.toFixed(2)} ₾ უფასო მიწოდებისთვის`;
    }
  }

  // Render items in drawer
  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty-state">
        <div class="empty-icon">🧺</div>
        <h4>შენი კალათა ცარიელია</h4>
        <p>დაათვალიერე ქართველი ფერმერების პროდუქცია და შეუკვეთე შუამავლების გარეშე</p>
        <button class="btn-primary" onclick="closeCart(); scrollToSection('products');">პროდუქტების ნახვა</button>
      </div>
    `;
    return;
  }

  itemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.title}" class="cart-item-img">
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.title}</h4>
        <span class="cart-item-farmer">${item.farmer}</span>
        
        <div class="cart-item-controls">
          <div class="qty-stepper">
            <button class="qty-btn" onclick="updateCartQty(${item.id}, -1)">−</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn" onclick="updateCartQty(${item.id}, 1)">+</button>
          </div>
          <div style="display: flex; align-items: center;">
            <span class="cart-item-price">${(item.price * item.quantity).toFixed(2)} ₾</span>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="წაშლა">✕</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function openCart() {
  document.getElementById('cartDrawer')?.classList.add('active');
  document.getElementById('cartOverlay')?.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartDrawer')?.classList.remove('active');
  document.getElementById('cartOverlay')?.classList.remove('active');
  document.body.style.overflow = '';
}

function handleCheckout() {
  if (cart.length === 0) {
    showNotification('კალათა ცარიელია! ჯერ დაამატეთ პროდუქცია.');
    return;
  }
  closeCart();
  openAuthModal('login');
  showNotification('შეკვეთის გასაფორმებლად გთხოვთ გაიაროთ ავტორიზაცია');
}

// ==========================================
// 7. Wishlist / Favorites Logic
// ==========================================
function toggleWishlist(productId) {
  const index = wishlist.indexOf(productId);
  const product = productsData.find(p => p.id === productId);

  if (index > -1) {
    wishlist.splice(index, 1);
    showNotification('პროდუქტი ამოიშალა რჩეულებიდან');
  } else {
    wishlist.push(productId);
    showNotification(`„${product?.title}“ დაემატა რჩეულებში! ❤️`);
  }

  localStorage.setItem('farms_ge_wishlist', JSON.stringify(wishlist));
  updateWishlistUI();
  renderProducts();
}

function updateWishlistUI() {
  const countElem = document.getElementById('wishlistCount');
  const drawerCountElem = document.getElementById('wishlistDrawerCount');
  const itemsContainer = document.getElementById('wishlistItemsContainer');

  if (countElem) countElem.textContent = wishlist.length;
  if (drawerCountElem) drawerCountElem.textContent = `(${wishlist.length})`;

  if (!itemsContainer) return;

  const favProducts = productsData.filter(p => wishlist.includes(p.id));
  if (favProducts.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty-state">
        <div class="empty-icon">❤️</div>
        <h4>რჩეულებში პროდუქტი არ გაქვს</h4>
        <p>დააჭირე გულის ნიშანს ნებისმიერ პროდუქტზე მის შესანახად</p>
      </div>
    `;
    return;
  }

  itemsContainer.innerHTML = favProducts.map(p => `
    <div class="cart-item">
      <img src="${p.image}" alt="${p.title}" class="cart-item-img">
      <div class="cart-item-details">
        <h4 class="cart-item-title">${p.title}</h4>
        <span class="cart-item-farmer">${p.region} • ${p.farmer}</span>
        <div class="cart-item-controls">
          <span class="cart-item-price">${p.price} ₾</span>
          <button class="btn-add-cart" onclick="addToCart(${p.id})">კალათაში</button>
          <button class="cart-item-remove" onclick="toggleWishlist(${p.id})">✕</button>
        </div>
      </div>
    </div>
  `).join('');
}

function openWishlist() {
  document.getElementById('wishlistDrawer')?.classList.add('active');
  document.getElementById('wishlistOverlay')?.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeWishlist() {
  document.getElementById('wishlistDrawer')?.classList.remove('active');
  document.getElementById('wishlistOverlay')?.classList.remove('active');
  document.body.style.overflow = '';
}

// ==========================================
// 8. Quick View Modal
// ==========================================
function openQuickView(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('quickViewModal');
  const body = document.getElementById('quickViewBody');
  if (!modal || !body) return;

  body.innerHTML = `
    <div class="quickview-grid">
      <div>
        <img src="${product.image}" alt="${product.title}" class="quickview-img">
      </div>
      <div class="quickview-info">
        <div class="quickview-farmer-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>${product.region}, ${product.subRegion} • ${product.farmer}</span>
        </div>
        <h2>${product.title}</h2>
        <div class="product-rating-row" style="margin-bottom: 12px;">
          <span class="star-icons">★★★★★</span>
          <span class="rating-number">${product.rating}</span>
          <span class="reviews-count">(${product.reviews} შეფასება)</span>
        </div>
        <div class="quickview-price">
          ${product.price} ₾ <span style="font-size: 0.9rem; color: var(--text-light); font-weight: 500;">${product.unit}</span>
        </div>
        <p class="quickview-desc">${product.description}</p>
        
        <div style="background: var(--bg-subtle); padding: 12px 16px; border-radius: var(--radius-sm); margin-bottom: 24px; font-size: 0.85rem;">
          <div>📦 <strong>მიწოდება:</strong> თბილისში 24 საათში, რეგიონებში 48 საათში</div>
          <div style="margin-top: 4px;">🌿 <strong>ხარისხი:</strong> 100% ნატურალური, ფერმერული სერტიფიკატით</div>
        </div>

        <div class="quickview-actions">
          <button class="btn-primary" style="flex: 1;" onclick="addToCart(${product.id}); closeQuickView();">
            კალათაში დამატება
          </button>
          <button class="btn-secondary" onclick="toggleWishlist(${product.id})">
            ${wishlist.includes(product.id) ? '❤️ შენახულია' : '🤍 რჩეულებში'}
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  document.getElementById('quickViewModal')?.classList.remove('active');
  document.body.style.overflow = '';
}

// ==========================================
// 9. Auth Modal (Login / Register / Farmer)
// ==========================================
function openAuthModal(type = 'login') {
  const modal = document.getElementById('authModal');
  if (!modal) return;
  switchAuthTab(type);
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
  document.getElementById('authModal')?.classList.remove('active');
  document.body.style.overflow = '';
}

function switchAuthTab(tab) {
  const tabLoginBtn = document.getElementById('tabLoginBtn');
  const tabRegisterBtn = document.getElementById('tabRegisterBtn');
  const tabFarmerBtn = document.getElementById('tabFarmerBtn');

  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const farmerRegisterForm = document.getElementById('farmerRegisterForm');

  [tabLoginBtn, tabRegisterBtn, tabFarmerBtn].forEach(b => b?.classList.remove('active'));
  [loginForm, registerForm, farmerRegisterForm].forEach(f => f?.classList.add('hidden'));

  if (tab === 'login') {
    tabLoginBtn?.classList.add('active');
    loginForm?.classList.remove('hidden');
  } else if (tab === 'register') {
    tabRegisterBtn?.classList.add('active');
    registerForm?.classList.remove('hidden');
  } else if (tab === 'farmer-register') {
    tabFarmerBtn?.classList.add('active');
    farmerRegisterForm?.classList.remove('hidden');
  }
}

function handleAuthSubmit(type) {
  closeAuthModal();
  if (type === 'login') {
    showNotification('ავტორიზაცია წარმატებით დასრულდა! კეთილი იყოს თქვენი მობრძანება.');
  } else if (type === 'register') {
    showNotification('რეგისტრაცია წარმატებით დასრულდა! მოგესალმებით Farms.ge-ზე.');
  } else if (type === 'farmer-register') {
    showNotification('ფერმერის განაცხადი მიღებულია! ჩვენი აგრო-მენეჯერი 24 საათში დაგიკავშირდებათ.');
  }
}

function showFarmerHelpModal() {
  openAuthModal('farmer-register');
}

function openFarmerDetails(farmerId) {
  const farmer = productsData.find(p => p.farmerId === farmerId);
  if (farmer) {
    currentSearchQuery = farmer.farmer;
    renderProducts();
    scrollToSection('products');
    showNotification(`გაფილტრულია „${farmer.farmer}“-ის პროდუქცია`);
  }
}

// ==========================================
// 10. Sticky Header & Navigation
// ==========================================
function initStickyHeader() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId);
  if (target) {
    const headerHeight = document.getElementById('mainHeader')?.offsetHeight || 70;
    const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerHeight - 15;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// ==========================================
// 11. Mobile Drawer Navigation
// ==========================================
function openMobileDrawer() {
  document.getElementById('mobileDrawer')?.classList.add('active');
  document.getElementById('drawerOverlay')?.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMobileDrawer() {
  document.getElementById('mobileDrawer')?.classList.remove('active');
  document.getElementById('drawerOverlay')?.classList.remove('active');
  document.body.style.overflow = '';
}

// ==========================================
// 12. Toast Notifications
// ==========================================
function showNotification(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="font-size: 1.1rem;">🌿</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ==========================================
// 13. Event Listeners Setup
// ==========================================
function setupEventListeners() {
  // Cart drawer toggles
  document.getElementById('cartBtn')?.addEventListener('click', openCart);
  document.getElementById('closeCartBtn')?.addEventListener('click', closeCart);
  document.getElementById('cartOverlay')?.addEventListener('click', closeCart);

  // Wishlist drawer toggles
  document.getElementById('wishlistBtn')?.addEventListener('click', openWishlist);
  document.getElementById('closeWishlistBtn')?.addEventListener('click', closeWishlist);
  document.getElementById('wishlistOverlay')?.addEventListener('click', closeWishlist);

  // Auth modal toggles
  document.getElementById('openAuthModalBtn')?.addEventListener('click', () => openAuthModal('login'));
  document.getElementById('openRegisterModalBtn')?.addEventListener('click', () => openAuthModal('register'));

  // Mobile menu
  document.getElementById('mobileMenuBtn')?.addEventListener('click', openMobileDrawer);
  document.getElementById('closeDrawerBtn')?.addEventListener('click', closeMobileDrawer);
  document.getElementById('drawerOverlay')?.addEventListener('click', closeMobileDrawer);

  document.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', closeMobileDrawer);
  });

  // Filter pills
  document.querySelectorAll('.filter-pills-row .pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      currentCategoryFilter = filter;
      document.querySelectorAll('.filter-pills-row .pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts();
    });
  });

  // Hero search tab switcher
  document.querySelectorAll('.search-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.search-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const type = tab.getAttribute('data-search-type');
      const input = document.getElementById('heroSearchInput');
      if (input) {
        if (type === 'farms') input.placeholder = 'მოძებნე ფერმა ან მწარმოებელი...';
        else if (type === 'tourism') input.placeholder = 'მოძებნე აგროტური, მარანი ან კოტეჯი...';
        else input.placeholder = 'მოძებნე პროდუქტი, ფერმა ან მომსახურება...';
      }
    });
  });

  // Live input listening on header search
  const headerSearchInput = document.getElementById('headerSearchInput');
  if (headerSearchInput) {
    headerSearchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      renderProducts();
    });
  }

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeWishlist();
      closeQuickView();
      closeAuthModal();
      closeMobileDrawer();
    }
  });
}

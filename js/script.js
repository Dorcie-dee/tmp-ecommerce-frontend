// Product Data - Will be loaded from JSON file
let products = []

// Cart State
let cart = JSON.parse(localStorage.getItem("audiophile-cart")) || []

// DOM Elements
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const nav = document.getElementById("nav")
const cartIcon = document.getElementById("cartIcon")
const cartCount = document.getElementById("cartCount")
const cartModal = document.getElementById("cartModal")
const productModal = document.getElementById("productModal")
const checkoutModal = document.getElementById("checkoutModal")
const confirmationModal = document.getElementById("confirmationModal")
const productsGrid = document.getElementById("productsGrid")

// Get current category from window object or URL
const currentCategory = window.currentCategory || getCurrentCategoryFromURL()

// Initialize App
document.addEventListener("DOMContentLoaded", async () => {
  await loadProductData()

  if (currentCategory && currentCategory !== "all") {
    loadCategoryProducts()
  } else {
    loadProducts()
  }
  updateCartUI()
  setupEventListeners()
})

// Load product data from JSON file
async function loadProductData() {
  try {
    const response = await fetch("data.json")
    if (!response.ok) {
      throw new Error("Failed to load product data")
    }
    products = await response.json()
  } catch (error) {
    console.error("Error loading product data:", error)
    // Fallback to empty array if JSON fails to load
    products = []
  }
}

// Get category from URL
function getCurrentCategoryFromURL() {
  const path = window.location.pathname
  if (path.includes("headphones")) return "headphones"
  if (path.includes("speakers")) return "speakers"
  if (path.includes("earphones")) return "earphones"
  return "all"
}

// Helper function to get responsive image
function getResponsiveImage(imageObj) {
  // For now, return desktop image as fallback
  // In a real implementation, you'd detect screen size and return appropriate image
  return imageObj.desktop || imageObj.tablet || imageObj.mobile
}

// Event Listeners
function setupEventListeners() {
  // Mobile menu toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      nav.classList.toggle("active")
    })
  }

  // Cart icon click
  if (cartIcon) {
    cartIcon.addEventListener("click", () => {
      showCartModal()
    })
  }

  // Modal close events
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      closeAllModals()
    }
  })

  // Close buttons
  const closeProductModal = document.getElementById("closeProductModal")
  const closeCheckoutModal = document.getElementById("closeCheckoutModal")

  if (closeProductModal) {
    closeProductModal.addEventListener("click", closeAllModals)
  }
  if (closeCheckoutModal) {
    closeCheckoutModal.addEventListener("click", closeAllModals)
  }

  // Cart actions
  const removeAllBtn = document.getElementById("removeAllBtn")
  const checkoutBtn = document.getElementById("checkoutBtn")

  if (removeAllBtn) {
    removeAllBtn.addEventListener("click", clearCart)
  }
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", showCheckoutModal)
  }

  // Checkout form
  const checkoutForm = document.getElementById("checkoutForm")
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", handleCheckoutSubmit)
  }

  // Payment method change
  document.querySelectorAll('input[name="paymentMethod"]').forEach((radio) => {
    radio.addEventListener("change", togglePaymentFields)
  })

  // Back to home button
  const backToHomeBtn = document.getElementById("backToHomeBtn")
  if (backToHomeBtn) {
    backToHomeBtn.addEventListener("click", () => {
      closeAllModals()
      window.location.href = "index.html"
    })
  }
}

// Load Products (for home page)
function loadProducts() {
  if (!productsGrid || products.length === 0) return

  productsGrid.innerHTML = ""
  products.forEach((product) => {
    const productCard = createProductCard(product)
    productsGrid.appendChild(productCard)
  })
}

// Load Category Products (for category pages)
function loadCategoryProducts() {
  if (products.length === 0) return

  const categoryProducts = products.filter((product) => product.category === currentCategory)

  // Get the appropriate container
  const container =
    document.getElementById(`${currentCategory}List`) ||
    document.getElementById("headphonesList") ||
    document.getElementById("speakersList") ||
    document.getElementById("earphonesList")

  if (!container) return

  container.innerHTML = ""

  // Sort products with new products first
  const sortedProducts = categoryProducts.sort((a, b) => {
    if (a.new && !b.new) return -1
    if (!a.new && b.new) return 1
    return 0
  })

  sortedProducts.forEach((product, index) => {
    const productShowcase = createProductShowcase(product, index)
    container.appendChild(productShowcase)
  })
}

// Create Product Card (for home page)
function createProductCard(product) {
  const card = document.createElement("div")
  card.className = "product-card"

  card.innerHTML = `
        <div class="product-image">
            <img src="${getResponsiveImage(product.image)}" alt="${product.name}">
        </div>
        <div class="product-info">
            ${product.new ? '<p class="product-new">NEW PRODUCT</p>' : ""}
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="product-price">$ ${product.price.toLocaleString()}</p>
            <button class="btn btn-primary" onclick="showProductDetail('${product.slug}')">SEE PRODUCT</button>
        </div>
    `

  return card
}

// Create Product Showcase (for category pages)
function createProductShowcase(product, index) {
  const showcase = document.createElement("div")
  showcase.className = "product-showcase"

  showcase.innerHTML = `
    <div class="product-showcase-image">
      <img src="${getResponsiveImage(product.categoryImage)}" alt="${product.name}">
    </div>
    <div class="product-showcase-content">
      ${product.new ? '<p class="product-new">NEW PRODUCT</p>' : ""}
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <button class="btn btn-primary" onclick="showProductDetail('${product.slug}')">SEE PRODUCT</button>
    </div>
  `

  return showcase
}

// Show Product Detail
function showProductDetail(productSlug) {
  const product = products.find((p) => p.slug === productSlug)
  if (!product) return

  const productDetail = document.getElementById("productDetail")

  // Split features by newlines for better formatting
  const featuresFormatted = product.features
    .split("\n\n")
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("")

  productDetail.innerHTML = `
        <div class="product-detail-image">
            <img src="${getResponsiveImage(product.image)}" alt="${product.name}">
        </div>
        <div class="product-detail-info">
            ${product.new ? '<p class="product-new">NEW PRODUCT</p>' : ""}
            <h2>${product.name}</h2>
            <p class="product-detail-description">${product.description}</p>
            <p class="product-detail-price">$ ${product.price.toLocaleString()}</p>
            
            <div class="add-to-cart-controls">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="changeQuantity(-1)">-</button>
                    <span class="quantity-display" id="productQuantity">1</span>
                    <button class="quantity-btn" onclick="changeQuantity(1)">+</button>
                </div>
                <button class="btn btn-primary" onclick="addToCart('${product.slug}')">ADD TO CART</button>
            </div>

            <div class="features-section">
                <h3>FEATURES</h3>
                ${featuresFormatted}
            </div>

            <div class="includes-section">
                <h3>IN THE BOX</h3>
                <ul class="includes-list">
                    ${product.includes
                      .map(
                        (item) => `
                        <li>
                            <span class="includes-quantity">${item.quantity}x</span>
                            <span>${item.item}</span>
                        </li>
                    `,
                      )
                      .join("")}
                </ul>
            </div>
        </div>
    `

  productModal.classList.add("active")
}

// Change Quantity
function changeQuantity(change) {
  const quantityDisplay = document.getElementById("productQuantity")
  let currentQuantity = Number.parseInt(quantityDisplay.textContent)
  currentQuantity = Math.max(1, currentQuantity + change)
  quantityDisplay.textContent = currentQuantity
}

// Add to Cart
function addToCart(productSlug) {
  const product = products.find((p) => p.slug === productSlug)
  const quantity = Number.parseInt(document.getElementById("productQuantity").textContent)

  const existingItem = cart.find((item) => item.slug === productSlug)

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.push({
      ...product,
      quantity: quantity,
    })
  }

  saveCart()
  updateCartUI()
  closeAllModals()
  showNotification(`${product.name} added to cart!`)
}

// Show Cart Modal
function showCartModal() {
  updateCartModal()
  cartModal.classList.add("active")
}

// Update Cart Modal
function updateCartModal() {
  const cartItems = document.getElementById("cartItems")
  const cartItemCount = document.getElementById("cartItemCount")
  const cartTotal = document.getElementById("cartTotal")

  cartItemCount.textContent = cart.length

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="text-center">Your cart is empty</p>'
    cartTotal.textContent = "$ 0"
    return
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${getResponsiveImage(item.image)}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$ ${item.price.toLocaleString()}</div>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateCartQuantity('${item.slug}', ${item.quantity - 1})">-</button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateCartQuantity('${item.slug}', ${item.quantity + 1})">+</button>
            </div>
        </div>
    `,
    )
    .join("")

  const total = calculateCartTotal()
  cartTotal.textContent = `$ ${total.toLocaleString()}`
}

// Update Cart Quantity
function updateCartQuantity(productSlug, newQuantity) {
  if (newQuantity <= 0) {
    cart = cart.filter((item) => item.slug !== productSlug)
  } else {
    const item = cart.find((item) => item.slug === productSlug)
    if (item) {
      item.quantity = newQuantity
    }
  }

  saveCart()
  updateCartUI()
  updateCartModal()
}

// Clear Cart
function clearCart() {
  cart = []
  saveCart()
  updateCartUI()
  updateCartModal()
}

// Calculate Cart Total
function calculateCartTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0)
}

// Update Cart UI
function updateCartUI() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
  cartCount.textContent = totalItems
  cartCount.style.display = totalItems > 0 ? "flex" : "none"
}

// Save Cart to localStorage
function saveCart() {
  localStorage.setItem("audiophile-cart", JSON.stringify(cart))
}

// Show Checkout Modal
function showCheckoutModal() {
  if (cart.length === 0) {
    showNotification("Your cart is empty!")
    return
  }

  updateCheckoutSummary()
  closeAllModals()
  checkoutModal.classList.add("active")
}

// Update Checkout Summary
function updateCheckoutSummary() {
  const summaryItems = document.getElementById("summaryItems")
  const summarySubtotal = document.getElementById("summarySubtotal")
  const summaryVat = document.getElementById("summaryVat")
  const summaryGrandTotal = document.getElementById("summaryGrandTotal")

  summaryItems.innerHTML = cart
    .map(
      (item) => `
        <div class="summary-item">
            <div class="summary-item-image">
                <img src="${getResponsiveImage(item.image)}" alt="${item.name}">
            </div>
            <div class="summary-item-info">
                <div class="summary-item-name">${item.name}</div>
                <div class="summary-item-price">$ ${item.price.toLocaleString()}</div>
            </div>
            <div class="summary-item-quantity">x${item.quantity}</div>
        </div>
    `,
    )
    .join("")

  const subtotal = calculateCartTotal()
  const shipping = 50
  const vat = Math.round(subtotal * 0.2)
  const grandTotal = subtotal + shipping + vat

  summarySubtotal.textContent = `$ ${subtotal.toLocaleString()}`
  summaryVat.textContent = `$ ${vat.toLocaleString()}`
  summaryGrandTotal.textContent = `$ ${grandTotal.toLocaleString()}`
}

// Toggle Payment Fields
function togglePaymentFields() {
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value
  const paymentFields = document.getElementById("paymentFields")

  if (paymentMethod === "eMoney") {
    paymentFields.style.display = "block"
    document.getElementById("eMoneyNumber").required = true
    document.getElementById("eMoneyPin").required = true
  } else {
    paymentFields.style.display = "none"
    document.getElementById("eMoneyNumber").required = false
    document.getElementById("eMoneyPin").required = false
  }
}

// Handle Checkout Submit
function handleCheckoutSubmit(e) {
  e.preventDefault()

  if (validateCheckoutForm()) {
    showOrderConfirmation()
  }
}

// Validate Checkout Form
function validateCheckoutForm() {
  const form = document.getElementById("checkoutForm")
  const formData = new FormData(form)
  let isValid = true

  // Clear previous errors
  document.querySelectorAll(".error-message").forEach((error) => {
    error.textContent = ""
  })
  document.querySelectorAll(".error").forEach((input) => {
    input.classList.remove("error")
  })

  // Required fields validation
  const requiredFields = ["name", "email", "phone", "address", "zipCode", "city", "country"]

  requiredFields.forEach((fieldName) => {
    const field = document.getElementById(fieldName)
    const errorElement = document.getElementById(fieldName + "Error")

    if (!field.value.trim()) {
      field.classList.add("error")
      errorElement.textContent = "This field is required"
      isValid = false
    }
  })

  // Email validation
  const email = document.getElementById("email")
  const emailError = document.getElementById("emailError")
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (email.value.trim() && !emailRegex.test(email.value)) {
    email.classList.add("error")
    emailError.textContent = "Please enter a valid email address"
    isValid = false
  }

  // Payment method validation
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value

  if (paymentMethod === "eMoney") {
    const eMoneyNumber = document.getElementById("eMoneyNumber")
    const eMoneyPin = document.getElementById("eMoneyPin")
    const eMoneyNumberError = document.getElementById("eMoneyNumberError")
    const eMoneyPinError = document.getElementById("eMoneyPinError")

    if (!eMoneyNumber.value.trim()) {
      eMoneyNumber.classList.add("error")
      eMoneyNumberError.textContent = "e-Money Number is required"
      isValid = false
    }

    if (!eMoneyPin.value.trim()) {
      eMoneyPin.classList.add("error")
      eMoneyPinError.textContent = "e-Money PIN is required"
      isValid = false
    }
  }

  return isValid
}

// Show Order Confirmation
function showOrderConfirmation() {
  const orderItems = document.getElementById("orderItems")
  const orderGrandTotal = document.getElementById("orderGrandTotal")

  // Show first item and count of others
  const firstItem = cart[0]
  const otherItemsCount = cart.length - 1

  orderItems.innerHTML = `
        <div class="order-item">
            <div class="order-item-image">
                <img src="${getResponsiveImage(firstItem.image)}" alt="${firstItem.name}">
            </div>
            <div class="order-item-info">
                <div class="order-item-name">${firstItem.name}</div>
                <div class="order-item-price">$ ${firstItem.price.toLocaleString()}</div>
            </div>
            <div class="order-item-quantity">x${firstItem.quantity}</div>
        </div>
        ${
          otherItemsCount > 0
            ? `
            <div class="text-center mt-2" style="color: #666; border-top: 1px solid #ddd; padding-top: 1rem;">
                and ${otherItemsCount} other item${otherItemsCount > 1 ? "s" : ""}
            </div>
        `
            : ""
        }
    `

  const subtotal = calculateCartTotal()
  const shipping = 50
  const vat = Math.round(subtotal * 0.2)
  const grandTotal = subtotal + shipping + vat

  orderGrandTotal.textContent = `$ ${grandTotal.toLocaleString()}`

  closeAllModals()
  confirmationModal.classList.add("active")

  // Clear cart after successful order
  setTimeout(() => {
    clearCart()
  }, 1000)
}

// Close All Modals
function closeAllModals() {
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.classList.remove("active")
  })
}

// Show Notification
function showNotification(message) {
  // Create notification element
  const notification = document.createElement("div")
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #d87d4a;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: 700;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `
  notification.textContent = message

  // Add animation keyframes
  if (!document.querySelector("#notification-styles")) {
    const style = document.createElement("style")
    style.id = "notification-styles"
    style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `
    document.head.appendChild(style)
  }

  document.body.appendChild(notification)

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 3000)
}

// Initialize payment fields visibility
document.addEventListener("DOMContentLoaded", () => {
  togglePaymentFields()
})

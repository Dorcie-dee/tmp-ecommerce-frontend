
const products = [
  {
    id: "xx99-mark-ii",
    name: "XX99 Mark II Headphones",
    description:
      "The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.",
    price: 2999,
    image: "/placeholder.svg?height=400&width=400",
    category: "headphones",
    isNew: true,
    features: [
      "Featuring a genuine leather head strap and premium earcups, these headphones deliver superior comfort for those who like to enjoy endless listening. It includes intuitive controls designed for any situation.",
      "The advanced active noise cancellation with high-quality microphones makes these headphones perfect for travel. The internal memory foam ear cushions allow for ultra-comfortable extended wear.",
    ],
    includes: [
      { quantity: 1, item: "Headphone Unit" },
      { quantity: 2, item: "Replacement Earcups" },
      { quantity: 1, item: "User Manual" },
      { quantity: 1, item: "3.5mm 5m Audio Cable" },
    ],
  },
  {
    id: "xx99-mark-i",
    name: "XX99 Mark I Headphones",
    description:
      "As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados.",
    price: 1750,
    image: "/placeholder.svg?height=400&width=400",
    category: "headphones",
    isNew: false,
    features: [
      "As the headphones all others are measured against, the XX99 Mark I demonstrates over five decades of audio expertise, redefining the critical listening experience.",
      "These headphones are built with premium materials and advanced driver technology to deliver uncompromising sonic performance.",
    ],
    includes: [
      { quantity: 1, item: "Headphone Unit" },
      { quantity: 2, item: "Replacement Earcups" },
      { quantity: 1, item: "User Manual" },
      { quantity: 1, item: "3.5mm 5m Audio Cable" },
    ],
  },
  {
    id: "xx59",
    name: "XX59 Headphones",
    description:
      "Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.",
    price: 899,
    image: "/placeholder.svg?height=400&width=400",
    category: "headphones",
    isNew: false,
    features: [
      "These headphones have been created from durable, high-quality materials tough enough to take anywhere. Its compact folding design fuses comfort and minimalist style making it perfect for travel.",
      "Versatile connectivity allows pairing with up to 2 Bluetooth devices at a time. The multipoint connection allows you to stay connected without the need to switch between devices.",
    ],
    includes: [
      { quantity: 1, item: "Headphone Unit" },
      { quantity: 2, item: "Replacement Earcups" },
      { quantity: 1, item: "User Manual" },
      { quantity: 1, item: "3.5mm 5m Audio Cable" },
    ],
  },
  {
    id: "zx9-speaker",
    name: "ZX9 Speaker",
    description:
      "Upgrade your sound system with the all new ZX9 active speaker. It's a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.",
    price: 4500,
    image: "/placeholder.svg?height=400&width=400",
    category: "speakers",
    isNew: true,
    features: [
      "Connect via Bluetooth or nearly any wired source. This speaker features optical, digital coaxial, USB Type-B, stereo RCA, and stereo 3.5mm inputs, allowing you to have up to five wired source connections at a time.",
      "Wirelessly connect with other ZX9 speakers to create a multi-room setup. Use the ZX9 as a standalone stereo speaker, or wirelessly connect multiple ZX9 speakers together to create a surround sound system.",
    ],
    includes: [
      { quantity: 2, item: "Speaker Unit" },
      { quantity: 2, item: "Speaker Cloth Panel" },
      { quantity: 1, item: "User Manual" },
      { quantity: 1, item: "3.5mm 10m Audio Cable" },
      { quantity: 1, item: "10m Optical Cable" },
    ],
  },
  {
    id: "zx7-speaker",
    name: "ZX7 Speaker",
    description:
      "Stream high quality sound wirelessly with minimal to no loss. The ZX7 speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.",
    price: 3500,
    image: "/placeholder.svg?height=400&width=400",
    category: "speakers",
    isNew: false,
    features: [
      "Reap the advantages of a flat diaphragm tweeter cone. This provides a fast response rate and excellent high frequencies that lower tiered bookshelf speakers cannot provide.",
      "The woofers are made from aluminum that produces a unique and clear sound. XLR inputs allow you to connect to a mixer for more advanced usage.",
    ],
    includes: [
      { quantity: 2, item: "Speaker Unit" },
      { quantity: 2, item: "Speaker Cloth Panel" },
      { quantity: 1, item: "User Manual" },
      { quantity: 1, item: "3.5mm 7.5m Audio Cable" },
      { quantity: 1, item: "7.5m Optical Cable" },
    ],
  },
  {
    id: "yx1-earphones",
    name: "YX1 Wireless Earphones",
    description:
      "Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.",
    price: 599,
    image: "/placeholder.svg?height=400&width=400",
    category: "earphones",
    isNew: true,
    features: [
      "Experience unrivalled stereo sound thanks to innovative acoustic technology. With improved ergonomics designed for full day wearing, these revolutionary earphones have been finely crafted to provide you with the perfect fit.",
      "A pioneering approach to active noise cancellation. Using dual connectivity, these earphones filter out all external sounds without affecting the quality of your audio.",
    ],
    includes: [
      { quantity: 2, item: "Earphone Unit" },
      { quantity: 6, item: "Multi-size Earplugs" },
      { quantity: 1, item: "User Manual" },
      { quantity: 1, item: "USB-C Charging Cable" },
      { quantity: 1, item: "Travel Pouch" },
    ],
  },
]

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

// Get current category from window object or URL
const currentCategory = window.currentCategory || getCurrentCategoryFromURL()

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  loadCategoryProducts()
  updateCartUI()
  setupEventListeners()
})

// Get category from URL
function getCurrentCategoryFromURL() {
  const path = window.location.pathname
  if (path.includes("headphones")) return "headphones"
  if (path.includes("speakers")) return "speakers"
  if (path.includes("earphones")) return "earphones"
  return "all"
}

// Load Category Products
function loadCategoryProducts() {
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
    if (a.isNew && !b.isNew) return -1
    if (!a.isNew && b.isNew) return 1
    return 0
  })

  sortedProducts.forEach((product, index) => {
    const productShowcase = createProductShowcase(product, index)
    container.appendChild(productShowcase)
  })
}

// Create Product Showcase
function createProductShowcase(product, index) {
  const showcase = document.createElement("div")
  showcase.className = "product-showcase"

  showcase.innerHTML = `
    <div class="product-showcase-image">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="product-showcase-content">
      ${product.isNew ? '<p class="product-new">NEW PRODUCT</p>' : ""}
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <button class="btn btn-primary" onclick="showProductDetail('${product.id}')">SEE PRODUCT</button>
    </div>
  `

  return showcase
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

// Show Product Detail
function showProductDetail(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  const productDetail = document.getElementById("productDetail")
  productDetail.innerHTML = `
    <div class="product-detail-image">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="product-detail-info">
      ${product.isNew ? '<p class="product-new">NEW PRODUCT</p>' : ""}
      <h2>${product.name}</h2>
      <p class="product-detail-description">${product.description}</p>
      <p class="product-detail-price">$ ${product.price.toLocaleString()}</p>
      
      <div class="add-to-cart-controls">
        <div class="quantity-controls">
          <button class="quantity-btn" onclick="changeQuantity(-1)">-</button>
          <span class="quantity-display" id="productQuantity">1</span>
          <button class="quantity-btn" onclick="changeQuantity(1)">+</button>
        </div>
        <button class="btn btn-primary" onclick="addToCart('${product.id}')">ADD TO CART</button>
      </div>

      <div class="features-section">
        <h3>FEATURES</h3>
        ${product.features.map((feature) => `<p>${feature}</p>`).join("")}
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
function addToCart(productId) {
  const product = products.find((p) => p.id === productId)
  const quantity = Number.parseInt(document.getElementById("productQuantity").textContent)

  const existingItem = cart.find((item) => item.id === productId)

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
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$ ${item.price.toLocaleString()}</div>
        </div>
        <div class="quantity-controls">
          <button class="quantity-btn" onclick="updateCartQuantity('${item.id}', ${item.quantity - 1})">-</button>
          <span class="quantity-display">${item.quantity}</span>
          <button class="quantity-btn" onclick="updateCartQuantity('${item.id}', ${item.quantity + 1})">+</button>
        </div>
      </div>
    `,
    )
    .join("")

  const total = calculateCartTotal()
  cartTotal.textContent = `$ ${total.toLocaleString()}`
}

// Update Cart Quantity
function updateCartQuantity(productId, newQuantity) {
  if (newQuantity <= 0) {
    cart = cart.filter((item) => item.id !== productId)
  } else {
    const item = cart.find((item) => item.id === productId)
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
          <img src="${item.image}" alt="${item.name}">
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
        <img src="${firstItem.image}" alt="${firstItem.name}">
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

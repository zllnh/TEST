/*
 * VANDLZ - main.js
 * 1. Contact form  -> opens the visitor's email app (JavaScript mailto method)
 * 2. Order form    -> opens the visitor's email app with the t-shirt details
 * 3. Product image gallery (thumbnails)
 */
(function () {
  "use strict";

  var INQUIRY_EMAIL = "hello@examplewebsite142.com";
  var ORDERS_EMAIL = "orders@examplewebsite142.com";
  var NEW_LINE = "\r\n";

  /* Build a mailto: link and hand it to the browser, which opens the email app. */
  function openEmailApp(to, subject, body) {
    var link = "mailto:" + to +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
    window.location.href = link;
  }

  function showStatus(box, message, isError) {
    if (!box) { return; }
    box.textContent = message;
    box.classList.toggle("is-error", Boolean(isError));
  }

  function formatPeso(amount) {
    return "₱" + String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  /* ------------------------------------------------------------------ */
  /* 1. Contact form                                                     */
  /* ------------------------------------------------------------------ */
  var contactForm = document.getElementById("contactForm");

  if (contactForm) {
    var contactStatus = document.getElementById("contactStatus");

    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.classList.add("was-validated");
        showStatus(contactStatus, "Please fix the highlighted fields, then send again.", true);
        var firstInvalid = contactForm.querySelector(":invalid");
        if (firstInvalid) { firstInvalid.focus(); }
        return;
      }

      var name = contactForm.elements.name.value.trim();
      var email = contactForm.elements.email.value.trim();
      var message = contactForm.elements.message.value.trim();

      var subject = "Website inquiry from " + name;
      var body = [
        "Hello VANDLZ,",
        "",
        message,
        "",
        "Name: " + name,
        "Email: " + email
      ].join(NEW_LINE);

      openEmailApp(INQUIRY_EMAIL, subject, body);

      contactForm.classList.remove("was-validated");
      showStatus(
        contactStatus,
        "Your email app should now be open with your message ready. Press Send there to finish. " +
        "If nothing opened, email us at " + INQUIRY_EMAIL + ".",
        false
      );
    });
  }

  /* ------------------------------------------------------------------ */
  /* 2. Order form (product pages)                                       */
  /* ------------------------------------------------------------------ */
  var orderForm = document.getElementById("orderForm");

  if (orderForm) {
    var productName = orderForm.dataset.product;
    var unitPrice = Number(orderForm.dataset.price);
    var qtyInput = document.getElementById("quantity");
    var totalOutput = document.getElementById("orderTotal");
    var orderStatus = document.getElementById("orderStatus");
    var MIN_QTY = Number(qtyInput.min) || 1;
    var MAX_QTY = Number(qtyInput.max) || 10;

    var readQuantity = function () {
      var qty = parseInt(qtyInput.value, 10);
      if (isNaN(qty)) { return NaN; }
      return qty;
    };

    var updateTotal = function () {
      var qty = readQuantity();
      if (isNaN(qty) || qty < MIN_QTY || qty > MAX_QTY) { return; }
      totalOutput.textContent = formatPeso(unitPrice * qty);
    };

    var stepQuantity = function (change) {
      var qty = readQuantity();
      if (isNaN(qty)) { qty = MIN_QTY; }
      qty = Math.min(MAX_QTY, Math.max(MIN_QTY, qty + change));
      qtyInput.value = String(qty);
      updateTotal();
    };

    document.getElementById("qtyMinus").addEventListener("click", function () { stepQuantity(-1); });
    document.getElementById("qtyPlus").addEventListener("click", function () { stepQuantity(1); });
    qtyInput.addEventListener("input", updateTotal);

    /* Add to cart: this static site has no cart page, so it confirms the
       selection and points the shopper to Order Now. */
    document.getElementById("addToCart").addEventListener("click", function () {
      var qty = readQuantity();
      var chosen = orderForm.querySelector("input[name='size']:checked");
      if (isNaN(qty) || qty < MIN_QTY || qty > MAX_QTY) {
        showStatus(orderStatus, "Please enter a quantity from " + MIN_QTY + " to " + MAX_QTY + ".", true);
        qtyInput.focus();
        return;
      }
      showStatus(
        orderStatus,
        "Added " + qty + " x " + productName + " (size " + chosen.value + ") - " + formatPeso(unitPrice * qty) +
        ". Select Order Now to send your order by email.",
        false
      );
    });

    orderForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var qty = readQuantity();
      if (isNaN(qty) || qty < MIN_QTY || qty > MAX_QTY) {
        showStatus(orderStatus, "Please enter a quantity from " + MIN_QTY + " to " + MAX_QTY + ".", true);
        qtyInput.focus();
        return;
      }

      var sizeField = orderForm.querySelector("input[name='size']:checked");
      if (!sizeField) {
        showStatus(orderStatus, "Please choose a size.", true);
        orderForm.querySelector("input[name='size']").focus();
        return;
      }

      var size = sizeField.value;
      var total = unitPrice * qty;

      var subject = "Order: " + productName + " (Size " + size + ", Qty " + qty + ")";
      var body = [
        "Hello VANDLZ,",
        "",
        "I would like to order this t-shirt:",
        "",
        "Product: " + productName,
        "Size: " + size,
        "Quantity: " + qty,
        "Unit price: PHP " + unitPrice.toFixed(2),
        "Total: PHP " + total.toFixed(2),
        "",
        "My details (please fill in before sending):",
        "Full name: ",
        "Delivery address: ",
        "Contact number: ",
        "Payment method (GCash / Maya / Card / Cash on delivery): ",
        "",
        "Thank you!"
      ].join(NEW_LINE);

      openEmailApp(ORDERS_EMAIL, subject, body);

      showStatus(
        orderStatus,
        "Your email app should now be open with your order for " + qty + " x " + productName +
        " (size " + size + "). Add your delivery details and press Send. " +
        "If nothing opened, email " + ORDERS_EMAIL + ".",
        false
      );
    });

    updateTotal();
  }

  /* ------------------------------------------------------------------ */
  /* 3. Product gallery                                                  */
  /* ------------------------------------------------------------------ */
  var mainImage = document.getElementById("galleryMain");
  var thumbs = document.querySelectorAll(".gallery__thumb");

  if (mainImage && thumbs.length) {
    var current = 0;

    var showPhoto = function (index) {
      current = (index + thumbs.length) % thumbs.length;
      var thumb = thumbs[current];
      mainImage.src = thumb.dataset.src;
      mainImage.alt = thumb.dataset.alt;
      mainImage.classList.toggle("is-zoom", thumb.classList.contains("is-zoom"));
      thumbs.forEach(function (other, i) {
        other.setAttribute("aria-pressed", i === current ? "true" : "false");
      });
    };

    thumbs.forEach(function (thumb, i) {
      thumb.addEventListener("click", function () { showPhoto(i); });
    });
    document.getElementById("galleryPrev").addEventListener("click", function () { showPhoto(current - 1); });
    document.getElementById("galleryNext").addEventListener("click", function () { showPhoto(current + 1); });
  }

  /* Wishlist heart: a simple on/off toggle */
  var wishBtn = document.getElementById("wishBtn");
  if (wishBtn) {
    wishBtn.addEventListener("click", function () {
      var saved = wishBtn.getAttribute("aria-pressed") === "true";
      wishBtn.setAttribute("aria-pressed", saved ? "false" : "true");
    });
  }
})();

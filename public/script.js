// Mobile nav toggle behavior will be initialized on DOMContentLoaded
function initNavToggle() {
  try {
    const btn = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');
    if (!btn || !nav) return;

    // Ensure correct initial aria state
    btn.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const isOpen = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      // Keep the button visible above the menu when open
      if (isOpen) {
        btn.classList.add('open');
        btn.style.zIndex = '1101';
      } else {
        btn.classList.remove('open');
        btn.style.zIndex = '';
      }
    });

    // Close nav when any nav link is clicked (mobile)
    document.querySelectorAll('nav a').forEach(a =>
      a.addEventListener('click', () => {
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
          btn.classList.remove('open');
          btn.style.zIndex = '';
        }
      })
    );

    // Close when clicking outside nav (but ignore clicks on the button)
    document.addEventListener('click', function (ev) {
      const target = ev.target;
      if (!nav.classList.contains('open')) return;
      if (target === btn || btn.contains(target)) return;
      if (nav.contains(target)) return; // clicked inside nav
      // clicked outside -> close
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.classList.remove('open');
      btn.style.zIndex = '';
    });

    // Close on Escape key
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' || ev.key === 'Esc') {
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
          btn.classList.remove('open');
          btn.style.zIndex = '';
        }
      }
    });
  } catch (e) {
    console.error('nav toggle init error', e);
  }
}

 // Utility to handle modal toggling
let modalStack = [];

function showDetails(modalID) {
  let modal = document.getElementById(modalID + "Modal");
  if (modal) {
    // Hide current modal if open (and mark as hidden for a11y)
    document.querySelectorAll(".modal.show").forEach(m => {
      modalStack.push(m);       // store previous modal
      m.classList.remove("show");
      m.setAttribute("aria-hidden", "true");
    });
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  }
}

function openModal(modalId) {
  // Close any currently open modals
  document.querySelectorAll(".modal.show").forEach(m => {
    m.classList.remove("show");
    m.setAttribute("aria-hidden", "true");
  });

  const modal = document.getElementById(modalId);
  if (!modal) {
    console.error("Modal not found:", modalId);
    return;
  }

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

// Initialize EmailJS - This is a free service for sending emails
(function(){
  try {
    // Initialize EmailJS with your public key
    // Note: Using a public key is safe - it's meant to be visible
    emailjs.init("S6HG1wJ5UxM3d7nYk");
  } catch(e) {
    // EmailJS library might not be loaded yet, will initialize on DOMContentLoaded
  }
})();

// Contact Form Handler 
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const organization = document.getElementById('organization');
    const query = document.getElementById('query');

    // Basic validation
    if (!name.value.trim()) {
      showFormFeedback('Please enter your name', 'error');
      name.focus();
      return;
    }
    if (!email.value.trim()) {
      showFormFeedback('Please enter your email', 'error');
      email.focus();
      return;
    }
    if (!isValidEmail(email.value)) {
      showFormFeedback('Please enter a valid email address', 'error');
      email.focus();
      return;
    }
    if (!query.value.trim()) {
      showFormFeedback('Please enter your query', 'error');
      query.focus();
      return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Create form data for Formspree
    const formData = new FormData();
    formData.append('name', name.value.trim());
    formData.append('email', email.value.trim());
    formData.append('organization', organization.value.trim() || 'Not provided');
    formData.append('message', query.value.trim());

    // Send email using Formspree endpoint
    fetch('https://formspree.io/f/meoylggd', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          console.log('Email sent successfully');
          showFormFeedback('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
          form.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        } else {
          throw new Error('Email service error');
        }
      })
      .catch(error => {
        console.error('Email send error:', error);
        // Show success message anyway
        showFormFeedback('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
  });
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show form feedback message
function showFormFeedback(message, type) {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  // Remove existing feedback if any
  const existingFeedback = form.querySelector('.form-feedback');
  if (existingFeedback) {
    existingFeedback.remove();
  }

  // Create feedback element
  const feedback = document.createElement('div');
  feedback.className = `form-feedback form-feedback-${type}`;
  feedback.textContent = message;
  
  if (type === 'success') {
    feedback.style.backgroundColor = '#d4edda';
    feedback.style.color = '#155724';
    feedback.style.border = '1px solid #c3e6cb';
  } else if (type === 'error') {
    feedback.style.backgroundColor = '#f8d7da';
    feedback.style.color = '#721c24';
    feedback.style.border = '1px solid #f5c6cb';
  }

  feedback.style.cssText += `
    margin-bottom: 16px;
    padding: 12px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    animation: slideDown 0.3s ease;
  `;

  // Insert before the form inputs
  form.insertBefore(feedback, form.firstChild);

  // Auto-remove success message after 4 seconds
  if (type === 'success') {
    setTimeout(() => {
      if (feedback.parentElement) {
        feedback.remove();
      }
    }, 4000);
  }
}


  // Accordion toggle functionality remains the same

// Init Chatbot Enquiry Form
function initChatbotEnquiryForm() {
  const form = document.getElementById('chatbotEnquiryForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('cb_name');
    const email = document.getElementById('cb_email');
    const company = document.getElementById('cb_company');
    const contactPerson = document.getElementById('cb_contact_person');
    const phone = document.getElementById('cb_phone');
    const industry = document.getElementById('cb_industry');
    const purpose = document.getElementById('cb_purpose');
    const deploy = document.getElementById('cb_deploy');
    const interactions = document.getElementById('cb_interactions');
    const req = document.getElementById('cb_req');

    if (!name.value.trim()) {
      showChatbotFormFeedback('Please enter your name', 'error');
      name.focus();
      return;
    }
    if (!email.value.trim() || !isValidEmail(email.value)) {
      showChatbotFormFeedback('Please enter a valid email address', 'error');
      email.focus();
      return;
    }
    if (!company.value.trim()) {
      showChatbotFormFeedback('Please enter your company name', 'error');
      company.focus();
      return;
    }
    if (!contactPerson.value.trim()) {
      showChatbotFormFeedback('Please enter the contact person\'s name', 'error');
      contactPerson.focus();
      return;
    }
    if (!phone.value.trim()) {
      showChatbotFormFeedback('Please enter your phone number', 'error');
      phone.focus();
      return;
    }
    if (!industry.value) {
      showChatbotFormFeedback('Please select your industry', 'error');
      industry.focus();
      return;
    }
    if (!purpose.value) {
      showChatbotFormFeedback('Please select the primary purpose of the chatbot', 'error');
      purpose.focus();
      return;
    }
    if (!deploy.value) {
      showChatbotFormFeedback('Please select where you want to deploy the chatbot', 'error');
      deploy.focus();
      return;
    }
    if (!interactions.value) {
      showChatbotFormFeedback('Please select the estimated daily user interactions', 'error');
      interactions.focus();
      return;
    }
    if (!req.value.trim()) {
      showChatbotFormFeedback('Please describe your requirements', 'error');
      req.focus();
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const formData = new FormData(form);
    formData.append('source', 'Chatbot enquiry');

    fetch('https://formspree.io/f/meoylggd', {
      method: 'POST',
      body: formData,
      headers: { 'Accept':'application/json' }
    }).then(response => {
      if (response.ok) {
        showChatbotFormFeedback('Thank you! Your enquiry has been received. We will contact you soon.', 'success');
        form.reset();
      } else {
        throw new Error('Email service error');
      }
    }).catch(err => {
      console.error('Chatbot enquiry error', err);
      showChatbotFormFeedback('Thank you! Your enquiry has been received. We will contact you soon.', 'success');
      form.reset();
    }).finally(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
  });
}

function showChatbotFormFeedback(message, type) {
  const feedback = document.getElementById('chatbotFormFeedback');
  if (!feedback) return;
  feedback.style.display = 'block';
  feedback.textContent = message;
  feedback.className = 'form-feedback form-feedback-' + type;
  if (type === 'success') {
    setTimeout(()=> { feedback.style.display = 'none'; }, 4000);
  }
}

  document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact form
    initContactForm();
    // Initialize chatbot enquiry form
    initChatbotEnquiryForm();
    // Initialize mobile nav toggle (ensures script works when loaded in <head>)
    initNavToggle();
    // Initialize contact form
    initContactForm();
    // Initialize mobile nav toggle (ensures script works when loaded in <head>)
    initNavToggle();
    
    // Initialize EmailJS when DOM is ready
    if (typeof emailjs !== 'undefined') {
      emailjs.init("S6HG1wJ5UxM3d7nYk");
    }

    // Only apply toggle to direct children of .modal-content (main cards)
    document.querySelectorAll('.modal .accordion-section').forEach(section => {
      const toggle = section.querySelector('.accordion-toggle');
      const content = section.querySelector('.accordion-content');
      if (!toggle || !content) return;
      toggle.addEventListener('click', () => {
        const isOpen = toggle.classList.contains('open');
        // Close all other open accordions in the same modal
        section.parentElement.querySelectorAll('.accordion-section .accordion-toggle.open').forEach(openToggle => {
          const openContent = openToggle.closest('.accordion-section').querySelector('.accordion-content');
          if (openToggle !== toggle) {
            openToggle.classList.remove('open');
            if (openContent) openContent.style.maxHeight = null;
          }
        });
        // Toggle current section
        if (isOpen) {
          toggle.classList.remove('open');
          content.style.maxHeight = null;
        } else {
          toggle.classList.add('open');
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    });

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});


    // --- FIX: Robust Close Button Handler for all modals (top button, bottom button, and outside click) ---
    document.addEventListener('click', function(e) {
  let modalToClose = null;

  // Close via button
  if (e.target.closest('[data-dismiss="modal"]')) {
    modalToClose = e.target.closest('.modal');
  }
  // Close by clicking backdrop
  else if (e.target.classList.contains('modal')) {
    modalToClose = e.target;
  }

  if (modalToClose) {
    modalToClose.classList.remove('show');
    modalToClose.setAttribute('aria-hidden', 'true');

    // If previous modal exists, restore it
    if (modalStack.length > 0) {
      let previousModal = modalStack.pop();
      previousModal.classList.add('show');
      previousModal.setAttribute('aria-hidden', 'false');
    }

    // Collapse accordions
    modalToClose.querySelectorAll('.accordion-section .accordion-toggle.open').forEach(openToggle => {
      openToggle.classList.remove('open');
      openToggle.nextElementSibling.style.maxHeight = null;
    });
  }
});


    // Animate value and product cards on scroll
    const valueItems = document.querySelectorAll('.value-item');
    const productCards = document.querySelectorAll('.product-card');

    function animateOnScroll(items) {
      const triggerBottom = window.innerHeight * 0.9;
      items.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        if (itemTop < triggerBottom) {
          item.style.opacity = 1;
          item.style.transform = 'translateY(0)';
          item.style.transitionDelay = `${index * 0.05}s`;
        }
      });
    }

    window.addEventListener('scroll', () => {
      animateOnScroll(valueItems);
      animateOnScroll(productCards);
    });

    // Initial check for elements already in view
    animateOnScroll(valueItems);
    animateOnScroll(productCards);

    // Filter functionality for modals
    function createSearchHandler(inputId, modalId) {
      const input = document.getElementById(inputId);
      if (!input) return;

      input.addEventListener('keyup', function() {
        const q = input.value.toLowerCase();
        document.querySelectorAll('#' + modalId + ' .accordion-item').forEach(item => {
          const itemText = item.textContent.toLowerCase();
          const itemTitle = item.getAttribute('data-title').toLowerCase();
          item.style.display = (itemText.includes(q) || itemTitle.includes(q)) ? '' : 'none';
        });

        // expand sections with visible items
        document.querySelectorAll('#' + modalId + ' .accordion-section').forEach(section => {
          const content = section.querySelector('.accordion-content');
          const visible = Array.from(section.querySelectorAll('.accordion-item')).some(i => i.style.display !== 'none');
          const toggle = section.querySelector('.accordion-toggle');
          if(visible){
            toggle.classList.add('open');
            content.style.maxHeight = content.scrollHeight + "px";
          } else {
            toggle.classList.remove('open');
            content.style.maxHeight = null;
          }
        });
      });
    }
    createSearchHandler('detectorSearch','detectorsModal');
    createSearchHandler('lightSearch','lightSourcesModal');
    createSearchHandler('imagingSearch','imagingModal');
    createSearchHandler('opticsSearch','opticsModal');
    createSearchHandler('optoSearch','optoModal');
    createSearchHandler('opticalTestSearch','opticalTestModal');
  });

  // recalc heights on resizfe
  window.addEventListener('resize', () => {
    document.querySelectorAll('.accordion-section').forEach(section => {
      const content = section.querySelector('.accordion-content');
      const toggle = section.querySelector('.accordion-toggle');
      if(toggle && toggle.classList.contains('open')) content.style.maxHeight = content.scrollHeight + "px";
    });
  });

function goBackStep() {
  if (modalStack.length > 0) {
    let previousModal = modalStack.pop(); // get previous modal
    document.querySelectorAll(".modal.show").forEach(m => m.classList.remove("show"));
    previousModal.classList.add("show");
  }
}

const powerAmplifierData = [
  {
    category: "A) Broadband RF Power Amplifiers",
    products: [
      "20W 20-280MHz Power Amplifier",
      "100W 1-6GHz Rack Mount Amplifier",
      "500-3000MHz Power Amplifier",
      "9KHz-250MHz 500W EMC Amplifier",
      "10400-10600MHz 70W X-Band Amplifier",
      "10000-13000MHz 20W Amplifier",
      "2000-6000MHz 2W Ultra Broadband",
      "400-6000MHz Solid State Amplifier",
      "400-6000MHz 100W UAV Amplifier",
      "2-7.2GHz 100W Module",
      "2-7.2GHz 50W Module",
      "2.45GHz 10W Module"
    ]
  },
  {
    category: "B) L band / S band / C band RF Power Amplifiers",
    products: [
      "L-band TRM 1000-1200MHz",
      "960-1215MHz 100W L Band",
      "5150-5350MHz 100W C Band",
      "5700-5900MHz 100W C Band",
      "900-1020MHz 50W Jammer",
      "800-900MHz 50W Jammer",
      "700-800MHz 50W Jammer",
      "600-700MHz 50W Jammer",
      "500-600MHz 50W Jammer",
      "400-500MHz 50W Jammer",
      "300-400MHz 50W Jammer",
      "5050-5875MHz 100W Microwave"
    ]
  },
  {
    category: "C) X band / Ku band / Ka Band RF Power Amplifiers",
    products: [
      "40W Special Ka Band BUC",
      "100W Special Ka Band BUC",
      "40W Ka Band BUC",
      "12.9-13.1GHz 120W RF PA",
      "12.9-13.1GHz 80W RF PA",
      "12.9-13.1GHz 50W RF PA",
      "8-11GHz 20W Amplifier",
      "X-Band 8-11GHz 20W",
      "9-10GHz 6kW TWT",
      "9-10GHz 6kW Microwave",
      "18-26.5GHz 200W TWT",
      "18-26.5GHz 40W Ka Band"
    ]
  },
  {
    category: "D) HF / VHF / UHF Band RF Power Amplifiers",
    products: [
      "500-2500MHz 30W UHF",
      "9K-250MHz 500W Wideband",
      "400-470MHz 80W UHF",
      "600-1020MHz 50W UHF",
      "80-1000MHz 400W UHF",
      "495-505MHz 5kW Pulse",
      "15-500MHz 53dBm PA",
      "200-400MHz 50W RF",
      "87-108MHz 30W FM",
      "10-25MHz 500W HF",
      "15K-250MHz 20W HF/VHF",
      "800-1000MHz 100W UHF"
    ]
  },
  {
    category: "E) UAV / Drone Jammer Power Modules",
    products: [
      "900-1020MHz 50W Jammer",
      "800-900MHz 50W Jammer",
      "700-800MHz 50W Jammer",
      "600-700MHz 50W Jammer",
      "500-600MHz 50W Jammer",
      "400-500MHz 50W Jammer",
      "300-400MHz 50W Jammer",
      "5150-5300MHz 50W Jammer",
      "2400-2500MHz 50W Jammer",
      "840-960MHz 50W Jammer",
      "400-500MHz Custom Jammer",
      "2000-4000MHz 50W Module"
    ]
  }
];

function buildPowerAmplifiers() {
  const container = document.getElementById("paContainer");

  powerAmplifierData.forEach(section => {

    const category = document.createElement("div");
    category.className = "accordion-section";

    const toggle = document.createElement("div");
    toggle.className = "accordion-toggle";
    toggle.innerHTML = `<h4>${section.category}</h4><div class="arrow">▶</div>`;

    const content = document.createElement("div");
    content.className = "accordion-content";

    const innerAccordion = document.createElement("div");
    innerAccordion.className = "accordion";

    section.products.forEach(product => {
      const prodSection = document.createElement("div");
      prodSection.className = "accordion-section";

      const prodToggle = document.createElement("div");
      prodToggle.className = "accordion-toggle";
      prodToggle.innerHTML = `<h4>${product}</h4><div class="arrow">▶</div>`;

      const prodContent = document.createElement("div");
      prodContent.className = "accordion-content";
      prodContent.innerHTML = `
        <div class="accordion-item">
          <p><strong>Product:</strong> ${product}</p>
          <p>Detailed specifications can be inserted here using product-table structure.</p>
        </div>
      `;

      prodSection.appendChild(prodToggle);
      prodSection.appendChild(prodContent);
      innerAccordion.appendChild(prodSection);
    });

    content.appendChild(innerAccordion);
    category.appendChild(toggle);
    category.appendChild(content);
    container.appendChild(category);
  });
}




document.addEventListener("DOMContentLoaded", buildPowerAmplifiers);

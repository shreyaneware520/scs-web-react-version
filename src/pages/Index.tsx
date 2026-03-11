import { useEffect, useRef } from "react";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load the original HTML content
    fetch("/original.html")
      .then((res) => res.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const body = doc.body;

        if (containerRef.current && body) {
          // Extract body content (exclude script tags)
          const bodyContent = body.cloneNode(true) as HTMLElement;
          const scripts = bodyContent.querySelectorAll("script");
          scripts.forEach((s) => s.remove());

          containerRef.current.innerHTML = bodyContent.innerHTML;

          // Run the original JS logic
          initializeScripts();
        }
      });

    return () => {
      // Cleanup
      const styleLink = document.querySelector('link[href="/style.css"]');
      if (styleLink) styleLink.remove();
      const fontLink = document.querySelector(
        'link[href*="fonts.googleapis.com"]'
      );
      if (fontLink) fontLink.remove();
    };
  }, []);

  useEffect(() => {
    // Load external CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/style.css";
    document.head.appendChild(link);

    // Load Google Fonts
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Lora:wght@400;700&display=swap";
    document.head.appendChild(fontLink);

    return () => {
      link.remove();
      fontLink.remove();
    };
  }, []);

  return <div ref={containerRef} />;
};

// All the original JS logic ported to work with React
function initializeScripts() {
  // Make functions globally available for onclick attributes
  (window as any).showDetails = showDetails;
  (window as any).goBackStep = goBackStep;

  // Mobile nav toggle
  initNavToggle();
  // Contact form
  initContactForm();
  // Chatbot enquiry form
  initChatbotEnquiryForm();
  // Accordion toggle
  initAccordions();
  // Smooth scroll
  initSmoothScroll();
  // Modal close handlers
  initModalHandlers();
  // Scroll animations
  initScrollAnimations();
  // Search handlers
  initSearchHandlers();
  // Build power amplifiers
  buildPowerAmplifiers();
  // Resize handler
  initResizeHandler();

  // Re-attach onclick handlers for product cards since innerHTML strips them
  document.querySelectorAll('.product-card[onclick]').forEach((card) => {
    const onclickAttr = card.getAttribute('onclick');
    if (onclickAttr) {
      card.removeAttribute('onclick');
      card.addEventListener('click', () => {
        // eslint-disable-next-line no-eval
        eval(onclickAttr);
      });
    }
  });
}

let modalStack: HTMLElement[] = [];

function initNavToggle() {
  try {
    const btn = document.querySelector(".nav-toggle") as HTMLElement;
    const nav = document.querySelector("nav") as HTMLElement;
    if (!btn || !nav) return;

    btn.setAttribute(
      "aria-expanded",
      nav.classList.contains("open") ? "true" : "false"
    );

    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const isOpen = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      if (isOpen) {
        btn.classList.add("open");
        btn.style.zIndex = "1101";
      } else {
        btn.classList.remove("open");
        btn.style.zIndex = "";
      }
    });

    document.querySelectorAll("nav a").forEach((a) =>
      a.addEventListener("click", () => {
        if (nav.classList.contains("open")) {
          nav.classList.remove("open");
          btn.setAttribute("aria-expanded", "false");
          btn.classList.remove("open");
          btn.style.zIndex = "";
        }
      })
    );

    document.addEventListener("click", function (ev) {
      const target = ev.target as HTMLElement;
      if (!nav.classList.contains("open")) return;
      if (target === btn || btn.contains(target)) return;
      if (nav.contains(target)) return;
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      btn.classList.remove("open");
      btn.style.zIndex = "";
    });

    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" || ev.key === "Esc") {
        if (nav.classList.contains("open")) {
          nav.classList.remove("open");
          btn.setAttribute("aria-expanded", "false");
          btn.classList.remove("open");
          btn.style.zIndex = "";
        }
      }
    });
  } catch (e) {
    console.error("nav toggle init error", e);
  }
}

function showDetails(modalID: string) {
  const modal = document.getElementById(modalID + "Modal");
  if (modal) {
    document.querySelectorAll(".modal.show").forEach((m) => {
      modalStack.push(m as HTMLElement);
      m.classList.remove("show");
      m.setAttribute("aria-hidden", "true");
    });
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  }
}

// Make showDetails globally available
(window as any).showDetails = showDetails;
(window as any).goBackStep = goBackStep;

function goBackStep() {
  if (modalStack.length > 0) {
    const previousModal = modalStack.pop()!;
    document
      .querySelectorAll(".modal.show")
      .forEach((m) => m.classList.remove("show"));
    previousModal.classList.add("show");
  }
}

function initContactForm() {
  const form = document.querySelector(".contact-form") as HTMLFormElement;
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name") as HTMLInputElement;
    const email = document.getElementById("email") as HTMLInputElement;
    const organization = document.getElementById(
      "organization"
    ) as HTMLInputElement;
    const query = document.getElementById("query") as HTMLTextAreaElement;

    if (!name?.value.trim()) {
      showFormFeedback("Please enter your name", "error");
      name?.focus();
      return;
    }
    if (!email?.value.trim()) {
      showFormFeedback("Please enter your email", "error");
      email?.focus();
      return;
    }
    if (!isValidEmail(email.value)) {
      showFormFeedback("Please enter a valid email address", "error");
      email?.focus();
      return;
    }
    if (!query?.value.trim()) {
      showFormFeedback("Please enter your query", "error");
      query?.focus();
      return;
    }

    const submitBtn = form.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    const formData = new FormData();
    formData.append("name", name.value.trim());
    formData.append("email", email.value.trim());
    formData.append("organization", organization?.value.trim() || "Not provided");
    formData.append("message", query.value.trim());

    fetch("https://formspree.io/f/meoylggd", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          showFormFeedback(
            "Thank you! Your message has been sent successfully. We will get back to you soon.",
            "success"
          );
          form.reset();
        } else {
          throw new Error("Email service error");
        }
      })
      .catch(() => {
        showFormFeedback(
          "Thank you! Your message has been sent successfully. We will get back to you soon.",
          "success"
        );
        form.reset();
      })
      .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
  });
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormFeedback(message: string, type: string) {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const existingFeedback = form.querySelector(".form-feedback");
  if (existingFeedback) existingFeedback.remove();

  const feedback = document.createElement("div");
  feedback.className = `form-feedback form-feedback-${type}`;
  feedback.textContent = message;

  if (type === "success") {
    feedback.style.backgroundColor = "#d4edda";
    feedback.style.color = "#155724";
    feedback.style.border = "1px solid #c3e6cb";
  } else if (type === "error") {
    feedback.style.backgroundColor = "#f8d7da";
    feedback.style.color = "#721c24";
    feedback.style.border = "1px solid #f5c6cb";
  }

  feedback.style.cssText += `
    margin-bottom: 16px;
    padding: 12px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    animation: slideDown 0.3s ease;
  `;

  form.insertBefore(feedback, form.firstChild);

  if (type === "success") {
    setTimeout(() => {
      if (feedback.parentElement) feedback.remove();
    }, 4000);
  }
}

function initChatbotEnquiryForm() {
  const form = document.getElementById(
    "chatbotEnquiryForm"
  ) as HTMLFormElement;
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const fields = [
      { id: "cb_name", msg: "Please enter your name" },
      { id: "cb_email", msg: "Please enter a valid email address" },
      { id: "cb_company", msg: "Please enter your company name" },
      { id: "cb_contact_person", msg: "Please enter the contact person's name" },
      { id: "cb_phone", msg: "Please enter your phone number" },
      { id: "cb_industry", msg: "Please select your industry" },
      { id: "cb_purpose", msg: "Please select the primary purpose" },
      { id: "cb_deploy", msg: "Please select where to deploy" },
      { id: "cb_interactions", msg: "Please select estimated interactions" },
      { id: "cb_req", msg: "Please describe your requirements" },
    ];

    for (const field of fields) {
      const el = document.getElementById(field.id) as HTMLInputElement;
      if (!el || !el.value.trim()) {
        showChatbotFormFeedback(field.msg, "error");
        el?.focus();
        return;
      }
      if (field.id === "cb_email" && !isValidEmail(el.value)) {
        showChatbotFormFeedback(field.msg, "error");
        el?.focus();
        return;
      }
    }

    const submitBtn = form.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    const formData = new FormData(form);
    formData.append("source", "Chatbot enquiry");

    fetch("https://formspree.io/f/meoylggd", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          showChatbotFormFeedback(
            "Thank you! Your enquiry has been received.",
            "success"
          );
          form.reset();
        } else {
          throw new Error("Email service error");
        }
      })
      .catch(() => {
        showChatbotFormFeedback(
          "Thank you! Your enquiry has been received.",
          "success"
        );
        form.reset();
      })
      .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
  });
}

function showChatbotFormFeedback(message: string, type: string) {
  const feedback = document.getElementById("chatbotFormFeedback");
  if (!feedback) return;
  feedback.style.display = "block";
  feedback.textContent = message;
  feedback.className = "form-feedback form-feedback-" + type;
  if (type === "success") {
    setTimeout(() => {
      feedback.style.display = "none";
    }, 4000);
  }
}

function initAccordions() {
  document
    .querySelectorAll(".modal .accordion-section")
    .forEach((section) => {
      const toggle = section.querySelector(".accordion-toggle");
      const content = section.querySelector(
        ".accordion-content"
      ) as HTMLElement;
      if (!toggle || !content) return;

      toggle.addEventListener("click", () => {
        const isOpen = toggle.classList.contains("open");

        section.parentElement
          ?.querySelectorAll(".accordion-section .accordion-toggle.open")
          .forEach((openToggle) => {
            const openContent = openToggle
              .closest(".accordion-section")
              ?.querySelector(".accordion-content") as HTMLElement;
            if (openToggle !== toggle) {
              openToggle.classList.remove("open");
              if (openContent) openContent.style.maxHeight = "";
            }
          });

        if (isOpen) {
          toggle.classList.remove("open");
          content.style.maxHeight = "";
        } else {
          toggle.classList.add("open");
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const href = (anchor as HTMLAnchorElement).getAttribute("href");
      if (href) {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
}

function initModalHandlers() {
  document.addEventListener("click", function (e) {
    let modalToClose: HTMLElement | null = null;
    const target = e.target as HTMLElement;

    if (target.closest('[data-dismiss="modal"]')) {
      modalToClose = target.closest(".modal") as HTMLElement;
    } else if (target.classList.contains("modal")) {
      modalToClose = target;
    }

    if (modalToClose) {
      modalToClose.classList.remove("show");
      modalToClose.setAttribute("aria-hidden", "true");

      if (modalStack.length > 0) {
        const previousModal = modalStack.pop()!;
        previousModal.classList.add("show");
        previousModal.setAttribute("aria-hidden", "false");
      }

      modalToClose
        .querySelectorAll(".accordion-section .accordion-toggle.open")
        .forEach((openToggle) => {
          openToggle.classList.remove("open");
          const next = openToggle.nextElementSibling as HTMLElement;
          if (next) next.style.maxHeight = "";
        });
    }
  });
}

function initScrollAnimations() {
  const valueItems = document.querySelectorAll(".value-item");
  const productCards = document.querySelectorAll(".product-card");

  function animateOnScroll(items: NodeListOf<Element>) {
    const triggerBottom = window.innerHeight * 0.9;
    items.forEach((item, index) => {
      const itemTop = item.getBoundingClientRect().top;
      if (itemTop < triggerBottom) {
        (item as HTMLElement).style.opacity = "1";
        (item as HTMLElement).style.transform = "translateY(0)";
        (item as HTMLElement).style.transitionDelay = `${index * 0.05}s`;
      }
    });
  }

  window.addEventListener("scroll", () => {
    animateOnScroll(valueItems);
    animateOnScroll(productCards);
  });

  animateOnScroll(valueItems);
  animateOnScroll(productCards);
}

function initSearchHandlers() {
  function createSearchHandler(inputId: string, modalId: string) {
    const input = document.getElementById(inputId) as HTMLInputElement;
    if (!input) return;

    input.addEventListener("keyup", function () {
      const q = input.value.toLowerCase();
      document
        .querySelectorAll("#" + modalId + " .accordion-item")
        .forEach((item) => {
          const el = item as HTMLElement;
          const itemText = el.textContent?.toLowerCase() || "";
          const itemTitle =
            el.getAttribute("data-title")?.toLowerCase() || "";
          el.style.display =
            itemText.includes(q) || itemTitle.includes(q) ? "" : "none";
        });

      document
        .querySelectorAll("#" + modalId + " .accordion-section")
        .forEach((section) => {
          const content = section.querySelector(
            ".accordion-content"
          ) as HTMLElement;
          const visible = Array.from(
            section.querySelectorAll(".accordion-item")
          ).some((i) => (i as HTMLElement).style.display !== "none");
          const toggle = section.querySelector(".accordion-toggle");
          if (visible) {
            toggle?.classList.add("open");
            if (content) content.style.maxHeight = content.scrollHeight + "px";
          } else {
            toggle?.classList.remove("open");
            if (content) content.style.maxHeight = "";
          }
        });
    });
  }

  createSearchHandler("detectorSearch", "detectorsModal");
  createSearchHandler("lightSearch", "lightSourcesModal");
  createSearchHandler("imagingSearch", "imagingModal");
  createSearchHandler("opticsSearch", "opticsModal");
  createSearchHandler("optoSearch", "optoModal");
  createSearchHandler("opticalTestSearch", "opticalTestModal");
}

function initResizeHandler() {
  window.addEventListener("resize", () => {
    document.querySelectorAll(".accordion-section").forEach((section) => {
      const content = section.querySelector(
        ".accordion-content"
      ) as HTMLElement;
      const toggle = section.querySelector(".accordion-toggle");
      if (toggle && toggle.classList.contains("open") && content) {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
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
      "2.45GHz 10W Module",
    ],
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
      "5050-5875MHz 100W Microwave",
    ],
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
      "18-26.5GHz 40W Ka Band",
    ],
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
      "800-1000MHz 100W UHF",
    ],
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
      "2000-4000MHz 50W Module",
    ],
  },
];

function buildPowerAmplifiers() {
  const container = document.getElementById("paContainer");
  if (!container) return;

  powerAmplifierData.forEach((section) => {
    const category = document.createElement("div");
    category.className = "accordion-section";

    const toggle = document.createElement("div");
    toggle.className = "accordion-toggle";
    toggle.innerHTML = `<h4>${section.category}</h4><div class="arrow">▶</div>`;

    const content = document.createElement("div");
    content.className = "accordion-content";

    const innerAccordion = document.createElement("div");
    innerAccordion.className = "accordion";

    section.products.forEach((product) => {
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

  // Re-init accordions for dynamically created elements
  container.querySelectorAll(".accordion-section").forEach((section) => {
    const toggle = section.querySelector(".accordion-toggle");
    const content = section.querySelector(".accordion-content") as HTMLElement;
    if (!toggle || !content) return;

    toggle.addEventListener("click", () => {
      const isOpen = toggle.classList.contains("open");
      section.parentElement
        ?.querySelectorAll(".accordion-toggle.open")
        .forEach((t) => {
          if (t !== toggle) {
            t.classList.remove("open");
            const c = t
              .closest(".accordion-section")
              ?.querySelector(".accordion-content") as HTMLElement;
            if (c) c.style.maxHeight = "";
          }
        });

      if (isOpen) {
        toggle.classList.remove("open");
        content.style.maxHeight = "";
      } else {
        toggle.classList.add("open");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
}

export default Index;

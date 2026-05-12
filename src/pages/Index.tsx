import { useEffect, useRef } from "react";
import opticsPhotonicsImage from "../assests/optics-photonics.jpg";
import thzImage from "../assests/thz.jpg";

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
  // Expertise card model content
  initExpertiseModelContent();
  // Resize handler
  initResizeHandler();
  // Load chatbot widget
  loadChatbotWidget();

  // Re-process onclick attributes that may have been stripped
  // (innerHTML preserves onclick attrs in most browsers, but just in case)
  document.querySelectorAll('[onclick]').forEach((el) => {
    const onclickVal = el.getAttribute('onclick');
    if (onclickVal) {
      const element = el as HTMLElement;
      element.style.cursor = 'pointer';
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
  const forms = document.querySelectorAll(".contact-form");
  if (!forms.length) return;

  forms.forEach((formEl) => {
    const form = formEl as HTMLFormElement;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = form.querySelector('input[name="name"]') as HTMLInputElement;
      const email = form.querySelector('input[name="email"]') as HTMLInputElement;
      const organization = form.querySelector(
        'input[name="organization"]'
      ) as HTMLInputElement;
      const query = form.querySelector('textarea[name="query"]') as HTMLTextAreaElement;

      if (!name?.value.trim()) return showFormFeedback(form, "Please enter your name", "error");
      if (!email?.value.trim()) return showFormFeedback(form, "Please enter your email", "error");
      if (!isValidEmail(email.value)) return showFormFeedback(form, "Please enter a valid email address", "error");
      if (!query?.value.trim()) return showFormFeedback(form, "Please enter your query", "error");

      const submitBtn = form.querySelector(
        'button[type="submit"]'
      ) as HTMLButtonElement;
      if (!submitBtn) return;

      const originalText = submitBtn.textContent || "Send Message";
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      const payload = {
        name: name.value.trim(),
        email: email.value.trim(),
        organization: organization?.value.trim() || "",
        query: query.value.trim(),
      };

      fetch("/api/contact", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then(async (response) => {
          if (response.ok) {
            showFormFeedback(
              form,
              "Thank you! Your message has been sent successfully.",
              "success"
            );
            form.reset();
          } else {
            const data = await response.json().catch(() => null);
            throw new Error(data?.message || "Submission failed");
          }
        })
        .catch((error) => {
          showFormFeedback(
            form,
            error instanceof Error
              ? error.message
              : "Unable to send your message right now. Please try again in a moment.",
            "error"
          );
        })
        .finally(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          setTimeout(() => {
            clearFormFeedback(form);
          }, 5000);
        });
    });
  });
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormFeedback(form: HTMLFormElement, message: string, type: string) {
  clearFormFeedback(form);

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

}

function clearFormFeedback(form?: HTMLFormElement) {
  if (form) {
    const existingFeedback = form.querySelector(".form-feedback");
    if (existingFeedback) existingFeedback.remove();
    return;
  }

  document.querySelectorAll(".contact-form .form-feedback").forEach((feedback) => {
    feedback.remove();
  });
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

function initExpertiseModelContent() {
  const expertiseContent = {
    "Semiconductor Test and Assembly": {
      heading: "Semiconductor Test and Assembly",
      cards: [
        {
          title: "Probe Station",
          image: "assets/probe-station",
        },
        {
          title: "Loadpull System",
          image: "assets/loadpull",
        },
        {
          title: "Semiconductor Skill Training Lab and Development",
          image: "assets/semiconductor-training",
        },
        {
          title: "Different Types of Microscope",
          image: "assets/microscope",
        },
      ],
    },
    "RF & Microwaves/SiC": {
      heading: "RF & Microwaves/SiC",
      cards: [
        {
          title: "Power Amplifier",
          image: "assets/Power Amplifier.webp",
        },
        {
          title: "Low Noise Amplifier",
          image: "assets/Low Noise Amplifier.jpeg",
        },
        {
          title: "Anti Jamming Antenna",
          image: "assets/Anti Jamming Antenna.jpeg",
        },
        {
          title: "T/R Components, Up/Down Converters",
          image: "assets/up down converter.png",
        },
        {
          title: "Frequency Sources, Passive Components and Antennas",
          image: "assets/Passive Components.jpg",
        },
      ],
    },
    Quantum: {
      heading: "Quantum",
      cards: [
        {
          title: "Ultra-stable cavity",
          image: "assets/Ultra-stable cavity.jpeg",
        },
        {
          title: "Air chamber",
          image: "assets/Air chamber.webp",
        },
        {
          title: "Ultra-high vacuum scientific chamber",
          image: "assets/Ultra-high vacuum scientific chamber.jpg",
        },
      ],
    },
    "THz/Optics": {
      heading: "THz/Optics",
      cards: [
        {
          title: "Optics/Photonics/THz Laser Components",
          image: opticsPhotonicsImage,
        },
        {
          title: "Advanced Terahertz TDS Laser Platforms",
          image: thzImage,
        },
      ],
    },
    "GaN Technology": {
      heading: "GaN Technology",
      cards: [
        {
          title: "GaN Epitaxial (Epi) Design",
          image: "assets/GaN Epitaxial (Epi) Design.jpeg",
        },
        {
          title: "Processed GaN Wafer",
          image: "assets/Processed GaN Wafer.jpeg",
        },
        {
          title: "Fabricated IC",
          image: "assets/Fabricated IC.jpeg",
        },
        {
          title: "Packaged Chip",
          image: "assets/Packaged Chip.jpg",
        },
        {
          title: "RF Power Module",
          image: "assets/RF Power Module.jpg",
        },
      ],
    },
  } as const;

  const overlay = document.createElement("div");
  overlay.className = "model-content-overlay";
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML = `
    <section class="model-content" role="dialog" aria-modal="true" aria-labelledby="expertiseModelTitle">
      <button type="button" class="model-content-close" aria-label="Close">x</button>
      <h2 id="expertiseModelTitle"></h2>
      <div class="model-product-grid"></div>
    </section>
  `;
  document.body.appendChild(overlay);

  const modelContent = overlay.querySelector(".model-content") as HTMLElement;
  const titleElement = overlay.querySelector(
    "#expertiseModelTitle",
  ) as HTMLElement;
  const grid = overlay.querySelector(".model-product-grid") as HTMLElement;
  const closeButton = overlay.querySelector(
    ".model-content-close",
  ) as HTMLButtonElement;

  const openModelContent = (headingText: keyof typeof expertiseContent) => {
    const content = expertiseContent[headingText];
    titleElement.innerHTML = content.heading;
    modelContent.dataset.expertise = headingText;
    grid.innerHTML = "";

    content.cards.forEach((item) => {
      const card = document.createElement("div");
      card.className = "product-card model-product-card";

      const image = document.createElement("img");
      image.src = item.image;
      image.alt = item.title;
      image.loading = "lazy";

      const heading = document.createElement("h3");
      heading.textContent = item.title;

      card.appendChild(image);
      card.appendChild(heading);
      grid.appendChild(card);
    });

    overlay.classList.add("show");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("model-content-open");
    closeButton.focus({ preventScroll: true });
  };

  const closeModelContent = () => {
    overlay.classList.remove("show");
    overlay.setAttribute("aria-hidden", "true");
    delete modelContent.dataset.expertise;
    document.body.classList.remove("model-content-open");
  };

  document.querySelectorAll(".expertise-card-new").forEach((card) => {
    const title = card.querySelector(".ec-title")?.textContent?.trim();
    if (!title || !(title in expertiseContent)) return;

    const clickableCard = card as HTMLElement;
    clickableCard.setAttribute("tabindex", "0");
    clickableCard.setAttribute("role", "button");
    clickableCard.setAttribute("aria-haspopup", "dialog");
    clickableCard.style.cursor = "pointer";

    clickableCard.addEventListener("click", () => {
      openModelContent(title as keyof typeof expertiseContent);
    });

    clickableCard.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModelContent(title as keyof typeof expertiseContent);
      }
    });
  });

  closeButton.addEventListener("click", closeModelContent);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeModelContent();
  });
  modelContent.addEventListener("click", (event) => event.stopPropagation());
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && overlay.classList.contains("show")) {
      closeModelContent();
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
      const items = document.querySelectorAll(
        "#" + modalId + " .accordion-item",
      );
      const useItems = items.length > 0;
      if (useItems) {
        items.forEach((item) => {
          const el = item as HTMLElement;
          const itemText = el.textContent?.toLowerCase() || "";
          const itemTitle =
            el.getAttribute("data-title")?.toLowerCase() || "";
          el.style.display =
            itemText.includes(q) || itemTitle.includes(q) ? "" : "none";
        });
      }

      document
        .querySelectorAll("#" + modalId + " .accordion-section")
        .forEach((section) => {
          const sectionEl = section as HTMLElement;
          const content = section.querySelector(
            ".accordion-content",
          ) as HTMLElement;
          const toggle = section.querySelector(".accordion-toggle");
          let visible: boolean;
          if (useItems) {
            visible = Array.from(
              section.querySelectorAll(".accordion-item"),
            ).some((i) => (i as HTMLElement).style.display !== "none");
          } else {
            const text = sectionEl.textContent?.toLowerCase() || "";
            visible = q === "" || text.includes(q);
          }
          sectionEl.style.display = visible ? "" : "none";
          if (visible && q !== "") {
            toggle?.classList.add("open");
            if (content) content.style.maxHeight = content.scrollHeight + "px";
          } else if (!visible) {
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

  // RF & Microwave sub-modals
  createSearchHandler("hornAntennasSearch", "hornAntennasModal");
  createSearchHandler("antiJammingSearch", "antiJammingAntennaModal");
  createSearchHandler("lnaSearch", "lnaModal");
  createSearchHandler("trComponentsSearch", "trComponentsModal");
  createSearchHandler("rfSystemsSearch", "rfSystemsModal");
  createSearchHandler("passiveComponentsSearch", "passiveComponentsModal");
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

function loadChatbotWidget() {
  // Set chatbot config — point at our Lovable Cloud edge function
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  (window as any).ChatbotConfig = {
    chatUrl: `${supabaseUrl}/functions/v1/chat`,
    chatAuthToken: supabaseKey,
    backendUrl: '',
    primaryColor: '#667eea',
    secondaryColor: '#764ba2',
    position: 'bottom-right',
    botName: 'SERA',
    autoOpen: false,
    requireName: false,
    showUpload: true,
  };

  // Load chatbot widget script
  const script = document.createElement('script');
  script.src = '/chatbot-widget.js';
  document.body.appendChild(script);
}

export default Index;

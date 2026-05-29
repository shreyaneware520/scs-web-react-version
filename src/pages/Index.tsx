import { useEffect, useRef } from "react";
import opticsPhotonicsImage from "../assests/optics-photonics.jpg";
import thzImage from "../assests/thz.jpg";
import microscopeR1Image from "../assests/r1.png";
import microscopeR2Image from "../assests/r2.png";
import microscopeR3Image from "../assests/r3.png";
import microscopeR4Image from "../assests/r4.png";
import microscopeR5Image from "../assests/r5.png";
import microscopeR6Image from "../assests/r6.png";
import microscopeR7Image from "../assests/r7.png";
import microscopeR8Image from "../assests/r8.png";
import microscopeR9Image from "../assests/r9.png";
import microscopeR10Image from "../assests/r10.png";
import microscopeR11Image from "../assests/r11.png";
import microscopeR12Image from "../assests/r12.png";
import microscopeR13Image from "../assests/r13.png";
import microscopeR14Image from "../assests/r14.png";
import microscopeR15Image from "../assests/r15.png";
import microscopeR16Image from "../assests/r16.png";
import microscopeR17Image from "../assests/r17.png";
import microscopeR18Image from "../assests/r18.png";
import microscopeR19Image from "../assests/r19.png";
import microscopeR20Image from "../assests/r20.png";
import microscopeR21Image from "../assests/r21.png";
import microscopeR22Image from "../assests/r22.png";
import microscopeR23Image from "../assests/r23.png";
import microscopeR26Image from "../assests/r26.png";
import quantumR27Image from "../assests/r27.png";
import quantumR28Image from "../assests/r28.png";
import quantumR29Image from "../assests/r29.png";
import quantumR30Image from "../assests/r30.png";
import quantumR31Image from "../assests/r31.png";
import quantumR32Image from "../assests/r32.png";
import quantumR33Image from "../assests/r33.png";
import quantumR34Image from "../assests/r34.png";
import quantumR35Image from "../assests/r35.png";
import quantumR36Image from "../assests/r36.png";
import quantumR37Image from "../assests/r37.png";
import quantumR38Image from "../assests/r38.png";
import quantumR39Image from "../assests/r39.png";
import quantumR40Image from "../assests/r40.png";
import quantumR41Image from "../assests/r41.png";
import quantumR42Image from "../assests/r42.png";
import quantumR43Image from "../assests/r43.png";
import quantumR44Image from "../assests/r44.png";
import quantumR45Image from "../assests/r45.png";
import quantumR46Image from "../assests/r46.png";
import quantumR47Image from "../assests/r47.png";
import quantumR48Image from "../assests/r48.png";
import quantumR49Image from "../assests/r49.png";
import quantumR50Image from "../assests/r50.png";
import quantumR51Image from "../assests/r51.png";
import quantumR52Image from "../assests/r52.png";
import quantumR53Image from "../assests/r53.png";

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
          const microscopeImages: Record<string, string> = {
            r1: microscopeR1Image,
            r2: microscopeR2Image,
            r3: microscopeR3Image,
            r4: microscopeR4Image,
            r5: microscopeR5Image,
            r6: microscopeR6Image,
            r7: microscopeR7Image,
            r8: microscopeR8Image,
            r9: microscopeR9Image,
            r10: microscopeR10Image,
            r11: microscopeR11Image,
            r12: microscopeR12Image,
            r13: microscopeR13Image,
            r14: microscopeR14Image,
            r15: microscopeR15Image,
            r16: microscopeR16Image,
            r17: microscopeR17Image,
            r18: microscopeR18Image,
            r19: microscopeR19Image,
            r20: microscopeR20Image,
            r21: microscopeR21Image,
            r22: microscopeR22Image,
            r23: microscopeR23Image,
            r26: microscopeR26Image,
          };

          containerRef.current
            .querySelectorAll("[data-microscope-image]")
            .forEach((image) => {
              const key = (image as HTMLImageElement).dataset.microscopeImage;
              if (key && microscopeImages[key]) {
                (image as HTMLImageElement).src = microscopeImages[key];
              }
            });

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
  // Quantum modal content
  initQuantumModal();
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
  const contactEndpoint =
    (import.meta.env.VITE_CONTACT_API_URL as string | undefined)?.trim() ||
    "/api/contact";

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

      fetch(contactEndpoint, {
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
              "Message sent successfully! We'll get back to you soon.",
              "success"
            );
            form.reset();
          } else {
            const contentType = response.headers.get("content-type") || "";
            const data = contentType.includes("application/json")
              ? await response.json().catch(() => null)
              : null;
            const text = data ? "" : await response.text().catch(() => "");
            const fallbackMessage =
              response.status === 404
                ? "Contact service is unavailable. Please make sure the mail server is running and /api/contact is reachable."
                : `Contact service returned ${response.status}. Please try again shortly.`;
            throw new Error(data?.message || text.trim() || fallbackMessage);
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

  feedback.style.cssText += `
    margin-bottom: 16px;
    padding: 14px 16px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 700;
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

type QuantumProductBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

type QuantumProduct = {
  title: string;
  reference: string;
  blocks: QuantumProductBlock[];
};

function initQuantumModal() {
  if (document.getElementById("QuantumModal")) return;

  const products = {
    laser: [
      {
        title: "1) Diffusion Bonded Composite Laser Crystals / YAG Laser Rods",
        reference: quantumR27Image,
        blocks: [
          { type: "heading", text: "Product Details:" },
          {
            type: "list",
            items: [
              "Manufacturing Process: Fabricated using diffusion bonding or optical contact bonding processes",
              "Structure: Forms a monolithic crystal structure that is glue-free, air-gap-free, and free from interface reflections",
              "Material Compatibility: Supports diffusion bonding of various materials, including Nd:YAG, Nd:YVO4, Cr4+:YAG, and undoped YAG",
              "Customization: Bonding position, chip thickness, and doping concentration are fully customizable according to the laser design parameters",
              "Thermal Performance: Excellent thermal management capabilities",
              "Coatings: Supports various coating options such as AR (Anti-Reflection), HR (High-Reflection), HT (High-Transmission), and green light suppression (specifications available for wavelengths such as 808nm, 946nm, 1064nm, 532nm)",
            ],
          },
          { type: "heading", text: "Applications:" },
          {
            type: "list",
            items: [
              "Passive Q-switched all-solid-state lasers",
              "End-pumped solid-state lasers",
              "Laser amplification chains and oscillator optimization",
              "Microchip and integrated laser modules",
              "Optical limiting and saturable absorption applications",
            ],
          },
        ],
      },
      {
        title: "2) Samarium-doped Flow Tubes / Solid-State Laser Filter Cavities",
        reference: quantumR28Image,
        blocks: [
          { type: "heading", text: "Product Details:" },
          {
            type: "list",
            items: [
              "Dimensions: Specific requirements and physical dimensions can be customized according to user needs",
            ],
          },
          { type: "heading", text: "Applications:" },
          {
            type: "list",
            items: [
              "Lamp-pumped solid-state lasers",
              "High-energy laser amplification chains",
              "Laser medium protection (by filtering UV radiation)",
              "Performance Enhancement: Effectively improves the reliability, lifetime, and laser radiation efficiency of laser components",
            ],
          },
        ],
      },
      {
        title: "3) High-Power Laser Vacuum Filter",
        reference: quantumR29Image,
        blocks: [
          { type: "heading", text: "Product Details:" },
          {
            type: "list",
            items: [
              "Made from fused silica or high-quality optical glass",
              "All parameters including outer diameter, inner diameter, length, and aperture diameter can be customized",
              "Outer diameter range: φ20~φ100mm, φ20~φ50mm (corner)",
              "Length: 80mm~1500mm or 50mm~550mm (corner of fabric)",
              "Window shape: λ/10",
              "Window angle is fully customizable (supports Brewster angle cutting)",
              "Supports high damage threshold coatings, such as >15 J/cm²@1064nm",
              "Static vacuum better than 5×10⁻⁵",
            ],
          },
          { type: "heading", text: "Typical Applications:" },
          {
            type: "list",
            items: [
              "High-power laser vacuum transmission lines",
              "Vacuum space filtering and mode cleaning",
              "Polarization preservation and optical paths with special incident angles",
              "High-power amplification links and optical isolation modules",
              "Strong-field physics and high-energy laser experiments",
            ],
          },
        ],
      },
      {
        title: "4) Bonded Laser Crystal",
        reference: quantumR30Image,
        blocks: [
          { type: "heading", text: "Product Details:" },
          {
            type: "list",
            items: [
              "Bonded crystal rod dimensions: φ3mm~φ30mm",
              "Rectangular crystal: (3mm~50mm)×(3mm~150mm)×(0.2mm~50mm)",
            ],
          },
          { type: "heading", text: "Applications:" },
          {
            type: "paragraph",
            text: "Bonded laser crystals can reduce the thermal effects of the medium during laser operation, effectively lowering the thermal management requirements of solid-state lasers, and thus are increasingly widely used:",
          },
          {
            type: "list",
            items: [
              "Waveguide amplification: Er:YAG+Nd:YAG+YAG",
              "Planar waveguide: Er:YAG+Yb:YAG 1.5μm",
              "Eye-safe lasers: Co:spinel+Er:glass, Co:spinel+Er:glass+Nd:glass, sapphire+YAG, etc.",
            ],
          },
        ],
      },
    ] satisfies QuantumProduct[],
    quantum: [
      { type: "heading", text: "1. Ultra-Stable Cavity" },
      {
        title: "1) Cylindrical/Slotted Ultra-Stable Cavity",
        reference: quantumR31Image,
        blocks: [
          { type: "heading", text: "Product Details:" },
          {
            type: "list",
            items: [
              "The main body is made of Corning ULE® (7972) titanium-doped ultra-low expansion glass or microcrystalline glass",
              "Optical Contact Bonding: No adhesive, zero gas release, perfectly compatible with UHV environments",
              "Three optimized geometric configurations are available: standard cylindrical, compact cubic, and folded optical path",
              "Materials can be customized across the entire wavelength range from visible light to mid-infrared",
              "Limiting stability: Under appropriate conditions, it can achieve a typical Allan variance of 1×10⁻¹⁵ to 5×10⁻¹⁶ (1s)",
              "Optional IBS ion beam sputtering coating, with a reflectivity >99.999%",
              "The precision of a single wavelength can reach Finesse > 300,000",
              "FSR can be precisely matched according to cavity length (10–300 mm)",
            ],
          },
          { type: "heading", text: "Typical Applications:" },
          {
            type: "list",
            items: [
              "Optical frequency standards: serving as flywheel oscillators in optical clocks",
              "Ultra-narrow linewidth laser locking: achieving laser linewidth narrowing at the Hz or even mHz level",
              "Low phase noise microwave generation: microwave photonics applications based on optical octave bands",
            ],
          },
        ],
      },
      {
        title: "2) Cubic Ultra-Stable Cavity",
        reference: quantumR32Image,
        blocks: [
          { type: "heading", text: "Product Details:" },
          {
            type: "list",
            items: [
              "Cavity material: ULE (quartz) or microcrystalline glass",
              "Cavity dimensions: 50×50×50mm to 150×150×150mm",
              "The cavity surface and inner hole are fully polished",
              "Cavity resonator surface optical polishing",
              "Flatness error ≤ λ/20",
              "Parallelism error ≤ 2 seconds",
              "Any perpendicularity error ≤ 10 seconds",
            ],
          },
          { type: "paragraph", text: "Application: Ultrastable laser system" },
        ],
      },
      {
        title: "3) Regular Octagonal Ultra-Stable Cavity",
        reference: quantumR34Image,
        blocks: [
          { type: "heading", text: "Product Details:" },
          {
            type: "list",
            items: [
              "Made of ULE glass",
              "The main body is a regular octagonal structure",
              "Can be used with end mirrors with diameters of 12.0–25.4 mm",
              "The surface shape of the optical working surface is ≤λ/10",
              "The end mirror can be coated with a high reflectance (HR) coating with a reflectivity >99.999%",
            ],
          },
          { type: "heading", text: "Typical Applications:" },
          {
            type: "list",
            items: [
              "Optical frequency standards and optical clock systems",
              "Ultra-stable laser systems",
              "Precision interferometry and quantum metrology",
              "Low-temperature frequency stabilization platforms (for single-crystal silicon versions)",
            ],
          },
        ],
      },
      {
        title: "4) Folded Structure Ultrastable Cavity",
        reference: quantumR33Image,
        blocks: [
          { type: "heading", text: "Product Details:" },
          {
            type: "list",
            items: [
              "Adopts a lightweight structure with multiple intersecting grooves",
              "The surface shape of the optical working surface can be machined to λ/10",
              "The parallelism between structures can be controlled within 2″",
              "The folded multi-groove structure significantly improves mechanical stiffness and reduces stress coupling",
              "Supports complete customization of materials, channel shape, size and installation method",
              "Can serve as a core low-noise component for high-stability lasers, optical clocks, and quantum metrology systems",
            ],
          },
          { type: "heading", text: "Typical Applications:" },
          {
            type: "list",
            items: [
              "Ultra-stable laser systems",
              "Optical frequency standards and optical clock reference cavities",
              "Precision phase, interferometry, and quantum measurements",
              "Vibration-resistant and thermal noise-optimized platforms",
            ],
          },
        ],
      },
      {
        title: "5) Fabry-Perot Etalon (FP Cavity)",
        reference: quantumR35Image,
        blocks: [
          { type: "heading", text: "Product Details:" },
          {
            type: "list",
            items: [
              "The optical resonant structure is composed of two highly reflective cavity mirrors at both ends and a central optical body",
              "The cavity material can be either fused silica or optical glass",
              "The cavity length, endoscope parameters, and coating type can be flexibly customized",
              "Supports customization of various structural forms",
              "Has a compact structure and is easy to integrate",
            ],
          },
          { type: "heading", text: "Typical Applications:" },
          {
            type: "list",
            items: [
              "Cavity-enhanced absorption (CEAS, CRDS)",
              "Interferometry and thin film characterization",
              "Laser filtering, mode selection, and linewidth shaping",
              "Resonant-enhanced nonlinear optics",
            ],
          },
        ],
      },
      {
        title: "6) Indium Steel Ultra-Stable Reference Cavity",
        reference: quantumR36Image,
        blocks: [
          { type: "heading", text: "Product Details:" },
          {
            type: "list",
            items: [
              "The main body of the cavity is made of a special Invar alloy",
              "With an all-metal structure, it has extremely high impact resistance and drop resistance",
              "Short-term stability can reach 1×10⁻¹¹",
              "Sturdy and durable, suitable for mobile transportation",
            ],
          },
          { type: "heading", text: "Applications:" },
          {
            type: "list",
            items: [
              "Mobile LiDAR",
              "Distributed Fiber Optic Sensing (DAS)",
              "Industrial laser frequency stabilization",
            ],
          },
        ],
      },
      {
        title: "7) Laparoscopy",
        reference: quantumR37Image,
        blocks: [
          { type: "heading", text: "Product Details:" },
          {
            type: "list",
            items: [
              "Materials: Quartz and various types of glass",
              "Surface defect level: 10-5",
              "Parallelism: ≤ 5″",
              "Diameter and tolerance: 10~100mm ± 0.05",
              "Thickness and tolerance: 2~10mm ± 0.05",
              "Light aperture: 9~98",
            ],
          },
        ],
      },
      {
        title: "8) Single-Crystal Silicon Ultrastable Cavity",
        reference: quantumR38Image,
        blocks: [
          { type: "heading", text: "Product Details:" },
          {
            type: "list",
            items: [
              "The cavity is made of high-purity single-crystal silicon",
              "Brownian thermal noise can be reduced to less than 1/10 of that in a room-temperature glass cavity",
              "Offers geometric configurations such as spindle and polyhedron",
              "Under appropriate conditions, frequency stability better than 4×10⁻¹⁷ can be achieved",
              "Only applicable to the infrared band (e.g., 1.5μm, 2.1μm)",
              "Physical thermal noise limit: Breaking through the 1×10⁻¹⁶ bottleneck",
              "Supports customization of ultra-long cavities up to 400mm",
            ],
          },
          { type: "heading", text: "Typical Applications:" },
          {
            type: "list",
            items: [
              "Next-generation optical lattice clocks",
              "Gravitational wave detection verification",
              "Fundamental physics testing",
              "Ultra-long coherent lasers",
              "Low-temperature spindle-shaped single-crystal silicon ultrastable cavities for next-generation optical clocks operating below 5K with asymptotically vanishing CTE",
            ],
          },
        ],
      },
      { type: "heading", text: "2. Air Chamber" },
      {
        title: "1) Optical Gas Cell (Parallel Window/Brewster's Angle)",
        reference: quantumR39Image,
        blocks: [
          { type: "heading", text: "Product Details:" },
          {
            type: "list",
            items: [
              "Parallel window structure or Brewster window structure can be used",
              "Parallel window air chamber: window parallelism <10″",
              "Parallel window air chamber: surface shape accuracy reaches λ/10",
              "Parallel window air chamber: typical structures include cubic or thin window designs with side lengths of 10–40 mm",
              "Brewster angle air chamber: typical parameters are 10–40 mm in diameter and 10–100 mm in length",
              "Brewster angle air chamber: window surface shape λ/10, parallelism <10″",
              "Supports fused silica or optical glass materials",
              "Adhesive-free process",
              "Extremely low leakage and outgassing rates allow vacuum systems to be pumped to a base pressure better than 5×10⁻⁵ Pa",
              "Customizable cubic, thin-window, or cylindrical cavity sizes (10–40mm/10–100mm)",
            ],
          },
          { type: "heading", text: "Typical Applications:" },
          {
            type: "list",
            items: [
              "Atomic absorption, transmission, and fluorescence spectroscopy",
              "Laser frequency stabilization (SAS/DAVLL/PS): as a frequency-stabilized reference gas cell",
              "Polarization-sensitive spectroscopy and scattering experiments",
              "Front-end preparation unit for cold atom systems",
              "Nonlinear optics and gas interactions",
            ],
          },
        ],
      },
      { type: "heading", text: "3. Ultra-High Vacuum Scientific Chamber" },
      {
        title: "1) Ultra-High Vacuum Rectangular Optical Cavity",
        reference: quantumR40Image,
        blocks: [
          { type: "heading", text: "Product Details:" },
          {
            type: "list",
            items: [
              "The air duct has a compact structure with CF16, CF35, and CF63 flanges",
              "Materials such as quartz and borosilicate glass can be used",
              "The thickness of the optical window is 3–6.35 mm",
              "The maximum directional length of the cavity can reach 180mm",
              "Flange materials can be selected from 304SS or 316L",
              "All windows have a surface accuracy of PV≤λ/10 (4cm²)",
              "Window parallelism ≤ 2″",
              "The parallelism error between corresponding windows is ≤10″",
              "The verticality error between any two adjacent windows is ≤10″",
              "The cavity can be baked up to 250°C",
              "Helium mass spectrometry leak detection rate <1×10⁻¹²mbar·L/s",
              "Optical windows can be provided with single/double-sided antireflective coatings, ITO conductive films, or alkali metal corrosion resistant coatings",
            ],
          },
          { type: "heading", text: "Typical Applications:" },
          {
            type: "list",
            items: [
              "Cold atom and quantum gas experiments: six mutually orthogonal optical channels for MOTs, bias magnetic traps, radio frequency evaporation paths, and multi-beam light trapping systems",
              "Precision optics and spectroscopy experiments: absorption spectroscopy, fluorescence detection, and polarization state analysis",
              "Atomic interferometers and quantum inertial devices: compact atomic gravimeters, accelerometers, and gyroscopes",
              "Ion traps and atom-ion hybrid systems",
            ],
          },
        ],
      },
      {
        title: "2) Ultra-High Vacuum Polyhedral Optical Cavity",
        reference: quantumR41Image,
        blocks: [
          { type: "heading", text: "Product Details:" },
          {
            type: "list",
            items: [
              "Adopts a variety of polyhedral structures such as regular hexagon, regular octagon, and regular dodecagon",
              "Materials such as quartz and borosilicate glass can be used",
              "Provides abundant and evenly distributed optical windows",
              "The flatness of the cavity optical window reaches PV≤λ/10 (4cm²)",
              "Window parallelism ≤ 2″",
              "The parallelism error between any two corresponding windows is ≤10″",
              "The angle and perpendicularity error between any windows is ≤10″",
              "The circumscribed circle of the polyhedral frame covers dimensions of 70–150 mm",
              "The cavity supports baking at ≤250℃",
              "Helium mass spectrometry leak detection rate <1×10⁻¹²mbar·L/s",
              "Optical windows can be provided with single/double-sided antireflective coatings, ITO conductive films, and anti-alkali metal corrosion coatings",
            ],
          },
          { type: "heading", text: "Typical Applications:" },
          {
            type: "list",
            items: [
              "Cold Atom and Quantum Gas Experiments: planar geometry provides 360° optical access for 3D-MOT cooling optical paths and optical lattice construction",
              "Rydberg Atomic Physics: optional ITO conductive coating effectively shields external electric field interference",
              "Ion Trap and Atom-Ion Hybrid Systems",
              "Quantum Information and Quantum Simulation Platform Prototypes",
            ],
          },
        ],
      },
    ] as Array<QuantumProduct | { type: "heading"; text: string }>,
    generalOptics: [
      {
        title: "1) High-Precision Photoresist Clamp (Cubic Support)",
        reference: quantumR42Image,
        blocks: [
          { type: "heading", text: "Product Details:" },
          {
            type: "list",
            items: [
              "Materials: Fused silica, microcrystalline glass",
              "External dimensions: can be customized according to requirements",
              "Dimensional tolerance: ±0.1mm",
              "Number of effective working faces: 6",
              "Surface profile accuracy: λ/10",
              "Surface defect grade: 20-10",
              "Perpendicularity between adjacent faces: ≤ 1″",
              "Parallelism between opposite surfaces: ≤ 1″",
            ],
          },
        ],
      },
      {
        title: "2) Conical Prism",
        reference: quantumR43Image,
        blocks: [
          { type: "heading", text: "Product Details:" },
          {
            type: "list",
            items: [
              "Materials: Quartz and various types of glass",
              "Surface profile accuracy: ≤ λ/10",
              "Surface defect grade: 20-10",
              "Wavefront distortion: ≤ λ/5",
              "Beam deflection angle: θ ≤ 2″",
              "Light aperture: φ10~100mm",
              "Coating: Reflective coating/anti-reflective coating, customization available upon request",
            ],
          },
        ],
      },
      {
        title: "3) Right-Angle Prism",
        reference: quantumR44Image,
        blocks: [
          { type: "heading", text: "Product Details:" },
          {
            type: "list",
            items: [
              "Materials: Quartz and various types of glass",
              "Dimensional tolerance: 20mm~80mm ± 0.1mm",
              "90° and 45° angle tolerance: ±5″",
              "Tower difference: ±5″",
              "Surface profile accuracy: λ/10",
              "Surface defect grade: 20-10",
              "Coating specifications: Customized to order",
            ],
          },
        ],
      },
      {
        title: "4) Orthorhombic Prism",
        reference: quantumR45Image,
        blocks: [
          { type: "heading", text: "Product Details:" },
          {
            type: "list",
            items: [
              "Materials: Quartz and various types of glass",
              "Surface defect grade: 20-10",
              "Surface profile accuracy: ≤λ/5",
              "Dimensional tolerance: ±0.1mm",
              "Angle tolerance: ±5″",
              "Optical parallelism error: ≤10″",
              "Light aperture: 20mm~40mm",
              "End face perpendicularity: ≤3'",
            ],
          },
        ],
      },
      {
        title: "5) Lens",
        reference: quantumR46Image,
        blocks: [
          { type: "heading", text: "Product Details:" },
          {
            type: "list",
            items: [
              "Materials: Quartz and various types of glass",
              "Focal length tolerance: ±1%",
              "Diameter and tolerance: φ10mm~φ100mm ± 0.05mm",
              "Center thickness tolerance: 0.1mm",
              "Eccentricity: ≤3'",
              "Surface profile accuracy: aperture ≤ 1; irregularity ≤ 1/5",
              "Surface defect grade: 20-10",
              "Coating: Customized to order",
            ],
          },
        ],
      },
      {
        title: "6) Germanium Octahedral Mirror",
        reference: quantumR47Image,
        blocks: [
          { type: "heading", text: "Product Details:" },
          {
            type: "list",
            items: [
              "Material: Single-crystal germanium",
              "Surface defect grade: 20-10",
              "Surface profile accuracy: λ/2~λ/10",
              "Diameter tolerance: ±0.05mm",
              "Thickness tolerance: ±0.05mm",
              "Light aperture: φ10mm~200mm",
              "Parallelism: ≤ 10″",
            ],
          },
        ],
      },
      {
        title: "7) High-Precision Plane Mirror",
        reference: quantumR48Image,
        blocks: [
          { type: "heading", text: "Product Details:" },
          {
            type: "list",
            items: [
              "Materials: Quartz and various types of glass",
              "Surface defect grade: 20-10",
              "Parallelism: 10″",
              "Diameter (tolerance): 100mm~400mm ± 0.1mm",
              "Thickness tolerance: 10mm~50mm ± 0.1mm",
              "Coating: Metal film (gold, aluminum, silver with protection), multilayer dielectric high-reflection film",
            ],
          },
        ],
      },
      {
        title: "8) Pentagonal Prism (Standard Pentaprism for Testing)",
        reference: quantumR49Image,
        blocks: [
          { type: "heading", text: "Product Details:" },
          {
            type: "list",
            items: [
              "Materials: Quartz and various types of glass",
              "Made from fused silica",
              "Dimensions: 10mm–50mm",
              "The deviation angle error can be controlled within <10″",
              "Surface profile accuracy: λ/10",
              "Surface defect grade: 40–20",
              "Both size and angle can be customized",
            ],
          },
        ],
      },
      {
        title: "9) Polo Prism",
        reference: quantumR50Image,
        blocks: [
          { type: "heading", text: "Product Details:" },
          {
            type: "list",
            items: [
              "Materials: Quartz and various types of glass",
              "Typical side length range: 10mm–50mm",
              "Surface accuracy λ/10",
              "Dihedral angle tolerance: ±1″",
              "Tower difference: 5'",
              "Surface defect grade: 20–10",
              "Single-sided or double-sided broadband antireflective coatings (400–1100 nm) available",
            ],
          },
          { type: "heading", text: "Typical Applications:" },
          {
            type: "list",
            items: [
              "Optical delay lines and beam translation",
              "Telescope optical path reflection and image orientation",
              "Compact microscopy imaging and optical path rearrangement",
              "Interferometry and measurement optical path orientation adjustment",
              "Airborne/vehicle-mounted optoelectronic equipment",
            ],
          },
        ],
      },
      {
        title: "10) Other High-Precision Optical Prism Series",
        reference: quantumR51Image,
        blocks: [
          { type: "heading", text: "Product Details:" },
          {
            type: "paragraph",
            text: "This series encompasses high-precision prisms with various geometries, designed to meet diverse optical needs such as reflection, refraction, beam splitting, polarization, and image processing.",
          },
          {
            type: "paragraph",
            text: "Main product categories: Triangular prisms, Dove prisms, roof prisms, beam splitters, polarizing prisms, cornerstone prisms",
          },
          { type: "heading", text: "General technical specifications:" },
          {
            type: "list",
            items: [
              "High-quality substrate: Standard materials used are H-K9L (BK7) or UV-fused silica",
              "Ultra-high precision: Surface accuracy can reach λ/10, and angular accuracy can be better than 3′ or 5″ depending on the type",
              "Surface defect level: 20-10",
              "Customization services: Size (10mm~80mm), film layer (AR/reflective film) and special angles can all be customized",
            ],
          },
          { type: "heading", text: "Typical Applications:" },
          {
            type: "list",
            items: [
              "Optical path folding and control: laser reflection, beam steering, and layout optimization of compact optical systems",
              "Imaging and microscopy systems: image flipping, rotation, and correction in microscopes, binoculars, and imaging equipment",
              "Interferometers and precision measurement: reference arms, beam splitters, or retroreflectors in interferometers",
              "Lasers and quantum optics: laser polarization state management, single-photon experiments, and optical power monitoring",
            ],
          },
        ],
      },
      {
        title: "11) Glued Prism",
        reference: quantumR52Image,
        blocks: [
          { type: "heading", text: "Product Details:" },
          {
            type: "list",
            items: [
              "Materials: Quartz and various types of glass",
              "Dimensional tolerance: ±0.05mm",
              "Beam deflection accuracy: ≤3'",
              "Transmission wavefront distortion: <λ/4@633nm",
              "Surface defect grade: 20-10",
              "Adhesive layer quality requirements: No bubbles, no delamination",
              "Extinction ratio: >1000:1 (PBS)",
              "Coating: Customized to order",
            ],
          },
        ],
      },
      {
        title: "12) Spherical Mirror",
        reference: quantumR53Image,
        blocks: [
          { type: "heading", text: "Product Details:" },
          {
            type: "list",
            items: [
              "Materials: Quartz and various types of glass",
              "Focal length: 1000-5000mm",
              "Surface defect grade: 40-20",
              "Surface profile accuracy: λ/10",
              "External dimensions and tolerances: φ100mm~φ400mm ± 0.5mm",
              "Coating: Aluminum reflective film",
            ],
          },
        ],
      },
    ] satisfies QuantumProduct[],
  };

  const modal = document.createElement("div");
  modal.id = "QuantumModal";
  modal.className = "modal";
  modal.setAttribute("aria-hidden", "true");

  const content = document.createElement("div");
  content.className = "modal-content";

  const header = document.createElement("div");
  header.className = "modal-header-flex";
  const title = document.createElement("h2");
  title.textContent = "Quantum";
  header.appendChild(title);
  content.appendChild(header);

  const accordion = document.createElement("div");
  accordion.className = "accordion";
  content.appendChild(accordion);

  const appendBlock = (parent: HTMLElement, block: QuantumProductBlock) => {
    if (block.type === "heading") {
      const paragraph = document.createElement("p");
      const strong = document.createElement("strong");
      strong.textContent = block.text;
      paragraph.appendChild(strong);
      parent.appendChild(paragraph);
      return;
    }

    if (block.type === "paragraph") {
      const paragraph = document.createElement("p");
      paragraph.textContent = block.text;
      parent.appendChild(paragraph);
      return;
    }

    const list = document.createElement("ul");
    block.items.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      list.appendChild(listItem);
    });
    parent.appendChild(list);
  };

  const appendProduct = (parent: HTMLElement, product: QuantumProduct) => {
    const item = document.createElement("div");
    item.className = "accordion-item";

    const heading = document.createElement("h5");
    heading.textContent = product.title;
    item.appendChild(heading);

    const image = document.createElement("img");
    image.src = product.reference;
    image.alt = product.title;
    image.loading = "lazy";
    item.appendChild(image);

    product.blocks.forEach((block) => appendBlock(item, block));
    parent.appendChild(item);
  };

  const appendSectionHeading = (parent: HTMLElement, text: string) => {
    const item = document.createElement("div");
    item.className = "accordion-item";
    const heading = document.createElement("h5");
    heading.textContent = text;
    item.appendChild(heading);
    parent.appendChild(item);
  };

  const addRow = (
    rowTitle: string,
    rowItems: Array<QuantumProduct | { type: "heading"; text: string }>,
  ) => {
    const section = document.createElement("div");
    section.className = "accordion-section";

    const toggle = document.createElement("div");
    toggle.className = "accordion-toggle";
    toggle.setAttribute("role", "button");
    toggle.setAttribute("tabindex", "0");

    const rowHeading = document.createElement("h4");
    rowHeading.textContent = rowTitle;
    const arrow = document.createElement("div");
    arrow.className = "arrow";
    arrow.textContent = "▶";

    toggle.appendChild(rowHeading);
    toggle.appendChild(arrow);

    const rowContent = document.createElement("div");
    rowContent.className = "accordion-content";

    rowItems.forEach((item) => {
      if ("title" in item) {
        appendProduct(rowContent, item);
      } else {
        appendSectionHeading(rowContent, item.text);
      }
    });

    section.appendChild(toggle);
    section.appendChild(rowContent);
    accordion.appendChild(section);
  };

  addRow("Laser", products.laser);
  addRow("Quantum", products.quantum);
  addRow("General Optics", products.generalOptics);

  const footer = document.createElement("div");
  footer.style.marginTop = "14px";
  footer.style.textAlign = "right";
  const close = document.createElement("button");
  close.className = "btn-contact";
  close.setAttribute("data-dismiss", "modal");
  close.textContent = "Close";
  footer.appendChild(close);
  content.appendChild(footer);

  modal.appendChild(content);
  document.body.appendChild(modal);
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
    titleElement.style.display = "";
    grid.style.display = "";
    modelContent.querySelectorAll(".sub-view-container").forEach((el) => el.remove());
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

      if (headingText === "Semiconductor Test and Assembly" && item.title === "Probe Station") {
        card.style.cursor = "pointer";
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");

        card.addEventListener("click", () => {
          titleElement.style.display = "none";
          grid.style.display = "none";

          const subView = document.createElement("div");
          subView.className = "sub-view-container";
          subView.style.animation = "fadeUp 0.3s ease-out forwards";
          subView.style.width = "100%";
          modelContent.appendChild(subView);

          const viewStack: string[] = ["probe"];

          const renderView = (modalId: string) => {
            subView.innerHTML = "";
            const sourceModal = document.getElementById(modalId + "Modal") || document.getElementById(modalId);
            if (!sourceModal) return;

            const sourceContent = sourceModal.querySelector(".modal-content");
            if (!sourceContent) return;

            const clone = sourceContent.cloneNode(true) as HTMLElement;

            if (modalId === "probe") {
              const headerFlex = clone.querySelector(".modal-header-flex");
              if (headerFlex) {
                const newBackBtn = document.createElement("button");
                newBackBtn.className = "back-btn";
                newBackBtn.innerHTML = "⬅";
                newBackBtn.onclick = (e) => {
                  e.stopPropagation();
                  subView.remove();
                  titleElement.style.display = "";
                  grid.style.display = "";
                };
                headerFlex.insertBefore(newBackBtn, headerFlex.firstChild);
              }
            }

            clone.querySelectorAll(".back-btn").forEach((btn) => {
              if (modalId !== "probe") {
                const element = btn as HTMLElement;
                element.removeAttribute("onclick");
                element.onclick = (e) => {
                  e.stopPropagation();
                  if (viewStack.length > 1) {
                    viewStack.pop();
                    renderView(viewStack[viewStack.length - 1]);
                  } else {
                    subView.remove();
                    titleElement.style.display = "";
                    grid.style.display = "";
                  }
                };
              }
            });

            clone.querySelectorAll("[onclick]").forEach((el) => {
              const onclickVal = el.getAttribute("onclick");
              if (onclickVal) {
                const element = el as HTMLElement;
                element.removeAttribute("onclick");
                if (onclickVal.includes("showDetails")) {
                  const match = onclickVal.match(/'([^']+)'/);
                  if (match && match[1]) {
                    const targetModalId = match[1];
                    element.onclick = (e) => {
                      e.stopPropagation();
                      viewStack.push(targetModalId);
                      renderView(targetModalId);
                    };
                    element.style.cursor = "pointer";
                  }
                } else if (onclickVal.includes("goBackStep")) {
                  if (modalId !== "probe") {
                    element.onclick = (e) => {
                      e.stopPropagation();
                      if (viewStack.length > 1) {
                        viewStack.pop();
                        renderView(viewStack[viewStack.length - 1]);
                      } else {
                        subView.remove();
                        titleElement.style.display = "";
                        grid.style.display = "";
                      }
                    };
                  }
                }
              }
            });

            clone.querySelectorAll("[data-dismiss='modal']").forEach(btn => {
              (btn as HTMLElement).onclick = (e) => {
                 e.stopPropagation();
                 overlay.classList.remove("show");
                 overlay.setAttribute("aria-hidden", "true");
                 document.body.classList.remove("model-content-open");
              };
            });

            clone.querySelectorAll(".accordion-section").forEach((section) => {
              const toggle = section.querySelector(".accordion-toggle");
              const content = section.querySelector(".accordion-content") as HTMLElement;
              if (toggle && content) {
                toggle.addEventListener("click", () => {
                  const isOpen = toggle.classList.contains("open");
                  section.parentElement?.querySelectorAll(".accordion-toggle.open").forEach((t) => {
                    if (t !== toggle) {
                      t.classList.remove("open");
                      const c = t.closest(".accordion-section")?.querySelector(".accordion-content") as HTMLElement;
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
              }
            });

            clone.querySelectorAll("input[type='text']").forEach(input => {
               const inputEl = input as HTMLInputElement;
               inputEl.addEventListener("keyup", () => {
                 const q = inputEl.value.toLowerCase();
                 const items = clone.querySelectorAll(".accordion-item");
                 const useItems = items.length > 0;
                 if (useItems) {
                   items.forEach((item) => {
                     const el = item as HTMLElement;
                     const itemText = el.textContent?.toLowerCase() || "";
                     const itemTitle = el.getAttribute("data-title")?.toLowerCase() || "";
                     el.style.display = itemText.includes(q) || itemTitle.includes(q) ? "" : "none";
                   });
                 }

                 clone.querySelectorAll(".accordion-section").forEach((section) => {
                   const sectionEl = section as HTMLElement;
                   const sectionContent = section.querySelector(".accordion-content") as HTMLElement;
                   const sectionToggle = section.querySelector(".accordion-toggle");
                   let visible = false;
                   if (useItems) {
                     visible = Array.from(section.querySelectorAll(".accordion-item")).some((i) => (i as HTMLElement).style.display !== "none");
                   } else {
                     const text = sectionEl.textContent?.toLowerCase() || "";
                     visible = q === "" || text.includes(q);
                   }
                   sectionEl.style.display = visible ? "" : "none";
                   if (visible && q !== "") {
                     sectionToggle?.classList.add("open");
                     if (sectionContent) sectionContent.style.maxHeight = sectionContent.scrollHeight + "px";
                   } else if (!visible) {
                     sectionToggle?.classList.remove("open");
                     if (sectionContent) sectionContent.style.maxHeight = "";
                   }
                 });
               });
            });

            while (clone.firstChild) {
              subView.appendChild(clone.firstChild);
            }
          };

          renderView("probe");
        });

        card.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            card.click();
          }
        });
      } else if (headingText === "Semiconductor Test and Assembly" && item.title === "Different Types of Microscope") {
        card.style.cursor = "pointer";
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");
        card.setAttribute("aria-haspopup", "dialog");

        card.addEventListener("click", () => {
          overlay.classList.remove("show");
          overlay.setAttribute("aria-hidden", "true");
          delete modelContent.dataset.expertise;
          document.body.classList.remove("model-content-open");
          showDetails("microscopeTypes");
        });

        card.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            card.click();
          }
        });
      } else if (headingText === "Semiconductor Test and Assembly" && (item.title === "Loadpull System" || item.title === "Semiconductor Skill Training Lab and Development")) {
        card.style.cursor = "pointer";
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");

        card.addEventListener("click", () => {
          // Close the modal by replicating closeModelContent behavior
          overlay.classList.remove("show");
          overlay.setAttribute("aria-hidden", "true");
          delete modelContent.dataset.expertise;
          document.body.classList.remove("model-content-open");

          // Find the contact form
          const formElement = document.querySelector(".contact-form") as HTMLFormElement;
          const sectionContact = formElement ? formElement.closest("section") || formElement : null;
          
          if (sectionContact) {
            // Scroll to the contact section
            sectionContact.scrollIntoView({ behavior: "smooth" });
            
            // Focus the first input field and add highlight animation after scrolling finishes
            setTimeout(() => {
              if (formElement) {
                const firstInput = formElement.querySelector("input") as HTMLInputElement;
                if (firstInput) {
                  firstInput.focus({ preventScroll: true });
                }
                
                // Highlight animation
                const originalTransition = formElement.style.transition;
                const originalBoxShadow = formElement.style.boxShadow;
                
                formElement.style.transition = "box-shadow 0.3s ease";
                formElement.style.boxShadow = "0 0 15px rgba(0, 123, 255, 0.5)";
                
                setTimeout(() => {
                  formElement.style.boxShadow = originalBoxShadow;
                  setTimeout(() => {
                    formElement.style.transition = originalTransition;
                  }, 300);
                }, 2000);
              }
            }, 600); // 600ms allows smooth scroll to roughly finish
          }
        });

        card.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            card.click();
          }
        });
      }

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
      if (title === "RF & Microwaves/SiC") {
        showDetails("rf");
      } else if (title === "GaN Technology") {
        showDetails("GaN");
      } else if (title === "Quantum") {
        showDetails("Quantum");
      } else if (title === "THz/Optics") {
        const lasersModal = document.getElementById("lasersModal");
        if (lasersModal) {
          const h2 = lasersModal.querySelector("h2");
          if (h2) h2.textContent = "THz/Photonics/Optics Solutions";
        }
        showDetails("lasers");
      } else {
        openModelContent(title as keyof typeof expertiseContent);
      }
    });

    clickableCard.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (title === "RF & Microwaves/SiC") {
          showDetails("rf");
        } else if (title === "GaN Technology") {
          showDetails("GaN");
        } else if (title === "Quantum") {
          showDetails("Quantum");
        } else if (title === "THz/Optics") {
          const lasersModal = document.getElementById("lasersModal");
          if (lasersModal) {
            const h2 = lasersModal.querySelector("h2");
            if (h2) h2.textContent = "THz/Photonics/Optics Solutions";
          }
          showDetails("lasers");
        } else {
          openModelContent(title as keyof typeof expertiseContent);
        }
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

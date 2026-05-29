import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ChevronLeft,
  Cpu,
  Gauge,
  Layers,
  Microscope,
  Move3D,
  Snowflake,
  Thermometer,
} from "lucide-react";
import logoImage from "../assests/scs logo.png";
import automaticProbeImage from "../assests/AutomaticProbe.png";
import xSeriesImage from "../assests/X Series Semi-Automatic Probe Station.jpg";
import vSeriesImage from "../assests/V Series New Generation High Performance Probe Station.jpg";
import cgxImage from "../assests/CGX High-Low Temperature Vacuum Semi-automatic Probe Station.jpg";
import analysisImage from "../assests/High And Low Temperature Analysis Probe Station.jpg";
import faSeriesImage from "../assests/FA Series Failure Analysis Probe Station.jpg";
import eSeriesImage from "../assests/E Series 150mm Economical Manual Probe Station.jpg";
import mSeriesImage from "../assests/M Series Basics Manual Probe Station.jpg";
import tegImage from "../assests/TEG Panel Laser Probe Station.jpg";
import probeCardImage from "../assests/probe_card.png";
import chuckImage from "../assests/High and low temperature chuck.jpg";
import micropositionerImage from "../assests/Micropositioner.jpg";
import holderImage from "../assests/Coaxial Probe Holder.jpg";
import probeImage from "../assests/probe.jpg";
import rfProbeImage from "../assests/RFprobe.jpg";
import adapterImage from "../assests/adapter.jpg";
import vibrationTableImage from "../assests/Air-floating automatic balance anti-vibration table.jpg";
import "./ProbeStationPage.css";

type Product = {
  id: string;
  title: string;
  category: "Probe Station" | "Accessories";
  description: string;
  image: string;
  specs: string[];
  highlights: string[];
};

const products: Product[] = [
  {
    id: "a-series",
    title: "A Series Full Automatic Probe Station",
    category: "Probe Station",
    description:
      "A production-ready automatic platform for wafer-level electrical probing, high-throughput device characterization, and repeatable semiconductor test workflows.",
    image: automaticProbeImage,
    specs: ["Automated wafer alignment", "Precision motion control", "Recipe-driven probing", "High-volume test support"],
    highlights: ["Full automation", "Stable contact force", "Wafer map workflow"],
  },
  {
    id: "x-series",
    title: "X Series Semi-Automatic Probe Station",
    category: "Probe Station",
    description:
      "A flexible semi-automatic station for R&D and pilot-line testing where operator control, positioning speed, and test accuracy need to work together.",
    image: xSeriesImage,
    specs: ["Semi-automatic XY stage", "Microscope-ready bridge", "Device and wafer probing", "Modular accessory support"],
    highlights: ["R&D friendly", "Fast setup", "Upgradeable platform"],
  },
  {
    id: "v-series",
    title: "V Series New Generation High Performance Probe Station",
    category: "Probe Station",
    description:
      "A high-performance platform built for advanced semiconductor analysis, fine-pitch probing, and demanding electrical measurement environments.",
    image: vSeriesImage,
    specs: ["High rigidity frame", "Fine-pitch positioning", "Low-vibration structure", "Advanced measurement integration"],
    highlights: ["High precision", "Premium stability", "Advanced analysis"],
  },
  {
    id: "cgx-series",
    title: "CGX High-Low Temperature Vacuum Semi-automatic Probe Station",
    category: "Probe Station",
    description:
      "A semi-automatic vacuum probing system designed for controlled high-low temperature device evaluation across sensitive wafer and package workflows.",
    image: cgxImage,
    specs: ["Vacuum-compatible chamber", "High-low temperature operation", "Semi-automatic probing", "Environmental test support"],
    highlights: ["Vacuum capable", "Thermal testing", "Controlled chamber"],
  },
  {
    id: "temperature-vacuum",
    title: "High And Low Temperature Vacuum Probe Station",
    category: "Probe Station",
    description:
      "A vacuum probe station configured for temperature-dependent semiconductor measurements where atmospheric isolation and thermal stability are critical.",
    image: probeCardImage,
    specs: ["Vacuum test environment", "Thermal chuck compatibility", "Low-leakage probing", "Configurable microscope options"],
    highlights: ["Thermal vacuum", "Low leakage", "Device reliability"],
  },
  {
    id: "temperature-analysis",
    title: "High And Low Temperature Analysis Probe Station",
    category: "Probe Station",
    description:
      "An analysis-focused probe station for device behavior studies across temperature ranges, ideal for parameter extraction and failure investigation.",
    image: analysisImage,
    specs: ["Temperature analysis workflow", "Stable platen architecture", "Manual or assisted probing", "Optical inspection support"],
    highlights: ["Analysis grade", "Thermal range", "Inspection ready"],
  },
  {
    id: "fa-series",
    title: "FA Series Failure Analysis Probe Station",
    category: "Probe Station",
    description:
      "A dedicated failure-analysis platform for locating, probing, and validating semiconductor defects with strong optical access and precise control.",
    image: faSeriesImage,
    specs: ["Failure analysis configuration", "Microscope integration", "Fine motion controls", "Package and die support"],
    highlights: ["FA workflow", "Precise localization", "Deep inspection"],
  },
  {
    id: "h-series",
    title: "H Series Integrated Manual Probe Station",
    category: "Probe Station",
    description:
      "An integrated manual station for routine electrical characterization, education, and lab-scale wafer or package measurements.",
    image: probeCardImage,
    specs: ["Integrated manual platform", "Compact bench footprint", "Stable stage movement", "Accessory-ready design"],
    highlights: ["Manual control", "Integrated frame", "Lab efficient"],
  },
  {
    id: "e-series",
    title: "E Series 150mm Economical Manual Probe Station",
    category: "Probe Station",
    description:
      "A cost-efficient 150 mm manual probe station for everyday semiconductor testing while preserving mechanical stability and upgrade flexibility.",
    image: eSeriesImage,
    specs: ["Up to 150 mm wafer support", "Manual stage operation", "Economical configuration", "Educational and R&D use"],
    highlights: ["150 mm support", "Value focused", "Easy operation"],
  },
  {
    id: "m-series",
    title: "M Series Basics Manual Probe Station",
    category: "Probe Station",
    description:
      "A practical manual probing system for foundational measurements, component checks, and compact semiconductor laboratory environments.",
    image: mSeriesImage,
    specs: ["Basic manual probing", "Small lab footprint", "Simple accessory mounting", "Stable mechanical base"],
    highlights: ["Entry platform", "Compact", "Reliable basics"],
  },
  {
    id: "teg-panel",
    title: "TEG Panel Laser Probe Station",
    category: "Probe Station",
    description:
      "A laser-oriented probe station for TEG panel inspection and electrical access where optical alignment and probing accuracy are both required.",
    image: tegImage,
    specs: ["TEG panel workflow", "Laser alignment support", "Large-area inspection", "Probe and optical coordination"],
    highlights: ["TEG panels", "Laser workflow", "Panel inspection"],
  },
  {
    id: "temperature-chuck",
    title: "Temperature Chuck",
    category: "Accessories",
    description:
      "A thermal chuck accessory for stable device characterization over controlled temperature conditions during wafer and package probing.",
    image: chuckImage,
    specs: ["High-low temperature control", "Uniform thermal contact", "Probe station integration", "Stable setpoint operation"],
    highlights: ["Thermal control", "Uniformity", "Stable contact"],
  },
  {
    id: "micropositioner",
    title: "Micropositioner",
    category: "Accessories",
    description:
      "A precision positioning module for accurate probe placement, smooth travel, and repeatable contact on fine device pads.",
    image: micropositionerImage,
    specs: ["Fine XYZ movement", "Low backlash feel", "Probe holder compatibility", "Stable mounting base"],
    highlights: ["Fine control", "Repeatability", "Smooth travel"],
  },
  {
    id: "probe-holder",
    title: "Probe Holder",
    category: "Accessories",
    description:
      "A robust holder platform for reliable probe mounting, contact angle control, and repeatable mechanical alignment.",
    image: holderImage,
    specs: ["Coaxial and triaxial options", "Angle adjustment", "Secure probe mounting", "Low-drift contact geometry"],
    highlights: ["Secure mount", "Angle control", "Low drift"],
  },
  {
    id: "probe",
    title: "Probe",
    category: "Accessories",
    description:
      "Precision probing tips for semiconductor pad contact, DC measurements, and lab characterization workflows.",
    image: probeImage,
    specs: ["Multiple tip options", "Fine pad access", "Stable electrical contact", "Compatible holder formats"],
    highlights: ["Fine tips", "DC probing", "Stable contact"],
  },
  {
    id: "rf-probe",
    title: "Radiofrequency Probe",
    category: "Accessories",
    description:
      "RF probing hardware for high-frequency wafer-level measurements with controlled signal integrity and repeatable pad contact.",
    image: rfProbeImage,
    specs: ["RF signal probing", "High-frequency compatibility", "Ground-signal configurations", "Probe station integration"],
    highlights: ["RF ready", "Signal integrity", "Wafer-level testing"],
  },
  {
    id: "adapter",
    title: "Adapter",
    category: "Accessories",
    description:
      "Mechanical and electrical adapter options for extending probe station compatibility across accessories, fixtures, and measurement setups.",
    image: adapterImage,
    specs: ["Fixture adaptation", "Accessory compatibility", "Measurement setup support", "Durable mechanical interface"],
    highlights: ["Flexible fit", "Setup support", "Durable interface"],
  },
  {
    id: "anti-vibration-table",
    title: "Air-floating Automatic Balance Anti-vibration Table",
    category: "Accessories",
    description:
      "An air-floating isolation table that improves probing stability by reducing floor vibration and maintaining a balanced measurement surface.",
    image: vibrationTableImage,
    specs: ["Air-floating isolation", "Automatic balance support", "Low-vibration surface", "Precision instrument base"],
    highlights: ["Vibration isolation", "Auto balance", "Stable measurements"],
  },
];

const categoryIcons = {
  "Probe Station": Cpu,
  Accessories: Move3D,
};

export default function ProbeStationPage() {
  const [activeId, setActiveId] = useState(products[0].id);
  const [openCategories, setOpenCategories] = useState<Record<Product["category"], boolean>>({
    "Probe Station": true,
    Accessories: true,
  });

  const activeProduct = useMemo(
    () => products.find((product) => product.id === activeId) ?? products[0],
    [activeId],
  );

  const groupedProducts = useMemo(
    () => ({
      "Probe Station": products.filter((product) => product.category === "Probe Station"),
      Accessories: products.filter((product) => product.category === "Accessories"),
    }),
    [],
  );

  return (
    <main className="probe-page">
      <header className="probe-topbar">
        <Link className="probe-back-link" to="/">
          <ChevronLeft size={18} />
          Home
        </Link>
        <Link className="probe-brand" to="/" aria-label="SCS Technologies home">
          <img src={logoImage} alt="SCS Technologies" />
          <span>SCS Technologies</span>
        </Link>
      </header>

      <section className="probe-hero">
        <div>
          <span className="probe-kicker">Semiconductor Test and Assembly</span>
          <h1>Probe Station System & Accessories</h1>
          <p>
            Precision wafer probing platforms, thermal-vacuum configurations, failure-analysis stations,
            and measurement accessories for semiconductor laboratories and production test teams.
          </p>
        </div>
        <div className="probe-hero-panel" aria-hidden="true">
          <Gauge />
          <span>Wafer-level measurement ecosystem</span>
        </div>
      </section>

      <section className="probe-shell" aria-label="Probe station product explorer">
        <aside className="probe-sidebar">
          {Object.entries(groupedProducts).map(([category, categoryProducts]) => {
            const typedCategory = category as Product["category"];
            const Icon = categoryIcons[typedCategory];
            const isOpen = openCategories[typedCategory];

            return (
              <div className="probe-sidebar-group" key={category}>
                <button
                  className="probe-sidebar-category"
                  type="button"
                  onClick={() =>
                    setOpenCategories((current) => ({
                      ...current,
                      [typedCategory]: !current[typedCategory],
                    }))
                  }
                  aria-expanded={isOpen}
                >
                  <span>
                    <Icon size={18} />
                    {category}
                  </span>
                  <ChevronDown className={isOpen ? "is-open" : ""} size={18} />
                </button>

                <div className={`probe-sidebar-items ${isOpen ? "is-open" : ""}`}>
                  {categoryProducts.map((product) => (
                    <button
                      type="button"
                      className={`probe-sidebar-item ${product.id === activeId ? "is-active" : ""}`}
                      key={product.id}
                      onClick={() => setActiveId(product.id)}
                    >
                      {product.title}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </aside>

        <article className="probe-content-card" key={activeProduct.id}>
          <div className="probe-content-copy">
            <span className="probe-content-category">{activeProduct.category}</span>
            <h2>{activeProduct.title}</h2>
            <p>{activeProduct.description}</p>

            <div className="probe-highlights">
              {activeProduct.highlights.map((highlight) => (
                <span key={highlight}>{highlight}</span>
              ))}
            </div>
          </div>

          <div className="probe-product-visual">
            <img src={activeProduct.image} alt={activeProduct.title} />
          </div>

          <div className="probe-spec-grid">
            <section>
              <h3>
                <Layers size={18} />
                Technical Focus
              </h3>
              <ul>
                {activeProduct.specs.map((spec) => (
                  <li key={spec}>{spec}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3>
                <Microscope size={18} />
                Application Fit
              </h3>
              <p>
                Built for semiconductor device probing, wafer-level characterization, package analysis,
                and precision lab workflows that require dependable mechanical and electrical stability.
              </p>
            </section>

            <section>
              <h3>
                {activeProduct.category === "Accessories" ? <Thermometer size={18} /> : <Snowflake size={18} />}
                Integration
              </h3>
              <p>
                Designed to pair with modular optics, probe holders, chucks, RF measurement chains,
                and vibration-controlled work surfaces as project requirements evolve.
              </p>
            </section>
          </div>
        </article>
      </section>
    </main>
  );
}

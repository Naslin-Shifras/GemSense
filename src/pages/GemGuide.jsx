
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Compass,
  Database,
  Droplets,
  Eye,
  Gem,
  Globe2,
  Info,
  Layers3,
  Lightbulb,
  Microscope,
  RotateCcw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Target,
  X,
} from "lucide-react";
import PageTransition from "../components/common/PageTransition";

// Add images with these exact filenames to src/assets/.
// The page still works if an image has not been added yet.
const imageModules = import.meta.glob(
  "../assets/*.{png,jpg,jpeg,webp,avif}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const getImage = (filename) =>
  imageModules[`../assets/${filename}`] || null;

const GEMS = [
  {
    id: "blue-sapphire",
    name: "Blue Sapphire",
    category: "Sapphire",
    family: "Corundum",
    hardness: "9",
    colour: "Light blue to deep royal blue",
    image: "gem-blue-sapphire.png",
    glow: "rgba(59,130,246,.32)",
    accent: "#80B5FF",
    short: "The timeless blue gemstone.",
    description:
      "Blue sapphire is a variety of corundum admired for its remarkable blue colour and durability. Sri Lanka is internationally associated with fine blue sapphires.",
    value:
      "Colour quality, clarity, cut, carat weight, treatment and documented origin can all influence market value.",
    treatment:
      "Heat treatment is encountered in the sapphire trade. Treatment status should be disclosed and may require professional testing.",
    care:
      "Sapphire is durable, but care requirements depend on its treatment and setting. Avoid harsh chemicals and seek professional advice for uncertain treatments.",
    sriLanka:
      "An important gemstone associated with Sri Lanka's gem trade.",
  },
  {
    id: "ruby",
    name: "Ruby",
    category: "Corundum",
    family: "Corundum",
    hardness: "9",
    colour: "Pinkish red to deep red",
    image: "gem-ruby.png",
    glow: "rgba(244,63,94,.29)",
    accent: "#FF8399",
    short: "The brilliance of red.",
    description:
      "Ruby is the red variety of corundum. Its appearance and market value are strongly influenced by colour, transparency, cut and treatment.",
    value:
      "Colour, clarity, size, cut, treatment and supporting documentation are important considerations.",
    treatment:
      "Rubies may be heated or subjected to other treatments. Treatment type matters and should be disclosed.",
    care:
      "Avoid exposing an unidentified or fracture-filled ruby to harsh cleaning methods. Obtain treatment-specific care advice.",
    sriLanka:
      "Ruby is among the gemstone varieties found in Sri Lanka.",
  },
  {
    id: "alexandrite",
    name: "Alexandrite",
    category: "Colour Change",
    family: "Chrysoberyl",
    hardness: "8.5",
    colour: "Often greenish in daylight and reddish in warm light",
    image: "gem-alexandrite.png",
    glow: "rgba(167,139,250,.3)",
    accent: "#C4A6FF",
    short: "A remarkable colour-changing gem.",
    description:
      "Alexandrite is a colour-change variety of chrysoberyl. Its appearance can change under different lighting conditions.",
    value:
      "Strength of colour change, colour quality, clarity, cut, size and treatment information are relevant.",
    treatment:
      "Ask for reliable identification and disclosure of any known treatments.",
    care:
      "Store separately from softer gems and avoid impacts or inappropriate cleaning.",
    sriLanka:
      "Sri Lanka is one of the countries associated with natural alexandrite.",
  },
  {
    id: "cats-eye",
    name: "Cat's Eye",
    category: "Optical Phenomenon",
    family: "Chrysoberyl",
    hardness: "8.5",
    colour: "Honey, yellowish green and other shades",
    image: "gem-cats-eye.png",
    glow: "rgba(245,190,80,.28)",
    accent: "#F5D38D",
    short: "A luminous line of light.",
    description:
      "Chrysoberyl cat's eye displays chatoyancy: a concentrated band of reflected light that resembles a cat's eye.",
    value:
      "The quality of the eye effect, body colour, transparency, size and overall appearance matter.",
    treatment:
      "Confirm that the stone is correctly identified as chrysoberyl cat's eye rather than another chatoyant material.",
    care:
      "Protect from knocks and store separately. Choose cleaning methods according to the stone and its treatment.",
    sriLanka:
      "Chrysoberyl cat's eye is a recognised part of Sri Lanka's gemstone trade.",
  },
  {
    id: "spinel",
    name: "Spinel",
    category: "Other Gems",
    family: "Spinel",
    hardness: "8",
    colour: "Red, pink, blue, violet and more",
    image: "gem-spinel.png",
    glow: "rgba(236,72,153,.27)",
    accent: "#F6A2D4",
    short: "A spectrum of extraordinary colour.",
    description:
      "Spinel is a distinct gemstone species available in a wide range of colours. Some historical gems once believed to be rubies were later identified as spinel.",
    value:
      "Colour, clarity, cut, size, treatment and market demand affect value.",
    treatment:
      "Request accurate identification and disclosure of any known treatment.",
    care:
      "Use gentle cleaning and protect the stone from impact.",
    sriLanka:
      "Spinel occurs among Sri Lanka's diverse gem materials.",
  },
  {
    id: "yellow-sapphire",
    name: "Yellow Sapphire",
    category: "Sapphire",
    family: "Corundum",
    hardness: "9",
    colour: "Pale yellow to vivid golden yellow",
    image: "gem-yellow-sapphire.png",
    glow: "rgba(250,204,21,.27)",
    accent: "#F9DB80",
    short: "Golden brilliance in every facet.",
    description:
      "Yellow sapphire is a yellow variety of corundum valued for its colour, durability and visual appeal.",
    value:
      "Hue, tone, saturation, clarity, cut, size and treatment information influence valuation.",
    treatment:
      "Ask whether the sapphire has undergone heating or other colour-related treatment.",
    care:
      "Generally durable, but treatment and jewellery setting can affect suitable cleaning methods.",
    sriLanka:
      "Yellow sapphire is among the coloured sapphires associated with Sri Lanka.",
  },
  {
    id: "pink-sapphire",
    name: "Pink Sapphire",
    category: "Sapphire",
    family: "Corundum",
    hardness: "9",
    colour: "Soft pink to vivid pink",
    image: "gem-pink-sapphire.png",
    glow: "rgba(244,114,182,.28)",
    accent: "#F9A8D4",
    short: "A softer expression of corundum.",
    description:
      "Pink sapphire is a pink variety of corundum admired for its range of delicate to vivid colours.",
    value:
      "Colour quality, clarity, cut, carat weight and treatment affect value.",
    treatment:
      "Treatment disclosure is important when evaluating coloured sapphires.",
    care:
      "Protect jewellery from impacts and use cleaning methods suitable for the treatment and setting.",
    sriLanka:
      "Pink sapphire is part of Sri Lanka's coloured gemstone heritage.",
  },
  {
    id: "garnet",
    name: "Garnet",
    category: "Other Gems",
    family: "Garnet group",
    hardness: "Approximately 6.5–7.5",
    colour: "Red, orange, green, purple and more",
    image: "gem-garnet.png",
    glow: "rgba(225,29,72,.26)",
    accent: "#FDA4AF",
    short: "More than a single shade of red.",
    description:
      "Garnet is a group of related minerals with varied colours and properties. Different garnet varieties can have very different market characteristics.",
    value:
      "Correct variety identification, colour, clarity, size and cut are important.",
    treatment:
      "Treatment and identification information should be checked for the specific garnet variety.",
    care:
      "Because hardness and durability vary, avoid assuming every garnet can be cleaned in the same way.",
    sriLanka:
      "Garnet varieties are part of the island's diverse gem resources.",
  },
  {
    id: "topaz",
    name: "Topaz",
    category: "Other Gems",
    family: "Topaz",
    hardness: "8",
    colour: "Colourless, blue, yellow, pink and more",
    image: "gem-topaz.png",
    glow: "rgba(56,189,248,.27)",
    accent: "#7DD3FC",
    short: "Clarity and colour in harmony.",
    description:
      "Topaz occurs in multiple colours. Its value and care requirements depend on colour, treatment, cut and other characteristics.",
    value:
      "Colour, clarity, size, cut and treatment disclosure matter.",
    treatment:
      "Some commercially available blue topaz is produced through irradiation and heating. Ask about treatment.",
    care:
      "Topaz has perfect cleavage and can be vulnerable to sharp impacts despite its hardness.",
    sriLanka:
      "Topaz is among the gemstone materials associated with Sri Lanka.",
  },
];

const FACTORS = [
  {
    id: "type",
    number: "01",
    title: "Gemstone Type",
    icon: Gem,
    subtitle: "Identity shapes the market.",
    description:
      "The mineral species or variety provides the starting point for valuation. Different gems have different optical properties, availability and market demand.",
    tip: "Correct identification is essential before comparing prices.",
  },
  {
    id: "colour",
    number: "02",
    title: "Colour",
    icon: Sun,
    subtitle: "The character of a gemstone.",
    description:
      "Colour is described through hue, tone and saturation. Desirable colour characteristics vary between gemstone varieties.",
    tip: "Compare gemstones under appropriate, consistent lighting.",
  },
  {
    id: "clarity",
    number: "03",
    title: "Clarity",
    icon: Eye,
    subtitle: "What lies beneath the surface.",
    description:
      "Clarity concerns internal inclusions and external blemishes. Expectations differ by gemstone type; some inclusions can also help with identification.",
    tip: "Clarity should be assessed in the context of the specific gemstone.",
  },
  {
    id: "carat",
    number: "04",
    title: "Carat Weight",
    icon: Layers3,
    subtitle: "Weight, not visual size.",
    description:
      "Carat measures weight, with one carat equal to 0.2 grams. Larger gems may command a higher price per carat, but this is not universal.",
    tip: "Two gemstones of equal carat weight can have different dimensions and values.",
  },
  {
    id: "cut",
    number: "05",
    title: "Cut Quality",
    icon: Sparkles,
    subtitle: "The art of revealing light.",
    description:
      "Cut, proportions, symmetry and polish influence the gem's appearance. A suitable cut can enhance colour and visual appeal.",
    tip: "Evaluate the face-up appearance, not just the cut name.",
  },
  {
    id: "treatment",
    number: "06",
    title: "Treatment Status",
    icon: ShieldCheck,
    subtitle: "Transparency matters.",
    description:
      "Some gemstones undergo treatments to change their appearance. The type, permanence and disclosure of treatment can affect market value.",
    tip: "Ask for treatment information and professional documentation when needed.",
  },
];

const FAQS = [
  {
    q: "What determines the value of a gemstone?",
    a: "Gem type, colour, clarity, carat weight, cut and treatment are important factors. Origin, documentation, market conditions and buyer demand can also influence actual selling prices.",
  },
  {
    q: "Does a larger gemstone always cost more?",
    a: "No. A larger gemstone may be worth less than a smaller one if its colour, clarity, cut or other characteristics are less desirable.",
  },
  {
    q: "Can GemSense AI authenticate a gemstone?",
    a: "No. GemSense AI uses characteristics supplied by the user to provide estimated market insights. It cannot physically identify a gemstone, detect undisclosed treatments or issue laboratory certification.",
  },
  {
    q: "What is the difference between natural and synthetic gemstones?",
    a: "Natural gemstones form through geological processes. Synthetic gemstones are produced in a laboratory and have essentially the same chemical composition and crystal structure as their natural counterparts.",
  },
  {
    q: "Does heat treatment always reduce value?",
    a: "No universal rule applies. The effect depends on the gemstone variety, treatment, quality, disclosure and market. Compare like-for-like stones when evaluating prices.",
  },
  {
    q: "How accurate is an AI gemstone price estimate?",
    a: "Accuracy depends on the training data, model performance, market conditions and correctness of user inputs. An AI estimate should not be treated as a guaranteed selling price or professional appraisal.",
  },
];

const BUYING_CHECKLIST = [
  "Confirm the gemstone's identity.",
  "Ask whether it has been treated.",
  "Review available laboratory documentation.",
  "Check colour, clarity, cut and carat weight.",
  "Compare prices for genuinely comparable gemstones.",
  "Use GemSense AI as an estimated price reference.",
  "Seek professional gemological advice when necessary.",
];

const COLLECTION_FILTERS = [
  "All",
  "Sapphire",
  "Corundum",
  "Colour Change",
  "Optical Phenomenon",
  "Other Gems",
];

function ImageOrGem({
  filename,
  name = "Gemstone",
  className = "",
  imgClassName = "",
  glow = "rgba(96,165,250,.22)",
}) {
  const [failed, setFailed] = useState(false);
  const src = getImage(filename);

  if (!src || failed) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden ${className}`}
        style={{
          background: `radial-gradient(circle at 50% 55%, ${glow}, transparent 60%), #101725`,
        }}
        role="img"
        aria-label={`${name} image placeholder`}
      >
        <Gem className="h-24 w-24 text-white/20" strokeWidth={0.8} />
        <span className="absolute bottom-4 text-[10px] uppercase tracking-[.25em] text-white/30">
          {name}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 60%, ${glow}, transparent 65%)`,
        }}
      />
      <img
        src={src}
        alt={name}
        onError={() => setFailed(true)}
        className={`relative h-full w-full object-contain ${imgClassName}`}
        loading="lazy"
      />
    </div>
  );
}

function SectionHeading({ eyebrow, title, description, centered = false }) {
  return (
    <div
      className={`mb-9 md:mb-12 ${
        centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"
      }`}
    >
      <div className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.26em] text-brand-purple/75">
        {!centered && <span className="h-px w-8 bg-brand-purple/50" />}
        <span>{eyebrow}</span>
      </div>
      <h2 className="font-serif text-3xl leading-tight text-white md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-sm leading-7 text-white/55 md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        reduceMotion ? false : { opacity: 0, y: 26 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function GemDetailModal({ gem, onClose }) {
  const [tab, setTab] = useState("Overview");

  if (!gem) return null;

  const tabs = ["Overview", "Properties", "Value", "Treatment", "Care"];

  const content = {
    Overview: gem.description,
    Properties: `${gem.name} belongs to ${gem.family}. Typical colours: ${gem.colour}. Mohs hardness: ${gem.hardness}.`,
    Value: gem.value,
    Treatment: gem.treatment,
    Care: gem.care,
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-xl md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="presentation"
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="gem-detail-title"
        initial={{ opacity: 0, y: 25, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[28px] border border-white/15 bg-[#0D1420] shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close gemstone details"
          className="absolute right-5 top-5 z-20 rounded-full border border-white/15 bg-black/40 p-2 text-white transition hover:bg-white/15"
        >
          <X size={19} />
        </button>

        <div className="grid lg:grid-cols-2">
          <div className="min-h-[290px] bg-[#111C2A] md:min-h-[440px]">
            <ImageOrGem
              filename={gem.image}
              name={gem.name}
              glow={gem.glow}
              className="h-full min-h-[290px] w-full md:min-h-[440px]"
              imgClassName="p-12 md:p-16"
            />
          </div>

          <div className="flex flex-col p-6 md:p-10">
            <span className="mb-4 text-xs uppercase tracking-[.25em] text-brand-purple/70">
              Gemstone Collection
            </span>

            <h3
              id="gem-detail-title"
              className="font-serif text-4xl text-white"
            >
              {gem.name}
            </h3>

            <p className="mt-3 text-sm text-white/50">
              {gem.family} · Mohs {gem.hardness}
            </p>

            <div className="mt-8 flex flex-wrap gap-2 border-b border-white/10 pb-4">
              {tabs.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTab(item)}
                  className={`rounded-full px-3 py-2 text-xs transition ${
                    tab === item
                      ? "bg-white text-white"
                      : "bg-white/5 text-white/55 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="min-h-[140px] py-6">
              <AnimatePresence mode="wait">
                <motion.p
                  key={tab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="text-sm leading-8 text-white/65"
                >
                  {content[tab]}
                </motion.p>
              </AnimatePresence>
            </div>

            <p className="mb-7 text-xs leading-6 text-white/40">
              {gem.sriLanka}
            </p>

            <Link
              to={`/predict?gem=${encodeURIComponent(gem.name)}`}
              className="btn-primary px-6 py-3"
            >
              Predict This Gem's Price
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const GemGuide = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedGem, setSelectedGem] = useState(null);
  const [openFactor, setOpenFactor] = useState("type");
  const [openFaq, setOpenFaq] = useState(null);
  const [checked, setChecked] = useState([]);
  const reduceMotion = useReducedMotion();

  const filteredGems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return GEMS.filter((gem) => {
      const matchesFilter =
        activeFilter === "All" || gem.category === activeFilter;

      const matchesSearch =
        !query ||
        [
          gem.name,
          gem.family,
          gem.colour,
          gem.description,
          gem.short,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [searchQuery, activeFilter]);

  const toggleCheck = (index) => {
    setChecked((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    );
  };

  const progress = Math.round(
    (checked.length / BUYING_CHECKLIST.length) * 100
  );

  return (
    <PageTransition>
      <div className="min-h-screen overflow-hidden bg-[#090F19] text-white">
        {/* HERO */}
        <section className="relative isolate flex min-h-[680px] items-center overflow-hidden border-b border-white/10 py-24 md:min-h-[760px]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,rgba(124,58,237,.22),transparent_50%),radial-gradient(ellipse_at_15%_85%,rgba(88,28,135,.15),transparent_45%)]" />

          <div className="pointer-events-none absolute inset-0 opacity-[.035] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:65px_65px]" />

          <div className="container relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
            <Reveal>
              <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-brand-purple/20 bg-brand-purple/5 px-4 py-2 text-[10px] font-semibold uppercase tracking-[.25em] text-brand-purple">
                <Sparkles size={14} />
                The Gemstone Knowledge Centre
              </div>

              <h1 className="max-w-2xl font-serif text-5xl leading-[1.08] tracking-tight md:text-6xl xl:text-7xl">
                Discover the Beauty.
                <br />
                <span className="bg-gradient-to-r from-brand-purple-light to-brand-purple bg-clip-text text-transparent">
                  Understand the Value.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-white/60 md:text-lg">
                Explore Sri Lanka's extraordinary gemstones, discover
                the characteristics that influence their value, and
                learn how to make informed gemstone decisions.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#collection"
                  className="btn-primary px-7 py-3 text-base"
                >
                  Explore Gemstones
                  <ArrowRight size={17} />
                </a>

                <a
                  href="#valuation"
                  className="btn-outline px-7 py-3 text-base"
                >
                  Understand Value
                  <ArrowDown size={17} />
                </a>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-7 border-t border-white/10 pt-7 text-xs uppercase tracking-[.16em] text-white/40">
                <span>Gemstone Education</span>
                <span>Valuation Insights</span>
                <span>Sri Lankan Heritage</span>
              </div>
            </Reveal>

            <Reveal
              className="relative mx-auto flex w-full max-w-[580px] items-center justify-center"
              delay={0.15}
            >
              <div className="absolute h-[360px] w-[360px] rounded-full bg-brand-purple/15 blur-[100px] md:h-[470px] md:w-[470px]" />

              <div className="absolute inset-10 rounded-full border border-white/10" />
              <div className="absolute inset-20 rounded-full border border-white/5" />

              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : { y: [0, -14, 0], rotate: [0, 2, 0] }
                }
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 h-[350px] w-full md:h-[530px]"
              >
                <ImageOrGem
                  filename="guide-hero.png"
                  name="Blue sapphire"
                  glow="rgba(124,58,237,.25)"
                  className="h-full w-full"
                  imgClassName="p-5 drop-shadow-[0_30px_65px_rgba(124,58,237,.30)]"
                />
              </motion.div>

              <div className="absolute bottom-8 right-0 rounded-2xl border border-white/15 bg-[#111B29]/85 px-5 py-4 shadow-2xl backdrop-blur-xl md:right-4">
                <span className="block text-[10px] uppercase tracking-[.25em] text-brand-purple/70">
                  A closer look
                </span>
                <span className="mt-1 block font-serif text-xl">
                  The Art of Gemstones
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* COLLECTION */}
        <section
          id="collection"
          className="scroll-mt-24 py-24 md:py-32"
        >
          <div className="container mx-auto max-w-7xl px-6">
            <Reveal>
              <SectionHeading
                eyebrow="01 / Curated Collection"
                title="Nature's Most Extraordinary Creations."
                description="Explore distinctive gemstones and learn what makes each one remarkable. Select a gemstone to discover its properties, valuation considerations and care guidance."
              />
            </Reveal>

            <Reveal className="mb-8 flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[.035] p-4 md:p-5">
              <div className="relative">
                <Search
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                />
                <input
                  type="search"
                  aria-label="Search gemstones"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search gemstones, colours or properties..."
                  className="w-full rounded-xl border border-white/10 bg-[#0B1420] py-4 pl-12 pr-5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-brand-purple/45"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <SlidersHorizontal
                  size={16}
                  className="mr-2 text-white/40"
                />
                {COLLECTION_FILTERS.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-full border px-4 py-2 text-xs transition ${
                      activeFilter === filter
                        ? "border-brand-purple/60 bg-brand-purple/15 text-brand-purple-light"
                        : "border-white/10 bg-white/[.025] text-white/50 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </Reveal>

            <div className="mb-5 text-xs uppercase tracking-[.2em] text-white/35">
              Showing {filteredGems.length} gemstones
            </div>

            <motion.div
              layout
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filteredGems.map((gem) => (
                  <motion.button
                    layout
                    key={gem.id}
                    type="button"
                    onClick={() => setSelectedGem(gem)}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : { y: -7, rotateX: 2, rotateY: -2 }
                    }
                    transition={{ duration: 0.3 }}
                    style={{ perspective: 1000 }}
                    className="group overflow-hidden rounded-[26px] border border-white/10 bg-gradient-to-b from-[#152032] to-[#0D1521] text-left transition-colors hover:border-brand-purple/30"
                  >
                    <div className="relative h-64 overflow-hidden border-b border-white/5 md:h-72">
                      <ImageOrGem
                        filename={gem.image}
                        name={gem.name}
                        glow={gem.glow}
                        className="h-full w-full transition-transform duration-700 group-hover:scale-110"
                        imgClassName="p-9 transition-transform duration-700 group-hover:rotate-3"
                      />
                      <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-[10px] uppercase tracking-[.17em] text-white/70 backdrop-blur-md">
                        {gem.family}
                      </span>
                    </div>

                    <div className="p-6">
                      <h3 className="font-serif text-2xl text-white">
                        {gem.name}
                      </h3>
                      <p className="mt-2 text-sm text-white/45">
                        {gem.short}
                      </p>

                      <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
                        <span className="text-xs text-white/40">
                          Mohs {gem.hardness}
                        </span>
                        <span
                          className="inline-flex items-center gap-2 text-xs font-medium"
                          style={{ color: gem.accent }}
                        >
                          Discover Gem
                          <ArrowRight
                            size={16}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredGems.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/[.025] px-6 py-16 text-center">
                <Search className="mx-auto mb-4 text-white/30" />
                <h3 className="font-serif text-2xl">
                  No gemstones found
                </h3>
                <p className="mt-3 text-sm text-white/45">
                  Try a different search or reset your filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveFilter("All");
                  }}
                  className="mt-6 text-sm text-brand-purple hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* VALUATION */}
        <section
          id="valuation"
          className="scroll-mt-24 border-y border-white/10 bg-[#0E1724] py-24 md:py-32"
        >
          <div className="container mx-auto max-w-7xl px-6">
            <Reveal>
              <SectionHeading
                eyebrow="02 / The Science of Value"
                title="Six Characteristics. Endless Possibilities."
                description="GemSense AI uses six user-supplied gemstone characteristics as its core prediction inputs. Explore what each factor means before estimating a gemstone's market value."
              />
            </Reveal>

            <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
              <Reveal className="relative">
                <div className="sticky top-28 overflow-hidden rounded-[28px] border border-white/10 bg-[#101D2D]">
                  <ImageOrGem
                    filename="guide-valuation.png"
                    name="Gemstone valuation"
                    glow="rgba(20,184,166,.20)"
                    className="h-[330px] w-full md:h-[450px]"
                    imgClassName="p-8"
                  />
                  <div className="border-t border-white/10 p-7">
                    <span className="text-[10px] uppercase tracking-[.25em] text-brand-purple/65">
                      Understanding Value
                    </span>
                    <h3 className="mt-3 font-serif text-2xl">
                      More Than Meets the Eye.
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/50">
                      No single characteristic determines a gemstone's
                      value. Its qualities must be considered together
                      and in the context of the market.
                    </p>
                  </div>
                </div>
              </Reveal>

              <div className="space-y-3">
                {FACTORS.map((factor) => {
                  const Icon = factor.icon;
                  const isOpen = openFactor === factor.id;

                  return (
                    <Reveal key={factor.id}>
                      <div
                        className={`overflow-hidden rounded-2xl border transition-colors ${
                          isOpen
                            ? "border-brand-purple/30 bg-white/[.055]"
                            : "border-white/10 bg-white/[.025] hover:border-white/20"
                        }`}
                      >
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() =>
                            setOpenFactor(
                              isOpen ? null : factor.id
                            )
                          }
                          className="flex w-full items-center gap-4 p-5 text-left md:p-6"
                        >
                          <span className="text-xs text-brand-purple/55">
                            {factor.number}
                          </span>
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-brand-purple">
                            <Icon size={20} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-serif text-lg text-white md:text-xl">
                              {factor.title}
                            </span>
                            <span className="mt-1 block text-xs text-white/40">
                              {factor.subtitle}
                            </span>
                          </span>
                          <ChevronDown
                            size={18}
                            className={`shrink-0 text-white/50 transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 pb-6 pl-5 md:pl-[106px]">
                                <p className="text-sm leading-8 text-white/60">
                                  {factor.description}
                                </p>
                                <div className="mt-5 flex gap-3 rounded-xl border border-brand-purple/10 bg-brand-purple/[.045] p-4 text-xs leading-6 text-brand-purple-light/75">
                                  <Lightbulb
                                    size={17}
                                    className="mt-0.5 shrink-0"
                                  />
                                  <span>{factor.tip}</span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* NATURAL / TREATED / SYNTHETIC */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto max-w-7xl px-6">
            <Reveal>
              <SectionHeading
                eyebrow="03 / Know Your Gem"
                title="Understand What You're Buying."
                description="Origin and treatment are important parts of a gemstone's story. These terms describe different characteristics and should not be confused with one another."
              />
            </Reveal>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  number: "01",
                  title: "Natural",
                  icon: Globe2,
                  text: "A gemstone formed through natural geological processes.",
                  accent: "from-blue-500/20",
                },
                {
                  number: "02",
                  title: "Treated",
                  icon: Sparkles,
                  text: "A gemstone whose appearance or properties have been modified by a treatment. Natural gemstones can also be treated.",
                  accent: "from-brand-purple/20",
                },
                {
                  number: "03",
                  title: "Synthetic",
                  icon: Microscope,
                  text: "Laboratory-created material with essentially the same chemical composition and crystal structure as its natural counterpart.",
                  accent: "from-violet-500/20",
                },
                {
                  number: "04",
                  title: "Imitation",
                  icon: Layers3,
                  text: "A material made to resemble another gemstone without necessarily sharing its composition or structure.",
                  accent: "from-emerald-500/20",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <Reveal key={item.title}>
                    <motion.div
                      whileHover={
                        reduceMotion ? undefined : { y: -6 }
                      }
                      className={`h-full rounded-[24px] border border-white/10 bg-gradient-to-b ${item.accent} to-[#101824] p-7`}
                    >
                      <div className="flex items-center justify-between">
                        <Icon
                          size={27}
                          className="text-brand-purple"
                          strokeWidth={1.4}
                        />
                        <span className="text-xs text-white/25">
                          {item.number}
                        </span>
                      </div>
                      <h3 className="mt-12 font-serif text-2xl">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-white/55">
                        {item.text}
                      </p>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal className="mt-7 flex items-start gap-3 rounded-2xl border border-brand-purple/15 bg-brand-purple/[.04] p-5 text-sm leading-7 text-white/60">
              <Info
                size={19}
                className="mt-1 shrink-0 text-brand-purple"
              />
              <p>
                GemSense AI cannot authenticate a gemstone or detect
                undisclosed treatment from user-entered characteristics.
                Professional gemological testing may be required.
              </p>
            </Reveal>
          </div>
        </section>

        {/* HERITAGE */}
        <section className="border-y border-white/10 bg-[#0E1724] py-24 md:py-32">
          <div className="container mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[#142033]">
                <ImageOrGem
                  filename="guide-heritage.png"
                  name="Sri Lankan gemstone heritage"
                  glow="rgba(147,51,234,.16)"
                  className="h-[350px] w-full md:h-[540px]"
                  imgClassName="object-cover"
                />
              </div>
            </Reveal>

            <Reveal>
              <div className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[.25em] text-brand-purple/70">
                <span className="h-px w-8 bg-brand-purple/50" />
                04 / Our Heritage
              </div>

              <h2 className="font-serif text-4xl leading-tight md:text-5xl">
                Born from the
                <br />
                <span className="text-brand-purple">
                  Island of Gems.
                </span>
              </h2>

              <p className="mt-7 text-sm leading-8 text-white/60 md:text-base">
                Sri Lanka has a rich gemstone heritage, renowned for
                sapphires and a diverse range of gem materials.
                Ratnapura is especially associated with the country's
                longstanding gemstone industry.
              </p>

              <p className="mt-5 text-sm leading-8 text-white/60 md:text-base">
                GemSense AI draws inspiration from this heritage and
                explores how modern data science can support accessible
                gemstone knowledge and estimated market insights.
              </p>

              <div className="mt-9 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/[.035] p-5">
                  <Compass className="mb-4 text-brand-purple" />
                  <h3 className="font-serif text-lg">
                    Local Heritage
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-white/45">
                    Inspired by Sri Lanka's gem trade.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[.035] p-5">
                  <Database className="mb-4 text-brand-purple" />
                  <h3 className="font-serif text-lg">
                    Modern Insights
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-white/45">
                    Exploring data-driven valuation.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* BUYING GUIDE */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="05 / Buy with Knowledge"
                title="A Smarter Way to Approach Every Purchase."
                description="Whether you are exploring your first gemstone or comparing a seller's quotation, a few careful checks can help you ask better questions."
              />

              <div className="rounded-2xl border border-white/10 bg-white/[.035] p-6">
                <ShieldCheck
                  size={30}
                  className="text-emerald-300"
                />
                <h3 className="mt-5 font-serif text-xl">
                  Knowledge Before Commitment.
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/50">
                  An AI estimate is one source of information. Gemstone
                  identity, treatment, documentation and professional
                  advice remain important.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="rounded-[28px] border border-white/10 bg-gradient-to-b from-[#162333] to-[#0F1825] p-6 md:p-9">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-[.2em] text-brand-purple/65">
                      Interactive Checklist
                    </span>
                    <h3 className="mt-3 font-serif text-2xl md:text-3xl">
                      Before You Buy
                    </h3>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60">
                    {checked.length}/{BUYING_CHECKLIST.length}
                  </span>
                </div>

                <div className="mt-7 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-brand-purple-light to-brand-purple"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.35 }}
                  />
                </div>

                <div className="mt-7 space-y-3">
                  {BUYING_CHECKLIST.map((item, index) => {
                    const isChecked = checked.includes(index);

                    return (
                      <button
                        key={item}
                        type="button"
                        aria-pressed={isChecked}
                        onClick={() => toggleCheck(index)}
                        className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition ${
                          isChecked
                            ? "border-emerald-400/30 bg-emerald-400/[.07]"
                            : "border-white/10 bg-white/[.025] hover:border-white/20"
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                            isChecked
                              ? "border-emerald-300 bg-emerald-300 text-[#10201C]"
                              : "border-white/30"
                          }`}
                        >
                          {isChecked && <Check size={13} />}
                        </span>
                        <span
                          className={`text-sm leading-6 ${
                            isChecked
                              ? "text-white/75"
                              : "text-white/55"
                          }`}
                        >
                          {item}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-7 flex items-center justify-between gap-3">
                  <span className="text-xs text-white/40">
                    {progress}% completed
                  </span>
                  <button
                    type="button"
                    onClick={() => setChecked([])}
                    className="inline-flex items-center gap-2 text-xs text-white/50 transition hover:text-white"
                  >
                    <RotateCcw size={14} />
                    Reset
                  </button>
                </div>

                {checked.length === BUYING_CHECKLIST.length && (
                  <div className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-200">
                    <CheckCircle2 size={18} />
                    Checklist complete. Continue with informed care.
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        {/* CARE */}
        <section className="border-y border-white/10 bg-[#0E1724] py-24 md:py-32">
          <div className="container mx-auto max-w-7xl px-6">
            <Reveal>
              <SectionHeading
                eyebrow="06 / Gemstone Care"
                title="Preserve the Beauty."
                description="Different gemstones and treatments require different care. These general precautions can help you know what to ask before cleaning or storing a stone."
              />
            </Reveal>

            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  icon: Droplets,
                  title: "Gentle Cleaning",
                  text: "Avoid harsh chemicals and unfamiliar cleaning methods. Check the gemstone's identity and treatment before cleaning.",
                },
                {
                  icon: ShieldCheck,
                  title: "Thoughtful Storage",
                  text: "Store gemstones separately where practical to reduce scratches and accidental impacts.",
                },
                {
                  icon: Sun,
                  title: "Heat & Light Awareness",
                  text: "Some gemstones and treatments are sensitive to heat or prolonged light exposure. Follow gemstone-specific care advice.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <Reveal key={item.title}>
                    <div className="h-full rounded-[24px] border border-white/10 bg-white/[.03] p-7">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-purple/15 bg-brand-purple/[.06] text-brand-purple">
                        <Icon size={25} strokeWidth={1.5} />
                      </div>
                      <h3 className="mt-8 font-serif text-2xl">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-white/50">
                        {item.text}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto max-w-4xl px-6">
            <Reveal>
              <SectionHeading
                eyebrow="07 / Questions & Answers"
                title="Curiosity Is Where Understanding Begins."
                description="Explore common questions about gemstone characteristics, treatment, buying and AI-assisted valuation."
                centered
              />
            </Reveal>

            <div className="space-y-3">
              {FAQS.map((item, index) => {
                const isOpen = openFaq === index;

                return (
                  <Reveal key={item.q}>
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[.03]">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() =>
                          setOpenFaq(isOpen ? null : index)
                        }
                        className="flex w-full items-center justify-between gap-4 p-5 text-left md:p-6"
                      >
                        <span className="flex items-center gap-4">
                          <CircleHelp
                            size={19}
                            className="shrink-0 text-brand-purple/75"
                          />
                          <span className="font-medium text-white/85">
                            {item.q}
                          </span>
                        </span>
                        <ChevronDown
                          size={18}
                          className={`shrink-0 text-white/40 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="px-5 pb-6 text-sm leading-8 text-white/55 md:pl-[63px] md:pr-8">
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="px-6 pb-24 md:pb-32">
          <Reveal className="container relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-brand-purple/20 bg-[#142031] px-7 py-20 text-center md:px-16 md:py-28">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(124,58,237,.22),transparent_60%),radial-gradient(ellipse_at_50%_0%,rgba(147,51,234,.16),transparent_50%)]" />

            <div className="relative">
              <Gem
                size={37}
                strokeWidth={1.2}
                className="mx-auto mb-7 text-brand-purple"
              />

              <span className="text-xs uppercase tracking-[.3em] text-brand-purple/70">
                Continue Your Journey
              </span>

              <h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
                Knowledge Is the First Step.
                <br />
                <span className="text-brand-purple">
                  Intelligence Is the Next.
                </span>
              </h2>

              <p className="mx-auto mt-7 max-w-xl text-sm leading-8 text-white/55 md:text-base">
                Turn your gemstone knowledge into estimated market
                insights, or explore your questions with GemSense AI
                Advisor.
              </p>

              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <Link
                  to="/predict"
                  className="btn-primary px-7 py-3 text-base"
                >
                  Predict Gem Price
                  <ArrowRight size={17} />
                </Link>

                <Link
                  to="/ai-advisor"
                  className="btn-outline px-7 py-3 text-base"
                >
                  <Sparkles size={17} />
                  Ask AI Advisor
                </Link>
              </div>

              <p className="mx-auto mt-9 max-w-2xl text-xs leading-6 text-white/35">
                GemSense AI provides estimated market information and
                educational guidance. It does not replace professional
                gemstone identification, laboratory certification or
                gemological valuation.
              </p>
            </div>
          </Reveal>
        </section>
      </div>

      <AnimatePresence>
        {selectedGem && (
          <GemDetailModal
            key={selectedGem.id}
            gem={selectedGem}
            onClose={() => setSelectedGem(null)}
          />
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default GemGuide;
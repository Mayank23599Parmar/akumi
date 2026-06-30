import { useEffect, useRef, useState } from 'react';
import './index.css';

/* ─────────────────────────────
   BRAND ASSETS
───────────────────────────── */
const LOGO = process.env.PUBLIC_URL + '/images/logo/logo.jpg';

/* Actual Akumi product images from /sections/ */
const BRAND = {
  logo_icon: process.env.PUBLIC_URL + '/ig1.jpg',     // pure icon mark
  detail_hem: process.env.PUBLIC_URL + '/ig2.jpg',    // hem detail dark tee
  tee_front:  process.env.PUBLIC_URL + '/ig3.jpg',    // tee front black
  jogger_pocket: process.env.PUBLIC_URL + '/ig4.jpg', // jogger pocket detail
  set_back:   process.env.PUBLIC_URL + '/ig5.jpg',    // tee + shorts flatlay back
  set_front:  process.env.PUBLIC_URL + '/ig6.jpg',    // tee + shorts flatlay front
  tee_tag:    process.env.PUBLIC_URL + '/ig7.jpg',    // tee neck label detail
  tee_white:  process.env.PUBLIC_URL + '/ig8.jpg',    // white logo tee
};

/* Unsplash – free, no key needed, brand-matched lifestyle imagery */
const U = {
  hero_man:      'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=1400&q=85&auto=format&fit=crop',
  hero_woman:    'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=1400&q=85&auto=format&fit=crop',
  man_running:   'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80&auto=format&fit=crop',
  man_lifestyle: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80&auto=format&fit=crop',
  woman_sport:   'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80&auto=format&fit=crop',
  woman_casual:  'https://images.unsplash.com/photo-1564218419776-9e1c9d2afcf4?w=800&q=80&auto=format&fit=crop',
  cotton_field:  'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1400&q=85&auto=format&fit=crop',
  ocean_wave:    'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1400&q=85&auto=format&fit=crop',
  california:    'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1400&q=85&auto=format&fit=crop',
  gym_lifestyle: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80&auto=format&fit=crop',
  street_style:  'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=800&q=80&auto=format&fit=crop',
  woman_run:     'https://images.unsplash.com/photo-1483721310020-03333e577078?w=800&q=80&auto=format&fit=crop',
};

/* ─────────────────────────────
   SVG ICON LIBRARY — zero emojis
───────────────────────────── */
const Icons = {
  ArrowRight: ({ size = 16, ...p }) => (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  ),
  Search: ({ size = 20 }) => (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/>
    </svg>
  ),
  User: ({ size = 20 }) => (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Bag: ({ size = 20 }) => (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  ),
  Menu: ({ size = 22 }) => (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  Truck: ({ size = 22 }) => (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/>
      <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  ),
  Leaf: ({ size = 22 }) => (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
  ),
  Return: ({ size = 22 }) => (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
    </svg>
  ),
  Lock: ({ size = 22 }) => (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Instagram: ({ size = 18 }) => (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  Star: ({ size = 14, filled = true }) => (
    <svg width={size} height={size} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  Plus: ({ size = 16 }) => (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Check: ({ size = 14 }) => (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Zap: ({ size = 22 }) => (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Wind: ({ size = 22 }) => (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
    </svg>
  ),
  Facebook: ({ size = 18 }) => (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  Twitter: ({ size = 18 }) => (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
    </svg>
  ),
  Linkedin: ({ size = 18 }) => (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  Tumblr: ({ size = 18 }) => (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M14.5 15h5v4c-1.5 1-3.5 1-5 1-3.5 0-5.5-2.5-5.5-6V9H6V6h3V2h3v4h4v3h-4v4c0 1.5.5 2 2 2h2.5z"/>
    </svg>
  ),
  Shopify: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor">
      <path d="M26.4 8.3c-.3-.2-1.2-.6-1.8-.7l-4.4-1.2c-.3-.1-.7-.1-1 0L10.3 9.4c-.6.2-.9.8-.7 1.4L12.5 22l8.8 8.4c.5.5 1.3.5 1.8.1l6.1-5.4c.4-.4.6-1 .4-1.6l-3.2-15.2zm-12 1.9l6.5-2 2.6.7 1.9 9.3-9.5-2-1.5-6zM8.8 10.9L7.5 24.5c0 .5.3 1 .8 1.1l3.5 1.1-.9-9-2.1-6.8z"/>
    </svg>
  )
};

/* ─────────────────────────────
   FADE-UP HOOK
───────────────────────────── */
function useFadeUp() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ═══════════════════════════════════════
   ANNOUNCEMENT BAR
═══════════════════════════════════════ */
const announceItems = [
  <><em>Free Shipping</em>{" on all orders over $75"}</>,
  <>100% Recycled Cotton — made differently</>,
  <><em>New Drop:</em>{" Summer Essentials now live"}</>,
  <>California-Inspired Premium Activewear</>,
  <>{"Stay Active in Style. "}<em>Shop Akumi</em></>,
  <><em>Free Shipping</em>{" on all orders over $75"}</>,
  <>100% Recycled Cotton — made differently</>,
  <><em>New Drop:</em>{" Summer Essentials now live"}</>,
  <>California-Inspired Premium Activewear</>,
  <>{"Stay Active in Style. "}<em>Shop Akumi</em></>,
];

const AnnouncementBar = () => (
  <div className="ak-announce" role="marquee" aria-label="Site announcements">
    <div className="ak-announce-track">
      {announceItems.map((item, i) => (
        <span key={i}>{item}<span className="ak-sep"> · </span></span>
      ))}
    </div>
  </div>
);

/* ═══════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════ */
const Nav = () => {
  const navRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const s = () => navRef.current?.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', s, { passive: true });
    return () => window.removeEventListener('scroll', s);
  }, []);

  return (
    <nav className="ak-nav" ref={navRef} aria-label="Main navigation">
      <div className="ak-nav-inner">
        <a href="/" className="ak-logo" aria-label="Akumi home">
          <img src={LOGO} alt="Akumi" />
        </a>
        <ul className="ak-nav-links">
          {['Men', 'Women', 'Collections', 'Our Story', 'Sustainability'].map(l => (
            <li key={l}><a href={`#${l.toLowerCase().replace(' ', '-')}`}>{l}</a></li>
          ))}
        </ul>
        <div className="ak-nav-actions">
          <button className="ak-icon-btn" aria-label="Search"><Icons.Search /></button>
          <button className="ak-icon-btn" aria-label="Account"><Icons.User /></button>
          <div className="ak-cart-wrap">
            <button className="ak-icon-btn" aria-label="Shopping cart (0 items)"><Icons.Bag /></button>
            <span className="ak-cart-dot" aria-hidden="true" />
          </div>
          <button className="ak-icon-btn ak-mobile-menu" aria-label="Open menu" onClick={() => setMobileOpen(!mobileOpen)}>
            <Icons.Menu />
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="ak-mobile-nav" aria-label="Mobile navigation">
          {['Men', 'Women', 'Collections', 'Our Story', 'Sustainability'].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`} onClick={() => setMobileOpen(false)}>{l}</a>
          ))}
        </div>
      )}
    </nav>
  );
};

/* ═══════════════════════════════════════
   HERO — split layout, real lifestyle image
═══════════════════════════════════════ */
const Hero = () => {
  const ref = useFadeUp();
  const [currentImg, setCurrentImg] = useState(0);
  const images = [
    '/images/hero/1_amuk.png',
    '/images/hero/2_amuk.png',
    '/images/hero/3_amuk.png',
    '/images/hero/4_amuk.png',
    '/images/hero/Buitl_for_everyone.png'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="ak-hero" id="hero">
      <div className="ak-hero-left">
        {images.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt={`Akumi activewear lifestyle ${idx + 1}`}
            className={`ak-hero-img ${idx === currentImg ? 'active' : ''}`}
            loading={idx === 0 ? "eager" : "lazy"}
            fetchpriority={idx === 0 ? "high" : "auto"}
          />
        ))}
      </div>
      <div className="ak-hero-right fade-up" ref={ref}>
        <p className="ak-hero-eyebrow">Summer 2026 · From the Ground Up</p>
        <div className="ak-hero-pills">
          <span className="ak-pill ak-pill-amber">
            <Icons.Leaf size={11} /> Recycled Cotton
          </span>
          <span className="ak-pill ak-pill-cyan">
            <Icons.Wind size={11} /> California Made
          </span>
          <span className="ak-pill ak-pill-lime">
            <Icons.Zap size={11} /> Premium Essentials
          </span>
        </div>
        <h1 className="ak-hero-h1">
          Move with <span className="gradient-text">Purpose.</span><br />
          Look the Part.
        </h1>
        <p className="ak-hero-sub">
          Akumi is activewear built for the way you actually live — crafted from 100% recycled cotton, designed for modern movement, priced for the everyday.
        </p>
        <div className="ak-btn-row">
          <a href="#collections" className="ak-btn-primary" id="hero-shop-cta">
            Shop the Collection <Icons.ArrowRight />
          </a>
          <a href="#our-story" className="ak-btn-ghost">Our Story</a>
        </div>
        <div className="ak-hero-stats">
          <div>
            <div className="ak-stat-num gradient-text">100%</div>
            <div className="ak-stat-label">Recycled Cotton</div>
          </div>
          <div>
            <div className="ak-stat-num">2</div>
            <div className="ak-stat-label">Collections</div>
          </div>
          <div>
            <div className="ak-stat-num gradient-text">10Y</div>
            <div className="ak-stat-label">Brand Vision</div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════
   TRUST BAR — SVG icons, no emojis
═══════════════════════════════════════ */
const trustItems = [
  { Icon: Icons.Truck,  label: 'Free Shipping $75+', sub: 'On every order' },
  { Icon: Icons.Leaf,   label: '100% Recycled Cotton', sub: 'Certified sustainable' },
  { Icon: Icons.Return, label: 'Easy Returns', sub: '30-day hassle free' },
  { Icon: Icons.Lock,   label: 'Secure Checkout', sub: 'SSL encrypted' },
];

const TrustBar = () => (
  <div className="ak-trust" role="list" aria-label="Trust signals">
    <div className="ak-trust-inner">
      {trustItems.map(({ Icon, label, sub }) => (
        <div className="ak-trust-item" key={label} role="listitem">
          <div className="ak-trust-icon"><Icon /></div>
          <div>
            <span className="ak-trust-label">{label}</span>
            <span className="ak-trust-sub">{sub}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ═══════════════════════════════════════
   MARQUEE TICKER
═══════════════════════════════════════ */
const tickerItems = [
  { text: 'Recycled Cotton', accent: true },
  { text: 'Stay Active In Style', accent: false },
  { text: 'California Inspired', accent: true },
  { text: 'Premium Essentials', accent: false },
  { text: 'Men & Women', accent: true },
  { text: 'From the Ground Up', accent: false },
  { text: 'Recycled Cotton', accent: true },
  { text: 'Stay Active In Style', accent: false },
  { text: 'California Inspired', accent: true },
  { text: 'Premium Essentials', accent: false },
  { text: 'Men & Women', accent: true },
  { text: 'From the Ground Up', accent: false },
];

const Ticker = () => (
  <div className="ak-ticker" aria-hidden="true">
    <div className="ak-ticker-track">
      {tickerItems.map((item, i) => (
        <span className="ak-ticker-item" key={i}>
          {item.accent ? <span className="accent">{item.text}</span> : item.text}
          <span className="dot" />
        </span>
      ))}
    </div>
  </div>
);

/* ═══════════════════════════════════════
   STORY INTRO
═══════════════════════════════════════ */
const StoryIntro = () => {
  const ref = useFadeUp();
  return (
    <section className="ak-story fade-up" id="our-story" ref={ref}>
      <div className="ak-section-tag">The Akumi Story</div>
      <blockquote className="ak-story-quote">
        "Sending this energy to the universe — Akumi will become one of the world's leading apparel brands."
      </blockquote>
      <p className="ak-story-body">
        Born 10 years ago with a belief that what you wear should reflect how you live. Every Akumi piece is woven from 100% recycled cotton — repurposed, reborn, and ready for whatever you put it through. We aren't just building a clothing brand. We're building a movement.
      </p>
      <a href="#our-story" className="ak-link-underline">
        Read Our Full Story <Icons.ArrowRight size={14} />
      </a>
    </section>
  );
};


/* ═══════════════════════════════════════
   FEATURED PRODUCTS — brand product images
═══════════════════════════════════════ */
const products = [
  {
    name: 'Essential Logo Tee',
    cat: "Men's",
    price: '$52',
    img: BRAND.tee_front,
    alt: 'Akumi Essential Logo Tee — charcoal black',
    colors: ['#2C2C2C', '#F8F7F4', '#4A5568'],
    badge: 'new',
  },
  {
    name: 'Cargo Short',
    cat: "Men's",
    price: '$64',
    img: BRAND.set_front,
    alt: 'Akumi Cargo Short with drawstring',
    colors: ['#2C2C2C', '#4A5568'],
    badge: null,
  },
  {
    name: 'Back Logo Tee',
    cat: "Men's",
    price: '$52',
    img: BRAND.set_back,
    alt: 'Akumi Back Logo Tee — oversized print',
    colors: ['#2C2C2C'],
    badge: 'best',
  },
  {
    name: 'White Logo Tee',
    cat: "Men's & Women's",
    price: '$52',
    img: BRAND.tee_white,
    alt: 'Akumi White Logo Tee — clean essential',
    colors: ['#F8F7F4', '#2C2C2C'],
    badge: null,
  },
];

const FeaturedProducts = () => {
  const ref = useFadeUp();
  return (
    <section className="ak-products fade-up" id="men" ref={ref}>
      <div className="ak-section-header container">
        <div>
          <p className="ak-section-eyebrow">New Arrivals</p>
          <h2 className="ak-section-title">Essentials, Elevated</h2>
        </div>
        <a href="#collections" className="ak-view-all" id="view-all-products">
          View All <Icons.ArrowRight size={13} />
        </a>
      </div>
      <div className="ak-prod-grid container">
        {products.map((p, i) => (
          <article className="ak-prod-card" key={i} id={`product-card-${i + 1}`}>
            <div className="ak-prod-img">
              {p.badge === 'new'  && <span className="ak-prod-badge new">New</span>}
              {p.badge === 'best' && <span className="ak-prod-badge best">Best Seller</span>}
              <img src={p.img} alt={p.alt} loading="lazy" />
              <div className="ak-prod-img-overlay" />
              <button className="ak-prod-quick" aria-label={`Quick add ${p.name}`}>
                <Icons.Plus size={14} /> Quick Add
              </button>
            </div>
            <p className="ak-prod-cat">{p.cat}</p>
            <p className="ak-prod-name">{p.name}</p>
            <p className="ak-prod-price">{p.price}</p>
            <div className="ak-prod-swatches" role="group" aria-label="Available colors">
              {p.colors.map((c, ci) => (
                <button
                  key={ci}
                  className="ak-swatch"
                  style={{ background: c }}
                  aria-label={`Color option ${ci + 1}`}
                />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════
   SPLIT STORY — Sustainability / ocean image
═══════════════════════════════════════ */
const SplitStory = () => (
  <section className="ak-split" id="sustainability">
    <div className="ak-split-img">
      <img
        src={U.cotton_field}
        alt="Cotton fields representing Akumi's commitment to sustainable materials"
        loading="lazy"
        className="ak-fill-img"
      />
      <div className="ak-split-img-overlay" />
    </div>
    <div className="ak-split-content">
      <div className="ak-split-tag">Sustainability First</div>
      <h2 className="ak-split-h2">
        Built From What<br />Was Already Here.
      </h2>
      <p className="ak-split-body">
        Every Akumi piece is woven from 100% recycled cotton — repurposed, reborn, and ready for whatever you put it through. Fast fashion is out. Lasting quality, made responsibly, is in.
        <br /><br />
        We believe the best gear doesn't have to cost the planet anything extra. That's not a marketing promise. It's our entire design philosophy.
      </p>
      <a href="#sustainability" className="ak-btn-gradient" id="sustainability-cta">
        Our Commitment <Icons.ArrowRight />
      </a>
    </div>
  </section>
);

/* ═══════════════════════════════════════
   VALUES — 3-column, SVG icons
═══════════════════════════════════════ */
const values = [
  {
    num: '01',
    Icon: Icons.Leaf,
    title: '100% Recycled Cotton',
    body: "Every thread tells a story of renewal. Certified recycled cotton, so the planet doesn't pay the price for your wardrobe upgrade.",
  },
  {
    num: '02',
    Icon: Icons.Zap,
    title: 'Performance Engineered',
    body: 'Structured where it counts, soft where it matters. From studio to street, Akumi performs as good as it looks.',
  },
  {
    num: '03',
    Icon: Icons.Wind,
    title: 'California-Inspired',
    body: 'Clean lines, muted tones, effortless silhouettes. Our design language is drawn from the coastlines and culture of California.',
  },
];

const Values = () => {
  const ref = useFadeUp();
  return (
    <section className="ak-values fade-up" ref={ref}>
      <div className="container" style={{ textAlign: 'center' }}>
        <div className="ak-section-tag" style={{ justifyContent: 'center' }}>Why Akumi</div>
        <h2 className="ak-section-title">The Difference You Can Feel</h2>
      </div>
      <div className="ak-values-grid container">
        {values.map((v) => (
          <div className="ak-value-card" key={v.num}>
            <div className="ak-value-num">{v.num}</div>
            <div className="ak-value-icon"><v.Icon size={28} /></div>
            <h3 className="ak-value-h3">{v.title}</h3>
            <p className="ak-value-p">{v.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════
   COLLECTIONS — real lifestyle images
═══════════════════════════════════════ */
const Collections = () => {
  const ref = useFadeUp();
  return (
    <section className="ak-collections fade-up" id="collections" ref={ref}>
      <div className="ak-section-header container">
        <div>
          <p className="ak-section-eyebrow">Shop by Category</p>
          <h2 className="ak-section-title">Built for Everyone</h2>
        </div>
      </div>
      <div className="ak-col-grid container">
        <div className="ak-col-card" id="mens-collection" tabIndex="0">
          <img src={U.man_lifestyle} alt="Men wearing Akumi activewear" loading="lazy" className="ak-fill-img" />
          <div className="ak-col-overlay">
            <p className="ak-col-super">Explore</p>
            <h3 className="ak-col-name">Men's Line</h3>
            <a href="#men" className="ak-col-link">Shop Men's <Icons.ArrowRight size={13} /></a>
          </div>
        </div>
        <div className="ak-col-card" id="womens-collection" tabIndex="0">
          <img src={U.woman_sport} alt="Woman wearing Akumi activewear" loading="lazy" className="ak-fill-img" />
          <div className="ak-col-overlay">
            <p className="ak-col-super">Explore</p>
            <h3 className="ak-col-name" id="women">Women's Line</h3>
            <a href="#women" className="ak-col-link">Shop Women's <Icons.ArrowRight size={13} /></a>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════
   REVIEWS — dual horizontal marquee
═══════════════════════════════════════ */
const Stars = ({ n = 5 }) => (
  <div className="ak-review-stars" aria-label={`${n} out of 5 stars`}>
    {Array.from({ length: n }).map((_, i) => <Icons.Star key={i} size={13} />)}
  </div>
);

const reviewsRow1 = [
  { type: 'text', stars: 5, sub: 'Game Changer', text: `"I've tried so many activewear brands and nothing comes close to the softness of Akumi. The recycled cotton makes me feel even better about wearing it."`, name: 'Jordan M.', loc: 'Los Angeles, CA' },
  { type: 'photo', img: BRAND.detail_hem, alt: 'Customer wearing Akumi hem detail' },
  { type: 'text', stars: 5, sub: 'Daily Essential', text: `"These are my everyday staple now. They look clean enough for errands but feel like sweats. Exactly what I wanted."`, name: 'Taylor R.', loc: 'San Diego, CA' },
  { type: 'text', stars: 5, sub: 'Premium Quality', text: `"Quality is premium without the typical price tag. Akumi genuinely feels like a brand that's going to be huge."`, name: 'Alex C.', loc: 'San Francisco, CA' },
  { type: 'photo', img: BRAND.tee_tag, alt: 'Akumi neck label showing Designed in California' },
  { type: 'text', stars: 5, sub: 'Love It', text: `"The material is incredibly soft. I've washed it a dozen times and it still looks brand new."`, name: 'Chris D.', loc: 'Santa Monica, CA' },
];
const reviewsRow2 = [
  { type: 'photo', img: BRAND.jogger_pocket, alt: 'Akumi jogger pocket — woven label detail' },
  { type: 'text', stars: 5, sub: 'Finally Found It', text: `"Comfortable, stylish, sustainable. Akumi checks every single box. Already on my second order."`, name: 'Sam K.', loc: 'Portland, OR' },
  { type: 'text', stars: 5, sub: 'Must Have', text: `"Wore the tee to the gym and got three compliments. Simple design, incredible quality."`, name: 'Morgan L.', loc: 'Denver, CO' },
  { type: 'photo', img: BRAND.set_back, alt: 'Akumi back logo tee and shorts flatlay' },
  { type: 'text', stars: 5, sub: 'Worth Every Penny', text: `"The shorts are the perfect length and the waistband stays put. Found my go-to brand."`, name: 'Jamie T.', loc: 'Austin, TX' },
  { type: 'text', stars: 5, sub: 'Obsessed', text: `"From the packaging to the feel of the fabric — every detail shows you care. I'm an Akumi person now."`, name: 'Riley W.', loc: 'Seattle, WA' },
];

const ReviewCard = ({ r }) => (
  r.type === 'photo'
    ? (
      <div className="ak-review-card photo" aria-hidden="true">
        <img src={r.img} alt={r.alt} loading="lazy" />
      </div>
    ) : (
      <div className="ak-review-card" role="article">
        <Stars n={r.stars} />
        <p className="ak-review-sub">{r.sub}</p>
        <p className="ak-review-text">{r.text}</p>
        <p className="ak-reviewer">{r.name}</p>
        <p className="ak-reviewer-loc">{r.loc}</p>
      </div>
    )
);

const Reviews = () => (
  <section className="ak-reviews" aria-label="Customer reviews">
    <div className="ak-reviews-header fade-up container">
      <div className="ak-section-tag" style={{ justifyContent: 'center' }}>Real People. Real Moves.</div>
      <h2>The Community is Speaking.</h2>
      <p>See what people are saying about their Akumi experience.</p>
    </div>
    <div className="ak-reviews-marquee" aria-hidden="true">
      <div className="ak-reviews-track">
        {reviewsRow1.map((r, i) => <ReviewCard r={r} key={`r1a-${i}`} />)}
      </div>
      <div className="ak-reviews-track" aria-hidden="true">
        {reviewsRow1.map((r, i) => <ReviewCard r={r} key={`r1b-${i}`} />)}
      </div>
    </div>
    <div className="ak-reviews-marquee" aria-hidden="true">
      <div className="ak-reviews-track reverse">
        {reviewsRow2.map((r, i) => <ReviewCard r={r} key={`r2a-${i}`} />)}
      </div>
      <div className="ak-reviews-track reverse" aria-hidden="true">
        {reviewsRow2.map((r, i) => <ReviewCard r={r} key={`r2b-${i}`} />)}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════
   SOCIAL PROOF BANNER
═══════════════════════════════════════ */
const SocialProofBanner = () => {
  const ref = useFadeUp();
  return (
    <div className="ak-social-proof fade-up" ref={ref}>
      <div className="ak-social-proof-inner container">
        <div>
          <div className="ak-social-count gradient-text">From the Ground Up.</div>
          <p className="ak-social-sub">Join us on this journey — Akumi is just getting started.</p>
        </div>
        <a
          href="https://www.instagram.com/akumiclothing"
          className="ak-ig-link"
          target="_blank"
          rel="noopener noreferrer"
          id="follow-instagram-cta"
          aria-label="Follow Akumi on Instagram"
        >
          <Icons.Instagram /> Follow @akumiclothing
        </a>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════
   INSTAGRAM GRID — 8 real brand images + 2 lifestyle
═══════════════════════════════════════ */
const igPosts = [
  { src: BRAND.tee_front,     alt: 'Akumi logo tee charcoal' },
  { src: U.man_running,       alt: 'Man active outdoors in activewear' },
  { src: BRAND.set_front,     alt: 'Akumi tee and shorts flatlay' },
  { src: BRAND.jogger_pocket, alt: 'Akumi jogger pocket detail' },
  { src: U.woman_sport,       alt: 'Woman in activewear training' },
  { src: BRAND.set_back,      alt: 'Akumi back logo set' },
  { src: BRAND.tee_white,     alt: 'Akumi white logo tee' },
  { src: U.gym_lifestyle,     alt: 'Athlete training in gym' },
  { src: BRAND.detail_hem,    alt: 'Akumi hem stitch detail' },
  { src: BRAND.tee_tag,       alt: 'Akumi Designed in California label' },
];

const InstaGrid = () => (
  <section className="ak-insta" aria-label="Instagram feed — @akumiclothing">
    <div className="ak-insta-header container">
      <div className="ak-section-tag" style={{ justifyContent: 'center' }}>Life in Akumi</div>
      <h2>The Community in Motion</h2>
      <a
        href="https://www.instagram.com/akumiclothing"
        className="ak-insta-handle"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow Akumi on Instagram"
      >
        <Icons.Instagram /> @akumiclothing
      </a>
    </div>
    <div className="ak-insta-grid">
      {igPosts.map(({ src, alt }, i) => (
        <a
          key={i}
          href="https://www.instagram.com/akumiclothing"
          className="ak-insta-item"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View on Instagram: ${alt}`}
        >
          <img src={src} alt={alt} loading="lazy" />
          <div className="ak-insta-hover" aria-hidden="true">
            <Icons.Instagram size={26} />
          </div>
        </a>
      ))}
    </div>
  </section>
);

/* ═══════════════════════════════════════
   NEWSLETTER
═══════════════════════════════════════ */
const Newsletter = () => {
  const ref = useFadeUp();
  return (
    <section className="ak-newsletter fade-up" ref={ref} aria-label="Newsletter signup">
      <div className="ak-newsletter-glow" aria-hidden="true" />
      <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
        <div className="ak-section-tag" style={{ justifyContent: 'center', color: 'rgba(255,255,255,0.35)' }}>
          Join the Movement
        </div>
        <h2 className="ak-nl-h2">Be the First to Know.</h2>
        <p className="ak-nl-sub">New drops, exclusive access, and stories from the Akumi community.</p>
        <form className="ak-newsletter-form" onSubmit={e => e.preventDefault()} aria-label="Email signup">
          <input
            id="newsletter-email"
            className="ak-newsletter-input"
            type="email"
            placeholder="Enter your email address"
            aria-label="Email address"
            autoComplete="email"
          />
          <button type="submit" className="ak-newsletter-btn" id="newsletter-submit">
            Subscribe <Icons.ArrowRight size={14} />
          </button>
        </form>
        <p className="ak-newsletter-note">No spam, ever. Unsubscribe anytime.</p>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════
   FOOTER
═══════════════════════════════════════ */
const Footer = () => (
  <footer className="ak-footer">
    <div className="ak-footer-inner container">
      <div className="ak-footer-top">
        <div className="ak-footer-brand">
          <img src={LOGO} alt="Akumi" className="ak-footer-logo-img" />
          <p className="ak-footer-tagline">
            Premium activewear for the modern mover. Built from 100% recycled cotton. Designed in California.
          </p>
          <div className="ak-footer-socials">
            {[
              { label: 'Instagram', href: 'https://www.instagram.com/akumiclothing', icon: <Icons.Instagram size={16} /> },
              { label: 'Tumblr', href: 'https://akumi.tumblr.com/', icon: <Icons.Tumblr size={16} /> },
              { label: 'X', href: 'https://x.com/akumi', icon: <Icons.Twitter size={16} /> },
              { label: 'Facebook', href: 'https://www.facebook.com/akumi', icon: <Icons.Facebook size={16} /> },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/akumi/', icon: <Icons.Linkedin size={16} /> },
            ].map(({ label, href, icon }) => (
              <a key={label} href={href} className="ak-footer-social-btn" aria-label={label} target="_blank" rel="noopener noreferrer">
                {icon}
              </a>
            ))}
          </div>
        </div>
        {[
          { title: 'Shop', links: ["Men's Collection", "Women's Collection", "New Arrivals", "Best Sellers", "Bundles & Sets"] },
          { title: 'Company', links: ['Our Story', 'Sustainability', 'Careers', 'Press'] },
          { title: 'Help', links: ['Sizing Guide', 'Shipping & Returns', 'FAQ', 'Contact Us'] },
        ].map(({ title, links }) => (
          <nav key={title} aria-label={`${title} links`}>
            <p className="ak-footer-col-title">{title}</p>
            <ul className="ak-footer-links">
              {links.map(l => (
                <li key={l}><a href="#collections">{l}</a></li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="ak-footer-bottom">
        <p>© 2026 Akumi Clothing. All rights reserved.</p>
        <div className="ak-footer-payments" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 1 }}>
          <Icons.Shopify size={16} /> <span style={{ fontSize: '0.75rem', marginRight: '0.5rem', fontWeight: 500 }}>Secure checkout with Shopify</span>
          <img src="/images/payme.svg" alt="Payment Methods" style={{ height: '20px', marginLeft: '0.5rem' }} />
        </div>
        <p>Privacy Policy · Terms of Service · Accessibility</p>
      </div>
    </div>
  </footer>
);

/* ═══════════════════════════════════════
   APP ROOT
═══════════════════════════════════════ */
export default function App() {
  useEffect(() => {
    const els = document.querySelectorAll('.fade-up');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      }),
      { threshold: 0.08 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <Ticker />
        <StoryIntro />
        <Collections />
        <FeaturedProducts />
        <SplitStory />
        <Values />
        <Reviews />
        <SocialProofBanner />
        <InstaGrid />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}

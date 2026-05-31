'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [lang, setLangState] = useState<'en' | 'es'>('en');

  function setLang(l: 'en' | 'es') {
    setLangState(l);
    document.documentElement.lang = l;
    localStorage.setItem('md-lang', l);
  }

  // Language detection
  useEffect(() => {
    const saved = localStorage.getItem('md-lang') as 'en' | 'es' | null;
    if (saved) {
      setLang(saved);
    } else if (navigator.language?.toLowerCase().startsWith('es')) {
      setLang('es');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Countdown
  useEffect(() => {
    function tick() {
      const diff = new Date('2026-08-27T13:00:00-05:00').getTime() - Date.now();
      const el = document.getElementById('countdown');
      if (!el) return;
      if (diff <= 0) {
        el.innerHTML = '<div style="font-family:\'Cormorant Garamond\',serif;font-size:32px;font-weight:300;letter-spacing:0.1em;">¡Hoy es el día! · Today is the day!</div>';
        return;
      }
      const set = (id: string, v: number) => {
        const node = document.getElementById(id);
        if (node) node.textContent = String(v).padStart(2, '0');
      };
      set('cd-days',  Math.floor(diff / 86400000));
      set('cd-hours', Math.floor((diff % 86400000) / 3600000));
      set('cd-mins',  Math.floor((diff % 3600000) / 60000));
      set('cd-secs',  Math.floor((diff % 60000) / 1000));
    }
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  // Scroll effects
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    const nav = document.querySelector('nav');
    const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });

    const onAnchorClick = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement;
      const target = document.querySelector(a.getAttribute('href') || '');
      if (target) { e.preventDefault(); window.scrollTo({ top: (target as HTMLElement).offsetTop - 72, behavior: 'smooth' }); }
    };
    const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    anchors.forEach(a => a.addEventListener('click', onAnchorClick));

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      anchors.forEach(a => a.removeEventListener('click', onAnchorClick));
    };
  }, []);

  function copyCode() {
    navigator.clipboard.writeText('marcelaydaniel').then(() => {
      ['copy-msg', 'copy-msg-es'].forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.style.display = 'block'; setTimeout(() => { el.style.display = 'none'; }, 2000); }
      });
    });
  }

  function copyBankDetails() {
    const text = 'Wise — Daniel Orlando Peña\nAccount: 200110089075\nInstitutional: 621\nTransit: 16001\nSwift/BIC: TRWICAW1XXX';
    navigator.clipboard.writeText(text).then(() => {
      ['bank-copy-msg', 'bank-copy-msg-es'].forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.style.display = 'block'; setTimeout(() => { el.style.display = 'none'; }, 2500); }
      });
    });
  }

  return (
    <div className={lang === 'es' ? 'es' : ''}>

      {/* LANGUAGE TOGGLE */}
      <div id="lang-toggle">
        <button id="btn-en" className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
        <button id="btn-es" className={lang === 'es' ? 'active' : ''} onClick={() => setLang('es')}>ES</button>
      </div>

      {/* NAV */}
      <nav>
        <ul>
          <li><a href="#story" data-lang="en">Our Story</a><a href="#story" data-lang="es">Nuestra Historia</a></li>
          <li><a href="#schedule" data-lang="en">Schedule</a><a href="#schedule" data-lang="es">Programa</a></li>
          <li><a href="#dresscode" data-lang="en">Dress Code</a><a href="#dresscode" data-lang="es">Código de Vestimenta</a></li>
          <li><a href="#venues" data-lang="en">Venues</a><a href="#venues" data-lang="es">Lugares</a></li>
          <li><a href="#accommodation" data-lang="en">Stay</a><a href="#accommodation" data-lang="es">Alojamiento</a></li>
          <li><a href="#beauty" data-lang="en">Beauty</a><a href="#beauty" data-lang="es">Belleza</a></li>
          <li><a href="#wishingwell" data-lang="en">Gifts</a><a href="#wishingwell" data-lang="es">Regalos</a></li>
          <li><a href="#rsvp" data-lang="en">RSVP</a><a href="#rsvp" data-lang="es">Confirmar</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="monogram">MD</div>
        <p className="section-label" data-lang="en">You are cordially invited to celebrate the wedding of</p>
        <p className="section-label" data-lang="es">Estás cordialmente invitado a celebrar la boda de</p>
        <h1 className="hero-names">Marcela &amp; Daniel</h1>
        <div className="hero-date-row">
          <div className="hero-date-side" data-lang="en">Thursday<span>&nbsp;</span></div>
          <div className="hero-date-side" data-lang="es">Jueves<span>&nbsp;</span></div>
          <div>
            <div className="hero-date-label">August · Agosto</div>
            <div className="hero-date-number">27</div>
          </div>
          <div className="hero-date-side">2026<span>&nbsp;</span></div>
        </div>
        <p className="hero-adults" data-lang="en">This celebration has been thoughtfully planned for adults only.</p>
        <p className="hero-adults" data-lang="es">Esta celebración ha sido pensada con cariño para adultos únicamente.</p>
        <div id="countdown">
          <div className="countdown-unit">
            <span className="countdown-num" id="cd-days">—</span>
            <span className="countdown-label" data-lang="en">Days</span>
            <span className="countdown-label" data-lang="es">Días</span>
          </div>
          <span className="countdown-sep">·</span>
          <div className="countdown-unit">
            <span className="countdown-num" id="cd-hours">—</span>
            <span className="countdown-label" data-lang="en">Hours</span>
            <span className="countdown-label" data-lang="es">Horas</span>
          </div>
          <span className="countdown-sep">·</span>
          <div className="countdown-unit">
            <span className="countdown-num" id="cd-mins">—</span>
            <span className="countdown-label" data-lang="en">Minutes</span>
            <span className="countdown-label" data-lang="es">Minutos</span>
          </div>
          <span className="countdown-sep">·</span>
          <div className="countdown-unit">
            <span className="countdown-num" id="cd-secs">—</span>
            <span className="countdown-label" data-lang="en">Seconds</span>
            <span className="countdown-label" data-lang="es">Segundos</span>
          </div>
        </div>
        <div className="scroll-cue">
          <span data-lang="en">Scroll</span>
          <span data-lang="es">Desliza</span>
          <svg viewBox="0 0 18 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 4v16M3 14l6 6 6-6" />
          </svg>
        </div>
      </section>

      {/* OUR STORY */}
      <section id="story" className="reveal">
        <div className="section-inner">
          <div className="section-label" data-lang="en">Celebrating 15 Years Together</div>
          <div className="section-label" data-lang="es">Celebrando 15 Años Juntos</div>
          <h2 className="section-title" data-lang="en">Our Story</h2>
          <h2 className="section-title" data-lang="es">Nuestra Historia</h2>
          <div className="divider left"></div>
          <div className="story-text" data-lang="en">
            <p>Our story began 15 years ago in Barranquilla, Colombia. Marcela was 15 and Dani was 18, and it was thanks to one of Dani&apos;s cousins that our paths crossed for the very first time. What started as an unexpected meet-up soon turned into a connection that would change our lives forever.</p>
            <p>From then on, life took us to different places — Miami, Vancouver, Italy — and although distance tested our journey, it never managed to separate us. From the very first day we spoke, we haven&apos;t missed a single day. The conversations, the laughter, the shared dreams, and the constant support have been the invisible thread that has always kept us together.</p>
            <p>Today, after so many years of growing together, learning from one another, and choosing each other every single day, we feel an immense joy to celebrate this long-awaited moment.</p>
            <p>Our hearts are full knowing that we are here, surrounded by all the people we love, in a place as special to us as Colombia. This day is not only about a wedding, but about a story built with patience, love, complicity, and the certainty that no matter the distance, we have always been home to each other.</p>
            <p>Thank you for being part of our story and for joining us in this meaningful chapter of our lives.</p>
          </div>
          <div className="story-text" data-lang="es">
            <p>Nuestra historia comenzó hace 15 años en Barranquilla, Colombia. Marcela tenía 15 años y Dani 18, y fue gracias a uno de los primos de Dani que nuestros caminos se cruzaron por primera vez. Lo que comenzó como un encuentro inesperado pronto se convirtió en una conexión que cambiaría nuestras vidas para siempre.</p>
            <p>A partir de entonces, la vida nos llevó a distintos lugares — Miami, Vancouver, Italia — y aunque la distancia puso a prueba nuestro camino, nunca logró separarnos. Desde el primer día que hablamos, no hemos pasado ni un solo día sin conectarnos. Las conversaciones, las risas, los sueños compartidos y el apoyo constante han sido el hilo invisible que siempre nos ha mantenido unidos.</p>
            <p>Hoy, después de tantos años creciendo juntos, aprendiendo el uno del otro y eligiéndonos cada día, sentimos una inmensa alegría de celebrar este momento tan esperado.</p>
            <p>Nuestros corazones están llenos al saber que estamos aquí, rodeados de todas las personas que amamos, en un lugar tan especial para nosotros como Colombia. Este día no es solo una boda, sino una historia construida con paciencia, amor, complicidad y la certeza de que sin importar la distancia, siempre hemos sido el hogar del otro.</p>
            <p>Gracias por ser parte de nuestra historia y por acompañarnos en este capítulo tan especial de nuestras vidas.</p>
          </div>
          <div className="story-15">15</div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="reveal">
        <div className="section-inner">
          <div className="section-label" data-lang="en">Thursday, August 27, 2026</div>
          <div className="section-label" data-lang="es">Jueves, 27 de Agosto de 2026</div>
          <h2 className="section-title" data-lang="en">The Day</h2>
          <h2 className="section-title" data-lang="es">El Programa</h2>
          <div className="divider left"></div>
        </div>
        <div className="section-inner" style={{ maxWidth: '1000px' }}>
          <div className="schedule-grid">
            <div className="schedule-item">
              <div className="sch-type" data-lang="en">Ceremony</div>
              <div className="sch-type" data-lang="es">Ceremonia</div>
              <div className="sch-time">1<span style={{ fontSize: '28px' }}>:00</span></div>
              <div className="sch-ampm">PM</div>
              <div className="sch-divider"></div>
              <div className="sch-venue">Nuestra Señora del Rosario</div>
              <div className="sch-address">Cl. 19 #21-64<br />Retiro, Antioquia</div>
              <a href="https://maps.google.com/?q=Nuestra+Señora+del+Rosario+Retiro+Antioquia+Colombia" target="_blank" rel="noreferrer" className="map-btn" data-lang="en">View Map</a>
              <a href="https://maps.google.com/?q=Nuestra+Señora+del+Rosario+Retiro+Antioquia+Colombia" target="_blank" rel="noreferrer" className="map-btn" data-lang="es">Ver Mapa</a>
            </div>
            <div className="schedule-item">
              <div className="sch-type" data-lang="en">Cocktail Hour</div>
              <div className="sch-type" data-lang="es">Cóctel</div>
              <div className="sch-time">2<span style={{ fontSize: '28px' }}>:30</span></div>
              <div className="sch-ampm">PM</div>
              <div className="sch-divider"></div>
              <div className="sch-venue">Santa Mónica Premium</div>
              <div className="sch-address">Don Diego, Rionegro<br />Llanogrande, Antioquia</div>
              <a href="https://maps.google.com/?q=Santa+Monica+Premium+Llanogrande+Rionegro+Antioquia" target="_blank" rel="noreferrer" className="map-btn" data-lang="en">View Map</a>
              <a href="https://maps.google.com/?q=Santa+Monica+Premium+Llanogrande+Rionegro+Antioquia" target="_blank" rel="noreferrer" className="map-btn" data-lang="es">Ver Mapa</a>
            </div>
            <div className="schedule-item">
              <div className="sch-type" data-lang="en">Reception</div>
              <div className="sch-type" data-lang="es">Recepción</div>
              <div className="sch-time">4<span style={{ fontSize: '28px' }}>:30</span></div>
              <div className="sch-ampm">PM</div>
              <div className="sch-divider"></div>
              <div className="sch-venue">Santa Mónica Premium</div>
              <div className="sch-address">Don Diego, Rionegro<br />Llanogrande, Antioquia</div>
              <a href="https://maps.google.com/?q=Santa+Monica+Premium+Llanogrande+Rionegro+Antioquia" target="_blank" rel="noreferrer" className="map-btn" data-lang="en">View Map</a>
              <a href="https://maps.google.com/?q=Santa+Monica+Premium+Llanogrande+Rionegro+Antioquia" target="_blank" rel="noreferrer" className="map-btn" data-lang="es">Ver Mapa</a>
            </div>
          </div>
          <p className="schedule-note" data-lang="en">🚌 Transportation will be provided from the ceremony to the reception.</p>
          <p className="schedule-note" data-lang="es">🚌 Se proporcionará transporte desde la ceremonia hasta la recepción.</p>
        </div>
      </section>

      {/* DRESS CODE */}
      <section id="dresscode" className="reveal">
        <div className="section-inner">
          <div className="section-label" data-lang="en">What to Wear</div>
          <div className="section-label" data-lang="es">¿Cómo Vestirse?</div>
          <h2 className="section-title" data-lang="en">Dress Code</h2>
          <h2 className="section-title" data-lang="es">Código de Vestimenta</h2>
          <div className="divider left"></div>
          <div className="dress-grid">
            <div className="dress-card">
              <div className="dress-icon">👗</div>
              <div className="dress-who" data-lang="en">Women</div>
              <div className="dress-who" data-lang="es">Mujeres</div>
              <div className="dress-what" data-lang="en">Evening Gown</div>
              <div className="dress-what" data-lang="es">Vestido de Noche</div>
              <a href="https://pin.it/wqm02SH87" target="_blank" rel="noreferrer" className="dress-link" data-lang="en">View Inspiration →</a>
              <a href="https://pin.it/wqm02SH87" target="_blank" rel="noreferrer" className="dress-link" data-lang="es">Ver Inspiración →</a>
            </div>
            <div className="dress-card">
              <div className="dress-icon">🤵</div>
              <div className="dress-who" data-lang="en">Men</div>
              <div className="dress-who" data-lang="es">Hombres</div>
              <div className="dress-what" data-lang="en">Black Tuxedo</div>
              <div className="dress-what" data-lang="es">Smoking Negro</div>
              <a href="https://pin.it/1YHCghKKa" target="_blank" rel="noreferrer" className="dress-link" data-lang="en">View Inspiration →</a>
              <a href="https://pin.it/1YHCghKKa" target="_blank" rel="noreferrer" className="dress-link" data-lang="es">Ver Inspiración →</a>
            </div>
          </div>
          <div className="reserved-colors">
            <div className="reserved-label" data-lang="en">⚠ The following colors are reserved for the wedding party</div>
            <div className="reserved-label" data-lang="es">⚠ Los siguientes colores están reservados para los novios</div>
            <div className="color-swatches">
              <div className="swatch"><div className="swatch-dot" style={{ background: '#ffffff' }}></div><span className="swatch-name" data-lang="en">White</span><span className="swatch-name" data-lang="es">Blanco</span></div>
              <div className="swatch"><div className="swatch-dot" style={{ background: '#e8dcc8' }}></div><span className="swatch-name" data-lang="en">Beige</span><span className="swatch-name" data-lang="es">Beige</span></div>
              <div className="swatch"><div className="swatch-dot" style={{ background: '#d4b896' }}></div><span className="swatch-name" data-lang="en">Nude</span><span className="swatch-name" data-lang="es">Nude</span></div>
              <div className="swatch"><div className="swatch-dot" style={{ background: '#c0c0c0' }}></div><span className="swatch-name" data-lang="en">Silver</span><span className="swatch-name" data-lang="es">Plateado</span></div>
              <div className="swatch"><div className="swatch-dot" style={{ background: '#d4af37' }}></div><span className="swatch-name" data-lang="en">Gold</span><span className="swatch-name" data-lang="es">Dorado</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* VENUES */}
      <section id="venues" className="reveal">
        <div className="section-inner" style={{ maxWidth: '1000px' }}>
          <div className="section-label" data-lang="en">Where to go</div>
          <div className="section-label" data-lang="es">Lugares</div>
          <h2 className="section-title" data-lang="en">Venues</h2>
          <h2 className="section-title" data-lang="es">Los Lugares</h2>
          <div className="divider left"></div>
          <div className="venues-grid">
            <div className="venue-card">
              <div className="venue-tag" data-lang="en">Ceremony · 1:00 PM</div>
              <div className="venue-tag" data-lang="es">Ceremonia · 1:00 PM</div>
              <div className="venue-name">Nuestra Señora del Rosario</div>
              <div className="venue-address">Cl. 19 #21-64<br />Retiro, Antioquia, Colombia</div>
              <a href="https://maps.google.com/?q=Nuestra+Señora+del+Rosario+Retiro+Antioquia+Colombia" target="_blank" rel="noreferrer" className="dress-link" data-lang="en">Open in Maps →</a>
              <a href="https://maps.google.com/?q=Nuestra+Señora+del+Rosario+Retiro+Antioquia+Colombia" target="_blank" rel="noreferrer" className="dress-link" data-lang="es">Abrir en Maps →</a>
              <iframe className="venue-map" loading="lazy" allowFullScreen src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=Nuestra+Señora+del+Rosario,Retiro,Antioquia,Colombia" />
            </div>
            <div className="venue-card">
              <div className="venue-tag" data-lang="en">Cocktail &amp; Reception · 2:30 / 4:30 PM</div>
              <div className="venue-tag" data-lang="es">Cóctel y Recepción · 2:30 / 4:30 PM</div>
              <div className="venue-name">Santa Mónica Premium</div>
              <div className="venue-address">Don Diego, Rionegro<br />Llanogrande, Antioquia, Colombia</div>
              <a href="https://maps.google.com/?q=Santa+Monica+Premium+Llanogrande+Rionegro+Antioquia" target="_blank" rel="noreferrer" className="dress-link" data-lang="en">Open in Maps →</a>
              <a href="https://maps.google.com/?q=Santa+Monica+Premium+Llanogrande+Rionegro+Antioquia" target="_blank" rel="noreferrer" className="dress-link" data-lang="es">Abrir en Maps →</a>
              <iframe className="venue-map" loading="lazy" allowFullScreen src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=Santa+Monica+Premium,Llanogrande,Rionegro,Antioquia" />
            </div>
          </div>
        </div>
      </section>

      {/* ACCOMMODATION */}
      <section id="accommodation" className="reveal">
        <div className="section-inner" style={{ maxWidth: '900px' }}>
          <div className="section-label" data-lang="en">Where to Sleep</div>
          <div className="section-label" data-lang="es">Dónde Alojarse</div>
          <h2 className="section-title" data-lang="en">Accommodation</h2>
          <h2 className="section-title" data-lang="es">Alojamiento</h2>
          <div className="divider left"></div>
          <div className="accom-inner">
            <div className="accom-card">
              <div className="accom-option" data-lang="en">Option 1 — Book Online</div>
              <div className="accom-option" data-lang="es">Opción 1 — Reserva en Línea</div>
              <div className="accom-hotel">Lagoon Llanogrande Hotel</div>
              <div className="accom-text" data-lang="en">Use our exclusive discount code to book directly online. Dates pre-loaded: Aug 26–28, 2026.</div>
              <div className="accom-text" data-lang="es">Usa nuestro código exclusivo para reservar directamente en línea. Fechas precargadas: 26–28 ago, 2026.</div>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--olive)', marginBottom: '8px' }} data-lang="en">Discount Code</div>
                <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--olive)', marginBottom: '8px' }} data-lang="es">Código de Descuento</div>
                <div className="accom-code" onClick={copyCode} title="Click to copy">marcelaydaniel</div>
                <div className="copy-msg" id="copy-msg" data-lang="en">Copied!</div>
                <div className="copy-msg" id="copy-msg-es" data-lang="es">¡Copiado!</div>
              </div>
              <a href="https://book.omnibees.com/hotelresults?c=1872&q=7705&hotel_folder=&NRooms=1&CheckIn=26082026&CheckOut=28082026&ad=2&ch=0&ag=&Code=marcelaydaniel&group_code=&loyalty_code=&lang=es-ES&currencyId=23&version=4" target="_blank" rel="noreferrer" className="accom-btn" data-lang="en">Book Now →</a>
              <a href="https://book.omnibees.com/hotelresults?c=1872&q=7705&hotel_folder=&NRooms=1&CheckIn=26082026&CheckOut=28082026&ad=2&ch=0&ag=&Code=marcelaydaniel&group_code=&loyalty_code=&lang=es-ES&currencyId=23&version=4" target="_blank" rel="noreferrer" className="accom-btn" data-lang="es">Reservar Ahora →</a>
            </div>
            <div className="accom-card">
              <div className="accom-option" data-lang="en">Option 2 — Contact Directly</div>
              <div className="accom-option" data-lang="es">Opción 2 — Contacto Directo</div>
              <div className="accom-hotel">Lagoon Llanogrande Hotel</div>
              <div className="accom-text" data-lang="en">Book directly with the hotel using the code <strong style={{ color: 'var(--olive)', fontWeight: 500 }}>&quot;marcelaydaniel&quot;</strong>.</div>
              <div className="accom-text" data-lang="es">Reserva directamente con el hotel usando el código <strong style={{ color: 'var(--olive)', fontWeight: 500 }}>&quot;marcelaydaniel&quot;</strong>.</div>
              <div className="accom-contact">
                <div>📱 WhatsApp / <span data-lang="en">Phone</span><span data-lang="es">Teléfono</span></div>
                <div><a href="https://wa.me/573209281003" target="_blank" rel="noreferrer">+57 320 9281 003</a></div>
                <div style={{ marginTop: '8px' }}>📧 Email</div>
                <div><a href="mailto:reservas@lagoonhotel.com">reservas@lagoonhotel.com</a></div>
              </div>
            </div>
            <div className="accom-note">
              <span data-lang="en">We have arranged accommodation options at Hotel Lagoon, where we will be staying. It will be a pleasure to share those days with you, although you are free to choose the accommodation that best suits you.</span>
              <span data-lang="es">Hemos organizado opciones de alojamiento en el Hotel Lagoon, donde nos estaremos quedando. Será un placer compartir esos días con ustedes, aunque son libres de elegir el alojamiento que mejor se adapte a sus necesidades.</span>
            </div>
          </div>
        </div>
      </section>

      {/* BEAUTY */}
      <section id="beauty" className="reveal">
        <div className="section-inner">
          <div className="section-label" data-lang="en">Get Ready</div>
          <div className="section-label" data-lang="es">Prepárate</div>
          <h2 className="section-title" data-lang="en">Beauty &amp; Style</h2>
          <h2 className="section-title" data-lang="es">Belleza y Estilo</h2>
          <div className="divider left"></div>
          <div className="beauty-grid">
            <div>
              <div className="beauty-section-title" data-lang="en">Hair &amp; Makeup</div>
              <div className="beauty-section-title" data-lang="es">Cabello y Maquillaje</div>
              <p className="beauty-desc" data-lang="en">We want you to feel incredible on our special day. Here are makeup artists and hairstylists in Medellín — contact them directly and choose the one that best suits your style.</p>
              <p className="beauty-desc" data-lang="es">Queremos que te sientas increíble en nuestro día especial. Aquí te presentamos maquilladores y estilistas en Medellín — contáctalos directamente y elige el que mejor se adapte a tu estilo.</p>
              <ul className="beauty-list">
                <li><a href="https://www.instagram.com/makeupbymaca/" target="_blank" rel="noreferrer">Makeup by Maca <span className="ig-handle">@makeupbymaca</span></a></li>
                <li><a href="https://www.instagram.com/stefaniap.makeup/" target="_blank" rel="noreferrer">Stefanía P. Makeup <span className="ig-handle">@stefaniap.makeup</span></a></li>
                <li><a href="https://www.instagram.com/iamrafaella_makeup/" target="_blank" rel="noreferrer">Iamrafaella Makeup <span className="ig-handle">@iamrafaella_makeup</span></a></li>
                <li><a href="https://www.instagram.com/pauaristizabalmakeup/" target="_blank" rel="noreferrer">Pau Aristizabal Makeup <span className="ig-handle">@pauaristizabalmakeup</span></a></li>
                <li><a href="https://www.instagram.com/diannamosqueramakeup/" target="_blank" rel="noreferrer">Dianna Mosquera Makeup <span className="ig-handle">@diannamosqueramakeup</span></a></li>
              </ul>
            </div>
            <div>
              <div className="beauty-section-title" data-lang="en">Tuxedo Rental</div>
              <div className="beauty-section-title" data-lang="es">Alquiler de Smoking</div>
              <p className="beauty-desc" data-lang="en">For tuxedo rentals, here are a few options in Medellín. We recommend booking in advance to take measurements and ensure availability.</p>
              <p className="beauty-desc" data-lang="es">Para el alquiler de smoking, aquí tienes algunas opciones en Medellín. Recomendamos reservar con anticipación para tomar medidas y asegurar disponibilidad.</p>
              <ul className="beauty-list">
                <li><a href="https://www.instagram.com/formalalquiler/" target="_blank" rel="noreferrer">Formal Alquiler <span className="ig-handle">@formalalquiler</span></a></li>
                <li><a href="https://www.instagram.com/serratovestuario/" target="_blank" rel="noreferrer">Serrato Vestuario <span className="ig-handle">@serratovestuario</span></a></li>
                <li><a href="https://www.instagram.com/alquitrajes/" target="_blank" rel="noreferrer">Alquitrajes <span className="ig-handle">@alquitrajes</span></a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WISHING WELL */}
      <section id="wishingwell" className="reveal">
        <div className="section-inner">
          <div className="section-label" data-lang="en">Wishing Well</div>
          <div className="section-label" data-lang="es">Mesa de Regalos</div>
          <h2 className="section-title" data-lang="en">Gifts</h2>
          <h2 className="section-title" data-lang="es">Regalos</h2>
          <div className="divider left"></div>
          <div className="wish-inner">
            <div>
              <p className="wish-text" data-lang="en">&quot;For us, the most important gift is your presence.&quot;</p>
              <p className="wish-text" data-lang="es">&quot;Para nosotros, el regalo más importante es tu presencia.&quot;</p>
              <p className="wish-sub" data-lang="en">If you wish to give us a token of your love, we will receive it with much appreciation. Below you&apos;ll find details for an international transfer via Wise.</p>
              <p className="wish-sub" data-lang="es">Si deseas hacernos un regalo, lo recibiremos con mucho aprecio. A continuación encontrarás los datos para una transferencia internacional a través de Wise.</p>
            </div>
            <div className="wise-card">
              <div className="wise-title" data-lang="en">International Transfer via Wise</div>
              <div className="wise-title" data-lang="es">Transferencia Internacional vía Wise</div>
              <div className="wise-bank">Wise</div>
              <div className="wise-detail">
                <div><strong data-lang="en">Name</strong><strong data-lang="es">Nombre</strong> Daniel Orlando Peña</div>
                <div><strong data-lang="en">Account Number</strong><strong data-lang="es">N° de Cuenta</strong> 200110089075</div>
                <div><strong data-lang="en">Institutional No.</strong><strong data-lang="es">N° Institucional</strong> 621</div>
                <div><strong data-lang="en">Transit No.</strong><strong data-lang="es">N° Tránsito</strong> 16001</div>
                <div><strong>Swift / BIC</strong> TRWICAW1XXX</div>
              </div>
              <button className="copy-btn" onClick={copyBankDetails} data-lang="en">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
                Copy Details
              </button>
              <button className="copy-btn" onClick={copyBankDetails} data-lang="es">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
                Copiar Datos
              </button>
              <div className="copy-msg" id="bank-copy-msg" data-lang="en" style={{ display: 'none' }}>Copied to clipboard!</div>
              <div className="copy-msg" id="bank-copy-msg-es" data-lang="es" style={{ display: 'none' }}>¡Copiado al portapapeles!</div>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="reveal">
        <div className="monogram-sm">MD</div>
        <p className="rsvp-quote" data-lang="en">&quot;Love is best celebrated when shared. Your presence will make this day even more memorable.&quot;</p>
        <p className="rsvp-quote" data-lang="es">&quot;El amor se celebra mejor cuando se comparte. Tu presencia hará este día aún más memorable.&quot;</p>
        <a href="https://forms.gle/sa8MYjsZBkkcWNQT7" target="_blank" rel="noreferrer" className="rsvp-btn" data-lang="en">RSVP Here</a>
        <a href="https://forms.gle/sa8MYjsZBkkcWNQT7" target="_blank" rel="noreferrer" className="rsvp-btn" data-lang="es">Confirmar Asistencia</a>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-mono">MD</div>
        <div className="footer-text">Marcela &amp; Daniel · August 27, 2026 · Llanogrande, Antioquia, Colombia</div>
        <div className="footer-text" style={{ marginTop: '8px' }}>
          <a href="mailto:danorlandop@gmail.com" style={{ color: 'inherit', opacity: 0.5, textDecoration: 'none' }}>danorlandop@gmail.com</a>
        </div>
      </footer>

    </div>
  );
}

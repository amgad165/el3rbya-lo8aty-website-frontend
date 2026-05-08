import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import type { MouseEvent } from 'react'
import type { IconType } from 'react-icons'
import { FaBrain, FaFlaskVial, FaPalette, FaPenNib, FaPeopleGroup } from 'react-icons/fa6'
import { GiOpenBook } from 'react-icons/gi'
import { Link, Route, Routes } from 'react-router-dom'

type SiteData = {
  site_name: string
  hero_title: string
  hero_subtitle: string
  hero_description: string
  cta_text: string
  phone: string
  whatsapp: string
  location_text: string
  instagram_url: string
  facebook_url: string
}

type IntroSection = {
  id: number
  section_key: 'about' | 'mission' | 'custom'
  title: string
  content: string
  image_url: string | null
  image2_url: string | null
}

type Feature = {
  id: number
  title: string
  description: string
  icon_url?: string
}

type Course = {
  id: number
  title: string
  short_description: string
  age_range: string
  cta_text: string
  image_url: string | null
  tag: string[]
}

type Teacher = {
  id: number
  full_name: string
  title: string
  bio: string
  image_url: string | null
}

type HomeResponse = {
  site: SiteData
  intro_sections: IntroSection[]
  features: Feature[]
  courses: Course[]
  teachers: Teacher[]
}

const FEATURE_ICONS: IconType[] = [FaPalette, GiOpenBook, FaBrain, FaFlaskVial, FaPenNib, FaPeopleGroup]

const getIcon = (iconUrl?: string | null, fallbackIndex: number = 0): IconType | string => {
  if (iconUrl) {
    return iconUrl
  }
  return FEATURE_ICONS[fallbackIndex % FEATURE_ICONS.length]
}

const FEATURE_FALLBACKS: Feature[] = [
  { id: -1, title: 'مهارات إبداعية', description: 'أنشطة فنية وتطبيقية تنمّي خيال الطفل وثقته بنفسه.' },
  { id: -2, title: 'تعلم ممتع', description: 'تعلّم تفاعلي بالألعاب والقصص والمسابقات داخل الصف.' },
  { id: -3, title: 'حب العربية', description: 'ترسيخ اللغة العربية بأسلوب قريب من الطفل وحياته اليومية.' },
  { id: -4, title: 'تجارب علمية', description: 'تجارب عملية مبسطة تفتح باب الاكتشاف والتفكير.' },
  { id: -5, title: 'كتابة وتعبير', description: 'تدريب تدريجي على الكتابة السليمة والتعبير الواضح.' },
  { id: -6, title: 'شراكة مع الأسرة', description: 'تواصل مستمر مع أولياء الأمور لدعم رحلة الطفل التعليمية.' },
]

const COURSE_BADGES = ['فن', 'نشاط', 'لغة', 'اكتشاف']
const COURSE_TAGS = ['برنامج مميز', 'برنامج تفاعلي', 'برنامج تأسيسي', 'برنامج متقدم']
const COURSE_FALLBACK_IMAGES = [
  '/assets/images/test3.jpeg',
  '/assets/images/test4.jpeg',
  '/assets/images/test5.jpeg',
  '/assets/images/test6.jpeg',
]

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000',
  withCredentials: true,
})

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  const handleSectionClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute('href')
    if (!href || !href.startsWith('#')) {
      closeMenu()
      return
    }

    event.preventDefault()
    closeMenu()

    const target = document.querySelector<HTMLElement>(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.replaceState(null, '', href)
      return
    }

    window.location.assign(`/${href}`)
  }

  return (
    <header className="topbar">
      <div className="topbar-inner container">
        <Link to="/" className="brand-wrap" aria-label="العودة للصفحة الرئيسية">
          <img src="/assets/images/logo.png" alt="شعار العربية لغتي" className="brand-logo" />
          <span className="brand">العربية لغتي</span>
        </Link>
        <nav className="nav-links" aria-label="روابط التنقل الرئيسية">
          <a href="#home" onClick={handleSectionClick}>الرئيسية</a>
          <a href="#about" onClick={handleSectionClick}>من نحن</a>
          <a href="#mission" onClick={handleSectionClick}>رسالتنا</a>
          <a href="#courses" onClick={handleSectionClick}>الدورات</a>
          <a href="#features" onClick={handleSectionClick}>ماذا نقدم</a>
          <a href="#teachers" onClick={handleSectionClick}>طاقم التدريس</a>
        </nav>
        <div className="nav-actions">
          <a className="contact-link" href="#contact" onClick={handleSectionClick}>تواصل</a>
          <div className="account-menu">
            <button type="button">حسابي ▾</button>
            <div className="dropdown">
              <Link to="/login">تسجيل الدخول</Link>
              <Link to="/signup">إنشاء حساب</Link>
            </div>
          </div>
          <button
            type="button"
            className="menu-toggle"
            aria-label="فتح قائمة التنقل"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            ☰
          </button>
        </div>
      </div>
      <div id="mobile-nav" className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}>
        <div className="mobile-menu-inner container">
          <a href="#home" onClick={handleSectionClick}>الرئيسية</a>
          <a href="#about" onClick={handleSectionClick}>من نحن</a>
          <a href="#mission" onClick={handleSectionClick}>رسالتنا</a>
          <a href="#courses" onClick={handleSectionClick}>الدورات</a>
          <a href="#features" onClick={handleSectionClick}>ماذا نقدم</a>
          <a href="#teachers" onClick={handleSectionClick}>طاقم التدريس</a>
          <a href="#contact" onClick={handleSectionClick}>تواصل</a>
          <Link to="/login" onClick={closeMenu}>تسجيل الدخول</Link>
          <Link to="/signup" onClick={closeMenu}>إنشاء حساب</Link>
        </div>
      </div>
    </header>
  )
}

function HomePage() {
  const [data, setData] = useState<HomeResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [introReady, setIntroReady] = useState(false)

  useEffect(() => {
    api.get<HomeResponse>('/api/public/home/')
      .then((res) => setData(res.data))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIntroReady(true)
    }, 900)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const isLoadingScreenVisible = loading || !introReady
    document.body.classList.toggle('is-site-loading', isLoadingScreenVisible)

    return () => {
      document.body.classList.remove('is-site-loading')
    }
  }, [loading, introReady])

  useEffect(() => {
    if (loading || !introReady || !data) {
      return
    }

    const sections = Array.from(document.querySelectorAll<HTMLElement>('main .reveal-section'))
    if (!sections.length) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    sections.forEach((section, index) => {
      section.style.setProperty('--reveal-delay', `${Math.min(index * 90, 540)}ms`)
    })

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [data, introReady, loading])

  const sectionMap = useMemo(() => {
    const map: Record<string, IntroSection | undefined> = {}
    data?.intro_sections.forEach((section) => {
      map[section.section_key] = section
    })
    return map
  }, [data])

  const showcaseFeatures = useMemo(() => {
    const existing = data?.features ?? []
    const needed = Math.max(0, 2 - existing.length)
    return [...existing, ...FEATURE_FALLBACKS.slice(0, needed)].slice(0, 6)
  }, [data?.features])

  if (loading || !introReady) {
    return (
      <main className="app-loading-screen" role="status" aria-live="polite" aria-label="جاري تحميل الموقع">
        <img src="/assets/images/logo.png" alt="" aria-hidden="true" className="app-loading-logo" />
        <div className="app-loading-spinner" aria-hidden="true" />
        <p>جارٍ تجهيز المحتوى...</p>
      </main>
    )
  }
  if (!data) return <main className="container"><p>تعذّر تحميل البيانات.</p></main>

  return (
    <main>
      <section id="home" className="hero reveal-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <p className="kicker">{data.site.site_name}</p>
            <h1>{data.site.hero_title}</h1>
            <p className="subtitle">{data.site.hero_subtitle}</p>
            <p className="hero-text">{data.site.hero_description}</p>
            <div className="hero-cta-row">
              <a className="cta" href={`https://wa.me/${data.site.whatsapp}`} target="_blank" rel="noreferrer">
                {data.site.cta_text}
              </a>
              <a className="cta ghost" href={`tel:${data.site.phone}`}>
                اتصال مباشر
              </a>
            </div>
            <div className="hero-meta">
              <span className="hero-meta-item">
                <span className="hero-meta-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <path d="M12 2.5C8.13 2.5 5 5.63 5 9.5C5 14.6 12 21.5 12 21.5C12 21.5 19 14.6 19 9.5C19 5.63 15.87 2.5 12 2.5ZM12 12.75C10.2 12.75 8.75 11.3 8.75 9.5C8.75 7.7 10.2 6.25 12 6.25C13.8 6.25 15.25 7.7 15.25 9.5C15.25 11.3 13.8 12.75 12 12.75Z" />
                  </svg>
                </span>
                <span>{data.site.location_text}</span>
              </span>
              <span className="hero-meta-item">
                <span className="hero-meta-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.68 14.91 16.08 14.82 16.43 14.93C17.55 15.3 18.76 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.24 8.7 6.45 9.07 7.57C9.18 7.92 9.09 8.32 8.82 8.59L6.62 10.79Z" />
                  </svg>
                </span>
                <span>{data.site.phone}</span>
              </span>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <img src="/assets/images/hero_boy.png" alt="" className="hero-boy" />
          </div>
        </div>
      </section>

      <section id="features" className="section section-features reveal-section">
        <div className="section-inner container">
          <p className="features-kicker">مزايانا</p>
          <h2>ماذا نقدم</h2>
          <div className="feature-grid feature-grid-showcase">
            {showcaseFeatures.map((feature, index) => {
              const icon = getIcon(feature.icon_url, index)
              const isImageIcon = typeof icon === 'string'
              const IconComponent = !isImageIcon ? (icon as IconType) : null

              return (
                <article className="feature feature-showcase-item" key={`${feature.id}-${index}`}>
                  <span className="feature-icon" aria-hidden="true">
                    {isImageIcon ? (
                      <img src={icon as string} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    ) : (
                      IconComponent && <IconComponent />
                    )}
                  </span>
                  <div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
      
      <section id="about" className="section section-about reveal-section">
        <div className="section-inner container about-layout">
          <div className="about-gallery" aria-hidden="true">
            <figure className="about-photo photo-main">
              <img src={sectionMap.about?.image_url ?? '/assets/images/about-girl.png'} alt="" />
            </figure>
            <figure className="about-photo photo-side">
              <img src={sectionMap.about?.image2_url ?? '/assets/images/about-boy.png'} alt="" />
            </figure>
          </div>

          <article className="about-card">
            <p className="about-date">منذ ٢٠٢٣</p>
            <h2>{sectionMap.about?.title ?? 'من نحن'}</h2>
            <p className="about-lead">نصنع بيئة تعليمية ممتعة تساعد أطفالنا على إتقان العربية بثقة وحب.</p>
            <p className="about-body">{sectionMap.about?.content ?? 'نحن مركز تعليمي عربي يركز على تنمية الطفل بأسلوب ممتع وآمن.'}</p>
            <p className="about-contact-label">للتواصل المباشر:</p>
            <a className="about-phone" href={`tel:${data.site.phone}`}>{data.site.phone}</a>
          </article>
        </div>
      </section>

      <section id="mission" className="section section-mission reveal-section">
        <div className="section-inner container mission-layout">
          <article className="mission-copy">
            <p className="mission-kicker">فريقنا التعليمي</p>
            <h2>{sectionMap.mission?.title ?? 'رسالتنا'}</h2>
            <p className="mission-lead">+10 سنوات خبرة في تأسيس الأطفال وتعليم اللغة العربية بأساليب تفاعلية حديثة.</p>
            <p>{sectionMap.mission?.content ?? 'نعمل بخطة تربوية واضحة تجمع بين المتعة والانضباط لبناء طفل واثق بلغته وهويته.'}</p>
            <p className="mission-stats">أكثر من ١٬٨٠٠ طفل التحقوا ببرامجنا بنجاح</p>
            <a href="#courses" className="mission-cta">تصفح الدورات</a>
          </article>

          <div className="mission-gallery" aria-hidden="true">
            <figure className="mission-photo mission-photo-a">
              <img src={sectionMap.mission?.image_url ?? '/assets/images/test6.jpeg'} alt="" />
            </figure>
            <figure className="mission-photo mission-photo-b">
              <img src={sectionMap.mission?.image2_url ?? '/assets/images/test7.jpeg'} alt="" />
            </figure>
          </div>
        </div>
      </section>

      <section id="courses" className="section section-courses reveal-section">
        <div className="section-inner container">
          <div className="section-header section-header-centered">
            <p className="courses-kicker">برامجنا</p>
            <h2>الدورات</h2>
            <span>{data.courses.length} دورات مميزة</span>
          </div>
          <div className="card-grid course-grid">
            {data.courses.map((course, index) => (
              <article className="card course-card" key={course.id}>
                <div className="course-media">
                  <img src={course.image_url ?? COURSE_FALLBACK_IMAGES[index % COURSE_FALLBACK_IMAGES.length]} alt={course.title} />
                  <span className="course-badge">{course.tag}</span>
                </div>
                <div className="course-content">
                  <p className="course-tag">{COURSE_TAGS[index % COURSE_TAGS.length]}</p>
                  <h3>{course.title}</h3>
                  <p>{course.short_description}</p>
                  <div className="course-meta-row">
                    <span><GiOpenBook /> {course.age_range}</span>
                    <span><FaPeopleGroup /> مجموعات صغيرة</span>
                    <span><FaPenNib /> {course.cta_text}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>



      <section id="teachers" className="section reveal-section">
        <div className="section-inner container">
          <h2>طاقم التدريس</h2>
          <div className="teacher-grid">
            {data.teachers.map((teacher) => (
              <article key={teacher.id} className="teacher">
                <img src={teacher.image_url ?? '/assets/images/teacher1.png'} alt={teacher.full_name} />
                <h3>{teacher.full_name}</h3>
                <p className="teacher-title">{teacher.title}</p>
                <p className="teacher-bio">{teacher.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="footer">
        <div className="container footer-grid">
          <a href={`tel:${data.site.phone}`}>هاتف: {data.site.phone}</a>
          <a href={`https://wa.me/${data.site.whatsapp}`} target="_blank" rel="noreferrer">واتساب: {data.site.whatsapp}</a>
          <span>{data.site.location_text}</span>
          <div>
            {data.site.instagram_url && <a href={data.site.instagram_url} target="_blank" rel="noreferrer">Instagram</a>}
            {data.site.facebook_url && <a href={data.site.facebook_url} target="_blank" rel="noreferrer">Facebook</a>}
          </div>
        </div>
      </footer>
    </main>
  )
}

function LoginPage() {
  const [error, setError] = useState('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    try {
      await api.post('/api/auth/login/', {
        username: form.get('username'),
        password: form.get('password'),
      })
      window.location.href = '/'
    } catch {
      setError('تعذر تسجيل الدخول. تحقق من البيانات.')
    }
  }

  return (
    <main className="auth-page container">
      <h1>تسجيل الدخول</h1>
      <form onSubmit={onSubmit} className="auth-form">
        <input name="username" placeholder="اسم المستخدم" required />
        <input name="password" type="password" placeholder="كلمة المرور" required />
        {error && <p className="error">{error}</p>}
        <button className="cta" type="submit">دخول</button>
      </form>
    </main>
  )
}

function SignupPage() {
  const [error, setError] = useState('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    try {
      await api.post('/api/auth/signup/', {
        username: form.get('username'),
        email: form.get('email'),
        password: form.get('password'),
      })
      window.location.href = '/'
    } catch {
      setError('تعذر إنشاء الحساب. ربما اسم المستخدم مستخدم مسبقاً.')
    }
  }

  return (
    <main className="auth-page container">
      <h1>إنشاء حساب</h1>
      <form onSubmit={onSubmit} className="auth-form">
        <input name="username" placeholder="اسم المستخدم" required />
        <input name="email" type="email" placeholder="البريد الإلكتروني" />
        <input name="password" type="password" placeholder="كلمة المرور" required minLength={8} />
        {error && <p className="error">{error}</p>}
        <button className="cta" type="submit">إنشاء الحساب</button>
      </form>
    </main>
  )
}

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </>
  )
}

export default App

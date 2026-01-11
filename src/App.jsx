import { useState, useEffect } from 'react'
import {
  Zap,
  MessageSquare,
  BarChart3,
  Globe,
  Bell,
  Users,
  Check,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  Star,
  Clock,
  TrendingUp
} from 'lucide-react'
import './App.css'

// Navbar Component
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-content">
        <a href="#" className="logo">
          <Zap className="logo-icon" />
          <span>Pronto</span>
        </a>

        <div className={`nav-links ${isMobileOpen ? 'open' : ''}`}>
          <a href="#features">Funcionalidades</a>
          <a href="#pricing">Preços</a>
          <a href="#testimonials">Testemunhos</a>
          <a href="#faq">FAQ</a>
        </div>

        <div className="nav-actions">
          <button className="btn btn-secondary nav-login">Entrar</button>
          <button className="btn btn-primary">Começar Grátis</button>
        </div>

        <button className="mobile-toggle" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  )
}

// Hero Component
function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-glow" />
        <div className="hero-grid" />
      </div>

      <div className="container hero-content">
        <div className="hero-badge">
          <Zap size={14} />
          <span>A plataforma #1 para agentes imobiliários</span>
        </div>

        <h1>
          Responda a leads em <span className="gradient-text">30 segundos</span>.<br />
          Feche mais negócios.
        </h1>

        <p className="hero-subtitle">
          Os agentes que respondem primeiro ganham 78% dos negócios.
          O Pronto unifica todos os seus portais, responde automaticamente
          com IA e nunca mais perde um lead.
        </p>

        <div className="hero-cta">
          <div className="hero-input-group">
            <input
              type="email"
              className="input hero-input"
              placeholder="O seu email profissional"
            />
            <button className="btn btn-primary btn-lg">
              Começar Grátis
              <ArrowRight size={20} />
            </button>
          </div>
          <p className="hero-note">7 dias grátis • Sem cartão de crédito</p>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-value">2.500+</span>
            <span className="stat-label">Agentes ativos</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-value">150k+</span>
            <span className="stat-label">Leads processados</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-value">30s</span>
            <span className="stat-label">Tempo médio de resposta</span>
          </div>
        </div>
      </div>

      <div className="hero-mockup">
        <div className="mockup-window animate-float">
          <div className="mockup-header">
            <div className="mockup-dots">
              <span /><span /><span />
            </div>
            <span className="mockup-title">Pronto Dashboard</span>
          </div>
          <div className="mockup-content">
            <div className="mockup-sidebar">
              <div className="mockup-nav-item active"><MessageSquare size={16} /> Inbox</div>
              <div className="mockup-nav-item"><BarChart3 size={16} /> Analytics</div>
              <div className="mockup-nav-item"><Globe size={16} /> Portais</div>
            </div>
            <div className="mockup-main">
              <div className="mockup-lead new">
                <div className="lead-indicator" />
                <div className="lead-info">
                  <strong>João Silva</strong>
                  <span>Interessado em T3 Lisboa • Idealista</span>
                </div>
                <span className="lead-time">Agora</span>
              </div>
              <div className="mockup-lead">
                <div className="lead-info">
                  <strong>Maria Santos</strong>
                  <span>Pedido de visita • Imovirtual</span>
                </div>
                <span className="lead-time">2 min</span>
              </div>
              <div className="mockup-lead">
                <div className="lead-info">
                  <strong>Pedro Costa</strong>
                  <span>Questão sobre preço • Casa Sapo</span>
                </div>
                <span className="lead-time">5 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Features Component
function Features() {
  const features = [
    {
      icon: <MessageSquare />,
      title: 'Inbox Unificado',
      description: 'Todas as mensagens de todos os portais num único lugar. Nunca mais perca um lead.'
    },
    {
      icon: <Zap />,
      title: 'Resposta IA Instantânea',
      description: 'O nosso assistente responde automaticamente em segundos, 24 horas por dia, 7 dias por semana.'
    },
    {
      icon: <BarChart3 />,
      title: 'Analytics Avançado',
      description: 'Veja o seu tempo de resposta, taxa de conversão e compare com a média do mercado.'
    },
    {
      icon: <Globe />,
      title: 'Multi-Portal',
      description: 'Publique em Idealista, Imovirtual, Casa Sapo e mais com um clique.'
    },
    {
      icon: <Bell />,
      title: 'Alertas Instantâneos',
      description: 'Notificações por WhatsApp, SMS e email no momento em que chega um novo lead.'
    },
    {
      icon: <Users />,
      title: 'Gestão de Equipa',
      description: 'Distribua leads automaticamente pela sua equipa com regras personalizadas.'
    }
  ]

  return (
    <section className="section features" id="features">
      <div className="container">
        <div className="section-header">
          <span className="badge">Funcionalidades</span>
          <h2>Tudo o que precisa para <span className="gradient-text">vender mais</span></h2>
          <p>Uma plataforma completa para dominar o mercado imobiliário português.</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="card feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Pricing Component
function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: '39',
      description: 'Ideal para agentes independentes',
      features: [
        '1 portal integrado',
        'Inbox unificado',
        'Alertas por email',
        'Suporte por email',
        '100 leads/mês'
      ],
      cta: 'Começar Grátis',
      popular: false
    },
    {
      name: 'Pro',
      price: '89',
      description: 'Para agentes que querem crescer',
      features: [
        'Todos os portais',
        'Resposta IA automática',
        'Analytics completo',
        'Alertas WhatsApp + SMS',
        'Leads ilimitados',
        'Suporte prioritário'
      ],
      cta: 'Começar Grátis',
      popular: true
    },
    {
      name: 'Team',
      price: '180',
      description: 'Para equipas e agências',
      features: [
        'Tudo do Pro',
        'Até 5 utilizadores',
        'Distribuição de leads',
        'Relatórios de equipa',
        'API access',
        'Gestor de conta dedicado'
      ],
      cta: 'Contactar Vendas',
      popular: false
    }
  ]

  return (
    <section className="section pricing" id="pricing">
      <div className="container">
        <div className="section-header">
          <span className="badge">Preços</span>
          <h2>Simples e <span className="gradient-text">transparente</span></h2>
          <p>Sem surpresas. Cancele quando quiser.</p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div key={index} className={`card pricing-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <span className="popular-badge">Mais Popular</span>}
              <div className="pricing-header">
                <h3>{plan.name}</h3>
                <p>{plan.description}</p>
                <div className="pricing-amount">
                  <span className="currency">€</span>
                  <span className="price">{plan.price}</span>
                  <span className="period">/mês</span>
                </div>
              </div>
              <ul className="pricing-features">
                {plan.features.map((feature, i) => (
                  <li key={i}>
                    <Check size={18} className="check-icon" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} btn-full`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonials Component
function Testimonials() {
  const testimonials = [
    {
      name: 'Ricardo Ferreira',
      role: 'Agente Imobiliário, Lisboa',
      content: 'Desde que uso o Pronto, o meu tempo de resposta passou de 2 horas para 30 segundos. Já fechei 40% mais negócios este trimestre.',
      rating: 5
    },
    {
      name: 'Ana Rodrigues',
      role: 'Diretora, Imobiliária Central',
      content: 'A nossa equipa de 8 agentes ficou muito mais organizada. Os leads são distribuídos automaticamente e ninguém perde oportunidades.',
      rating: 5
    },
    {
      name: 'Miguel Sousa',
      role: 'Consultor RE/MAX',
      content: 'O assistente de IA é incrível. Responde às 3 da manhã enquanto eu durmo. Já acordei com visitas marcadas!',
      rating: 5
    }
  ]

  return (
    <section className="section testimonials" id="testimonials">
      <div className="container">
        <div className="section-header">
          <span className="badge">Testemunhos</span>
          <h2>O que dizem os <span className="gradient-text">nossos clientes</span></h2>
          <p>Junte-se a milhares de agentes que já transformaram o seu negócio.</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card testimonial-card">
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="testimonial-content">"{testimonial.content}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{testimonial.name[0]}</div>
                <div className="author-info">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// FAQ Component
function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'Quanto tempo demora a configurar?',
      answer: 'Menos de 5 minutos. Basta conectar os seus portais e está pronto a receber leads no Pronto.'
    },
    {
      question: 'Funciona com que portais?',
      answer: 'Atualmente integramos com Idealista, Imovirtual, Casa Sapo, Supercasa e o seu próprio website. Estamos sempre a adicionar novos.'
    },
    {
      question: 'O assistente IA responde em português?',
      answer: 'Sim! O nosso assistente foi treinado especificamente para o mercado português e responde de forma natural e profissional.'
    },
    {
      question: 'Posso cancelar a qualquer momento?',
      answer: 'Absolutamente. Sem contratos de fidelização. Pode cancelar quando quiser e os seus dados são seus.'
    },
    {
      question: 'Oferecem teste gratuito?',
      answer: 'Sim, 7 dias grátis com todas as funcionalidades. Sem necessidade de cartão de crédito.'
    }
  ]

  return (
    <section className="section faq" id="faq">
      <div className="container">
        <div className="section-header">
          <span className="badge">FAQ</span>
          <h2>Perguntas <span className="gradient-text">frequentes</span></h2>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? 'open' : ''}`}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="faq-question">
                <span>{faq.question}</span>
                <ChevronDown className="faq-icon" />
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
function CTASection() {
  return (
    <section className="section cta-section">
      <div className="container">
        <div className="cta-box glow">
          <h2>Pronto para <span className="gradient-text">fechar mais negócios</span>?</h2>
          <p>Junte-se aos agentes que já estão a ganhar vantagem competitiva.</p>
          <div className="cta-buttons">
            <button className="btn btn-primary btn-lg">
              Começar Grátis
              <ArrowRight size={20} />
            </button>
            <button className="btn btn-secondary btn-lg">
              Agendar Demo
            </button>
          </div>
          <div className="cta-features">
            <span><Check size={16} /> 7 dias grátis</span>
            <span><Check size={16} /> Sem cartão de crédito</span>
            <span><Check size={16} /> Cancelamento fácil</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer Component
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="logo">
              <Zap className="logo-icon" />
              <span>Pronto</span>
            </a>
            <p>A plataforma que ajuda agentes imobiliários a responder mais rápido e fechar mais negócios.</p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Produto</h4>
              <a href="#features">Funcionalidades</a>
              <a href="#pricing">Preços</a>
              <a href="#">Integrações</a>
              <a href="#">Changelog</a>
            </div>
            <div className="footer-column">
              <h4>Empresa</h4>
              <a href="#">Sobre nós</a>
              <a href="#">Blog</a>
              <a href="#">Carreiras</a>
              <a href="#">Contacto</a>
            </div>
            <div className="footer-column">
              <h4>Legal</h4>
              <a href="#">Privacidade</a>
              <a href="#">Termos</a>
              <a href="#">RGPD</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Pronto. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

// Main App
function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  )
}

export default App

import { useState, useEffect } from 'react'
import { sendMessage } from '../services/api.js'
import {
    Zap,
    MessageSquare,
    BarChart3,
    Globe,
    Bell,
    Settings,
    Search,
    Send,
    Paperclip,
    Smile,
    MoreVertical,
    Phone,
    Mail,
    MapPin,
    Home,
    Clock,
    CheckCheck,
    Sparkles,
    ChevronDown,
    User,
    LogOut,
    Calendar,
    TrendingUp,
    Users,
    Filter,
    Star,
    Archive,
    Trash2,
    Reply,
    Forward,
    Tag
} from 'lucide-react'
import './Dashboard.css'

// Sample lead data
const sampleLeads = [
    {
        id: 1,
        propertyId: 'prop-001',
        name: 'João Silva',
        email: 'joao.silva@email.com',
        phone: '+351 912 345 678',
        property: 'T3 Apartamento em Lisboa, Parque das Nações',
        propertyPrice: '€485.000',
        source: 'Idealista',
        status: 'new',
        priority: 'hot',
        score: 85,
        time: 'Agora',
        unread: true,
        messages: [
            {
                id: 1,
                type: 'received',
                text: 'Olá, estou interessado no apartamento T3 em Parque das Nações. Está disponível para visita este fim de semana?',
                time: '10:32'
            }
        ]
    },
    {
        id: 2,
        propertyId: 'prop-002',
        name: 'Maria Santos',
        email: 'maria.santos@gmail.com',
        phone: '+351 923 456 789',
        property: 'Moradia V4 em Cascais',
        propertyPrice: '€750.000',
        source: 'Imovirtual',
        status: 'responded',
        priority: 'warm',
        score: 70,
        time: '5 min',
        unread: false,
        messages: [
            {
                id: 1,
                type: 'received',
                text: 'Boa tarde! Vi o vosso anúncio da moradia em Cascais. Qual é a área do terreno?',
                time: '10:15'
            },
            {
                id: 2,
                type: 'sent',
                text: 'Olá Maria! Obrigado pelo seu interesse. O terreno tem 850m². Posso agendar uma visita para si?',
                time: '10:20',
                status: 'delivered'
            }
        ]
    },
    {
        id: 3,
        propertyId: 'prop-003',
        name: 'Pedro Costa',
        email: 'pedro.costa@outlook.pt',
        phone: '+351 934 567 890',
        property: 'T2 Renovado no Porto',
        propertyPrice: '€295.000',
        source: 'Casa Sapo',
        status: 'scheduled',
        priority: 'warm',
        score: 75,
        time: '15 min',
        unread: false,
        messages: [
            {
                id: 1,
                type: 'received',
                text: 'Bom dia, o apartamento ainda está disponível?',
                time: '09:45'
            },
            {
                id: 2,
                type: 'sent',
                text: 'Bom dia Pedro! Sim, está disponível. Quando gostaria de visitar?',
                time: '09:50',
                status: 'read'
            },
            {
                id: 3,
                type: 'received',
                text: 'Seria possível amanhã às 15h?',
                time: '10:00'
            },
            {
                id: 4,
                type: 'sent',
                text: 'Perfeito! Fica agendado para amanhã às 15h. Envio-lhe a morada por SMS.',
                time: '10:05',
                status: 'read'
            }
        ]
    },
    {
        id: 4,
        propertyId: 'prop-004',
        name: 'Ana Rodrigues',
        email: 'ana.rodrigues@sapo.pt',
        phone: '+351 945 678 901',
        property: 'Loja Comercial em Braga',
        propertyPrice: '€180.000',
        source: 'Website',
        status: 'new',
        priority: 'cold',
        score: 45,
        time: '1 hora',
        unread: true,
        messages: [
            {
                id: 1,
                type: 'received',
                text: 'Gostaria de saber mais informações sobre o espaço comercial. Qual é a renda mensal estimada?',
                time: '09:30'
            }
        ]
    }
]

// AI Response Templates
const aiTemplates = [
    {
        id: 1,
        name: 'Saudação inicial',
        text: 'Olá [NOME]! Obrigado pelo seu interesse no [IMÓVEL]. Terei todo o gosto em ajudá-lo. Posso agendar uma visita para si?'
    },
    {
        id: 2,
        name: 'Agendar visita',
        text: 'Excelente! Tenho disponibilidade para visitas durante a semana das 10h às 19h e aos sábados das 10h às 13h. Qual seria o melhor horário para si?'
    },
    {
        id: 3,
        name: 'Confirmar visita',
        text: 'Perfeito, fica confirmada a visita para [DATA] às [HORA]. Enviarei a morada exata por SMS. Até breve!'
    },
    {
        id: 4,
        name: 'Responder a preço',
        text: 'O valor anunciado é [PREÇO]. Posso informar que o proprietário está aberto a propostas. Gostaria de agendar uma visita para conhecer pessoalmente o imóvel?'
    },
    {
        id: 5,
        name: 'Follow-up',
        text: 'Olá [NOME]! Escrevo para saber se ainda tem interesse no [IMÓVEL]. Continuo à disposição para qualquer esclarecimento.'
    }
]

// Quick Replies
const quickReplies = [
    'Sim, está disponível!',
    'Quando gostaria de visitar?',
    'Posso ligar-lhe agora?',
    'Envio mais fotos por email',
    'Qual é o seu orçamento?',
    'Tenho outras opções similares'
]

// Sidebar Component
function Sidebar({ activeSection, setActiveSection }) {
    const navItems = [
        { id: 'inbox', icon: <MessageSquare size={20} />, label: 'Inbox', badge: 2 },
        { id: 'analytics', icon: <BarChart3 size={20} />, label: 'Analytics' },
        { id: 'portals', icon: <Globe size={20} />, label: 'Portais' },
        { id: 'calendar', icon: <Calendar size={20} />, label: 'Agenda' },
        { id: 'contacts', icon: <Users size={20} />, label: 'Contactos' }
    ]

    return (
        <aside className="dashboard-sidebar">
            <div className="sidebar-logo">
                <Zap className="logo-icon" />
                <span>Pronto</span>
            </div>

            <nav className="sidebar-nav">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                        onClick={() => setActiveSection(item.id)}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                        {item.badge && <span className="nav-badge">{item.badge}</span>}
                    </button>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button className="nav-item">
                    <Settings size={20} />
                    <span>Definições</span>
                </button>
                <div className="user-profile">
                    <div className="user-avatar">RF</div>
                    <div className="user-info">
                        <strong>Ricardo Ferreira</strong>
                        <span>Agente Pro</span>
                    </div>
                    <ChevronDown size={16} />
                </div>
            </div>
        </aside>
    )
}

// Lead List Component
function LeadList({ leads, selectedLead, onSelectLead, filter, setFilter }) {
    const getStatusColor = (status) => {
        switch (status) {
            case 'new': return 'status-new'
            case 'responded': return 'status-responded'
            case 'scheduled': return 'status-scheduled'
            default: return ''
        }
    }

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'hot': return <span className="priority-badge hot">🔥</span>
            case 'warm': return <span className="priority-badge warm">⭐</span>
            default: return null
        }
    }

    const getSourceIcon = (source) => {
        const colors = {
            'Idealista': '#00a4bd',
            'Imovirtual': '#ff6600',
            'Casa Sapo': '#8bc34a',
            'Website': '#6366f1'
        }
        return (
            <span className="source-badge" style={{ background: colors[source] || '#666' }}>
                {source}
            </span>
        )
    }

    return (
        <div className="lead-list-container">
            <div className="lead-list-header">
                <h2>Inbox</h2>
                <div className="lead-list-actions">
                    <div className="search-box">
                        <Search size={18} />
                        <input type="text" placeholder="Pesquisar leads..." />
                    </div>
                    <button className="filter-btn">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            <div className="lead-filter-tabs">
                <button
                    className={filter === 'all' ? 'active' : ''}
                    onClick={() => setFilter('all')}
                >
                    Todos <span className="count">{leads.length}</span>
                </button>
                <button
                    className={filter === 'unread' ? 'active' : ''}
                    onClick={() => setFilter('unread')}
                >
                    Não lidos <span className="count">{leads.filter(l => l.unread).length}</span>
                </button>
                <button
                    className={filter === 'scheduled' ? 'active' : ''}
                    onClick={() => setFilter('scheduled')}
                >
                    Agendados <span className="count">{leads.filter(l => l.status === 'scheduled').length}</span>
                </button>
            </div>

            <div className="lead-list">
                {leads.map(lead => (
                    <div
                        key={lead.id}
                        className={`lead-item ${selectedLead?.id === lead.id ? 'selected' : ''} ${lead.unread ? 'unread' : ''}`}
                        onClick={() => onSelectLead(lead)}
                    >
                        <div className="lead-avatar">
                            {lead.name.split(' ').map(n => n[0]).join('')}
                            {lead.unread && <span className="unread-dot" />}
                        </div>
                        <div className="lead-content">
                            <div className="lead-header">
                                <span className="lead-name">
                                    {lead.name}
                                    {getPriorityIcon(lead.priority)}
                                </span>
                                <span className="lead-time">{lead.time}</span>
                            </div>
                            <p className="lead-property">{lead.property}</p>
                            <div className="lead-meta">
                                {getSourceIcon(lead.source)}
                                <span className={`status-dot ${getStatusColor(lead.status)}`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// Conversation Component
function Conversation({ lead, onSendMessage, onSimulateLead }) {
    const [message, setMessage] = useState('')
    const [showAI, setShowAI] = useState(false)
    const [showQuickReplies, setShowQuickReplies] = useState(false)
    const [aiAutoResponse, setAiAutoResponse] = useState(true)

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message, aiAutoResponse)
            setMessage('')
        }
    }

    const handleSimulateLead = () => {
        const demoMessages = [
            'Qual é a área do apartamento?',
            'Está disponível para visita sábado?',
            'Qual é o preço?',
            'Tem garagem?',
            'Aceita proposta?'
        ]
        const randomMsg = demoMessages[Math.floor(Math.random() * demoMessages.length)]
        if (onSimulateLead) {
            onSimulateLead(randomMsg)
        }
    }

    const handleAISelect = (template) => {
        let text = template.text
        text = text.replace('[NOME]', lead.name.split(' ')[0])
        text = text.replace('[IMÓVEL]', lead.property)
        text = text.replace('[PREÇO]', lead.propertyPrice)
        setMessage(text)
        setShowAI(false)
    }

    const handleQuickReply = (reply) => {
        setMessage(reply)
        setShowQuickReplies(false)
    }

    if (!lead) {
        return (
            <div className="conversation-empty">
                <MessageSquare size={48} />
                <h3>Selecione uma conversa</h3>
                <p>Escolha um lead da lista para ver a conversa</p>
            </div>
        )
    }

    return (
        <div className="conversation-container">
            <div className="conversation-header">
                <div className="conversation-contact">
                    <div className="contact-avatar">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="contact-info">
                        <h3>{lead.name}</h3>
                        <span className="contact-property">{lead.property}</span>
                    </div>
                </div>
                <div className="conversation-actions">
                    <button className="action-btn" title="Ligar">
                        <Phone size={18} />
                    </button>
                    <button className="action-btn" title="Email">
                        <Mail size={18} />
                    </button>
                    <button className="action-btn" title="Mais opções">
                        <MoreVertical size={18} />
                    </button>
                </div>
            </div>

            <div className="conversation-messages">
                {lead.messages.map(msg => (
                    <div key={msg.id} className={`message ${msg.type}`}>
                        <div className="message-bubble">
                            <p>{msg.text}</p>
                            <span className="message-time">
                                {msg.time}
                                {msg.type === 'sent' && msg.status && (
                                    <CheckCheck size={14} className={msg.status === 'read' ? 'read' : ''} />
                                )}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="conversation-composer">
                {showAI && (
                    <div className="ai-templates-panel">
                        <div className="ai-templates-header">
                            <Sparkles size={18} />
                            <span>Sugestões IA</span>
                            <button onClick={() => setShowAI(false)}>×</button>
                        </div>
                        <div className="ai-templates-list">
                            {aiTemplates.map(template => (
                                <button
                                    key={template.id}
                                    className="ai-template"
                                    onClick={() => handleAISelect(template)}
                                >
                                    <strong>{template.name}</strong>
                                    <p>{template.text.substring(0, 60)}...</p>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {showQuickReplies && (
                    <div className="quick-replies-panel">
                        {quickReplies.map((reply, idx) => (
                            <button
                                key={idx}
                                className="quick-reply-btn"
                                onClick={() => handleQuickReply(reply)}
                            >
                                {reply}
                            </button>
                        ))}
                    </div>
                )}

                <div className="composer-toolbar">
                    <button
                        className={`toolbar-btn ${aiAutoResponse ? 'active' : ''}`}
                        onClick={() => setAiAutoResponse(!aiAutoResponse)}
                        title="IA Auto-resposta"
                        style={{ marginRight: 'auto' }}
                    >
                        <Sparkles size={18} />
                        <span>Auto IA {aiAutoResponse ? 'ON' : 'OFF'}</span>
                    </button>
                    <button
                        className="toolbar-btn"
                        onClick={handleSimulateLead}
                        title="Simular mensagem do lead (demo)"
                        style={{ background: 'rgba(34, 197, 94, 0.2)', borderColor: '#22c55e' }}
                    >
                        <User size={18} />
                        <span>Simular Lead</span>
                    </button>
                    <button
                        className={`toolbar-btn ${showAI ? 'active' : ''}`}
                        onClick={() => { setShowAI(!showAI); setShowQuickReplies(false) }}
                        title="Templates IA"
                    >
                        <Sparkles size={18} />
                        <span>Templates</span>
                    </button>
                    <button
                        className={`toolbar-btn ${showQuickReplies ? 'active' : ''}`}
                        onClick={() => { setShowQuickReplies(!showQuickReplies); setShowAI(false) }}
                        title="Respostas rápidas"
                    >
                        <Reply size={18} />
                        <span>Rápidas</span>
                    </button>
                </div>

                <div className="composer-input">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Escreva a sua mensagem..."
                        rows={3}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault()
                                handleSend()
                            }
                        }}
                    />
                    <button
                        className="send-btn"
                        onClick={handleSend}
                        disabled={!message.trim()}
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}

// Lead Detail Panel
function LeadDetail({ lead }) {
    if (!lead) return null

    return (
        <div className="lead-detail-panel">
            <div className="detail-header">
                <h3>Detalhes do Lead</h3>
                <button className="edit-btn">Editar</button>
            </div>

            <div className="detail-section">
                <h4>Contacto</h4>
                <div className="detail-item">
                    <Mail size={16} />
                    <span>{lead.email}</span>
                </div>
                <div className="detail-item">
                    <Phone size={16} />
                    <span>{lead.phone}</span>
                </div>
            </div>

            <div className="detail-section">
                <h4>Imóvel de Interesse</h4>
                <div className="property-card">
                    <Home size={20} />
                    <div>
                        <strong>{lead.property}</strong>
                        <span className="property-price">{lead.propertyPrice}</span>
                    </div>
                </div>
            </div>

            <div className="detail-section">
                <h4>Origem</h4>
                <div className="detail-item">
                    <Globe size={16} />
                    <span>{lead.source}</span>
                </div>
            </div>

            <div className="detail-section">
                <h4>Estatísticas</h4>
                <div className="stats-grid">
                    <div className="stat-item">
                        <Clock size={16} />
                        <div>
                            <span className="stat-value">30s</span>
                            <span className="stat-label">Tempo de resposta</span>
                        </div>
                    </div>
                    <div className="stat-item">
                        <MessageSquare size={16} />
                        <div>
                            <span className="stat-value">{lead.messages.length}</span>
                            <span className="stat-label">Mensagens</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="detail-actions">
                <button className="btn btn-primary btn-full">
                    <Calendar size={18} />
                    Agendar Visita
                </button>
                <button className="btn btn-secondary btn-full">
                    <Tag size={18} />
                    Adicionar Etiqueta
                </button>
            </div>
        </div>
    )
}

// Main Dashboard Component
function Dashboard() {
    const [activeSection, setActiveSection] = useState('inbox')
    const [selectedLead, setSelectedLead] = useState(null)
    const [filter, setFilter] = useState('all')
    const [leads, setLeads] = useState(sampleLeads)

    const filteredLeads = leads.filter(lead => {
        if (filter === 'unread') return lead.unread
        if (filter === 'scheduled') return lead.status === 'scheduled'
        return true
    })

    const [isAIResponding, setIsAIResponding] = useState(false)

    // Simulate a lead message (for demo purposes)
    const handleSimulateLead = async (text) => {
        if (!selectedLead) return

        // Add lead's message (received)
        const leadMessage = {
            id: Date.now(),
            type: 'received',
            text,
            time: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })
        }

        const updateLeadWithMessage = (lead, newMessage, extraUpdates = {}) => ({
            ...lead,
            messages: [...lead.messages, newMessage],
            ...extraUpdates
        })

        setLeads(prevLeads =>
            prevLeads.map(lead =>
                lead.id === selectedLead.id
                    ? updateLeadWithMessage(lead, leadMessage, { unread: true })
                    : lead
            )
        )

        setSelectedLead(prev => updateLeadWithMessage(prev, leadMessage, { unread: true }))

        // Auto-respond with AI
        setIsAIResponding(true)
        try {
            const result = await sendMessage(
                text,
                selectedLead.propertyId,
                `lead-${selectedLead.id}`,
                { name: selectedLead.name, email: selectedLead.email, phone: selectedLead.phone }
            )

            if (result.success && result.response) {
                const aiMessage = {
                    id: Date.now() + 1,
                    type: 'sent',
                    text: result.response.message,
                    time: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
                    status: 'delivered',
                    isAI: true
                }

                const newPriority = result.leadScore?.value >= 80 ? 'hot' :
                    result.leadScore?.value >= 50 ? 'warm' : 'cold'

                setLeads(prevLeads =>
                    prevLeads.map(lead =>
                        lead.id === selectedLead.id
                            ? updateLeadWithMessage(lead, aiMessage, { priority: newPriority, score: result.leadScore?.value, unread: false, status: 'responded' })
                            : lead
                    )
                )

                setSelectedLead(prev => updateLeadWithMessage(prev, aiMessage, { priority: newPriority, score: result.leadScore?.value, unread: false, status: 'responded' }))
            }
        } catch (error) {
            console.error('AI response error:', error)
        } finally {
            setIsAIResponding(false)
        }
    }

    // Agent sends a manual message
    const handleSendMessage = async (text, useAI = false) => {
        if (!selectedLead) return

        // Add agent's message
        const agentMessage = {
            id: Date.now(),
            type: 'sent',
            text,
            time: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
            status: 'sent',
            isAI: false
        }

        const updateLeadWithMessage = (lead, newMessage, extraUpdates = {}) => ({
            ...lead,
            messages: [...lead.messages, newMessage],
            ...extraUpdates
        })

        setLeads(prevLeads =>
            prevLeads.map(lead =>
                lead.id === selectedLead.id
                    ? updateLeadWithMessage(lead, agentMessage, { status: 'responded', unread: false })
                    : lead
            )
        )

        setSelectedLead(prev => updateLeadWithMessage(prev, agentMessage, { status: 'responded', unread: false }))
    }

    return (
        <div className="dashboard">
            <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

            <main className="dashboard-main">
                {activeSection === 'inbox' && (
                    <>
                        <LeadList
                            leads={filteredLeads}
                            selectedLead={selectedLead}
                            onSelectLead={setSelectedLead}
                            filter={filter}
                            setFilter={setFilter}
                        />
                        <Conversation
                            lead={selectedLead}
                            onSendMessage={handleSendMessage}
                            onSimulateLead={handleSimulateLead}
                        />
                        <LeadDetail lead={selectedLead} />
                    </>
                )}

                {activeSection === 'analytics' && (
                    <div className="analytics-placeholder">
                        <BarChart3 size={48} />
                        <h2>Analytics</h2>
                        <p>Dashboard de métricas em desenvolvimento</p>
                    </div>
                )}

                {activeSection === 'portals' && (
                    <div className="analytics-placeholder">
                        <Globe size={48} />
                        <h2>Gestão de Portais</h2>
                        <p>Conexão com portais em desenvolvimento</p>
                    </div>
                )}
            </main>
        </div>
    )
}

export default Dashboard

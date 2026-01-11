// Sample property data for RAG retrieval
export const properties = [
    {
        id: "prop-001",
        title: "T3 Apartamento em Lisboa, Parque das Nações",
        type: "Apartamento",
        bedrooms: 3,
        bathrooms: 2,
        area: 120,
        price: 485000,
        location: {
            city: "Lisboa",
            neighborhood: "Parque das Nações",
            address: "Rua do Oceano 45",
            coordinates: { lat: 38.7633, lng: -9.0950 }
        },
        features: [
            "Varanda com vista rio",
            "Garagem para 2 carros",
            "Ar condicionado",
            "Cozinha equipada",
            "Elevador",
            "Segurança 24h"
        ],
        description: "Excelente apartamento T3 com vista para o rio Tejo. Localizado no prestigiado Parque das Nações, próximo do Centro Vasco da Gama e transportes públicos. Acabamentos de alta qualidade.",
        availability: ["weekdays", "saturday_morning"],
        agent: "Ricardo Ferreira",
        status: "available"
    },
    {
        id: "prop-002",
        title: "Moradia V4 em Cascais",
        type: "Moradia",
        bedrooms: 4,
        bathrooms: 3,
        area: 280,
        plotArea: 850,
        price: 750000,
        location: {
            city: "Cascais",
            neighborhood: "Centro",
            address: "Rua das Flores 12",
            coordinates: { lat: 38.6979, lng: -9.4215 }
        },
        features: [
            "Jardim privado",
            "Piscina",
            "Garagem para 3 carros",
            "BBQ area",
            "Casa de hóspedes",
            "Painéis solares"
        ],
        description: "Moradia de luxo com piscina e jardim em Cascais. Totalmente renovada em 2023. A 5 minutos a pé da praia e do centro histórico.",
        availability: ["weekdays", "saturday", "sunday"],
        agent: "Ricardo Ferreira",
        status: "available"
    },
    {
        id: "prop-003",
        title: "T2 Renovado no Porto",
        type: "Apartamento",
        bedrooms: 2,
        bathrooms: 1,
        area: 85,
        price: 295000,
        location: {
            city: "Porto",
            neighborhood: "Ribeira",
            address: "Rua de São João 78",
            coordinates: { lat: 41.1408, lng: -8.6131 }
        },
        features: [
            "Vista rio Douro",
            "Totalmente renovado",
            "Cozinha open space",
            "Ar condicionado",
            "Próximo do metro"
        ],
        description: "Apartamento T2 completamente renovado na zona histórica da Ribeira. Vista deslumbrante para o rio Douro e Ponte D. Luís.",
        availability: ["weekdays", "saturday_morning"],
        agent: "Ricardo Ferreira",
        status: "available"
    },
    {
        id: "prop-004",
        title: "Loja Comercial em Braga",
        type: "Comercial",
        area: 150,
        price: 180000,
        rentEstimate: 1200,
        location: {
            city: "Braga",
            neighborhood: "Centro",
            address: "Avenida Central 234",
            coordinates: { lat: 41.5454, lng: -8.4265 }
        },
        features: [
            "Montra ampla",
            "Cave para armazém",
            "WC para clientes",
            "Ar condicionado",
            "Zona pedonal"
        ],
        description: "Espaço comercial em localização premium no centro de Braga. Ideal para loja de roupa, café ou serviços. Grande fluxo pedonal.",
        availability: ["weekdays"],
        agent: "Ricardo Ferreira",
        status: "available"
    }
];

// Agent calendar - available slots
export const agentCalendar = {
    agentId: "agent-001",
    name: "Ricardo Ferreira",
    availableSlots: [
        { date: "2026-01-09", times: ["10:00", "11:00", "14:00", "15:00", "16:00"] },
        { date: "2026-01-10", times: ["10:00", "11:00", "14:00", "15:00"] },
        { date: "2026-01-11", times: ["10:00", "11:00"] }, // Saturday
        { date: "2026-01-13", times: ["10:00", "11:00", "14:00", "15:00", "16:00"] },
        { date: "2026-01-14", times: ["10:00", "11:00", "14:00", "15:00", "16:00"] }
    ],
    bookedVisits: []
};

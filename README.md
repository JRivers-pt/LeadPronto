# LeadPronto 🏠✨

**AI-Powered Property Booking Platform with RAG (Retrieval-Augmented Generation)**

A full-stack real estate lead management application featuring an intelligent AI chat assistant powered by Google Gemini and RAG technology for context-aware property recommendations.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![Google Gemini](https://img.shields.io/badge/AI-Google%20Gemini-orange?logo=google)

---

## 🌟 Key Features

### 🤖 RAG-Powered AI Assistant
- **Retrieval-Augmented Generation**: The AI retrieves relevant property data from the database before generating responses, ensuring accurate and contextual answers
- **Semantic Search**: Matches user queries to property features, locations, and amenities
- **Natural Conversation**: Handles booking inquiries, property questions, and scheduling in natural language

### 🏡 Property Management
- Browse and search property listings
- View detailed property information
- Real-time availability checking

### 📅 Smart Booking System
- AI-assisted booking flow
- Automatic schedule conflict detection
- Booking confirmation and management

### 📊 Lead Dashboard
- Track and manage leads
- View conversation history
- Monitor booking status

---

## 🏗️ Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   React Frontend │────▶│  Express Backend  │────▶│  Google Gemini  │
│   (Vite + CSS)   │◀────│   (Node.js)       │◀────│   (AI/LLM)      │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                               │
                               ▼
                     ┌──────────────────┐
                     │   RAG Service    │
                     │ - Property Data  │
                     │ - Vector Search  │
                     │ - Context Build  │
                     └──────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JRivers-pt/LeadPronto.git
   cd LeadPronto
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd server && npm install
   ```

3. **Configure environment**
   ```bash
   cp server/.env.example server/.env
   # Add your GEMINI_API_KEY to server/.env
   ```

4. **Run the application**
   ```bash
   # Terminal 1 - Backend
   cd server && npm start
   
   # Terminal 2 - Frontend
   npm run dev
   ```

5. Open http://localhost:5173

---

## 🧠 How RAG Works in LeadPronto

1. **User Query**: "Show me 3-bedroom houses near downtown with a pool"

2. **Retrieval**: The RAG service searches the property database for:
   - Properties with 3+ bedrooms
   - Downtown location proximity
   - Pool amenities

3. **Augmentation**: Retrieved properties are formatted and injected into the AI prompt as context

4. **Generation**: Gemini generates a natural response using the retrieved context, ensuring accuracy

---

## 📁 Project Structure

```
├── src/                    # React frontend
│   ├── App.jsx            # Main app component
│   ├── pages/             # Page components
│   └── services/          # API services
├── server/                 # Express backend
│   ├── services/
│   │   ├── rag.js         # RAG implementation
│   │   ├── gemini.js      # Gemini AI integration
│   │   └── booking.js     # Booking logic
│   ├── routes/            # API routes
│   └── data/              # Property data
└── public/                 # Static assets
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, CSS |
| Backend | Node.js, Express |
| AI/LLM | Google Gemini |
| RAG | Custom implementation |

---

## 📝 License

MIT License

---

**Built with ❤️ using RAG + Google Gemini**

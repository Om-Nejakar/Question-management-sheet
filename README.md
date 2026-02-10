# Interactive Question Management Sheet

A single-page web application inspired by Codolio / Striver DSA sheets that allows users to browse, manage, and organize questions hierarchically by **Topic → Sub-topic → Questions**.

The application focuses on **clean UI, structured data handling, and interactive UX**.

---

## 🚀 Features

- Full-width accordion-style topic sections
- Expand / collapse topics
- Display questions in a clean row-based layout
- Difficulty badges (Easy / Medium / Hard)
- Tag display (sub-topics)
- Real dataset support (Codolio API–like structure)
- Scalable component-based architecture

---

## 🧠 Data Handling

The provided dataset is a **flat list of questions** with fields like:
- `topic`
- `subTopic`
- `questionId`

---

## 🧩 Tech Stack

- **React** (Vite)
- **Zustand** (state management)
- **Tailwind CSS** (styling)
- **JavaScript (ES6+)**

---

## 📂 Project Structure
- src/
- ├── components/
- │ ├── Topic.jsx
- │ ├── QuestionRow.jsx
- │
- ├── store/
- │ └── sheetStore.js
- │
- ├── utils/
- │ └── transformSheet.js
- │
- ├── data/
- │ └── sheetData.json // dataset file
- │
- ├── App.jsx
- ├── main.jsx
- └── index.css

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd <repo-name>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the application
```bash
npm run dev
```


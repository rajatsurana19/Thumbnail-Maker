# Thumbnail Maker – AI-Powered Thumbnail Generator

An intelligent thumbnail generation system that creates engaging, ready-to-use thumbnails using AI-generated text and user-uploaded images.

Built with a FastAPI backend and React frontend, the application automates one of the most time-consuming parts of content creation.

---

## Overview

Thumbnail Maker allows users to:

* Upload a headshot image
* Provide a topic or context
* Instantly generate a high-quality thumbnail

The system uses AI to generate compelling thumbnail text and combines it with the uploaded image to produce visually appealing results.

---

## Features

* AI-generated thumbnail text using OpenAI
* Image upload and management via ImageKit
* Fast and scalable backend with FastAPI
* Interactive frontend built with React
* Clean and responsive UI
* Real-time thumbnail generation

---

## Tech Stack

### Frontend

* React

### Backend

* Python (FastAPI)

### External Services

* OpenAI API (text generation)
* ImageKit (image storage and optimization)

---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/rajatsurana19/Thumbnail-Maker.git
cd Thumbnail-Maker
```

### 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## Environment Variables

Create a `.env` file inside the backend folder:

```env
OPENAI_API_KEY=your_openai_api_key
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=your_url_endpoint
```

---

## Usage

1. Start backend and frontend servers
2. Open the React app in your browser
3. Upload a headshot image
4. Enter a topic or context
5. Generate thumbnail instantly

---

## API Endpoints

| Method | Endpoint            | Description             |
| ------ | ------------------- | ----------------------- |
| POST   | /generate-thumbnail | Generate thumbnail text |
| POST   | /upload-image       | Upload headshot image   |

---

## Project Structure

```
Thumbnail-Maker/
│
├── backend/
│   ├── main.py
│   ├── routes/
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   └── package.json
│
└── README.md
```

---

## Inspiration

https://www.youtube.com/watch?v=EB5_nETqdx0 (Hitesh Choudhary Sir)

---


## Author

Made by **Rajat Surana**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-rajat--surana-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/rajat-surana)
[![GitHub](https://img.shields.io/badge/GitHub-rajatsurana19-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/rajatsurana19)


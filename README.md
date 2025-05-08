# 🤖 Deepfake Detection System

A modern web application that detects deepfake manipulations in facial images using browser-based face recognition models. This tool allows users to upload an original and a suspect (test) image, analyze them, and identify discrepancies that could indicate AI-generated tampering.


## 🧠 Features

- 📷 Upload and compare two facial images
- 🧬 Analyze for potential deepfake alterations
- 🧠 **Runs entirely in-browser (no API required)**
- 🚫 No backend, no server-side computation
- 📦 Uses locally stored face recognition models in `public/models`
- 🛡️ Built-in Cybercrime Helpline awareness card


---

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **ML Models**: FaceAPI.js (TensorFlow.js-based face recognition)
- **Deployment**: Static hosting (Netlify, Vercel, GitHub Pages)
- **Backend**: 🚫 None – This is a fully static web app


---

## 📂 Folder Structure

project/
├── public/
│ ├── models/ # Pre-trained FaceAPI models
│ ├── js/ # Face comparison logic
│ └── preview.png # UI screenshot
├── src/ # React components and pages
├── index.html
├── vite.config.ts
└── package.json

---
## DATASET is present in same folder for testing purpose with some Potential deepfaked photos and videos from internet. 
## Note: This is collected only for Educational purpose and testing the project.

## 🚀 How to Run Locally

> Make sure you have **Node.js** installed (recommended: ≥ 16.x)


# Clone the repository
git clone https://github.com/sanjay-here/Deepfake_detection_system_website.git
cd deepfake-detection-system

# Install dependencies
>npm install

# Start development server
>npm run dev

Then open http://localhost:5173 in your browser.

📌 How It Works
Loads face detection and recognition models from public/models

Detects facial landmarks for both images

Compares facial descriptor vectors

Returns similarity score or decision logic via frontend script

🛡️ Important Note
This tool performs basic similarity analysis and should not be used as the sole forensic source. For legal or investigative use, consult professional deepfake detection systems.

If you believe you’ve identified malicious deepfake content:

📞 Cybercrime Helpline: 1930
🌐 cybercrime.gov.in

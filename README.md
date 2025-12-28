# Brain Lag - Cognitive Load Estimator

Brain Lag is a comprehensive mental health and cognitive load tracking application that helps students monitor their study patterns and mental wellbeing. The application uses machine learning to estimate cognitive load based on various factors like study duration, focus levels, and fatigue.

## 🚀 Features

- **Cognitive Load Estimation**: ML-powered analysis of student mental state based on study patterns
- **User Authentication**: Secure registration and login system with JWT tokens
- **Data Tracking**: Historical tracking of cognitive load over time
- **Interactive Dashboard**: Visual representation of mental load and study patterns
- **Personalized Recommendations**: AI-driven suggestions to optimize study schedules
- **Real-time Analysis**: Instant feedback on current mental state

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern UI framework
- **React Router** - Client-side routing
- **Material-UI** - Component library
- **Three.js & React Three Fiber** - 3D visualizations
- **Recharts** - Data visualization
- **Axios** - HTTP client

### Python ML Backend (FastAPI)
- **FastAPI** - High-performance API framework
- **scikit-learn** - Machine learning models
- **NumPy** - Numerical computations
- **MongoDB** - NoSQL database for data storage
- **Uvicorn** - ASGI server

### Node.js Auth Backend (Express.js)
- **Express.js** - Web application framework
- **MongoDB & Mongoose** - Database and ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Express Rate Limit** - API rate limiting

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **Python** (v3.9 or higher)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas account)
- **Firebase CLI** (for deployment)
- **Docker** (optional, for containerized deployment)

## 🔧 Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Techy-BhaweshPandey/brain_lag.git
cd brain_lag
```

### 2. Frontend Setup (React App)

```bash
cd frontend/myapp

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env and configure API endpoints
# REACT_APP_API_URL=http://localhost:8000
# REACT_APP_AUTH_URL=http://localhost:5000

# Start development server
npm start
```

The frontend will be available at `http://localhost:3000`

### 3. Python ML Backend Setup (FastAPI)

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Unix or MacOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env

# Edit .env and add your MongoDB URI
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name

# Start the server
uvicorn main:app --reload --port 8000
```

The FastAPI backend will be available at `http://localhost:8000`
API documentation: `http://localhost:8000/docs`

### 4. Node.js Auth Backend Setup (Express.js)

```bash
cd mindgauge-backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env and configure:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
# PORT=5000
# JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Start the server
node server.js
```

The Express backend will be available at `http://localhost:5000`

## 🚀 Firebase Deployment

### Prerequisites for Firebase Deployment

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase project (if not already done):
```bash
firebase init
```

### Deploy Frontend to Firebase Hosting

```bash
# Build the React app
cd frontend/myapp
npm run build

# Deploy to Firebase Hosting
cd ../..
firebase deploy --only hosting
```

### Deploy Auth Backend as Firebase Functions

**Important**: Before deploying, you need to prepare the functions directory:

```bash
# Copy necessary files from mindgauge-backend into functions directory
# This is required because Firebase Functions deploys only the functions folder
cp -r mindgauge-backend/routes functions/
cp -r mindgauge-backend/models functions/
cp -r mindgauge-backend/middlewares functions/

# Install functions dependencies
cd functions
npm install

# Deploy functions
firebase deploy --only functions
```

**Alternative**: You can also modify `functions/index.js` to implement the routes directly without external dependencies.

### Deploy Python Backend to Google Cloud Run

**Prerequisites**: 
1. Install Google Cloud CLI: https://cloud.google.com/sdk/docs/install
2. Login to Google Cloud: `gcloud auth login`
3. Set your project: `gcloud config set project YOUR_PROJECT_ID`

**Note**: Replace `YOUR_PROJECT_ID` with your actual Google Cloud Project ID (found in Firebase console or run `gcloud config get-value project` after setting it)

```bash
cd backend

# Authenticate Docker with Google Container Registry
gcloud auth configure-docker

# Build Docker image (replace YOUR_PROJECT_ID with your actual project ID)
docker build -t gcr.io/YOUR_PROJECT_ID/brain-lag-ml:latest .

# Push to Google Container Registry
docker push gcr.io/YOUR_PROJECT_ID/brain-lag-ml:latest

# Deploy to Cloud Run
gcloud run deploy brain-lag-ml \
  --image gcr.io/YOUR_PROJECT_ID/brain-lag-ml:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars MONGO_URI=your_mongodb_uri
```

## 🔒 Environment Variables

### Backend (.env)
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
```

### Mindgauge Backend (.env)
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES=1d
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8000
REACT_APP_AUTH_URL=http://localhost:5000
```

**Production Note**: Update URLs to your deployed endpoints for production.

## 📡 API Endpoints

### Authentication Backend (Port 5000)

#### POST /api/auth/register
Register a new user
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

#### POST /api/auth/login
Login user
```json
{
  "email": "string",
  "password": "string"
}
```

#### GET /api/auth/me
Get current user (requires JWT token)

#### GET /api/auth/student-data
Get student data history (requires email query parameter)

### ML Backend (Port 8000)

#### POST /estimate-load
Estimate cognitive load
```json
{
  "email": "string",
  "total_time": "integer",
  "num_sessions": "integer",
  "subject": "string",
  "focus": "integer",
  "fatigue": "integer",
  "late_night": "integer",
  "duration_missing": "integer"
}
```

#### GET /
Health check endpoint

## 🔐 Security Considerations

### For Production Deployment:

1. **Never commit `.env` files** - Always use `.env.example` as templates
2. **Use Firebase Secrets** for sensitive data in Cloud Functions:
   ```bash
   firebase functions:config:set mongodb.uri="your_mongodb_uri"
   firebase functions:config:set jwt.secret="your_jwt_secret"
   ```
3. **Update CORS settings** - Restrict origins in production:
   ```javascript
   // In main.py and functions/index.js
   allow_origins=["https://yourdomain.com"]
   ```
4. **Use strong JWT secrets** - Generate secure random strings
5. **Enable Firebase App Check** for additional security
6. **Set up rate limiting** for all endpoints
7. **Use HTTPS only** in production
8. **Implement proper input validation** on all endpoints
9. **Remove hardcoded credentials** from all configuration files
10. **Set appropriate MongoDB access controls**

## 🧪 Testing

### Frontend Tests
```bash
cd frontend/myapp
npm test
```

### Backend Tests
```bash
cd backend
pytest  # Add pytest and tests as needed
```

## 🐛 Troubleshooting

### Frontend Issues

**Issue**: Cannot connect to backend
- **Solution**: Verify `.env` file has correct API URLs
- Check that both backends are running
- Ensure CORS is properly configured

**Issue**: Build fails
- **Solution**: Delete `node_modules` and `package-lock.json`, then run `npm install`

### Backend Issues

**Issue**: MongoDB connection fails
- **Solution**: Verify MongoDB URI in `.env`
- Check MongoDB Atlas IP whitelist settings
- Ensure network connectivity

**Issue**: Model files not found
- **Solution**: Ensure `model/` directory contains required `.pkl` files:
  - `dt_full_1.pkl`
  - `scaler_1.pkl`

### Firebase Deployment Issues

**Issue**: Deploy fails with authentication error
- **Solution**: Run `firebase login` and ensure you're logged in
- Generate Firebase token: `firebase login:ci`

**Issue**: Functions fail to deploy
- **Solution**: Ensure all dependencies are in `functions/package.json`
- Check Node.js version (should be 18)

## 📦 CI/CD with GitHub Actions

This repository includes a GitHub Actions workflow for automated deployment to Firebase Hosting.

### Setup:

1. Generate Firebase token:
```bash
firebase login:ci
```

2. Add token to GitHub repository secrets:
   - Go to repository Settings → Secrets → Actions
   - Add new secret: `FIREBASE_TOKEN` with the generated token

3. Push to `main` branch to trigger automatic deployment

## 📁 Project Structure

```
brain_lag/
├── backend/                    # Python FastAPI ML backend
│   ├── model/                 # ML model files (.pkl)
│   ├── main.py               # FastAPI application
│   ├── requirements.txt      # Python dependencies
│   ├── Dockerfile           # Docker configuration
│   └── .env.example         # Environment template
├── frontend/myapp/           # React frontend
│   ├── src/                 # Source files
│   ├── public/              # Static assets
│   ├── package.json         # Node dependencies
│   └── .env.example         # Environment template
├── mindgauge-backend/        # Express.js auth backend
│   ├── routes/              # API routes
│   ├── models/              # Mongoose models
│   ├── middlewares/         # Express middlewares
│   ├── server.js            # Express application
│   └── .env.example         # Environment template
├── functions/                # Firebase Cloud Functions
│   ├── index.js             # Functions entry point
│   ├── package.json         # Dependencies
│   └── .eslintrc.js         # ESLint config
├── .github/workflows/        # GitHub Actions
│   └── firebase-deploy.yml  # Deployment workflow
├── firebase.json             # Firebase configuration
├── .firebaserc              # Firebase project config
└── README.md                # This file
```

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Machine learning models for cognitive load estimation
- Firebase for hosting and serverless functions
- MongoDB for flexible data storage
- React and Material-UI for beautiful UI components

## 📞 Support

For issues and questions, please open an issue in the GitHub repository.

---

**Note**: This is an educational project for tracking cognitive load in students. Always consult with mental health professionals for serious concerns.

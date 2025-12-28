FROM python:3.9-slim

WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
# Expects main.py with FastAPI app instance named 'app'
COPY . .

# Expose port 8080 (Cloud Run default)
EXPOSE 8080

# Run the application
# Note: This assumes main.py exists with 'app = FastAPI(...)' instance
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]

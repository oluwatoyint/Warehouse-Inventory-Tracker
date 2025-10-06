# Warehouse Inventory Tracker

A web application to track warehouse inventory in real-time, built with **Python (Flask)**, **React (TypeScript)**, and **PostgreSQL**.

## Features
- Add, view, update, and delete inventory items.
- Real-time inventory tracking for warehouse and office use.
- Responsive UI with clean code.
  


1. **Backend**:
   - Install Python 3.13, PostgreSQL 18, Git 2.5, node.js 22, Docker Desktop installer
   - In Git Bash create a folder warehouse-inventory-tracker
     ```git
      mkdir warehouse-inventory-tracker
      ```
   - Create a virtual environment: `python -m venv venv`
   - Install dependencies: `pip install -r backend/requirements.txt`
   - Set up `.env` with `DATABASE_URL=postgresql://username:password@localhost:5432/inventory_db`
   - Run: `python backend/app.py`

2. **Frontend**:
   - Install Node.js 16+.
   - Install dependencies: `npm install --prefix frontend`
   - Set up `.env` with `REACT_APP_API_URL=http://localhost:5000`
   - Run: `npm start --prefix frontend`

3. **Database**:
   - Create a PostgreSQL database named `inventory_db`.
   - Run the SQL in `backend/models.py` to create the `items` table.

## Docker
- Run `docker-compose up --build` to start the app with PostgreSQL, backend, and frontend.

## License
MIT

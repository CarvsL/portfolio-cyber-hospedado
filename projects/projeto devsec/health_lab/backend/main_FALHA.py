from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware # <-- IMPORT NOVO
import sqlite3
app = FastAPI(title="HealthAPI Lab", description="API para laboratório DevSec")


# <-- CONFIGURAÇÃO DO CORS (Permite que o React acesse a API) -->
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Em prod seria a URL do React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Configurando um banco de dados SQLite falso em memória para o teste
def init_db():
    conn = sqlite3.connect(':memory:', check_same_thread=False)
    cursor = conn.cursor()
    cursor.execute("CREATE TABLE patients (id INTEGER, name TEXT, diagnosis TEXT)")
    cursor.execute("INSERT INTO patients VALUES (1, 'Joao Silva', 'Gripe')")
    cursor.execute("INSERT INTO patients VALUES (2, 'Maria Souza', 'Hipertensao')")
    cursor.execute("INSERT INTO patients VALUES (3, 'Admin User', 'Dados Sensiveis do Sistema')")
    conn.commit()
    return conn

conn = init_db()

@app.get("/")
def home():
    return {"message": "HealthAPI rodando. Acesse /docs para a documentação."}

# ROTA VULNERÁVEL (A03:2021-Injection)
@app.get("/api/patients")
def search_patients(name: str = Query(..., description="Nome do paciente")):
    cursor = conn.cursor()
    # A VULNERABILIDADE ESTÁ AQUI: Concatenação direta de string!
    query = f"SELECT * FROM patients WHERE name = '{name}'" 
    
    try:
        cursor.execute(query)
        results = cursor.fetchall()
        return {"query_executada": query, "resultados": results}
    except Exception as e:
        return {"erro": str(e)}
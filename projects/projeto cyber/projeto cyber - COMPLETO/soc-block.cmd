 @echo off
setlocal

:: Lê o JSON gerado pelo Wazuh e extrai o IP alvo
for /f "usebackq tokens=*" %%I in (`powershell -NoProfile -Command 
"$json = [Console]::In.ReadLine() | ConvertFrom-Json; Write-Output $json.parameters.alert.data.win.eventdata.sourceAddress"`) do set "TARGET_IP=%%I"

:: Se encontrou um IP, cria a regra de bloqueio total no Firewall
if not "%TARGET_IP%"=="" (
    netsh advfirewall firewall add rule name="Wazuh SOC Block - %TARGET_IP%" dir=in action=block remoteip=%TARGET_IP%
)
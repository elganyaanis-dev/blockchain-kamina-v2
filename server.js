const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('.'));

// Route API simplifiée
app.get('/api/project-info', (req, res) => {
  const files = fs.readdirSync('.');
  const solFiles = files.filter(f => f.endsWith('.sol'));
  
  res.json({
    name: '$project',
    type: 'BLOCKCHAIN',
    smartContracts: solFiles.length,
    totalFiles: files.length,
    status: 'ACTIVE'
  });
});

app.get('/', (req, res) => {
  const files = fs.readdirSync('.');
  const solFiles = files.filter(f => f.endsWith('.sol'));
  
  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$project - Interface Blockchain</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            min-height: 100vh;
            color: white;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .dashboard {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        .blockchain-badge {
            background: #f59e0b;
            color: black;
            padding: 8px 16px;
            border-radius: 20px;
            display: inline-block;
            margin: 10px 0;
            font-weight: bold;
        }
        .contract-list {
            max-height: 400px;
            overflow-y: auto;
        }
        .contract-item {
            background: rgba(255,255,255,0.05);
            padding: 15px;
            margin: 10px 0;
            border-radius: 10px;
            border-left: 4px solid #10b981;
        }
        .btn {
            background: #10b981;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s;
            margin: 5px;
        }
        .btn:hover {
            background: #059669;
            transform: translateY(-2px);
        }
        .live-indicator {
            display: inline-block;
            width: 10px;
            height: 10px;
            background: #ef4444;
            border-radius: 50%;
            margin-right: 10px;
            animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔗 $project - Dashboard Blockchain</h1>
            <div class="blockchain-badge">⛓️ SMART CONTRACTS ACTIFS</div>
            <p><span class="live-indicator"></span> Interface en temps réel</p>
        </div>
        
        <div class="dashboard">
            <div class="card">
                <h3>📊 Statistiques</h3>
                <div id="stats">
                    <p>Chargement des données...</p>
                </div>
            </div>
            
            <div class="card">
                <h3>🎮 Contrôles</h3>
                <div>
                    <button class="btn" onclick="refreshData()">🔄 Actualiser</button>
                    <button class="btn" onclick="analyzeContracts()">🔍 Analyser Contrats</button>
                    <button class="btn" onclick="simulateDeploy()">🚀 Simuler Déploiement</button>
                </div>
            </div>
        </div>
        
        <div class="card">
            <h3>📁 Fichiers Smart Contracts</h3>
            <div class="contract-list" id="contractList">
                ${solFiles.map(file => `
                    <div class="contract-item">
                        <h4>📄 ${file}</h4>
                        <p>Smart Contract Solidity</p>
                        <button class="btn" onclick="viewContract('${file}')">👀 Voir le Code</button>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="card">
            <h3>🌐 Actions Blockchain</h3>
            <div>
                <button class="btn" onclick="connectWallet()">👛 Connecter Wallet</button>
                <button class="btn" onclick="checkBalance()">💰 Vérifier Balance</button>
                <button class="btn" onclick="deployAll()">🏗️ Déployer Tous</button>
            </div>
        </div>
    </div>

    <script>
        // Chargement des données
        async function loadProjectData() {
            try {
                const response = await fetch('/api/project-info');
                const data = await response.json();
                
                document.getElementById('stats').innerHTML = \`
                    <p><strong>Contrats Smart:</strong> \${data.smartContracts}</p>
                    <p><strong>Fichiers totaux:</strong> \${data.totalFiles}</p>
                    <p><strong>Statut:</strong> <span style="color: #10b981;">\${data.status}</span></p>
                    <p><strong>Type:</strong> \${data.type}</p>
                \`;
            } catch (error) {
                console.error('Erreur:', error);
            }
        }
        
        // Fonctions interactives
        function refreshData() {
            loadProjectData();
            showNotification('📊 Données actualisées !');
        }
        
        function analyzeContracts() {
            showNotification('🔍 Analyse des contrats en cours...');
            // Simulation d'analyse
            setTimeout(() => {
                showNotification('✅ Analyse terminée !');
            }, 2000);
        }
        
        function simulateDeploy() {
            showNotification('🚀 Simulation de déploiement...');
            // Simulation de déploiement
            setTimeout(() => {
                showNotification('✅ Contrats déployés avec succès !');
            }, 3000);
        }
        
        function viewContract(filename) {
            showNotification(\`👀 Affichage du contrat: \${filename}\`);
            // Ici: ouvrir le fichier ou afficher le code
            alert(\`Contrat: \${filename}\\n\\nFonctionnalité d'affichage du code à implémenter.\`);
        }
        
        function connectWallet() {
            showNotification('👛 Connexion au wallet...');
            // Simulation connexion wallet
            setTimeout(() => {
                showNotification('✅ Wallet connecté !');
            }, 1500);
        }
        
        function checkBalance() {
            showNotification('💰 Vérification du solde...');
            setTimeout(() => {
                showNotification('💎 Solde: 1.5 ETH');
            }, 1500);
        }
        
        function deployAll() {
            showNotification('🏗️ Déploiement de tous les contrats...');
            setTimeout(() => {
                showNotification('🎉 Tous les contrats déployés !');
            }, 4000);
        }
        
        function showNotification(message) {
            // Créer une notification
            const notification = document.createElement('div');
            notification.style.cssText = \`
                position: fixed;
                top: 20px;
                right: 20px;
                background: #10b981;
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                z-index: 1000;
                animation: slideIn 0.3s ease;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            \`;
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }
        
        // Initialisation
        loadProjectData();
        setInterval(loadProjectData, 10000); // Actualisation toutes les 10s
        
        // Styles d'animation
        const style = document.createElement('style');
        style.textContent = \`
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        \`;
        document.head.appendChild(style);
    </script>
</body>
</html>
  `;
  
  res.send(html);
});

app.listen(PORT, () => {
  console.log(\`🔗 Interface Blockchain ${project} sur le port \${PORT}\`);
});

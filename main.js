const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

// Manter referência global do objeto da janela
let mainWindow;

function createWindow() {
  // Criar a janela do navegador
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true
    },
    icon: path.join(__dirname, 'assets/icon.png'),
    titleBarStyle: 'default',
    show: false,
    backgroundColor: '#f4f7fa'
  });

  // Carregar o arquivo HTML principal
  mainWindow.loadFile('index.html');

  // Mostrar a janela quando estiver pronta
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // Abrir DevTools em desenvolvimento
    if (process.argv.includes('--dev')) {
      mainWindow.webContents.openDevTools();
    }
  });

  // Configurar menu da aplicação
  createMenu();

  // Abrir links externos no navegador padrão
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Evento quando a janela é fechada
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createMenu() {
  const template = [
    {
      label: 'Arquivo',
      submenu: [
        {
          label: 'Nova Sessão',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            mainWindow.loadFile('index.html');
          }
        },
        {
          label: 'Sobre',
          click: () => {
            mainWindow.loadFile('apresentacao.html');
          }
        },
        { type: 'separator' },
        {
          label: 'Sair',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Navegação',
      submenu: [
        {
          label: 'Página Inicial',
          accelerator: 'CmdOrCtrl+Home',
          click: () => {
            mainWindow.loadFile('index.html');
          }
        },
        {
          label: 'Login',
          accelerator: 'CmdOrCtrl+L',
          click: () => {
            mainWindow.loadFile('login.html');
          }
        },
        {
          label: 'Dashboard Funcionário',
          accelerator: 'CmdOrCtrl+1',
          click: () => {
            mainWindow.loadFile('funcionario.html');
          }
        },
        {
          label: 'Dashboard Gestor',
          accelerator: 'CmdOrCtrl+2',
          click: () => {
            mainWindow.loadFile('gestor.html');
          }
        }
      ]
    },
    {
      label: 'Desenvolvedor',
      submenu: [
        {
          label: 'Ferramentas de Desenvolvedor',
          accelerator: 'F12',
          click: () => {
            mainWindow.webContents.toggleDevTools();
          }
        },
        {
          label: 'Recarregar',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            mainWindow.reload();
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// Este método será chamado quando o Electron terminar de inicializar
app.whenReady().then(createWindow);

// Quit quando todas as janelas estiverem fechadas
app.on('window-all-closed', () => {
  // No macOS é comum para aplicações manterem ativas mesmo quando todas as janelas estão fechadas
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // No macOS é comum recriar uma janela na aplicação quando o ícone do dock é clicado
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Prevenir múltiplas instâncias da aplicação
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    // Alguém tentou executar uma segunda instância, devemos focar nossa janela
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
} 
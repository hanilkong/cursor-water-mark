import * as vscode from "vscode";
import * as path from "path";

// Watermark settings interface
interface WatermarkSettings {
  opacity: number;
  rotationAngle: number;
  textColor: string;
  fontSize: number;
}

// Function to get watermark settings
function getWatermarkSettings(): WatermarkSettings {
  const config = vscode.workspace.getConfiguration("watermark");

  return {
    opacity: config.get("opacity", 0.6),
    rotationAngle: config.get("rotationAngle", -45),
    textColor: config.get("textColor", "rgba(100, 100, 100, 0.08)"),
    fontSize: config.get("fontSize", 2),
  };
}

export function activate(context: vscode.ExtensionContext) {
  // Get workspace name more accurately
  let projectName = "No Project";

  if (
    vscode.workspace.workspaceFolders &&
    vscode.workspace.workspaceFolders.length > 0
  ) {
    const workspaceFolder = vscode.workspace.workspaceFolders[0];
    projectName = workspaceFolder.name;
  } else {
    // Alternative methods when workspace folders are not available

    // 1. Check workspace name
    if (vscode.workspace.name) {
      projectName = vscode.workspace.name;
    }

    // 2. Extract folder name from currently open file path
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
      const filePath = activeEditor.document.uri.fsPath;
      const folderName = path.basename(path.dirname(filePath));
      projectName = folderName;
    }

    // 3. Extract path from extension context
    const extensionPath = context.extensionPath;
    const extensionFolderName = path.basename(extensionPath);

    // Select the most appropriate name
    if (projectName === "No Project") {
      projectName = extensionFolderName;
    }
  }

  // Create webview panel
  const panel = vscode.window.createWebviewPanel(
    "projectWatermark",
    "Project Watermark",
    { viewColumn: vscode.ViewColumn.One, preserveFocus: true },
    {
      enableScripts: true,
      retainContextWhenHidden: true,
    }
  );

  // Listen for settings changes
  const settingsChangeListener = vscode.workspace.onDidChangeConfiguration(
    (event) => {
      if (event.affectsConfiguration("watermark")) {
        const newSettings = getWatermarkSettings();
        panel.webview.postMessage({
          command: "updateSettings",
          settings: newSettings,
        });
      }
    }
  );

  panel.webview.html = getHtml(projectName, getWatermarkSettings());

  // Auto-resize when editor size changes
  vscode.window.onDidChangeActiveTextEditor(() => {
    panel.webview.html = getHtml(projectName, getWatermarkSettings());
  });

  // Register keyboard shortcut
  const toggleCommand = vscode.commands.registerCommand(
    "watermark.toggle",
    () => {
      panel.webview.postMessage({ command: "toggleWatermark" });
    }
  );

  context.subscriptions.push(panel, toggleCommand, settingsChangeListener);
}

function getHtml(projectName: string, settings: WatermarkSettings): string {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        :root {
          --watermark-opacity: ${settings.opacity};
          --watermark-rotation: ${settings.rotationAngle}deg;
          --watermark-color: ${settings.textColor};
          --watermark-font-size-multiplier: ${settings.fontSize};
        }
        
        html, body {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
          position: relative;
        }
        
        .watermark-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          user-select: none;
          overflow: hidden;
          transition: opacity 0.3s ease;
        }
        
        .watermark-container.hidden {
          opacity: 0;
        }
        
        .watermark {
          position: absolute;
          font-weight: bold;
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
          color: var(--watermark-color);
          opacity: var(--watermark-opacity);
          transform: rotate(var(--watermark-rotation));
        }
      </style>
    </head>
    <body>
      <div class="watermark-container" id="watermarkContainer">
      </div>
      
      <script>
        let settings = ${JSON.stringify(settings)};
        let isVisible = true;
        let resizeTimeout = null;
        
        // Optimized watermark generation
        function createWatermarks() {
          const container = document.getElementById('watermarkContainer');
          const projectName = '${projectName}';
          
          // Screen dimensions
          const screenWidth = window.innerWidth;
          const screenHeight = window.innerHeight;
          
          // Calculate base font size based on text length
          const baseFontSize = Math.max(1.5, Math.min(3, 24 / projectName.length));
          const fontSize = Math.max(1, Math.min(8, baseFontSize * settings.fontSize)) + 'rem';
          
          // Calculate spacing based on text length and font size
          const textLength = projectName.length;
          const baseSpacing = 200;
          const lengthMultiplier = Math.max(0.8, Math.min(1.5, 1 + (textLength - 10) * 0.05));
          const fontSizeMultiplier = parseFloat(fontSize) / 2;
          
          const adjustedSpacing = baseSpacing * lengthMultiplier * fontSizeMultiplier;
          
          // Grid calculation
          const cols = Math.ceil(screenWidth / adjustedSpacing) + 2;
          const rows = Math.ceil(screenHeight / adjustedSpacing) + 2;
          const totalWatermarks = cols * rows;
          
          // Use DocumentFragment for performance optimization
          const fragment = document.createDocumentFragment();
          
          // Update CSS variables
          document.documentElement.style.setProperty('--watermark-opacity', settings.opacity);
          document.documentElement.style.setProperty('--watermark-rotation', settings.rotationAngle + 'deg');
          document.documentElement.style.setProperty('--watermark-color', settings.textColor);
          document.documentElement.style.setProperty('--watermark-font-size-multiplier', settings.fontSize);
          
          // Optimized watermark creation
          for (let i = 0; i < totalWatermarks; i++) {
            const watermark = document.createElement('div');
            watermark.className = 'watermark';
            watermark.textContent = projectName;
            watermark.style.fontSize = fontSize; // Apply style directly
            
            // Grid pattern placement with slight randomness
            const row = Math.floor(i / cols);
            const col = i % cols;
            
            const baseX = (col * adjustedSpacing) - (adjustedSpacing / 2);
            const baseY = (row * adjustedSpacing) - (adjustedSpacing / 2);
            
            // Random offset adjustment based on text length
            const maxOffset = Math.min(50, adjustedSpacing * 0.2);
            const randomOffsetX = (Math.random() - 0.5) * maxOffset;
            const randomOffsetY = (Math.random() - 0.5) * maxOffset;
            
            watermark.style.left = (baseX + randomOffsetX) + 'px';
            watermark.style.top = (baseY + randomOffsetY) + 'px';
            
            fragment.appendChild(watermark);
          }
          
          // Add to DOM at once
          container.innerHTML = '';
          container.appendChild(fragment);
        }
        
        // Debounced resize handler
        function debouncedResize() {
          if (resizeTimeout) {
            clearTimeout(resizeTimeout);
          }
          resizeTimeout = setTimeout(() => {
            createWatermarks();
            resizeTimeout = null;
          }, 100);
        }
        
        function toggleWatermark() {
          const container = document.getElementById('watermarkContainer');
          isVisible = !isVisible;
          container.classList.toggle('hidden', !isVisible);
        }
        
        // Message listener (handle commands from VS Code extension)
        window.addEventListener('message', event => {
          const message = event.data;
          switch (message.command) {
            case 'toggleWatermark':
              toggleWatermark();
              break;
            case 'updateSettings':
              settings = message.settings;
              createWatermarks();
              break;
          }
        });
        
        // Initial creation
        createWatermarks();
        
        // Optimized resize event
        window.addEventListener('resize', debouncedResize);
      </script>
    </body>
  </html>`;
}

export function deactivate() {}

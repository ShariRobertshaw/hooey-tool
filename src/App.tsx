/**
 * Main App Component
 * Manages state and coordinates between FlowFrame and ControlPanel
 */

import React, { useState, useRef } from 'react';
import { FlowFrame } from './components/FlowFrame';
import { ControlPanel } from './components/ControlPanel';
import type { FrameConfig } from './types';
import { toPng, toSvg } from 'html-to-image';

// Default configuration
const defaultConfig: FrameConfig = {
  outputSize: 'INSTAGRAM_SQUARE',
  backgroundColor: 'BEIGE',
  fill: {
    type: 'solid',
    color: 'BEIGE',
  },
  notches: [
    { corner: 'TOP_LEFT', id: 'notch-tl', width: 280, height: 80 },
    { corner: 'BOTTOM_RIGHT', id: 'notch-br', width: 240, height: 80 },
  ],
  pills: [
    {
      id: 'pill-1',
      icon: 'EVENT_PIN',
      text: 'In-person event',
      visible: true,
      position: 'top-left',
      backgroundColor: 'DARK_TEAL',
    },
    {
      id: 'pill-2',
      icon: 'LOCATION_PIN',
      text: 'San Francisco',
      visible: true,
      position: 'bottom-right',
      backgroundColor: 'DARK_TEAL',
    },
  ],
  textContent: {
    title: 'IMP supplies for clinical trials: GMP & GDP',
    description: 'Secondary copy line here',
  },
};

export const App: React.FC = () => {
  const [config, setConfig] = useState<FrameConfig>(defaultConfig);
  const [exportElement, setExportElement] = useState<HTMLDivElement | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPNG = async () => {
    if (!exportElement) return;
    
    setIsExporting(true);
    try {
      const dataUrl = await toPng(exportElement, {
        quality: 1,
        pixelRatio: 2,
      });
      
      // Download
      const link = document.createElement('a');
      link.download = `flow-frame-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportSVG = async () => {
    if (!exportElement) return;
    
    setIsExporting(true);
    try {
      const dataUrl = await toSvg(exportElement, {
        quality: 1,
      });
      
      // Download
      const link = document.createElement('a');
      link.download = `flow-frame-${Date.now()}.svg`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Canvas Area */}
      <div style={styles.canvasArea}>
        <div style={styles.canvasWrapper}>
          <FlowFrame config={config} onExportReady={setExportElement} />
        </div>
        
        {/* Export Controls */}
        <div style={styles.exportBar}>
          <button
            onClick={handleExportPNG}
            disabled={isExporting}
            style={styles.exportButton}
          >
            {isExporting ? 'Exporting...' : 'Export PNG'}
          </button>
          <button
            onClick={handleExportSVG}
            disabled={isExporting}
            style={styles.exportButton}
          >
            {isExporting ? 'Exporting...' : 'Export SVG'}
          </button>
        </div>
      </div>

      {/* Control Panel */}
      <ControlPanel config={config} onConfigChange={setConfig} />
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  canvasArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    overflowY: 'auto',
  },
  canvasWrapper: {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    marginBottom: 24,
  },
  exportBar: {
    display: 'flex',
    gap: 12,
  },
  exportButton: {
    padding: '12px 24px',
    fontSize: 14,
    fontWeight: 600,
    backgroundColor: '#0066CC',
    color: 'white',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
};

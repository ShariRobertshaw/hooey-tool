/**
 * Main App Component
 * Manages state and coordinates between FlowFrame and ControlPanel
 */

import React, { useState } from "react";
import { FlowFrame } from "./components/FlowFrame";
import { ControlPanel } from "./components/ControlPanel";
import type { FrameConfig } from "./types";
import { toPng } from "html-to-image";
import placeholderImage from "./assets/placeholder.svg";

const defaultConfig: FrameConfig = {
  backgroundColor: "BEIGE",
  imageUrl: placeholderImage,
  pills: {
    topLeft: {
      enabled: true,
      text: "In-person event",
      icon: "EVENT_PIN",
      color: "DARK_TEAL",
    },
    bottomRight: {
      enabled: true,
      text: "Virtual session",
      icon: "LOCATION_PIN",
      color: "DARK_TEAL",
    },
  },
  logo: {
    enabled: false,
  },
  headline: "IMP supplies for clinical trials: GMP & GDP",
  subhead: "Secondary copy line here",
};

export const App: React.FC = () => {
  const [config, setConfig] = useState<FrameConfig>(defaultConfig);
  const [exportElement, setExportElement] = useState<HTMLDivElement | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [zoom, setZoom] = useState(1);

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

  // PNG-only export

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.25));
  const handleZoomReset = () => setZoom(1);

  return (
    <div style={styles.container}>
      {/* Canvas Area */}
      <div style={styles.canvasArea}>
        {/* Zoom Controls */}
        <div style={styles.zoomControls}>
          <button onClick={handleZoomOut} style={styles.zoomButton} title="Zoom Out">
            −
          </button>
          <span style={styles.zoomLabel}>{Math.round(zoom * 100)}%</span>
          <button onClick={handleZoomIn} style={styles.zoomButton} title="Zoom In">
            +
          </button>
          <button onClick={handleZoomReset} style={styles.zoomResetButton} title="Reset Zoom">
            Reset
          </button>
        </div>

        {/* Scrollable Canvas */}
        <div style={styles.canvasScroller}>
          <div style={{
            ...styles.canvasWrapper,
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
          }}>
            <FlowFrame config={config} onExportReady={setExportElement} />
          </div>
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
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    position: 'relative',
    minWidth: 0, // Allow flex shrinking
    overflow: 'hidden', // Prevent overflow pushing layout
  },
  zoomControls: {
    position: 'absolute',
    top: 20,
    right: 20,
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '8px 12px',
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    zIndex: 10,
  },
  zoomButton: {
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 600,
    backgroundColor: '#f0f0f0',
    color: '#333',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  zoomLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: '#333',
    minWidth: 50,
    textAlign: 'center',
  },
  zoomResetButton: {
    padding: '6px 12px',
    fontSize: 12,
    fontWeight: 600,
    backgroundColor: '#f0f0f0',
    color: '#333',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  canvasScroller: {
    flex: 1,
    width: '100%',
    minHeight: 0, // Allow flex shrinking
    overflow: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  canvasWrapper: {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    transition: 'transform 0.2s ease-out',
    flexShrink: 0, // Prevent wrapper from shrinking
  },
  exportBar: {
    display: 'flex',
    gap: 12,
    padding: 20,
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    borderTop: '1px solid #e0e0e0',
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

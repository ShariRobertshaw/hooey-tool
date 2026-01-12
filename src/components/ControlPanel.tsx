/**
 * ControlPanel - UI for safe, constrained editing
 * Exposes only valid configuration options
 */

import React, { useRef } from 'react';
import type { FrameConfig, PillConfig } from '../types';
import {
  OUTPUT_SIZES,
  BRAND_COLORS,
  ICON_SET,
  CORNER_POSITIONS,
  MAX_NOTCHES,
} from '../tokens/design-tokens';
import type { OutputSizeKey, BrandColor, IconKey, CornerPosition } from '../tokens/design-tokens';

interface ControlPanelProps {
  config: FrameConfig;
  onConfigChange: (config: FrameConfig) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ config, onConfigChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOutputSizeChange = (size: OutputSizeKey) => {
    onConfigChange({ ...config, outputSize: size });
  };


  const handleBackgroundColorChange = (color: BrandColor) => {
    onConfigChange({
      ...config,
      backgroundColor: color,
    });
  };

  const handleFillColorChange = (color: BrandColor) => {
    onConfigChange({
      ...config,
      fill: { type: 'solid', color },
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        onConfigChange({
          ...config,
          fill: { type: 'image', imageUrl, imageFile: file },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNotchToggle = (corner: CornerPosition) => {
    const existingIndex = config.notches.findIndex(n => n.corner === corner);
    
    if (existingIndex >= 0) {
      // Remove notch
      const newNotches = config.notches.filter((_, i) => i !== existingIndex);
      onConfigChange({ ...config, notches: newNotches });
    } else {
      // Add notch (if under limit)
      if (config.notches.length < MAX_NOTCHES) {
        const newNotches = [
          ...config.notches,
          { 
            corner, 
            id: `notch-${Date.now()}`,
            width: 260,  // Default notch width
            height: 80,   // Default notch height
          },
        ];
        onConfigChange({ ...config, notches: newNotches });
      }
    }
  };

  const handlePillUpdate = (pillId: string, updates: Partial<PillConfig>) => {
    const newPills = config.pills.map(pill =>
      pill.id === pillId ? { ...pill, ...updates } : pill
    );
    onConfigChange({ ...config, pills: newPills });
  };

  const handleAddPill = () => {
    const newPill: PillConfig = {
      id: `pill-${Date.now()}`,
      icon: 'CIRCLE',
      text: 'New pill',
      visible: true,
      position: 'top-right',
      backgroundColor: 'DARK_TEAL',
    };
    onConfigChange({
      ...config,
      pills: [...config.pills, newPill],
    });
  };

  const handleRemovePill = (pillId: string) => {
    onConfigChange({
      ...config,
      pills: config.pills.filter(p => p.id !== pillId),
    });
  };

  const handleTitleChange = (title: string) => {
    onConfigChange({
      ...config,
      textContent: { ...config.textContent, title },
    });
  };

  const handleDescriptionChange = (description: string) => {
    onConfigChange({
      ...config,
      textContent: { ...config.textContent, description },
    });
  };

  const handleLogoToggle = () => {
    const isCurrentlyVisible = config.logo?.visible || false;
    
    if (isCurrentlyVisible) {
      // Hide logo and remove notch
      const newNotches = config.notches.filter(n => n.id !== 'notch-logo');
      onConfigChange({
        ...config,
        logo: {
          visible: false,
        },
        notches: newNotches,
      });
    } else {
      // Show logo and add notch (always top-right)
      const newNotches = config.notches.filter(n => n.id !== 'notch-logo'); // Remove any existing
      const logoNotch = {
        corner: 'TOP_RIGHT' as CornerPosition,
        id: 'notch-logo',
        width: 80,
        height: 40,
      };
      onConfigChange({
        ...config,
        logo: {
          visible: true,
        },
        notches: [...newNotches, logoNotch],
      });
    }
  };

  const notchedCorners = new Set(config.notches.map(n => n.corner));

  return (
    <div style={styles.panel}>
      <h2 style={styles.heading}>Flow Frame Generator</h2>

      {/* Output Size */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Output Size</h3>
        <select
          value={config.outputSize}
          onChange={(e) => handleOutputSizeChange(e.target.value as OutputSizeKey)}
          style={styles.select}
        >
          {Object.entries(OUTPUT_SIZES).map(([key, size]) => (
            <option key={key} value={key}>
              {size.label} ({size.width} × {size.height})
            </option>
          ))}
        </select>
      </section>

      {/* Background Color */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Background Color</h3>
        <p style={{ fontSize: 11, color: '#6c757d', marginBottom: 8 }}>
          Color behind the entire image
        </p>
        
        <div style={styles.colorGrid}>
          {Object.entries(BRAND_COLORS).map(([key, value]) => (
            <button
              key={key}
              onClick={() => handleBackgroundColorChange(key as BrandColor)}
              style={{
                ...styles.colorSwatch,
                backgroundColor: value,
                border: config.backgroundColor === key
                  ? '3px solid #0066CC'
                  : '2px solid #ddd',
              }}
              title={key}
            />
          ))}
        </div>
      </section>

      {/* Fill */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Shape Fill</h3>
        
        {/* Color palette */}
        <div style={styles.colorGrid}>
          {Object.entries(BRAND_COLORS).map(([key, value]) => (
            <button
              key={key}
              onClick={() => handleFillColorChange(key as BrandColor)}
              style={{
                ...styles.colorSwatch,
                backgroundColor: value,
                border: config.fill.type === 'solid' && config.fill.color === key
                  ? '3px solid #0066CC'
                  : '2px solid #ddd',
              }}
              title={key}
            />
          ))}
        </div>

        {/* Image upload */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          style={{ ...styles.button, marginTop: 8, width: '100%' }}
        >
          {config.fill.type === 'image' ? '✓ Image Uploaded' : 'Upload Image'}
        </button>
      </section>

      {/* Notches */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>
          Notches ({config.notches.length}/{MAX_NOTCHES})
        </h3>
        <div style={styles.buttonGroup}>
          {CORNER_POSITIONS.map((corner) => (
            <button
              key={corner}
              onClick={() => handleNotchToggle(corner)}
              disabled={!notchedCorners.has(corner) && config.notches.length >= MAX_NOTCHES}
              style={{
                ...styles.button,
                ...(notchedCorners.has(corner) ? styles.buttonActive : {}),
                opacity: !notchedCorners.has(corner) && config.notches.length >= MAX_NOTCHES ? 0.5 : 1,
              }}
            >
              {corner.replace('_', ' ')}
            </button>
          ))}
        </div>
      </section>

      {/* Pills */}
      <section style={styles.section}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ ...styles.sectionTitle, marginBottom: 0 }}>Pills ({config.pills.length})</h3>
          <button onClick={handleAddPill} style={{ ...styles.button, padding: '4px 12px', fontSize: 11 }}>
            + Add Pill
          </button>
        </div>
        
        {config.pills.map((pill, index) => (
          <div key={pill.id} style={{ 
            ...styles.pillEditor,
            marginBottom: index < config.pills.length - 1 ? 12 : 0 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <label style={{ ...styles.label, fontSize: 11, fontWeight: 700 }}>
                Pill {index + 1}
              </label>
              <button 
                onClick={() => handleRemovePill(pill.id)}
                style={{ ...styles.button, padding: '2px 8px', fontSize: 10 }}
              >
                Remove
              </button>
            </div>

            <label style={styles.label}>
              <input
                type="checkbox"
                checked={pill.visible}
                onChange={(e) => handlePillUpdate(pill.id, { visible: e.target.checked })}
                style={{ marginRight: 8 }}
              />
              Visible
            </label>

            {pill.visible && (
              <>
                <label style={styles.label}>
                  Position
                  <select
                    value={pill.position}
                    onChange={(e) => handlePillUpdate(pill.id, { position: e.target.value as any })}
                    style={styles.select}
                  >
                    <option value="top-left">Top Left</option>
                    <option value="top-right">Top Right</option>
                    <option value="bottom-left">Bottom Left</option>
                    <option value="bottom-right">Bottom Right</option>
                  </select>
                </label>

                <label style={styles.label}>
                  Icon
                  <select
                    value={pill.icon}
                    onChange={(e) => handlePillUpdate(pill.id, { icon: e.target.value as IconKey })}
                    style={styles.select}
                  >
                    {Object.keys(ICON_SET).map((key) => (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    ))}
                  </select>
                </label>

                <label style={styles.label}>
                  Text
                  <input
                    type="text"
                    value={pill.text}
                    onChange={(e) => handlePillUpdate(pill.id, { text: e.target.value })}
                    style={styles.input}
                    placeholder="Pill text..."
                  />
                </label>

                <label style={styles.label}>
                  Background Color
                  <select
                    value={pill.backgroundColor}
                    onChange={(e) => handlePillUpdate(pill.id, { backgroundColor: e.target.value as BrandColor })}
                    style={styles.select}
                  >
                    {Object.keys(BRAND_COLORS).map((key) => (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    ))}
                  </select>
                </label>
              </>
            )}
          </div>
        ))}
      </section>

      {/* Logo */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Logo</h3>
        
        <label style={styles.label}>
          <input
            type="checkbox"
            checked={config.logo?.visible || false}
            onChange={handleLogoToggle}
            style={{ marginRight: 8 }}
          />
          Show Logo (Top Right)
        </label>
        
        <p style={{ fontSize: 11, color: '#6c757d', marginTop: 8 }}>
          Logo color changes to white on dark backgrounds
        </p>
      </section>

      {/* Text Content */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Text Content</h3>
        
        <label style={styles.label}>
          Title
          <input
            type="text"
            value={config.textContent.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            style={styles.input}
            placeholder="Enter title..."
          />
        </label>

        <label style={styles.label}>
          Description
          <textarea
            value={config.textContent.description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            style={{ ...styles.input, minHeight: 80, resize: 'vertical' }}
            placeholder="Enter description..."
          />
        </label>
      </section>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  panel: {
    padding: 24,
    backgroundColor: '#f8f9fa',
    borderLeft: '1px solid #dee2e6',
    overflowY: 'auto',
    height: '100vh',
    width: 380,
  },
  heading: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 24,
    color: '#2D3748',
  },
  section: {
    marginBottom: 24,
    paddingBottom: 24,
    borderBottom: '1px solid #dee2e6',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 12,
    color: '#2D3748',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  select: {
    width: '100%',
    padding: 8,
    fontSize: 14,
    border: '1px solid #dee2e6',
    borderRadius: 4,
    backgroundColor: 'white',
  },
  buttonGroup: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  button: {
    padding: '8px 16px',
    fontSize: 12,
    fontWeight: 600,
    border: '1px solid #dee2e6',
    borderRadius: 4,
    backgroundColor: 'white',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  buttonActive: {
    backgroundColor: '#0066CC',
    color: 'white',
    border: '1px solid #0066CC',
  },
  colorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 8,
  },
  colorSwatch: {
    width: '100%',
    paddingTop: '100%',
    position: 'relative',
    cursor: 'pointer',
    borderRadius: 4,
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    fontSize: 12,
    fontWeight: 600,
    color: '#2D3748',
    marginTop: 12,
  },
  input: {
    padding: 8,
    fontSize: 14,
    border: '1px solid #dee2e6',
    borderRadius: 4,
    fontFamily: 'system-ui, sans-serif',
  },
  pillEditor: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 6,
    border: '1px solid #dee2e6',
  },
};

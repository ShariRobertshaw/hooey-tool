import React, { useRef } from "react";
import type { FrameConfig } from "../types";
import {
  BACKGROUND_COLORS,
  HEADLINE_RULES,
  ICON_OPTIONS,
  SUBHEAD_RULES,
} from "../config/constants";

interface ControlPanelProps {
  config: FrameConfig;
  onConfigChange: (config: FrameConfig) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ config, onConfigChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  type PillKey = "topLeft" | "bottomRight";

  const handleBackgroundColorChange = (colorId: FrameConfig["backgroundColor"]) => {
    onConfigChange({ ...config, backgroundColor: colorId });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      onConfigChange({ ...config, imageUrl, imageFile: file });
    };
    reader.readAsDataURL(file);
  };

  const handleHeadlineChange = (value: string) => {
    onConfigChange({ ...config, headline: value.slice(0, HEADLINE_RULES.maxChars) });
  };

  const handleSubheadChange = (value: string) => {
    onConfigChange({ ...config, subhead: value.slice(0, SUBHEAD_RULES.maxChars) });
  };

  const handlePillToggle = (key: PillKey, enabled: boolean) => {
    onConfigChange({
      ...config,
      pills: { ...config.pills, [key]: { ...config.pills[key], enabled } },
    });
  };

  const handlePillChange = (key: PillKey, updates: Partial<FrameConfig["pills"][PillKey]>) => {
    onConfigChange({
      ...config,
      pills: { ...config.pills, [key]: { ...config.pills[key], ...updates } },
    });
  };

  const handleLogoToggle = (enabled: boolean) => {
    onConfigChange({ ...config, logo: { enabled } });
  };

  return (
    <div style={styles.panel}>
      <h2 style={styles.heading}>LinkedIn Marketing Tool</h2>

      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Background Color</h3>
        <div style={styles.colorGrid}>
          {BACKGROUND_COLORS.map((color) => (
            <button
              key={color.id}
              onClick={() => handleBackgroundColorChange(color.id)}
              style={{
                ...styles.colorSwatch,
                backgroundColor: color.value,
                border:
                  config.backgroundColor === color.id
                    ? "3px solid #0066CC"
                    : "2px solid #ddd",
              }}
              title={color.id}
            />
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Image</h3>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          style={{ ...styles.button, marginTop: 8, width: "100%" }}
        >
          Upload Image
        </button>
      </section>

      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Headline</h3>
        <label style={styles.label}>
          <input
            type="text"
            value={config.headline}
            onChange={(e) => handleHeadlineChange(e.target.value)}
            style={styles.input}
            placeholder="Headline"
          />
          <span style={styles.charCount}>
            {config.headline.length}/{HEADLINE_RULES.maxChars}
          </span>
        </label>
      </section>

      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Subhead</h3>
        <label style={styles.label}>
          <textarea
            value={config.subhead}
            onChange={(e) => handleSubheadChange(e.target.value)}
            style={{ ...styles.input, minHeight: 80, resize: "vertical" }}
            placeholder="Subhead"
          />
          <span style={styles.charCount}>
            {config.subhead.length}/{SUBHEAD_RULES.maxChars}
          </span>
        </label>
      </section>

      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Pills</h3>

        <div style={styles.pillGroup}>
          <h4 style={styles.subTitle}>Top Left Pill</h4>
          <label style={styles.label}>
            <input
              type="checkbox"
              checked={config.pills.topLeft.enabled}
              onChange={(e) => handlePillToggle("topLeft", e.target.checked)}
              style={{ marginRight: 8 }}
            />
            Enable pill
          </label>

          {config.pills.topLeft.enabled && (
            <>
              <label style={styles.label}>
                Icon
                <select
                  value={config.pills.topLeft.icon}
                  onChange={(e) => handlePillChange("topLeft", { icon: e.target.value as FrameConfig["pills"]["topLeft"]["icon"] })}
                  style={styles.select}
                >
                  {ICON_OPTIONS.map((icon) => (
                    <option key={icon.id} value={icon.id}>
                      {icon.label}
                    </option>
                  ))}
                </select>
              </label>

              <label style={styles.label}>
                Text
                <input
                  type="text"
                  value={config.pills.topLeft.text}
                  onChange={(e) => handlePillChange("topLeft", { text: e.target.value })}
                  style={styles.input}
                  placeholder="Pill text"
                />
              </label>

              <label style={styles.label}>
                Pill color
                <select
                  value={config.pills.topLeft.color}
                  onChange={(e) => handlePillChange("topLeft", { color: e.target.value as FrameConfig["pills"]["topLeft"]["color"] })}
                  style={styles.select}
                >
                  {BACKGROUND_COLORS.map((color) => (
                    <option key={color.id} value={color.id}>
                      {color.id}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}
        </div>

        <div style={styles.pillGroup}>
          <h4 style={styles.subTitle}>Bottom Right Pill</h4>
          <label style={styles.label}>
            <input
              type="checkbox"
              checked={config.pills.bottomRight.enabled}
              onChange={(e) => handlePillToggle("bottomRight", e.target.checked)}
              style={{ marginRight: 8 }}
            />
            Enable pill
          </label>

          {config.pills.bottomRight.enabled && (
            <>
              <label style={styles.label}>
                Icon
                <select
                  value={config.pills.bottomRight.icon}
                  onChange={(e) =>
                    handlePillChange("bottomRight", { icon: e.target.value as FrameConfig["pills"]["bottomRight"]["icon"] })
                  }
                  style={styles.select}
                >
                  {ICON_OPTIONS.map((icon) => (
                    <option key={icon.id} value={icon.id}>
                      {icon.label}
                    </option>
                  ))}
                </select>
              </label>

              <label style={styles.label}>
                Text
                <input
                  type="text"
                  value={config.pills.bottomRight.text}
                  onChange={(e) => handlePillChange("bottomRight", { text: e.target.value })}
                  style={styles.input}
                  placeholder="Pill text"
                />
              </label>

              <label style={styles.label}>
                Pill color
                <select
                  value={config.pills.bottomRight.color}
                  onChange={(e) =>
                    handlePillChange("bottomRight", { color: e.target.value as FrameConfig["pills"]["bottomRight"]["color"] })
                  }
                  style={styles.select}
                >
                  {BACKGROUND_COLORS.map((color) => (
                    <option key={color.id} value={color.id}>
                      {color.id}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}
        </div>
      </section>

      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Logo</h3>
        <label style={styles.label}>
          <input
            type="checkbox"
            checked={config.logo.enabled}
            onChange={(e) => handleLogoToggle(e.target.checked)}
            style={{ marginRight: 8 }}
          />
          Show logo
        </label>
        <p style={{ fontSize: 11, color: "#6c757d", marginTop: 8 }}>
          Logo is fixed to the top-right notch.
        </p>
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
  subTitle: {
    fontSize: 12,
    fontWeight: 700,
    marginTop: 8,
    marginBottom: 8,
    color: '#2D3748',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
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
  pillGroup: {
    paddingTop: 4,
    paddingBottom: 16,
    borderBottom: '1px solid #e9ecef',
  },
  input: {
    padding: 8,
    fontSize: 14,
    border: '1px solid #dee2e6',
    borderRadius: 4,
    fontFamily: 'system-ui, sans-serif',
  },
  charCount: {
    fontSize: 11,
    color: "#6c757d",
    marginTop: 4,
    alignSelf: "flex-end",
  },
};

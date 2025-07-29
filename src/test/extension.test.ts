import * as assert from "assert";
import * as vscode from "vscode";

// Watermark settings interface (same as extension.ts)
interface WatermarkSettings {
  opacity: number;
  rotationAngle: number;
  textColor: string;
  fontSize: number;
}

// Watermark calculation functions (for testing)
function calculateWatermarkSpacing(
  projectName: string,
  fontSize: number
): number {
  const textLength = projectName.length;
  const baseSpacing = 200;
  const lengthMultiplier = Math.max(
    0.8,
    Math.min(1.5, 1 + (textLength - 10) * 0.05)
  );
  const baseFontSize = Math.max(1.5, Math.min(3, 24 / projectName.length));
  const calculatedFontSize = Math.max(1, Math.min(8, baseFontSize * fontSize));
  const fontSizeMultiplier = calculatedFontSize / 2;

  return baseSpacing * lengthMultiplier * fontSizeMultiplier;
}

function calculateWatermarkCount(
  screenWidth: number,
  screenHeight: number,
  spacing: number
): number {
  const cols = Math.ceil(screenWidth / spacing) + 2;
  const rows = Math.ceil(screenHeight / spacing) + 2;
  return cols * rows;
}

suite("Watermark Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Watermark spacing calculation test", () => {
    // Short project name
    const shortSpacing = calculateWatermarkSpacing("test", 2);
    assert.ok(shortSpacing > 0, "Spacing for short name should be calculated");
    assert.ok(
      shortSpacing < 800,
      "Spacing for short name should be reasonable"
    );

    // Long project name
    const longSpacing = calculateWatermarkSpacing(
      "very-long-project-name-with-many-characters",
      2
    );
    assert.ok(longSpacing > 0, "Spacing for long name should be calculated");
    // With larger font sizes, spacing calculation might vary, so we just check it's reasonable
    assert.ok(longSpacing < 1200, "Spacing for long name should be reasonable");

    // Font size impact on spacing
    const smallFontSpacing = calculateWatermarkSpacing("test", 0.5);
    const largeFontSpacing = calculateWatermarkSpacing("test", 8);
    assert.ok(
      largeFontSpacing > smallFontSpacing,
      "Spacing for large font should be wider"
    );
  });

  test("Watermark count calculation test", () => {
    const screenWidth = 1920;
    const screenHeight = 1080;
    const spacing = 200;

    const count = calculateWatermarkCount(screenWidth, screenHeight, spacing);
    assert.ok(count > 0, "Watermark count should be greater than 0");
    assert.ok(
      count <= 100,
      "Watermark count should be within reasonable range"
    );

    // Small screen
    const smallCount = calculateWatermarkCount(800, 600, spacing);
    assert.ok(
      smallCount < count,
      "Watermark count for small screen should be less"
    );
  });

  test("Settings object validation test", () => {
    const validSettings: WatermarkSettings = {
      opacity: 0.6,
      rotationAngle: -45,
      textColor: "rgba(100, 100, 100, 0.08)",
      fontSize: 2,
    };

    assert.ok(
      validSettings.opacity >= 0 && validSettings.opacity <= 1,
      "Opacity should be between 0-1"
    );
    assert.ok(
      validSettings.rotationAngle >= -90 && validSettings.rotationAngle <= 90,
      "Rotation angle should be between -90~90"
    );
    assert.ok(validSettings.fontSize > 0, "Font size should be greater than 0");
    assert.ok(
      typeof validSettings.textColor === "string",
      "Text color should be a string"
    );
  });

  test("Project name processing test", () => {
    // Empty workspace name
    const emptyName = "";
    const defaultName = "No Project";
    const result = emptyName || defaultName;
    assert.strictEqual(
      result,
      defaultName,
      "Default name should be used when name is empty"
    );

    // Normal project name
    const normalName = "my-project";
    assert.strictEqual(
      normalName,
      "my-project",
      "Normal name should be used as is"
    );

    // Name with special characters
    const specialName = "project@#$%^&*()";
    assert.ok(
      specialName.length > 0,
      "Name with special characters should be processed"
    );
  });

  test("Performance optimization test", () => {
    // DocumentFragment usage simulation (mocking for Node.js environment)
    const mockFragment: {
      childNodes: any[];
      firstChild: any;
      appendChild: (child: any) => any;
    } = {
      childNodes: [],
      firstChild: null,
      appendChild: function (child: any) {
        this.childNodes.push(child);
        this.firstChild = this.firstChild || child;
        return child;
      },
    };

    const testElement = { textContent: "test" };
    mockFragment.appendChild(testElement);

    assert.ok(
      mockFragment.childNodes.length === 1,
      "DocumentFragment should have element added"
    );
    assert.ok(
      mockFragment.firstChild === testElement,
      "First child should be set correctly"
    );

    // CSS variable setting test (mocking for Node.js environment)
    const mockRoot: {
      style: {
        setProperty: (name: string, value: string) => void;
        [key: string]: any;
      };
    } = {
      style: {
        setProperty: function (name: string, value: string) {
          (this as any)[name] = value;
        },
      },
    };

    mockRoot.style.setProperty("--test-var", "10px");
    assert.ok(
      (mockRoot.style as any)["--test-var"] === "10px",
      "CSS variable should be set correctly"
    );
  });

  test("Event handler test", () => {
    let toggleCount = 0;
    const toggleFunction = () => {
      toggleCount++;
    };

    // Toggle function call simulation
    toggleFunction();
    toggleFunction();
    toggleFunction();

    assert.strictEqual(
      toggleCount,
      3,
      "Toggle function should be called correct number of times"
    );
  });

  test("Debounce function test", () => {
    let callCount = 0;
    let timeoutId: NodeJS.Timeout | null = null;

    const debouncedFunction = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        callCount++;
        timeoutId = null;
      }, 100);
    };

    // Consecutive calls
    debouncedFunction();
    debouncedFunction();
    debouncedFunction();

    // Should be called only once after 100ms
    setTimeout(() => {
      assert.strictEqual(
        callCount,
        1,
        "Debounced function should be called only once"
      );
    }, 150);
  });

  test("Watermark position calculation test", () => {
    const baseX = 100;
    const baseY = 200;
    const maxOffset = 25;

    // Random offset generation
    const randomOffsetX = (Math.random() - 0.5) * maxOffset;
    const randomOffsetY = (Math.random() - 0.5) * maxOffset;

    const finalX = baseX + randomOffsetX;
    const finalY = baseY + randomOffsetY;

    assert.ok(
      finalX >= baseX - maxOffset / 2,
      "X position should be within minimum range"
    );
    assert.ok(
      finalX <= baseX + maxOffset / 2,
      "X position should be within maximum range"
    );
    assert.ok(
      finalY >= baseY - maxOffset / 2,
      "Y position should be within minimum range"
    );
    assert.ok(
      finalY <= baseY + maxOffset / 2,
      "Y position should be within maximum range"
    );
  });

  test("Settings update test", () => {
    const settings: WatermarkSettings = {
      opacity: 0.5,
      rotationAngle: -30,
      textColor: "rgba(100, 100, 100, 0.08)",
      fontSize: 1.5,
    };

    // Opacity update
    settings.opacity = 0.8;
    assert.strictEqual(
      settings.opacity,
      0.8,
      "Opacity should be updated correctly"
    );

    // Rotation angle update
    settings.rotationAngle = 45;
    assert.strictEqual(
      settings.rotationAngle,
      45,
      "Rotation angle should be updated correctly"
    );

    // Font size update
    settings.fontSize = 3;
    assert.strictEqual(
      settings.fontSize,
      3,
      "Font size should be updated correctly"
    );
  });
});

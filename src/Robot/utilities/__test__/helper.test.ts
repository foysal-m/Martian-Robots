import { orientationToDegrees, degreesToOrientation } from "../helper";

describe("orientationToDegrees", () => {
  it('should return 0 for orientation "N"', () => {
    expect(orientationToDegrees("N")).toBe(0);
  });

  it('should return 90 for orientation "E"', () => {
    expect(orientationToDegrees("E")).toBe(90);
  });

  it('should return 180 for orientation "S"', () => {
    expect(orientationToDegrees("S")).toBe(180);
  });

  it('should return 270 for orientation "W"', () => {
    expect(orientationToDegrees("W")).toBe(270);
  });

  it("should throw an error for invalid orientation", () => {
    expect(() => orientationToDegrees("X" as any)).toThrow(
      "Invalid Orientation X"
    );
  });
});

describe("degreesToOrientation", () => {
  it('should return "N" for 0 degrees', () => {
    expect(degreesToOrientation(0)).toBe("N");
  });

  it('should return "E" for 90 degrees', () => {
    expect(degreesToOrientation(90)).toBe("E");
  });

  it('should return "S" for 180 degrees', () => {
    expect(degreesToOrientation(180)).toBe("S");
  });

  it('should return "W" for 270 degrees', () => {
    expect(degreesToOrientation(270)).toBe("W");
  });

  it("should handle degrees with wrap-around (e.g., 360 degrees)", () => {
    expect(degreesToOrientation(360)).toBe("N");
    expect(degreesToOrientation(450)).toBe("E");
    expect(degreesToOrientation(540)).toBe("S");
    expect(degreesToOrientation(630)).toBe("W");
  });

  it("should throw an error for invalid degrees", () => {
    expect(() => degreesToOrientation(45)).toThrow("Invalid value 45");
    expect(() => degreesToOrientation(1000)).toThrow("Invalid value 1000");
  });
});

function formatColor(color) {
  if (!color || color.trim() === "") return null;
  return color.trim();
}

function isValidColor(color) {
  if (!color || color.trim() === "") return false;
  const hexPattern = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
  return hexPattern.test(color.trim()) || color.trim().length > 0;
}

function parseCookieString(cookieStr) {
  let userId = -1;
  let firstName = "";
  let lastName = "";

  const splits = cookieStr.split(",");
  for (let i = 0; i < splits.length; i++) {
    const thisOne = splits[i].trim();
    const tokens = thisOne.split("=");
    if (tokens[0] === "firstName") firstName = tokens[1];
    else if (tokens[0] === "lastName") lastName = tokens[1];
    else if (tokens[0] === "userId") userId = parseInt(tokens[1].trim());
  }
  return { userId, firstName, lastName };
}

function buildColorPayload(color, userId) {
  return { color: color, userId: userId };
}

function buildSearchPayload(search, userId) {
  return { search: search, userId: userId };
}


describe("Color input validation", () => {
  test("formatColor trims whitespace from color name", () => {
    expect(formatColor("  red  ")).toBe("red");
  });

  test("formatColor returns null for empty string", () => {
    expect(formatColor("")).toBeNull();
  });

  test("formatColor returns null for blank spaces only", () => {
    expect(formatColor("   ")).toBeNull();
  });

  test("isValidColor returns true for valid hex color", () => {
    expect(isValidColor("#FF5733")).toBe(true);
  });

  test("isValidColor returns true for 3-digit hex", () => {
    expect(isValidColor("#FFF")).toBe(true);
  });

  test("isValidColor returns true for named color like 'red'", () => {
    expect(isValidColor("red")).toBe(true);
  });

  test("isValidColor returns false for empty string", () => {
    expect(isValidColor("")).toBe(false);
  });
});

describe("Cookie parsing (readCookie logic)", () => {
  test("parses firstName, lastName, and userId correctly", () => {
    const result = parseCookieString("firstName=John,lastName=Doe,userId=42");
    expect(result.firstName).toBe("John");
    expect(result.lastName).toBe("Doe");
    expect(result.userId).toBe(42);
  });

  test("userId defaults to -1 when not present", () => {
    const result = parseCookieString("firstName=Jane,lastName=Smith");
    expect(result.userId).toBe(-1);
  });

  test("returns empty strings for missing firstName/lastName", () => {
    const result = parseCookieString("userId=5");
    expect(result.firstName).toBe("");
    expect(result.lastName).toBe("");
  });
});

describe("JSON payload builders", () => {
  test("buildColorPayload includes color and userId", () => {
    const payload = buildColorPayload("blue", 7);
    expect(payload).toHaveProperty("color", "blue");
    expect(payload).toHaveProperty("userId", 7);
  });

  test("buildSearchPayload includes search term and userId", () => {
    const payload = buildSearchPayload("red", 3);
    expect(payload).toHaveProperty("search", "red");
    expect(payload).toHaveProperty("userId", 3);
  });
});
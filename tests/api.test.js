function parseLoginResponse(jsonStr) {
  return JSON.parse(jsonStr);
}

function parseSearchResponse(jsonStr) {
  return JSON.parse(jsonStr);
}

function parseAddColorResponse(jsonStr) {
  return JSON.parse(jsonStr);
}

describe("Login API response structure", () => {
  test("successful login has id, firstName, lastName, error fields", () => {
    const mockResponse = '{"id":5,"firstName":"Jane","lastName":"Doe","error":""}';
    const result = parseLoginResponse(mockResponse);
    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("firstName");
    expect(result).toHaveProperty("lastName");
    expect(result).toHaveProperty("error");
  });

  test("successful login has id greater than 0", () => {
    const mockResponse = '{"id":5,"firstName":"Jane","lastName":"Doe","error":""}';
    const result = parseLoginResponse(mockResponse);
    expect(result.id).toBeGreaterThan(0);
  });

  test("failed login returns id of 0", () => {
    const mockResponse = '{"id":0,"firstName":"","lastName":"","error":"No Records Found"}';
    const result = parseLoginResponse(mockResponse);
    expect(result.id).toBe(0);
  });

  test("failed login still has all required keys", () => {
    const mockResponse = '{"id":0,"firstName":"","lastName":"","error":"No Records Found"}';
    const result = parseLoginResponse(mockResponse);
    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("error");
  });
});

describe("SearchColors API response structure", () => {
  test("successful search returns a results array", () => {
    const mockResponse = '{"results":["red","dark red","red-orange"],"error":""}';
    const result = parseSearchResponse(mockResponse);
    expect(result).toHaveProperty("results");
    expect(Array.isArray(result.results)).toBe(true);
  });

  test("results array contains strings", () => {
    const mockResponse = '{"results":["blue","navy blue"],"error":""}';
    const result = parseSearchResponse(mockResponse);
    result.results.forEach(item => {
      expect(typeof item).toBe("string");
    });
  });

  test("no results returns a non-empty error field", () => {
    const mockResponse = '{"id":0,"firstName":"","lastName":"","error":"No Records Found"}';
    const result = parseSearchResponse(mockResponse);
    expect(result.error).toBe("No Records Found");
  });

  test("successful search has empty error field", () => {
    const mockResponse = '{"results":["green"],"error":""}';
    const result = parseSearchResponse(mockResponse);
    expect(result.error).toBe("");
  });
});

describe("AddColor API response structure", () => {
  test("success response has an error field", () => {
    const mockResponse = '{"error":""}';
    const result = parseAddColorResponse(mockResponse);
    expect(result).toHaveProperty("error");
  });

  test("success response has empty error", () => {
    const mockResponse = '{"error":""}';
    const result = parseAddColorResponse(mockResponse);
    expect(result.error).toBe("");
  });

  test("failure response has non-empty error", () => {
    const mockResponse = '{"error":"DB connection failed"}';
    const result = parseAddColorResponse(mockResponse);
    expect(result.error).not.toBe("");
  });
});
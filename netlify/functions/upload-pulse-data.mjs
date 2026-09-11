import { getStore } from "@netlify/blobs";

const STORE_NAME = "pulse-intelligence";
const DATA_KEY = "current-data";

console.log("UPLOAD FUNCTION LOADED");

function createJsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}

function validateData(data) {
  if (!Array.isArray(data)) {
    return {
      valid: false,
      message: "The data property must be an array.",
    };
  }

  if (data.length === 0) {
    return {
      valid: false,
      message: "The uploaded dataset is empty.",
    };
  }

  const invalidRowIndex = data.findIndex((row) => {
    const calls = Number(row?.Calls);

    return (
      !row ||
      typeof row !== "object" ||
      !row.Date ||
      !row.Queue ||
      !Number.isFinite(calls) ||
      calls < 0
    );
  });

  if (invalidRowIndex !== -1) {
    return {
      valid: false,
      message:
        `Row ${invalidRowIndex + 1} does not have a valid Date, Queue, or Calls value.`,
    };
  }

  return {
    valid: true,
  };
}

export default async function handler(request) {
  if (request.method !== "POST") {
    return createJsonResponse(
      {
        success: false,
        message: "Only POST requests are allowed.",
      },
      405
    );
  }

  try {
    let requestBody;

    try {
      requestBody = await request.json();
    } catch {
      return createJsonResponse(
        {
          success: false,
          message: "The request body must contain valid JSON.",
        },
        400
      );
    }

    const validation = validateData(requestBody?.data);

    if (!validation.valid) {
      return createJsonResponse(
        {
          success: false,
          message: validation.message,
        },
        400
      );
    }

    const cleanedData = requestBody.data.map((row) => ({
      ...row,
      Date: String(row.Date).trim(),
      Queue: String(row.Queue).trim(),
      CallType: String(
        row.CallType || row["Call Type"] || "Unknown"
      ).trim(),
      Calls: Number(row.Calls) || 0,
      RepeatCalls: Number(row.RepeatCalls) || 0,
      ResolvedCalls: Number(row.ResolvedCalls) || 0,
      Transfers: Number(row.Transfers) || 0,
      Escalations: Number(row.Escalations) || 0,
      AverageHandleTime: Number(row.AverageHandleTime) || 0,
    }));

    const updatedAt = new Date().toISOString();

    const savedDataset = {
      data: cleanedData,
      updatedAt,
      recordCount: cleanedData.length,
    };

    const store = getStore({
      name: STORE_NAME,
      consistency: "strong",
    });

    await store.setJSON(DATA_KEY, savedDataset);

    return createJsonResponse({
      success: true,
      recordsSaved: cleanedData.length,
      updatedAt,
    });
  } catch (error) {
    console.error("Upload Pulse data error:", error);

    return createJsonResponse(
      {
        success: false,
        message: "The shared dataset could not be saved.",
        details: error.message,
      },
      500
    );
  }
}
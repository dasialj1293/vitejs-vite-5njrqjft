import { getStore } from "@netlify/blobs";

const STORE_NAME = "pulse-intelligence";
const DATA_KEY = "current-data";

function createJsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}

export default async function handler(request) {
  if (request.method !== "GET") {
    return createJsonResponse(
      {
        success: false,
        message: "Only GET requests are allowed.",
      },
      405
    );
  }

  try {
    const store = getStore({
      name: STORE_NAME,
      consistency: "strong",
    });

    const savedDataset = await store.get(DATA_KEY, {
      type: "json",
    });

    if (!savedDataset) {
      return createJsonResponse({
        found: false,
        data: [],
        updatedAt: null,
        recordCount: 0,
      });
    }

    const data = Array.isArray(savedDataset.data)
      ? savedDataset.data
      : [];

    return createJsonResponse({
      found: true,
      data,
      updatedAt: savedDataset.updatedAt || null,
      recordCount: data.length,
    });
  } catch (error) {
    console.error("Get Pulse data error:", error);

    return createJsonResponse(
      {
        found: false,
        data: [],
        updatedAt: null,
        recordCount: 0,
        message: "The shared dataset could not be loaded.",
        details: error.message,
      },
      500
    );
  }
}

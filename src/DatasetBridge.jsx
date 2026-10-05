import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function SharePointToBlobSync() {
  const [syncStatus, setSyncStatus] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);

  // Your exact code-ready SharePoint direct download URL
  const SHAREPOINT_DOWNLOAD_URL = "https://iberdrolaus-my.sharepoint.com/:x:/r/personal/dasia_johnson_avangrid_com/Documents/Documents/Copilot/Created/Pulse_Large_Test_Dataset%201.xlsx?d=w27e945a5ff654635a17b61018c76c6da&csf=1&share=IQClReknZf81RqF7YQGMdsbaAdIO2PZTWzHMitlGJki4EwM&e=HhrPtL&download=1";

  const runDatabaseSync = async () => {
    setIsSyncing(true);
    setSyncStatus("Step 1/3: Downloading dataset directly from Avangrid SharePoint...");

    try {
      // 1. Grab raw file streams from SharePoint using your background work account credentials
      const sharepointResponse = await fetch(SHAREPOINT_DOWNLOAD_URL);
      if (!sharepointResponse.ok) {
        throw new Error("Could not pull from SharePoint. Check your Avangrid corporate VPN status.");
      }
      const buffer = await sharepointResponse.arrayBuffer();

      setSyncStatus("Step 2/3: Extracting metrics and structural components...");
      
      // 2. Parse the Excel workbooks using SheetJS
      const workbook = XLSX.read(buffer, { type: 'array' });
      const currentWorksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rawJsonRows = XLSX.utils.sheet_to_json(currentWorksheet);

      setSyncStatus(`Step 3/3: Running backend verification engines on ${rawJsonRows.length} records...`);

      // 3. Dispatch data directly into your upload-pulse-data.mjs handler
      const backendResponse = await fetch("/.netlify/functions/upload-pulse-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: rawJsonRows }) // Packages rows to pass the validation check
      });

      const syncResult = await backendResponse.json();

      if (!backendResponse.ok) {
        throw new Error(syncResult.message || "Failed schema parsing validation parameters.");
      }

      setSyncStatus(`Success! ${syncResult.recordsSaved} rows safely stored in Netlify Blobs at ${new Date(syncResult.updatedAt).toLocaleTimeString()}`);

    } catch (error) {
      console.error("Synchronization loop failed:", error);
      setSyncStatus(`Sync Failed: ${error.message}`);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px dashed #0078d4', borderRadius: '8px', margin: '20px 0', backgroundColor: '#fafafa' }}>
      <h4>Administrative Synchronization Hub</h4>
      <p style={{ fontSize: '14px', color: '#666' }}>
        Click this button whenever you make modifications to your master Excel worksheet in SharePoint to push data instantly to Netlify.
      </p>
      
      <button
        onClick={runDatabaseSync}
        disabled={isSyncing}
        style={{
          padding: '10px 16px',
          backgroundColor: '#0078d4',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontWeight: 'bold',
          cursor: isSyncing ? 'not-allowed' : 'pointer'
        }}
      >
        {isSyncing ? "Syncing Workspace..." : "Fetch Latest SharePoint Data"}
      </button>

      {syncStatus && (
        <div style={{ marginTop: '12px', fontSize: '14px', fontWeight: '500', color: '#333' }}>
          {syncStatus}
        </div>
      )}
    </div>
  );
}

export default SharePointToBlobSync;

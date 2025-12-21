import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Helper function to set CORS headers on all responses
  const setCorsHeaders = (res: any) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  };

  // Dynamic Marzban Subscription Proxy Endpoint - supports any user token
  app.get("/api/sub/:token", async (req, res) => {
    // Set CORS headers for all responses
    setCorsHeaders(res);

    try {
      const { token } = req.params;
      const format = (req.query.format as string) || "base64";
      const marzbanBaseUrl = process.env.MARZBAN_BASE_URL;

      if (!marzbanBaseUrl) {
        return res.status(500).json({ 
          error: "MARZBAN_BASE_URL not configured" 
        });
      }

      if (!token) {
        return res.status(400).json({ 
          error: "User token is required" 
        });
      }

      // Build the Marzban URL with correct format path
      // Marzban format URLs: /sub/{format}/{token} or /sub/{token} for base64
      let targetUrl: string;

      if (format === "clash" || format === "singbox") {
        // URL format: https://marzban.domain/sub/{format}/{token}
        targetUrl = `${marzbanBaseUrl}/sub/${format}/${token}`;
      } else {
        // URL format for base64: https://marzban.domain/sub/{token}
        targetUrl = `${marzbanBaseUrl}/sub/${token}`;
      }

      // Fetch from Marzban
      const response = await fetch(targetUrl, {
        method: "GET",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      });

      if (!response.ok) {
        console.error(`Marzban fetch failed: ${response.status} ${response.statusText}`);
        return res.status(response.status).json({ 
          error: "Failed to fetch subscription from Marzban",
          status: response.status,
          message: `Kullanıcı token'ı geçersiz veya Marzban sunucusuna erişilemiyor`
        });
      }

      // Get the content type from Marzban response
      const contentType = response.headers.get("content-type") || "text/plain";
      const subscriptionData = await response.text();

      // Set appropriate headers for subscription response
      res.setHeader("Content-Type", contentType);
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");

      // Send the subscription data
      res.send(subscriptionData);
    } catch (error) {
      console.error("Error proxying subscription:", error);
      return res.status(500).json({ 
        error: "Internal server error", 
        message: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  // Handle OPTIONS requests for CORS
  app.options("/api/sub/:token", (req, res) => {
    setCorsHeaders(res);
    res.status(204).send();
  });

  // Google Script Style /exec endpoint - like Google Apps Script
  // Usage: /api/exec?url=https://mary.marylytm.uk/sub/{USER_TOKEN}?format={FORMAT}
  app.get("/api/exec", async (req, res) => {
    setCorsHeaders(res);

    try {
      const urlParam = req.query.url as string;
      
      if (!urlParam) {
        return res.status(400).json({
          error: "url parameter is required",
          example: "/api/exec?url=https://mary.marylytm.uk/sub/{USER_TOKEN}?format={FORMAT}"
        });
      }

      // The URL should contain {USER_TOKEN} placeholder that will be replaced by Marzban
      // But we still need to fetch from the URL as-is to test it
      const response = await fetch(urlParam, {
        method: "GET",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      });

      if (!response.ok) {
        console.error(`Fetch failed: ${response.status} ${response.statusText}`);
        return res.status(response.status).json({
          error: "Failed to fetch subscription",
          status: response.status,
          url: urlParam
        });
      }

      const contentType = response.headers.get("content-type") || "text/plain";
      const subscriptionData = await response.text();

      res.setHeader("Content-Type", contentType);
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");

      res.send(subscriptionData);
    } catch (error) {
      console.error("Error in /exec endpoint:", error);
      return res.status(500).json({
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Handle OPTIONS for /exec
  app.options("/api/exec", (req, res) => {
    setCorsHeaders(res);
    res.status(204).send();
  });

  const httpServer = createServer(app);

  return httpServer;
}

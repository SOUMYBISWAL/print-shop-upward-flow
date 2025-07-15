import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema, insertOrderFileSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Orders API
  app.post("/api/orders", async (req, res) => {
    try {
      const validatedData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(validatedData);
      res.json(order);
    } catch (error) {
      res.status(400).json({ error: "Invalid order data" });
    }
  });

  app.get("/api/orders", async (req, res) => {
    try {
      const orders = await storage.getAllOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  app.get("/api/orders/:orderId", async (req, res) => {
    try {
      const order = await storage.getOrderByOrderId(req.params.orderId);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      const files = await storage.getOrderFiles(order.id);
      res.json({ ...order, files });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  app.patch("/api/orders/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      const order = await storage.updateOrderStatus(parseInt(req.params.id), status);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to update order status" });
    }
  });

  // Order Files API
  app.post("/api/order-files", async (req, res) => {
    try {
      const validatedData = insertOrderFileSchema.parse(req.body);
      const file = await storage.createOrderFile(validatedData);
      res.json(file);
    } catch (error) {
      res.status(400).json({ error: "Invalid file data" });
    }
  });

  app.get("/api/orders/:orderId/files", async (req, res) => {
    try {
      const order = await storage.getOrderByOrderId(req.params.orderId);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      const files = await storage.getOrderFiles(order.id);
      res.json(files);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch order files" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

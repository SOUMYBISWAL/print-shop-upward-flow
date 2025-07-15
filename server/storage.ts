import { users, orders, orderFiles, type User, type InsertUser, type Order, type InsertOrder, type OrderFile, type InsertOrderFile } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Order management
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
  getOrderByOrderId(orderId: string): Promise<Order | undefined>;
  getAllOrders(): Promise<Order[]>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;
  
  // Order files management
  createOrderFile(file: InsertOrderFile): Promise<OrderFile>;
  getOrderFiles(orderId: number): Promise<OrderFile[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private orders: Map<number, Order>;
  private orderFiles: Map<number, OrderFile>;
  private currentUserId: number;
  private currentOrderId: number;
  private currentFileId: number;

  constructor() {
    this.users = new Map();
    this.orders = new Map();
    this.orderFiles = new Map();
    this.currentUserId = 1;
    this.currentOrderId = 1;
    this.currentFileId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const now = new Date();
    const order: Order = {
      ...insertOrder,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrderByOrderId(orderId: string): Promise<Order | undefined> {
    return Array.from(this.orders.values()).find(
      (order) => order.orderId === orderId,
    );
  }

  async getAllOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (order) {
      const updatedOrder: Order = {
        ...order,
        status,
        updatedAt: new Date(),
      };
      this.orders.set(id, updatedOrder);
      return updatedOrder;
    }
    return undefined;
  }

  async createOrderFile(insertFile: InsertOrderFile): Promise<OrderFile> {
    const id = this.currentFileId++;
    const orderFile: OrderFile = {
      ...insertFile,
      id,
      createdAt: new Date(),
    };
    this.orderFiles.set(id, orderFile);
    return orderFile;
  }

  async getOrderFiles(orderId: number): Promise<OrderFile[]> {
    return Array.from(this.orderFiles.values()).filter(
      (file) => file.orderId === orderId,
    );
  }
}

export const storage = new MemStorage();

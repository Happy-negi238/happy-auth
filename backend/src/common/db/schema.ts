import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  text,
  boolean,
} from "drizzle-orm/pg-core";

export const registeredApps = pgTable("registered_apps", {
  id: uuid("id").defaultRandom().primaryKey(),
  appName: varchar("app_name", { length: 255 }).notNull(),
  appUrl: text("app_url").notNull(),
  redirectUri: text("redirect_uri").notNull(),
  clientId: text("client_id").notNull().unique(),
  clientSecret: text("client_secret").notNull(),
  developerId: uuid("developer_id")
    .notNull()
    .references(() => developers.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 30 }).notNull(),
  email: varchar("email", { length: 30 }).notNull().unique(),
  password: varchar("password", { length: 65 }).notNull(),
  phone: varchar("phone", { length: 10 }),
  refreshToken: text("refresh-token"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const authorizationCodes = pgTable("authorization_codes", {
  id: uuid("id").defaultRandom().primaryKey(),
  code: varchar("code", { length: 255 }).notNull().unique(),
  clientId: text("client_id").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at").notNull(),
  isUsed: boolean("is_used").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const developers = pgTable("developers", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: varchar("full_name", { length: 30 }).notNull(),
  email: varchar("email", { length: 30 }).notNull(),
  password: varchar("password", { length: 62 }).notNull(),
  isActive: boolean("is_active").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

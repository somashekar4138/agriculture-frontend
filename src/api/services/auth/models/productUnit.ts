/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Growinvoice API
 * Enhance your business with Growinvoice API
 * OpenAPI spec version: 1.0
 */
import type { User } from "./user";

export interface ProductUnit {
	createdAt: string;
	id: string;
	isExist: boolean;
	name: string;
	/** @nullable */
	updatedAt: string | null;
	user?: User;
	user_id: string;
}

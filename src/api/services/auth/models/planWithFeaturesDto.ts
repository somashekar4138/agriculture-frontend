/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Growinvoice API
 * Enhance your business with Growinvoice API
 * OpenAPI spec version: 1.0
 */
import type { PlanFeaturesDto } from "./planFeaturesDto";

export interface PlanWithFeaturesDto {
	createdAt: string;
	days: number;
	description: string;
	id: string;
	is_active: boolean;
	isExist: boolean;
	name: string;
	PlanFeatures: PlanFeaturesDto[];
	price: number;
	/** @nullable */
	updatedAt: string | null;
}

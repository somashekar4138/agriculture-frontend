/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Growinvoice API
 * Enhance your business with Growinvoice API
 * OpenAPI spec version: 1.0
 */
import type { OmitCreateInvoiceProductsDto } from "./omitCreateInvoiceProductsDto";
import type { CreateInvoiceWithProductsRecurring } from "./createInvoiceWithProductsRecurring";

export interface CreateInvoiceWithProducts {
	customer_id: string;
	date: string;
	/** @nullable */
	discountPercentage?: number | null;
	due_amount: number;
	due_date: string;
	invoice_number: string;
	is_recurring: boolean;
	/** @nullable */
	notes?: string | null;
	paid_amount: number;
	/** @nullable */
	paymentId?: string | null;
	product: OmitCreateInvoiceProductsDto[];
	/** @nullable */
	recurring?: CreateInvoiceWithProductsRecurring;
	/** @nullable */
	reference_number?: string | null;
	/** @nullable */
	status?: string | null;
	sub_total: number;
	/** @nullable */
	tax_id?: string | null;
	/** @nullable */
	template_id?: string | null;
	/** @nullable */
	template_url?: string | null;
	total: number;
	user_id: string;
}

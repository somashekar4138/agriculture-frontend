/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Growinvoice API
 * Enhance your business with Growinvoice API
 * OpenAPI spec version: 1.0
 */
import { useMutation, useQuery } from "@tanstack/react-query";
import type {
	MutationFunction,
	QueryFunction,
	QueryKey,
	UseMutationOptions,
	UseMutationResult,
	UseQueryOptions,
	UseQueryResult,
} from "@tanstack/react-query";
import type {
	CreateVendorsWithAddressDto,
	GetVendorsWithAddressDto,
	SuccessResponseDto,
	UpdateVendorsWithAddressDto,
	VendorsControllerCreate200,
	VendorsControllerUpdate200,
	VendorsDto,
} from "./models";
import { authInstance } from "../../instances/authInstance";
import type { ErrorType } from "../../instances/authInstance";

export const vendorsControllerCreate = (
	createVendorsWithAddressDto: CreateVendorsWithAddressDto,
) => {
	return authInstance<VendorsControllerCreate200 | void>({
		url: `/api/vendors`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: createVendorsWithAddressDto,
	});
};

export const getVendorsControllerCreateMutationOptions = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof vendorsControllerCreate>>,
		TError,
		{ data: CreateVendorsWithAddressDto },
		TContext
	>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof vendorsControllerCreate>>,
	TError,
	{ data: CreateVendorsWithAddressDto },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof vendorsControllerCreate>>,
		{ data: CreateVendorsWithAddressDto }
	> = (props) => {
		const { data } = props ?? {};

		return vendorsControllerCreate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type VendorsControllerCreateMutationResult = NonNullable<
	Awaited<ReturnType<typeof vendorsControllerCreate>>
>;
export type VendorsControllerCreateMutationBody = CreateVendorsWithAddressDto;
export type VendorsControllerCreateMutationError = ErrorType<unknown>;

export const useVendorsControllerCreate = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof vendorsControllerCreate>>,
		TError,
		{ data: CreateVendorsWithAddressDto },
		TContext
	>;
}): UseMutationResult<
	Awaited<ReturnType<typeof vendorsControllerCreate>>,
	TError,
	{ data: CreateVendorsWithAddressDto },
	TContext
> => {
	const mutationOptions = getVendorsControllerCreateMutationOptions(options);

	return useMutation(mutationOptions);
};
export const vendorsControllerFindAll = (signal?: AbortSignal) => {
	return authInstance<VendorsDto[]>({ url: `/api/vendors`, method: "GET", signal });
};

export const getVendorsControllerFindAllQueryKey = () => {
	return [`/api/vendors`] as const;
};

export const getVendorsControllerFindAllQueryOptions = <
	TData = Awaited<ReturnType<typeof vendorsControllerFindAll>>,
	TError = ErrorType<unknown>,
>(options?: {
	query?: Partial<
		UseQueryOptions<Awaited<ReturnType<typeof vendorsControllerFindAll>>, TError, TData>
	>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getVendorsControllerFindAllQueryKey();

	const queryFn: QueryFunction<Awaited<ReturnType<typeof vendorsControllerFindAll>>> = ({
		signal,
	}) => vendorsControllerFindAll(signal);

	return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof vendorsControllerFindAll>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type VendorsControllerFindAllQueryResult = NonNullable<
	Awaited<ReturnType<typeof vendorsControllerFindAll>>
>;
export type VendorsControllerFindAllQueryError = ErrorType<unknown>;

export const useVendorsControllerFindAll = <
	TData = Awaited<ReturnType<typeof vendorsControllerFindAll>>,
	TError = ErrorType<unknown>,
>(options?: {
	query?: Partial<
		UseQueryOptions<Awaited<ReturnType<typeof vendorsControllerFindAll>>, TError, TData>
	>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getVendorsControllerFindAllQueryOptions(options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const vendorsControllerFindOne = (id: string, signal?: AbortSignal) => {
	return authInstance<GetVendorsWithAddressDto>({
		url: `/api/vendors/${id}`,
		method: "GET",
		signal,
	});
};

export const getVendorsControllerFindOneQueryKey = (id: string) => {
	return [`/api/vendors/${id}`] as const;
};

export const getVendorsControllerFindOneQueryOptions = <
	TData = Awaited<ReturnType<typeof vendorsControllerFindOne>>,
	TError = ErrorType<unknown>,
>(
	id: string,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof vendorsControllerFindOne>>, TError, TData>
		>;
	},
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getVendorsControllerFindOneQueryKey(id);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof vendorsControllerFindOne>>> = ({
		signal,
	}) => vendorsControllerFindOne(id, signal);

	return { queryKey, queryFn, enabled: !!id, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof vendorsControllerFindOne>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type VendorsControllerFindOneQueryResult = NonNullable<
	Awaited<ReturnType<typeof vendorsControllerFindOne>>
>;
export type VendorsControllerFindOneQueryError = ErrorType<unknown>;

export const useVendorsControllerFindOne = <
	TData = Awaited<ReturnType<typeof vendorsControllerFindOne>>,
	TError = ErrorType<unknown>,
>(
	id: string,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof vendorsControllerFindOne>>, TError, TData>
		>;
	},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getVendorsControllerFindOneQueryOptions(id, options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const vendorsControllerUpdate = (
	id: string,
	updateVendorsWithAddressDto: UpdateVendorsWithAddressDto,
) => {
	return authInstance<VendorsControllerUpdate200>({
		url: `/api/vendors/${id}`,
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		data: updateVendorsWithAddressDto,
	});
};

export const getVendorsControllerUpdateMutationOptions = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof vendorsControllerUpdate>>,
		TError,
		{ id: string; data: UpdateVendorsWithAddressDto },
		TContext
	>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof vendorsControllerUpdate>>,
	TError,
	{ id: string; data: UpdateVendorsWithAddressDto },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof vendorsControllerUpdate>>,
		{ id: string; data: UpdateVendorsWithAddressDto }
	> = (props) => {
		const { id, data } = props ?? {};

		return vendorsControllerUpdate(id, data);
	};

	return { mutationFn, ...mutationOptions };
};

export type VendorsControllerUpdateMutationResult = NonNullable<
	Awaited<ReturnType<typeof vendorsControllerUpdate>>
>;
export type VendorsControllerUpdateMutationBody = UpdateVendorsWithAddressDto;
export type VendorsControllerUpdateMutationError = ErrorType<unknown>;

export const useVendorsControllerUpdate = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof vendorsControllerUpdate>>,
		TError,
		{ id: string; data: UpdateVendorsWithAddressDto },
		TContext
	>;
}): UseMutationResult<
	Awaited<ReturnType<typeof vendorsControllerUpdate>>,
	TError,
	{ id: string; data: UpdateVendorsWithAddressDto },
	TContext
> => {
	const mutationOptions = getVendorsControllerUpdateMutationOptions(options);

	return useMutation(mutationOptions);
};
export const vendorsControllerRemove = (id: string) => {
	return authInstance<SuccessResponseDto>({ url: `/api/vendors/${id}`, method: "DELETE" });
};

export const getVendorsControllerRemoveMutationOptions = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof vendorsControllerRemove>>,
		TError,
		{ id: string },
		TContext
	>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof vendorsControllerRemove>>,
	TError,
	{ id: string },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof vendorsControllerRemove>>,
		{ id: string }
	> = (props) => {
		const { id } = props ?? {};

		return vendorsControllerRemove(id);
	};

	return { mutationFn, ...mutationOptions };
};

export type VendorsControllerRemoveMutationResult = NonNullable<
	Awaited<ReturnType<typeof vendorsControllerRemove>>
>;

export type VendorsControllerRemoveMutationError = ErrorType<unknown>;

export const useVendorsControllerRemove = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof vendorsControllerRemove>>,
		TError,
		{ id: string },
		TContext
	>;
}): UseMutationResult<
	Awaited<ReturnType<typeof vendorsControllerRemove>>,
	TError,
	{ id: string },
	TContext
> => {
	const mutationOptions = getVendorsControllerRemoveMutationOptions(options);

	return useMutation(mutationOptions);
};

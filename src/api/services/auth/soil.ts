/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Agridulture API
 * Enhance your business with Agriculture API
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
	BlackSoilDto,
	CreateBlackSoilDto,
	CreateRedSoilDto,
	RedSoilDto,
	SoilControllerCreateBlackSoil200,
	SoilControllerCreateRedSoil200,
	SoilControllerGetBlackSoilParams,
	SoilControllerGetRedSoilParams,
} from "./models";
import { authInstance } from "../../instances/authInstance";
import type { ErrorType } from "../../instances/authInstance";

export const soilControllerCreateRedSoil = (createRedSoilDto: CreateRedSoilDto) => {
	return authInstance<SoilControllerCreateRedSoil200 | void>({
		url: `/api/soil/red`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: createRedSoilDto,
	});
};

export const getSoilControllerCreateRedSoilMutationOptions = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof soilControllerCreateRedSoil>>,
		TError,
		{ data: CreateRedSoilDto },
		TContext
	>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof soilControllerCreateRedSoil>>,
	TError,
	{ data: CreateRedSoilDto },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof soilControllerCreateRedSoil>>,
		{ data: CreateRedSoilDto }
	> = (props) => {
		const { data } = props ?? {};

		return soilControllerCreateRedSoil(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type SoilControllerCreateRedSoilMutationResult = NonNullable<
	Awaited<ReturnType<typeof soilControllerCreateRedSoil>>
>;
export type SoilControllerCreateRedSoilMutationBody = CreateRedSoilDto;
export type SoilControllerCreateRedSoilMutationError = ErrorType<unknown>;

export const useSoilControllerCreateRedSoil = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof soilControllerCreateRedSoil>>,
		TError,
		{ data: CreateRedSoilDto },
		TContext
	>;
}): UseMutationResult<
	Awaited<ReturnType<typeof soilControllerCreateRedSoil>>,
	TError,
	{ data: CreateRedSoilDto },
	TContext
> => {
	const mutationOptions = getSoilControllerCreateRedSoilMutationOptions(options);

	return useMutation(mutationOptions);
};
export const soilControllerGetRedSoil = (
	params: SoilControllerGetRedSoilParams,
	signal?: AbortSignal,
) => {
	return authInstance<RedSoilDto[]>({ url: `/api/soil/red`, method: "GET", params, signal });
};

export const getSoilControllerGetRedSoilQueryKey = (params: SoilControllerGetRedSoilParams) => {
	return [`/api/soil/red`, ...(params ? [params] : [])] as const;
};

export const getSoilControllerGetRedSoilQueryOptions = <
	TData = Awaited<ReturnType<typeof soilControllerGetRedSoil>>,
	TError = ErrorType<unknown>,
>(
	params: SoilControllerGetRedSoilParams,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof soilControllerGetRedSoil>>, TError, TData>
		>;
	},
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getSoilControllerGetRedSoilQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof soilControllerGetRedSoil>>> = ({
		signal,
	}) => soilControllerGetRedSoil(params, signal);

	return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof soilControllerGetRedSoil>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type SoilControllerGetRedSoilQueryResult = NonNullable<
	Awaited<ReturnType<typeof soilControllerGetRedSoil>>
>;
export type SoilControllerGetRedSoilQueryError = ErrorType<unknown>;

export const useSoilControllerGetRedSoil = <
	TData = Awaited<ReturnType<typeof soilControllerGetRedSoil>>,
	TError = ErrorType<unknown>,
>(
	params: SoilControllerGetRedSoilParams,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof soilControllerGetRedSoil>>, TError, TData>
		>;
	},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getSoilControllerGetRedSoilQueryOptions(params, options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const soilControllerCreateBlackSoil = (createBlackSoilDto: CreateBlackSoilDto) => {
	return authInstance<SoilControllerCreateBlackSoil200 | void>({
		url: `/api/soil/black`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: createBlackSoilDto,
	});
};

export const getSoilControllerCreateBlackSoilMutationOptions = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof soilControllerCreateBlackSoil>>,
		TError,
		{ data: CreateBlackSoilDto },
		TContext
	>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof soilControllerCreateBlackSoil>>,
	TError,
	{ data: CreateBlackSoilDto },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof soilControllerCreateBlackSoil>>,
		{ data: CreateBlackSoilDto }
	> = (props) => {
		const { data } = props ?? {};

		return soilControllerCreateBlackSoil(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type SoilControllerCreateBlackSoilMutationResult = NonNullable<
	Awaited<ReturnType<typeof soilControllerCreateBlackSoil>>
>;
export type SoilControllerCreateBlackSoilMutationBody = CreateBlackSoilDto;
export type SoilControllerCreateBlackSoilMutationError = ErrorType<unknown>;

export const useSoilControllerCreateBlackSoil = <
	TError = ErrorType<unknown>,
	TContext = unknown,
>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof soilControllerCreateBlackSoil>>,
		TError,
		{ data: CreateBlackSoilDto },
		TContext
	>;
}): UseMutationResult<
	Awaited<ReturnType<typeof soilControllerCreateBlackSoil>>,
	TError,
	{ data: CreateBlackSoilDto },
	TContext
> => {
	const mutationOptions = getSoilControllerCreateBlackSoilMutationOptions(options);

	return useMutation(mutationOptions);
};
export const soilControllerGetBlackSoil = (
	params: SoilControllerGetBlackSoilParams,
	signal?: AbortSignal,
) => {
	return authInstance<BlackSoilDto[]>({ url: `/api/soil/black`, method: "GET", params, signal });
};

export const getSoilControllerGetBlackSoilQueryKey = (params: SoilControllerGetBlackSoilParams) => {
	return [`/api/soil/black`, ...(params ? [params] : [])] as const;
};

export const getSoilControllerGetBlackSoilQueryOptions = <
	TData = Awaited<ReturnType<typeof soilControllerGetBlackSoil>>,
	TError = ErrorType<unknown>,
>(
	params: SoilControllerGetBlackSoilParams,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof soilControllerGetBlackSoil>>, TError, TData>
		>;
	},
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getSoilControllerGetBlackSoilQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof soilControllerGetBlackSoil>>> = ({
		signal,
	}) => soilControllerGetBlackSoil(params, signal);

	return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof soilControllerGetBlackSoil>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type SoilControllerGetBlackSoilQueryResult = NonNullable<
	Awaited<ReturnType<typeof soilControllerGetBlackSoil>>
>;
export type SoilControllerGetBlackSoilQueryError = ErrorType<unknown>;

export const useSoilControllerGetBlackSoil = <
	TData = Awaited<ReturnType<typeof soilControllerGetBlackSoil>>,
	TError = ErrorType<unknown>,
>(
	params: SoilControllerGetBlackSoilParams,
	options?: {
		query?: Partial<
			UseQueryOptions<Awaited<ReturnType<typeof soilControllerGetBlackSoil>>, TError, TData>
		>;
	},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getSoilControllerGetBlackSoilQueryOptions(params, options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

	query.queryKey = queryOptions.queryKey;

	return query;
};

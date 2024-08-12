import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";

export const registerUserApi = createApi({
    reducerPath: "registerUserApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000"
    }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "/registerUser",
            providesTags: ["User"]
        }),
        registerUser: builder.mutation({
            query: (user) => ({
                url: "/registerUser",
                method: "POST",
                body: user
            }),
            invalidatesTags: ["User"]
        }),
        updateUser: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/registerUser/${id}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["User"]
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/registerUser/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["User"]
        })
    })
});

export const {
    useGetUsersQuery,
    useRegisterUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = registerUserApi;

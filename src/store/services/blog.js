import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://blog-website-czn0.onrender.com/",
    prepareHeaders: (headers, { getState }) => {
      const redusers = getState();
      const token = redusers?.auth?.auth?.token;
      headers.set("authorization", token ? `Bearer ${token}` : "");
      return headers;
    },
  }),
  tagTypes: ['Blog'],
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (user) => ({
        method: "POST",
        url: `api/user/reguster`,
        body: user,
      }),
      invalidatesTags: ['Blog'],
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        method: "POST",
        url: `api/user/login`,
        body: user,
      }),
      invalidatesTags: ['Blog'],
    }),
    getUser: builder.query({
        query: (id) => ({
          method: "GET",
          url: `api/user/get-user/${id}`,
        }),
        providesTags: ['Blog'],
      }),
      updateUser: builder.mutation({
        query: ({id,formData}) => ({
          method: "PUT",
          url: `api/user/update-user/${id}`,
          body:formData
        }),
        invalidatesTags: ['Blog'],
      }),
      forgetPasswordLink: builder.mutation({
        query: (email) => ({
          method: "POST",
          url: `api/user/forget-password`,
          body:email
        }),
        invalidatesTags: ['Blog'],
      }),
      forgetPassword: builder.mutation({
        query: ({id,token,updatePassword}) => ({
          method: "PUT",
          url: `api/user/forget-password/${id}/${token}`,
          body:updatePassword
        }),
        invalidatesTags: ['Blog'],
      }),
    createBlog: builder.mutation({
      query: (blog) => ({
        method: "POST",
        url: `api/blog/create-blog`,
        body: blog,
      }),
      invalidatesTags: ['Blog'],
    }),
    getBlog: builder.query({
      query: ({search,page,catagory}) => ({
        method: "GET",
        url: `api/blog/all-blog?search=${search}&page=${page}&catagory=${catagory}`,
      }),
      providesTags: ['Blog'],
    }),
    singleBlog: builder.query({
      query: (id) => ({
        method: "GET",
        url: `api/blog/single-blog/${id}`,
      }),
      providesTags: ['Blog'],
    }),
    userBlog: builder.query({
      query: (id) => ({
        method: "GET",
        url: `api/blog/user-blog/${id}`,
      }),
      providesTags: ['Blog'],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `api/blog/delete-blog/${id}`,
      }),
      invalidatesTags: ['Blog'],
    }),
    updateBlog: builder.mutation({
      query: ({id,formData}) => ({
        method: "PUT",
        url: `api/blog/update-blog/${id}`,
        body:formData
      }),
      invalidatesTags: ['Blog'],
    }),
    commentBlog: builder.mutation({
      query: ({id,commentData}) => ({
        method: "PUT",
        url: `api/blog/comment-blog/${id}`,
        body:commentData
      }),
      invalidatesTags: ['Blog'],
    }),
    likeBlog: builder.mutation({
      query: ({id,user}) => ({
        method: "PUT",
        url: `api/blog/likes/${id}`,
        body:user
      }),
      invalidatesTags: ['Blog'],
    }),
  }),
  
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useForgetPasswordLinkMutation,
  useCreateBlogMutation,
  useGetBlogQuery,
  useSingleBlogQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useUserBlogQuery,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
  useCommentBlogMutation,
  useLikeBlogMutation,
  useForgetPasswordMutation
  

  
} = blogApi;

import api from '../config/api';

export const fetchBlogs = async () => {
  try {
    const response = await api.get('/blogs');
    return response.data.blogs || response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

export const fetchBlogById = async (id) => {
  try {
    const response = await api.get(`/blogs/${id}`);
    return response.data.blog || response.data;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
};

export const createBlog = async (formData) => {
  try {
    const response = await api.post('/blogs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
};

export const likeBlog = async (id) => {
  try {
    const response = await api.patch(`/blogs/like-blog/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error toggling like:', error);
    throw error;
  }
};
import blogService from "../services/blogs";

const blogsReducer = (state = [], action) => {
  //console.log("from reduce", action.type, action.data);
  switch (action.type) {
    case "INIT_BLOGS":
      return {
        loading: true
      };
    case "GETBLOG_SUCCESS":
      return {
        items: action.blogs
      };
    case "ADD_BLOG":
      return state.concat(action.data.nblog);
    case "ADD_LIKE":
      console.log("states from add like", state);
      console.log(action.data.likedBlog);
      return state.items.map(anecs =>
        anecs.id !== action.data.likedBlog.id ? anecs : action.data.likedBlog
      );
    case "DEL_BLOG":
      return state.items.filter(st => st.id !== action.data.id);
    case "GETALL_FAILURE":
      return {
        failure: true
      };
    default:
      return state;
  }
};
export const initializeBlogs = () => {
  return dispatch => {
    dispatch(request());

    blogService.getAll().then(
      blogs => dispatch(success(blogs)),
      error => dispatch(failure(error))
    );
    function request() {
      return { type: "INIT_BLOGS" };
    }
    function success(blogs) {
      return { type: "GETBLOG_SUCCESS", blogs };
    }
    function failure(error) {
      return { type: "GETALL_FAILURE", error };
    }
  };
};

export const createBlog = blog => {
  return async dispatch => {
    const nblog = await blogService.addNewBlog(blog);
    dispatch({
      type: "ADD_BLOG",
      data: { nblog }
    });
  };
};

export const addLike = blog => {
  return async dispatch => {
    const likedBlog = await blogService.addLike(blog.id, blog);
    dispatch({
      type: "ADD_LIKE",
      data: { likedBlog }
    });
  };
};
export const removeBlog = id => {
  return async dispatch => {
    const delBlog = await blogService.removeBlog(id);
    dispatch({
      type: "DEL_BLOG",
      data: { id }
    });
  };
};

export default blogsReducer;

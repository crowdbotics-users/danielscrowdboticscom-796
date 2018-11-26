let BASE_URL =
  "http://13.127.235.254/dev/laravel/thatsport/thatsportsthing-app/api/public/api/";
const ApiUrl = {
  loginUrl: BASE_URL + "users/login",
  logoutUrl: BASE_URL + "users/logout",
  registerUrl: BASE_URL + "users/register",
  forgotPasswordUrl: BASE_URL + "users/register",
  updatePasswordUrl: BASE_URL + "users/register",
  getUserProfile: BASE_URL + "users/edit_profile_data",
  editUserProfile: BASE_URL + "users/post_profile_data",
  getCommentsList: BASE_URL + "users/posts/view_comment_all_message",
  addComment: BASE_URL + "users/posts/add_comment",
  addPost: BASE_URL + "users/posts/add_post",
  likePost: BASE_URL + "users/posts/add_like",
  followUser: BASE_URL + "users/add_follower",
  sendRequest: BASE_URL + "users/requests/send_request",
  getPosts: BASE_URL + "users/posts/list",
};

export default ApiUrl;

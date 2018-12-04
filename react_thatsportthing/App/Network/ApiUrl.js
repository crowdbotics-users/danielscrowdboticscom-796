let BASE_URL =
  "http://13.127.235.254/dev/laravel/thatsport/thatsportsthing-app/api/public/api/";
const ApiUrl = {
  loginUrl: BASE_URL + "users/login",
  logoutUrl: BASE_URL + "users/logout",
  registerUrl: BASE_URL + "users/register",
  forgotPasswordUrl: BASE_URL + "users/forgot_password",
  otpCheckUrl: BASE_URL + "users/get_otp",
  updatePasswordUrl: BASE_URL + "users/reset_password",
  getUserProfile: BASE_URL + "users/getProfile",
  editUserProfile: BASE_URL + "users/updateprofile",
  getCommentsList: BASE_URL + "users/posts/view_comment_all_message",
  addComment: BASE_URL + "users/posts/add_comment",
  addPost: BASE_URL + "users/posts/add_post",
  likePost: BASE_URL + "users/posts/add_like",
  followUser: BASE_URL + "users/add_follower",
  sendRequest: BASE_URL + "users/requests/send_request",
  getPosts: BASE_URL + "users/posts/list",
};

export default ApiUrl;

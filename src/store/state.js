export default function () {
  return {
    // An OAuth 2 access token
    accessToken: null,
    // A unix timestamp representing the Access Token's expiration
    accessTokenExpiresAt: null,
    // A User object
    currentUser: null,
    // A list of messages to display to the User
    notifications: [],
    // An OAuth 2 refresh token
    refreshToken: null,
  }
}

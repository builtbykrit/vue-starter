const tokenState = () => ({
  // An OAuth 2 access token
  accessToken: null,
  // A unix timestamp representing the Access Token's expiration
  accessTokenExpiresAt: null,
  // An OAuth 2 refresh token
  refreshToken: null,
})

export default tokenState

import { exchangeCodeAsync, useAuthRequest } from 'expo-auth-session';
import { useState, useEffect, useRef } from 'react';

const CLIENT_ID = '2639a4844cff449cb017f598501b51ac';
const REDIRECT_URI = 'exp://10.17.123.158:8081';
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

export const useSpotifyAuth = () => {
  const [token, setToken] = useState(null);
  const hasExchanged = useRef(false);

  const discovery = {
    authorizationEndpoint: AUTH_ENDPOINT,
    tokenEndpoint: TOKEN_ENDPOINT,
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: [
        'user-read-playback-state',
        'user-modify-playback-state',
        'user-read-currently-playing',
      ],
      redirectUri: REDIRECT_URI,
      usePKCE: true,
      responseType: 'code',
    },
    discovery
  );

  useEffect(() => {
    if (
      response?.type === 'success' &&
      request?.codeVerifier &&
      !hasExchanged.current
    ) {
      hasExchanged.current = true;
      const { code } = response.params;
      console.log("Authorization Code:", code);

      exchangeCodeAsync(
        {
          clientId: CLIENT_ID,
          code,
          redirectUri: REDIRECT_URI,
          extraParams: { code_verifier: request.codeVerifier },
        },
        discovery
      )
        .then(tokenResponse => {
          console.log("Spotify Token Received:", tokenResponse);
          setToken(tokenResponse.accessToken);
        })
        .catch(err => {
          console.error("Spotify Auth Error:", err);
        });
    }
  }, [response, request?.codeVerifier]);

  return { token, promptAsync };
};

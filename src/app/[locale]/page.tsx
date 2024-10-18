"use client";

import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

import { cardLandingDataMockConst } from "../../consts/cardLandingDataMockConst";

export default function Home({ params: { locale } }) {
  const [userInfo, setUserInfo] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserInfo = localStorage.getItem("userInfo");
      const storedRole = localStorage.getItem("role");

      if (storedUserInfo && storedRole) {
        setUserInfo(JSON.parse(storedUserInfo));
        setRole(storedRole);
        setIsAuthenticating(false);
      } else {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (code) {
          window.history.replaceState({}, document.title, window.location.pathname);
          handleAuthCodeResponse({ code });
        } else {
          const initializeGoogleSignIn = () => {
            if (window.google && window.google.accounts) {
              const client = window.google.accounts.oauth2.initCodeClient({
                client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                scope: 'openid email profile',
                ux_mode: 'redirect',
                redirect_uri: window.location.origin,
              });
              client.requestCode();
            } else {
              const script = document.createElement('script');
              script.src = 'https://accounts.google.com/gsi/client';
              script.async = true;
              script.defer = true;
              script.onload = () => {
                if (window.google && window.google.accounts) {
                  const client = window.google.accounts.oauth2.initCodeClient({
                    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                    scope: 'openid email profile',
                    ux_mode: 'redirect',
                    redirect_uri: window.location.origin,
                  });
                  client.requestCode();
                }
              };
              document.body.appendChild(script);
            }
          };

          initializeGoogleSignIn();
        }
      }
    }
  }, []);

  const handleAuthCodeResponse = (response) => {
    axios.post('https://denty-assistant-be.azurewebsites.net/auth/google', {
      code: response.code,
    }, {
      withCredentials: true,
    })
      .then((res) => {
        // Save user info and role in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem("userInfo", JSON.stringify(res.data.user));
          localStorage.setItem("role", res.data.role);
        }
        setUserInfo(res.data.user);
        setRole(res.data.role);
        setIsAuthenticating(false);
      })
      .catch((error) => {
        console.error('Greška tokom autentifikacije:', error);
        setIsAuthenticating(false);
      });
  };

  const roleAccess = {
    'komercijalista': ['komercijalista'],
    'serviser': ['serviser'],
    'komercservis': ['komercijalista', 'serviser']
  };

  const handleCardClick = (href, requiredRole) => {
    const allowedRoles = roleAccess[role] || [];
    if (allowedRoles.includes(requiredRole)) {
      window.location.href = href;
    } else {
      alert("Nemate pristup ovoj sekciji.");
    }
  };

  return (
    <main className={styles.main}>
      {isAuthenticating ? (
        <p>Autentifikacija u toku...</p>
      ) : userInfo ? (
        <Container maxWidth={"xl"}>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            {cardLandingDataMockConst.map((card, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  className={styles.card}
                  onClick={() => handleCardClick(
                    card.href,
                    card.title === "Komercijalista" ? "komercijalista" : "serviser"
                  )}
                  sx={{
                    '&:hover': {
                      transform: 'scale(1.04)',
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: '90%',
                      height: '400px',
                      margin: 'auto',
                    }}
                    image={card.image}
                    alt={card.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center' }}>
                      {card.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      ) : (
        <p>Autentifikacija nije uspela. Molimo pokušajte ponovo.</p>
      )}
    </main>
  );
}

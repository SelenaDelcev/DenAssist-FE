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

import { cardLandingDataMockConst } from "../../consts/cardLandingDataMockConst";
import styles from "./page.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  const [userInfo, setUserInfo] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const komercijalisti = ["komercijalista2@example.com"];
  const serviseri = ["selenadelcev411@gmail.com", "serviser1@example.com", "serviser2@example.com"];

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const response = await axios.get('https://denty-assistant-be.azurewebsites.net/.auth/me', {
          withCredentials: true, 
        });
        setUserInfo(response.data);
      } catch (err) {
        setUserInfo("Nema pristup") 
      }
    };

    checkUserAuthentication();
  }, []);

  useEffect(() => {
    if (userInfo === "Nema pristup")
      window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=411027462084-0mtvkjme6s7b5jh5qjps1jrh926be1su.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fjolly-sand-0dc3f070f.5.azurestaticapps.net%2F.auth%2Flogin%2Fgoogle%2Fcallback&scope=openid+profile+email&state=redir%3D%252Fchat';
    if (userInfo && Array.isArray(userInfo)) {
      setUser(userInfo[0].user_id)
      if (komercijalisti.includes(user)) {
        setRole("komercijalista")
      } else if (serviseri.includes(user)) {
        setRole("serviser")
      } else {
        setRole("nezaposlen")
      }
    }
  }, [userInfo, user]);

  const handleCardClick = (href, requiredRole) => {
    if (role === requiredRole) {
      window.location.href = href;  
    } else {
      alert("Nemate pristup ovoj sekciji."); 
    }
  };

  return (
    <main className={styles.main}>
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
                onClick={() => handleCardClick(card.href, card.title === "Komercijalista" ? "komercijalista" : "serviser")}  
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
                  <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center'}}>
                    {card.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}

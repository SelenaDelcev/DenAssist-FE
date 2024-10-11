import initTranslations from "../i18n";
import TranslationsProvider from "../../lib/TranslationsProvider";
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

const i18nNamespaces = ["common"];

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}
    >
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
                <Link href={card.href || "#"} passHref>
                  <Card className={styles.card}
                  sx={{
                    '&:hover': {
                      transform: 'scale(1.04)',
                    }
                  }}>
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
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </TranslationsProvider>
  );
}

"use client"

import React, { useState, useRef, useEffect } from "react";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, useMediaQuery } from "@mui/material";
import ChatBoX from "@/components/chatBox/chatBox";
import { mockedCardDataRename } from "@/consts/cardDataMockConst";
import SupportMenu from "@/components/supportMenu/supportMenu";
import KeywordForm from "@/components/tools/keywordForm/KeywordForm";
import styles from './chat.module.css';

export default function ChatPageClient({
  translatedStrings,
  locale,
}: {
  translatedStrings: { userShortcutsTitle: string; toolsTitle: string };
  locale: string;
}) {
  const [showKeywordForm, setShowKeywordForm] = useState(false);
  const [device, setDevice] = useState<string>("CEREC AC");
  const chatBoxRef = useRef<any>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const isMobile = useMediaQuery('(max-width:600px)');

  const handleFormSubmit = (message: string) => {
    if (chatBoxRef.current) {
      chatBoxRef.current.handleSubmit(message);
    }
  };

  useEffect(() => {
    if (isMobile) {
      window.scrollTo(0, 0); 
    }
  }, [isMobile]);

  const handleCloseKeywordForm = () => {
    setShowKeywordForm(false);
  };

  const handleDeviceChange = (selectedDevice: string) => {
    setDevice(selectedDevice);
  };

  return (
    <main className={styles.main}>
      <Container maxWidth="xl" sx={{ marginRight: '23px' }}>
        <Grid container spacing={6}>
          {isMobile && (
            <Grid item xs={12}>
              <SupportMenu 
                cardData={mockedCardDataRename} 
                showAdditionalCards={true}
                onDeviceChange={handleDeviceChange}
                onHelpClick={handleOpenDialog}
              />
            </Grid>
          )}

          <Grid item xs={12} md={8}>
            <ChatBoX locale={locale} ref={chatBoxRef} device={device} />
            {showKeywordForm && (
              <KeywordForm handleSubmit={handleFormSubmit} onClose={handleCloseKeywordForm} />
            )}
          </Grid>

          {!isMobile && (
            <Grid item xs={15} md={3}>
              <SupportMenu 
                cardData={mockedCardDataRename} 
                showAdditionalCards={true}
                onDeviceChange={handleDeviceChange}
                onHelpClick={handleOpenDialog}
              />
            </Grid>
          )}
        </Grid>
      </Container>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Uputstvo za korišćenje chatbot-a</DialogTitle>
        <DialogContent>
          <DialogContentText component={'div'}>
            Ovaj interfejs vam omogućava da brzo i efikasno dobijete informacije specifične za odabrane uređaje. Uputstvo za upotrebu objašnjava korake koje je potrebno slediti kako biste se uspešno orijentisali kroz sistem i dobili prave informacije za određeni uređaj.
            <br /><br />
            <strong>Koraci za korišćenje interfejsa:</strong>
            <ol>
              <li>
                <strong>Odabir kategorije uređaja:</strong>
                <ul>
                  <li>
                    Sa <b>desne strane</b> interfejsa nalazi se padajuća lista sa različitim kategorijama uređaja.
                  </li>
                  <li>
                    Kliknite na polje kako biste otvorili listu i videli dostupne kategorije.
                  </li>
                  <li>
                    Odaberite odgovarajuću kategoriju koja najbolje odgovara uređaju koji želite da servisirate. Ova akcija će suziti opseg dostupnih opcija u sledećoj listi.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Odabir specifičnog uređaja:</strong>
                <ul>
                  <li>
                    Nakon što ste odabrali kategoriju, pojavljuje se druga padajuća lista koja prikazuje konkretne uređaje unutar te kategorije.
                  </li>
                  <li>
                    Kliknite na polje i odaberite uređaj koji želite da servisirate.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Pokretanje konverzacije sa chatbotom:</strong>
                <ul>
                  <li>
                    Kada ste odabrali konkretan uređaj, chatbot je spreman za interakciju.
                  </li>
                  <li>
                    <em>Napomena:</em> Chatbot je podešen da odgovara isključivo na pitanja koja se odnose na odabrani uređaj. Neće moći da pruži informacije o drugim uređajima dok ne odaberete novi iz padajuće liste.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Promena uređaja:</strong>
                <ul>
                  <li>
                    Ako želite da se informišete o drugom uređaju, potrebno je da ponovo odaberete kategoriju i novi uređaj koristeći gore navedene korake.
                  </li>
                </ul>
              </li>
            </ol>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Button onClick={handleCloseDialog}>Zatvori</Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}

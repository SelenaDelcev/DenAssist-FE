"use client";

import React, { useState, useRef } from "react";
import { Container, Grid } from "@mui/material";
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
  const [device, setDevice] = useState<string>("CEREC AC"); // Stanje za device
  const chatBoxRef = useRef<any>(null);

  // Funkcija za postavljanje poruke iz KeywordForm
  const handleFormSubmit = (message: string) => {
    if (chatBoxRef.current) {
      chatBoxRef.current.handleSubmit(message);
    }
  };

  const handleCloseKeywordForm = () => {
    setShowKeywordForm(false);
  };

  // Funkcija za promenu izabranog uređaja (device)
  const handleDeviceChange = (selectedDevice: string) => {
    setDevice(selectedDevice); // Ažuriraj stanje kada se promeni uređaj u SupportMenu
  };

  return (
    <main className={styles.main}>
      <Container maxWidth="xl" sx={{ marginRight: '23px' }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={8}>
            {/* Prosledi device u ChatBoX komponentu */}
            <ChatBoX locale={locale} ref={chatBoxRef} device={device} />
            {showKeywordForm && (
              <KeywordForm handleSubmit={handleFormSubmit} onClose={handleCloseKeywordForm} />
            )}
          </Grid>
          <Grid item xs={15} md={3}>
            {/* Prosledi handleDeviceChange u SupportMenu da može da ažurira device */}
            <SupportMenu 
              cardData={mockedCardDataRename} 
              showAdditionalCards={true}
              onDeviceChange={handleDeviceChange} // Prosledi funkciju za promenu uređaja
            />
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}

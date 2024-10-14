"use client"

import React, { useState, useRef, useEffect } from "react";
import { Container, Grid, useMediaQuery } from "@mui/material";
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
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </main>
  );
}

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
  const chatBoxRef = useRef<any>(null);

  const handleFormSubmit = (message: string) => {
    if (chatBoxRef.current) {
      chatBoxRef.current.handleSubmit(message);
    }
  };

  const handleCloseKeywordForm = () => {
    setShowKeywordForm(false);
  };

  return (
    <main className={styles.main}>
      <Container maxWidth="xl" sx={{ marginRight: '23px' }}>
        <Grid container
          spacing={6}>
          <Grid item xs={12} md={8}>
            <ChatBoX locale={locale} ref={chatBoxRef} />
            {showKeywordForm && (
              <KeywordForm handleSubmit={handleFormSubmit} onClose={handleCloseKeywordForm} />
            )}
          </Grid>
          <Grid item xs={15} md={3}>
            <SupportMenu cardData={mockedCardDataRename} showAdditionalCards={false}/>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}


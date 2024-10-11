import React, { useState } from "react";
import { Box, Card, CardContent, Grid, Typography, styled, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import style from './supportMenu.module.css';

const Container = styled("div")(() => ({
  maxHeight: "70vh",
  overflow: "auto",
}));

const SupportMenu = ({ cardData, showAdditionalCards, onDeviceChange }: { cardData: any, showAdditionalCards: boolean, onDeviceChange?: (device: string) => void }) => {
  const [category, setCategory] = useState('cadcamSystems');
  const [device, setDevice] = useState('CEREC AC');

  const optionMap: { [key: string]: string[] } = {
    cadcamSystems: [
      "CEREC AC",
      "CEREC AF",
      "CEREC AI",
      "CEREC MC",
      "CEREC MC XL",
      "CEREC NETWORK",
      "CEREC OMNICAM",
      "CEREC PRIMEMILL",
      "CEREC PRIMESCAN",
      "CEREC SPEEDFIRE",
      "CEREC PRIMEPRINT",
      "CEREC PRIMESCAN",
      "CEREC OMNICAM",
      "CEREC SPEEDFIRE",
      "PRIMEPRINT",
      "PRIMEPRINT PPU",
      "INEOS BLUE",
      "INLAB MC",
      "INLAB PC",
      "INLAB PROFIRE",
      "INFIRE HTC",
      "CEREC PRIMEPRINT",
      "PRIMESCAN",
      "PRIMESCAN AC" 
    ],
    imagingSystems: [
      "GALILEOS",
      "GALILEOS COMFORT",
      "GALILEOS GAX5",
      "GALILEOS X-RAY UNIT",
      "FACESCAN",
      "PERIOSCAN",
      "SIDEXIS 4",
      "SIDEXIS XG",
      "XIOS",
      "SIM INTEGO",
      "SIMULATION UNIT",
      "ORTHOPHOS XG",
      "ORTHOPHOS E",
      "ORTHOPHOS S",
      "ORTHOPHOS SL",
      "ORTHOPHOS XG",
      "XIOS"
    ],
    dentalUnits: [
      "HELIODENT",
      "HELIODENT DS",
      "HELIODENT PLUS",
      "HELIODENT VARIO",
      "C2",
      "C5",
      "C8",
      "CEREC MC",
      "CEREC MC XL",
      "INLAB MC",
      "INLAB MC X5",
      "INLAB MC XL",
      "INLAB PC",
      "INLAB PROFIRE",
      "SIROTORQUE L",
      "T1 CLASSIC",
      "T1 ENERGO",
      "T1 HIGHSPEED",
      "T1 LINE",
      "T1 TURBINE",
      "T2 ENERGO",
      "T2 HIGHSPEED",
      "T2 LINE",
      "T2 REVO",
      "T3 HIGHSPEED",
      "T3 LINE",
      "T3 RACER",
      "T3 TURBINE",
      "T4 LINE",
      "T4 RACER",
      "TURBINE",
      "TURBINES SIROBOOST",
      "TURBINES T1 CONTROL",
      "VARIO DG",
      "AXANO",
      "AXEOS",
      "C2",
      "C5",
      "C8",
      "M1",
      "MM2-SINTER",
      "HEAT-DUO",
      "MOTORCAST COMPACT",
      "MULTIMAT",
      "ORTHOPHOS E",
      "ORTHOPHOS S",
      "ORTHOPHOS SL",
      "ORTHOPHOS XG",
      "VARIO DG"
    ],
    lasers: [
      "FONALASER",
      "SIROLASER",
      "SIROLASER XTEND",
      "SIROENDO",
      "SIROCAM",
      "SIROLUX",
      "SIROPURE"
    ],
    intraoralScanners: [
      "INLAB MC",
      "INLAB MC X5",
      "INLAB MC XL",
      "PRIMESCAN AC",
      "SIM INTEGO",
      "INTEGO",
      "PRIMESCAN",
      "PRIMESCAN AC",
      "CEREC PRIMESCAN"
    ],
    dentalInstrumentsTools: [
      "AE SENSOR",
      "APOLLO DI",
      "AXANO",
      "AXEOS",
      "CARL",
      "PAUL",
      "CEILING MODEL",
      "CERCON",
      "ENDO",
      "HEAT-DUO",
      "LEDLIGHT",
      "LEDVIEW",
      "M1",
      "MAILLEFER",
      "MIDWEST",
      "MM2-SINTER",
      "MOTORCAST COMPACT",
      "MULTIMAT",
      "PROFEEL",
      "PROFIRE",
      "SIMULATION UNIT",
      "SINIUS",
      "SIROCAM",
      "SIROENDO",
      "SIROLUX",
      "SIROPURE",
      "SIROTORQUE L",
      "SIUCOM",
      "SIVISION",
      "TEMPERATURE TABLE",
      "TENEO",
      "TULSA",
      "VARIO DG",
      "TURBINES SIROBOOST",
      "TURBINES T1 CONTROL"
    ],
    other: [
      "INTRAORAL PRODUCTS",
      "DAC UNIVERSAL",
      "VARIO DG",
      "TENEO"
    ],
  };

  const handleCategoryChange = (event: any) => {
    const newCategory = event.target.value;
    setCategory(newCategory);

    const defaultDevice = optionMap[newCategory][0];
    setDevice(defaultDevice);
    onDeviceChange(defaultDevice);  // Pozovi onDeviceChange kada se promeni uređaj
  };

  const handleDeviceChange = (event: any) => {
    const selectedDevice = event.target.value;
    setDevice(selectedDevice);
    onDeviceChange(selectedDevice); // Pozovi onDeviceChange kada se promeni uređaj
  };

  return (
    <Container>
      <Grid container spacing={2} direction="column">
        {showAdditionalCards && (
          <Grid item>
            <Card className={style.device}>
              <CardContent>
                <Box display="flex" flexDirection="column" alignItems="flex-start">
                  <Typography variant="body1" sx={{ fontSize: '18px', marginBottom: '20px'}} component="div">Izaberi kategoriju i uređaj</Typography>
                  <FormControl fullWidth sx={{ mb: 4, mt: 1 }}>
                    <InputLabel id="tool-select-label"
                      sx={{
                        color: 'white', 
                        '&.Mui-focused': { 
                          color: 'white',
                        },
                      }}
                    >Izaberi kategoriju</InputLabel>
                    <Select
                      labelId="tool-select-label"
                      id="tool-select"
                      value={category}
                      label="Category"
                      onChange={handleCategoryChange}
                    >
                      <MenuItem value="cadcamSystems">CAD/CAM Systems</MenuItem>
                      <MenuItem value="imagingSystems">Imaging Systems</MenuItem>
                      <MenuItem value="dentalUnits">Dental Units</MenuItem>
                      <MenuItem value="lasers">Lasers</MenuItem>
                      <MenuItem value="intraoralScanners">Intraoral Scanners</MenuItem>
                      <MenuItem value="dentalInstrumentsTools">Dental Instruments and Tools</MenuItem>
                      <MenuItem value="other">Other Equipment/Accessories</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel id="option-select-label" 
                      sx={{
                        color: 'white', 
                        '&.Mui-focused': {
                          color: 'white',
                        },
                      }}
                    >Izaberi uređaj</InputLabel>
                    <Select
                      labelId="option-select-label"
                      id="option-select"
                      value={device}
                      label="Device"
                      onChange={handleDeviceChange}
                      disabled={!category}
                    >
                      {category && optionMap[category]?.map((optionItem, index) => (
                        <MenuItem key={index} value={optionItem}>
                          {optionItem}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}

        {cardData.map((card: any) => (
          <Grid item key={card.id}>
            <a
              href={card.url}
              target="_self"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Card className={style.card}>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    {card.icon && React.createElement(card.icon, { style: { marginRight: 8 } })}
                    <Typography variant="body1" className={style.cardDetail} component="div">
                      {card.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2">{card.content}</Typography>
                </CardContent>
              </Card>
            </a>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SupportMenu;

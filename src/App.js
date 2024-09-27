import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  Stack,
  CardHeader,
  Divider,
  CardContent,
  Modal,
} from '@mui/material';
import Grid2 from '@mui/material/Grid2';

function TokenGenerator() {
  const [blueTokenCount, setBlueTokenCount] = useState('');
  const [blueTokenPrefix, setBlueTokenPrefix] = useState('');
  const [blueTokensPerRow, setBlueTokensPerRow] = useState(1);
  const [redTokenCount, setRedTokenCount] = useState('');
  const [redTokenPrefix, setRedTokenPrefix] = useState('');
  const [redTokensPerRow, setRedTokensPerRow] = useState(1);

  const [blueTokens, setBlueTokens] = useState([]);
  const [redTokens, setRedTokens] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleGenerate = () => {
    const blueTokensArray = Array.from({ length: parseInt(blueTokenCount) }, (_, i) => (
      `${blueTokenPrefix}${i + 1}`
    ));

    const redTokensArray = Array.from({ length: parseInt(redTokenCount) }, (_, i) => (
      `${redTokenPrefix}${i + 1}`
    ));

    setBlueTokens(blueTokensArray);
    setRedTokens(redTokensArray);
    setOpenDialog(true);
  };

  const handleClear = () => {
    setBlueTokenCount('');
    setBlueTokenPrefix('');
    setBlueTokensPerRow(1);
    setRedTokenCount('');
    setRedTokenPrefix('');
    setRedTokensPerRow(1);
    setBlueTokens([]);
    setRedTokens([]);
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const createRows = (tokens, tokensPerRow) => {
    const rows = [];
    for (let i = 0; i < tokens.length; i += tokensPerRow) {
      rows.push(tokens.slice(i, i + tokensPerRow));
    }
    return rows;
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 2, p: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Token Generator
      </Typography>
      <Card sx={{ borderRadius: "2%", bgcolor: '#eaeaea' }} elevation={3}>
        <Grid2 container sx={{ p: 3 }}>
          <Grid2 xs={12} md={8}>
            <Card sx={{ mb: 3, borderRadius: '2%', p: 2 }} elevation={0}>
              <CardHeader title="Blue Token Generate" />
              <Stack spacing={3} sx={{ p: 3 }}>
                <Box
                  display="grid"
                  rowGap={2}
                  columnGap={2}
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(1, 1fr)',
                    md: 'repeat(2, 1fr)',
                  }}
                >
                  <TextField
                    fullWidth
                    type="number"
                    label="Number of blue tokens"
                    value={blueTokenCount}
                    onChange={(e) => setBlueTokenCount(e.target.value)}
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Prefix for blue tokens"
                    value={blueTokenPrefix}
                    onChange={(e) => setBlueTokenPrefix(e.target.value)}
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    type="number"
                    label="Blue tokens per row"
                    value={blueTokensPerRow}
                    onChange={(e) => setBlueTokensPerRow(Number(e.target.value))}
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                </Box>
              </Stack>
            </Card>
          </Grid2>
          <Grid2 xs={12} md={8}>
            <Card sx={{ mb: 3, borderRadius: '2%', p: 2 }} elevation={0}>
              <CardHeader title="Red Token Generate" />
              <Stack spacing={3} sx={{ p: 3 }}>
                <Box
                  display="grid"
                  rowGap={2}
                  columnGap={2}
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(1, 1fr)',
                    md: 'repeat(2, 1fr)',
                  }}
                >
                  <TextField
                    fullWidth
                    type="number"
                    label="Number of red tokens"
                    value={redTokenCount}
                    onChange={(e) => setRedTokenCount(e.target.value)}
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Prefix for red tokens"
                    value={redTokenPrefix}
                    onChange={(e) => setRedTokenPrefix(e.target.value)}
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    type="number"
                    label="Red tokens per row"
                    value={redTokensPerRow}
                    onChange={(e) => setRedTokensPerRow(Number(e.target.value))}
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                </Box>
              </Stack>
            </Card>
          </Grid2>
          <Box sx={{ pt: 3, display: 'flex', justifyContent: 'right', gap: 2 }}>
            <Button variant="contained" color="primary" fullWidth onClick={handleGenerate}>
              Generate
            </Button>
            <Button variant="outlined" color="secondary" fullWidth onClick={handleClear}>
              Clear
            </Button>
          </Box>
        </Grid2>
      </Card>

      <Modal
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 700,
            overflow:'auto',
            maxHeight: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: '8px',
            p: 2,
          }}
        >
          <Card variant="outlined" sx={{ borderRadius: '8px' }}>
            <CardContent>
              <Typography id="modal-modal-title" variant="h6" component="h2" align="center" gutterBottom>
                Generated Tokens
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Blue Tokens:</Typography>
              {createRows(blueTokens, blueTokensPerRow).map((row, rowIndex) => (
                <Grid2 container key={rowIndex} spacing={1}>
                  {row.map((token, index) => (
                    <Grid2 item xs={12 / Math.max(1, blueTokensPerRow)} key={index}>
                      <Box
                        sx={{
                          p: 1,
                          border: '1px solid #1976d2',
                          textAlign: 'center',
                          m: 1,
                          borderRadius: '4px',
                          bgcolor: '#e3f2fd',
                        }}
                      >
                        {token}
                      </Box>
                    </Grid2>
                  ))}
                </Grid2>
              ))}

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Red Tokens:</Typography>
              {createRows(redTokens, redTokensPerRow).map((row, rowIndex) => (
                <Grid2 container key={rowIndex} spacing={1}>
                  {row.map((token, index) => (
                    <Grid2 item xs={12 / Math.max(1, redTokensPerRow)} key={index}>
                      <Box
                        sx={{
                          p: 1,
                          border: '1px solid #d32f2f',
                          textAlign: 'center',
                          m: 1,
                          borderRadius: '4px',
                          bgcolor: '#ffebee',
                        }}
                      >
                        {token}
                      </Box>
                    </Grid2>
                  ))}
                </Grid2>
              ))}

              <Stack sx={{ mt: 2, justifyContent: 'flex-end', flexDirection: 'row' }}>
                <Button variant="contained" onClick={handleCloseDialog} color="primary">
                  Close
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </Container>
  );
}

export default TokenGenerator;

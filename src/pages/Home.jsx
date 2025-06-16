import { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { 
  Speed as SpeedIcon,
  Brush as BrushIcon,
  ThumbUp as ThumbUpIcon 
} from '@mui/icons-material';

function Home() {
  const [count, setCount] = useState(0);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Welcome to My React App Test
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            A modern, responsive single-page application built with React and Material-UI
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={() => setCount((count) => count + 1)}
              size="large"
            >
              Count is {count}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Features
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <BrushIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography gutterBottom variant="h5" component="h2">
                  Modern Design
                </Typography>
                <Typography>
                  Clean and responsive layout that works on all devices
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <SpeedIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography gutterBottom variant="h5" component="h2">
                  Fast Performance
                </Typography>
                <Typography>
                  Built with Vite for lightning-fast development and builds
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <ThumbUpIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography gutterBottom variant="h5" component="h2">
                  Easy to Use
                </Typography>
                <Typography>
                  Simple and intuitive user interface
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Home; 
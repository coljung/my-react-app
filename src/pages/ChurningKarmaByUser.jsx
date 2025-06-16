import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&.badkarma': {
    backgroundColor: 'rgba(255, 234, 0, 0.7)',
  },
  '&.nokarma': {
    backgroundColor: 'rgba(255, 0, 21, 0.7)',
  },
}));

const ChurningKarmaByUser = () => {
  const [url, setUrl] = useState('');
  const [commentCount, setCommentCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const start = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError(null);
    setUsers([]);
    setCommentCount(0);

    try {
      const response = await fetch(`${url}.json?sort=new&limit=1000&raw_json=1`);
      const data = await response.json();
      const comments = data[1].data.children;
      const UTCThreeMonthsAgo = (Date.now() / 1000) - 7776000;
      const usersArray = [];

      for (const comment of comments) {
        const author = comment.data.author;
        let karma = 0;
        let commentCount = 0;
        let finishedThreeMonths = false;

        const processComments = async (afterComment = null) => {
          try {
            const userResponse = await fetch(
              `https://www.reddit.com/user/${author}/comments.json?sort=new&limit=100&after=${afterComment || ''}&raw_json=1`
            );
            const userData = await userResponse.json();
            commentCount += userData.data.children.length;
            setCommentCount(prev => prev + userData.data.children.length);

            for (const userComment of userData.data.children) {
              if (userComment.data.subreddit === "churningcanada") {
                if (userComment.data.created_utc < UTCThreeMonthsAgo) {
                  finishedThreeMonths = true;
                  break;
                }
                karma += userComment.data.score;
              }
            }

            if (userData.data.after && !finishedThreeMonths) {
              await new Promise(resolve => setTimeout(resolve, 2500));
              await processComments(userData.data.after);
            } else if (karma < 25) {
              usersArray.push({ author, karma });
              setUsers(prev => [...prev, { author, karma }]);
            }
          } catch (error) {
            console.error('Error fetching user comments:', error);
          }
        };

        await processComments();
      }

      await Promise.all(comments.map(comment => processComments()));
    } catch (error) {
      setError('Error fetching data. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          ChurningCanada Karma Calculator
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Get your ChurningCanada Karma to check if you are eligible to post in the referral threads
        </Typography>

        <Alert severity="info" sx={{ my: 2 }}>
          <Typography variant="body1">
            <strong>How does it work?</strong>
          </Typography>
          <ul>
            <li>Gets your comments on /r/churning from the past 3 months. Reddit only gives the last 1000 comments total so if you are a very active user, this might not be accurate</li>
            <li>If comment score{'>'}0, add (comment score-1). Otherwise the comment does not add anything to your churning karma.</li>
          </ul>
          <Typography variant="body2">
            <strong>Everything is fetched locally by your browser so don't abuse this by checking everyone's score. Doing so might cause reddit to place limits on you.</strong>
          </Typography>
        </Alert>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            label="Referral Thread full url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            variant="outlined"
          />
          <Button 
            variant="contained" 
            onClick={start}
            disabled={loading}
          >
            Submit
          </Button>
        </Box>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress />
            <Typography sx={{ ml: 2 }}>
              Fetched {commentCount} total comments...
            </Typography>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ my: 2 }}>
            {error}
          </Alert>
        )}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Karma</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <StyledTableRow 
                  key={user.author}
                  className={user.karma < 1 ? 'nokarma' : user.karma < 5 ? 'badkarma' : ''}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.author}</TableCell>
                  <TableCell>{user.karma}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default ChurningKarmaByUser; 
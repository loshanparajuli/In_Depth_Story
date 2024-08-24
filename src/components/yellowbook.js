import { Container, Box, Button, Heading } from 'theme-ui';

export default function Yellobook() {
  const openPDF = () => {
    const pdfUrl = 'https://drive.google.com/file/d/1u8JtXZLSK5jVxRctMl3ykzYrXEulnCKB/view?usp=sharing';
    window.open(pdfUrl, '_blank');
  };

  return (
    <Box>
      <Container>
        <Box sx={styles.cardWrapper}>
          <Box sx={styles.contentBox}>
            <Heading as="h2" sx={styles.title}>
              <span style={{ fontWeight: 'bold', color: 'red' }}>
                संघीय संसद सचिवालय, प्रतिनिधिको सम्पर्क नम्बर
              </span>
            </Heading>
            <Button
              onClick={openPDF}
              sx={styles.openPdfButton}
              aria-label="Open PDF"
            >
              Telephone Directory (PDF)
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

const styles = {
  cardWrapper: {
    boxShadow: 'none',
    transition: 'all 0.3s',
    borderRadius: '6px',
    p: ['20px 15px', '25px 20px'], // Reduced padding values
    bg: 'white',
    textAlign: 'center',
    m: '20px auto',
    width: ['100%', null, '540px', '600px'],
    '&:hover': {
      boxShadow: '0px 6px 30px rgba(38, 78, 118, 0.1)',
    },
  },
  contentBox: {
    textAlign: 'center',
  },
  title: {
    fontSize: ['24px', null, '28px', null, null, '32px', null, '36px'],
    lineHeight: [1.3, null, null, 1.25],
    fontWeight: 'normal', // Ensuring text is not bold by default
    letterSpacing: ['-.5px', null, '-1.5px'],
    mb: [2, 3],
  },
  openPdfButton: {
    mt: [6, null, null, 7],
    backgroundColor: 'primary',
    color: 'white',
    borderRadius: '5px',
    padding: ['10px 20px', null, '12px 30px'],
    cursor: 'pointer',
    fontSize: ['16px', null, '18px'],
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: 'darken',
    },
  },
};

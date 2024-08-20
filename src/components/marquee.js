import { Container, Heading, Text, Box } from 'theme-ui';
import Image from 'next/image';
import SectionHeader from 'components/section-header';
import Carousel from 'react-multi-carousel';
import { useState, useEffect } from 'react';
import Papa from 'papaparse';

const csvUrl = process.env.NEXT_PUBLIC_CSV_URL;

const fetchData = async () => {
  const response = await fetch(csvUrl);
  const csvData = await response.text();
  const parsedData = Papa.parse(csvData, { header: true }).data;
  return parsedData.map(row => ({
    id: row.id,
    title: row.title,
    avatar: row.avatar,
    name: row.name,
    designation: row.designation,
    startDate: new Date(row.startDate),
    endDate: new Date(row.endDate),
    
  }));
};

const calculateTimeLeft = (endDate) => {
  const difference = +new Date(endDate) - +new Date();
  let timeLeft = {};

  if (difference >= 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false,
    };
  } else {
    const elapsed = Math.abs(difference);
    timeLeft = {
      days: Math.floor(elapsed / (1000 * 60 * 60 * 24)),
      hours: Math.floor((elapsed / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((elapsed / 1000 / 60) % 60),
      seconds: Math.floor((elapsed / 1000) % 60),
      expired: true,
    };
  }

  return timeLeft;
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1619 },
    items: 3,
    slidesToSlide: 3,
  },
  laptop: {
    breakpoint: { max: 1619, min: 1024 },
    items: 2,
    slidesToSlide: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 639, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

export default function TestimonialCard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  return (
    <Box id="testimonial" sx={{ variant: 'section.testimonial' }}>
      <Container css={{ textAlign: 'center' }}>
        <SectionHeader slogan="Covering the uncovered" title="Meet those FAKE Promises" />
      </Container>
      <Box sx={styles.carouselWrapper}>
        {data.length > 0 ? (
          <Carousel
            additionalTransfrom={0}
            arrows={false}
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="carousel-container"
            draggable
            focusOnSelect={false}
            infinite={true}
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            responsive={responsive}
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
          >
            {data.map((item) => (
              <ReviewCard key={`testimonial--key${item.id}`} item={item} />
            ))}
          </Carousel>
        ) : (
          <Text>Loading...</Text>
        )}
      </Box>
    </Box>
  );
}

function ReviewCard({ item }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(item.endDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(item.endDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [item.endDate]);

  return (
    <Box sx={{ ...styles.reviewCard, animation: 'moveLeft 10s linear infinite' }}>
      <style jsx>{`
        @keyframes moveLeft {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
      <Box sx={styles.imageContainer}>
        {item.avatar ? (
          <Image src={item.avatar} alt={item.name || 'Client Image'} width={100} height={100} />
        ) : (
          <Text>No Image Available</Text>
        )}
      </Box>
      <Box sx={styles.textContainer}>
        {item.name && <Heading as="h4" sx={styles.heading}>{item.name}</Heading>}
        {item.title && <Text sx={styles.title}>{item.title}</Text>}
        {item.designation && <Text sx={styles.designation}>{item.designation}</Text>}
        <Heading as="h3" sx={styles.boldText}>
          {timeLeft.expired ? "Time Over" : "Remaining Time"}
        </Heading>
        <Text
          sx={{
            ...styles.timer,
            color: timeLeft.expired ? 'red' : 'inherit',
            animation: timeLeft.expired ? 'blink 1s infinite' : 'none',
          }}
        >
          {timeLeft.expired
            ? `-${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`
            : `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
        </Text>
      </Box>
    </Box>
  );
}

const styles = {
  carouselWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'flex-end',
    mt: '-30px',
    px: '15px',
    '.carousel-container': {
      width: '100%',
      maxWidth: [
        '100%',
        null,
        null,
        '750px',
        '1000px',
        '1180px',
        null,
        'calc(50% + 865px)',
      ],
      mr: ['auto', null, null, null, null, null, null, '-220px'],
      ml: 'auto',
      '.react-multi-carousel-item': {
        transition: 'all 0.25s',
      },
    },
  },
  reviewCard: {
    display: 'flex',
    flexDirection: 'row',
    width: ['100%', null, null, '95%', '90%'],
    boxShadow: '0px 0px 1px rgba(38, 78, 118, 0.35)',
    transition: 'all 0.3s',
    borderRadius: '6px',
    p: ['30px 20px', '35px 30px'],
    bg: 'white',
    textAlign: 'left',
    m: '20px auto',
    '&:hover': {
      boxShadow: '0px 6px 30px rgba(38, 78, 118, 0.1)',
    },
  },
  imageContainer: {
    width: '25%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    img: {
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
      transition: 'all 0.3s ease',
    },
  },
  textContainer: {
    width: '75%',
    paddingLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: [2, 3],
    fontWeight: 700,
    mb: '10px',
    color: 'text',
    lineHeight: 1.6,
  },
  designation: {
    color: 'primary',
    fontWeight: 500,
    fontSize: 1,
    lineHeight: 1.4,
    mb: '10px',
  },
  boldText: {
    fontWeight: 700,
    textAlign: 'right',
    mb: '5px',
  },
  timer: {
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: [2, 3],
  },
};

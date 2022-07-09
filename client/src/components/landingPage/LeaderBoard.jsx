/* eslint-disable import/no-unresolved */
import { Box } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, Pagination, Navigation } from 'swiper';

import HeadingComponent from '../Custom Components/HeadingComponent.jsx';
import CardComponent from '../Custom Components/CardComponent.jsx';

function LeaderBoard({ USER }) {
  return (
    <Box maxW="90%" mx="auto" mt={20} mb={10}>
      <HeadingComponent HeadingText="Leader Board" />
      <Box>
        <Swiper
          style={{
            '--swiper-navigation-color': '#ffab24',
            '--swiper-pagination-color': '#ffab24',
          }}
          navigation
          spaceBetween={20}
          rewind
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          autoplay={{
            delay: 2000,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper"
        >
          {USER.map((user) => (
            <SwiperSlide key={user.id}>
              <CardComponent id={user.id} name={user.name} image={user.image} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}

export default LeaderBoard;

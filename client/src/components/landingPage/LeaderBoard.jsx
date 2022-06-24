import { Box } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, Pagination, Navigation } from "swiper";

import HeadingComponent from '../Custom Components/HeadingComponent'
import CardComponent from "../Custom Components/CardComponent";


function LeaderBoard({ USER }) {

  return (
    <Box maxW={'90%'} mx="auto" mt={20} mb={10}>
      <HeadingComponent HeadingText={'Leader Board'} />
      <Box>
        <Swiper
          style={{
            "--swiper-navigation-color": "#ffab24",
            "--swiper-pagination-color": "#ffab24",
          }}
          navigation={true}
          spaceBetween={20}
          rewind={true}
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
          {USER.map((user) => {
            return (
              <SwiperSlide key={user.id}>
                <CardComponent id={ user.id } name={user.name} image={user.image} />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </Box>
    </Box>
  )
}

export default LeaderBoard
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { db } from '../firebase.config';
import Spinner from './Spinner';

/* <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        {listing.imageUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <img
              src={listing.imageUrls[index]}
              style={{
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                position: 'relative',
                height: '100%',
                width: '100%',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
 */

function Slider() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, 'listings');
      const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5));
      const querySnap = await getDocs(q);

      let listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      //   console.log(listings);

      setListings(listings);
      setLoading(false);
    };

    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    listings && (
      <>
        <p className="exploreHeading">Recommended</p>

        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1}
          pagination={{ clickable: true }}
        >
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div className="swiper-container">
                <img
                  src={data.imageUrls[0]}
                  style={{
                    objectFit: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    position: 'relative',
                    height: '100%',
                    width: '100%',
                  }}
                />
                <p className="swiperSlideText">{data.name}</p>
                <p className="swiperSlidePrice">
                  ${data.discountedPrice ?? data.regularPrice}{' '}
                  {data.type === 'rent' && '/ month'}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}

export default Slider;

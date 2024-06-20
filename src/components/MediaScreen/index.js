import React, { useState, useEffect } from 'react';
import './styles.scss';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Link } from 'react-router-dom';
import HoverScreen from '../HoverScreen';
import axios from '../../axios';

function MediaScreen({
  heading,
  fetchURL,
  API_KEY,
  genre = -1,
  moveCount,
  media_type,
}) {
  const [data, setData] = useState([]);
  const base_url = 'https://image.tmdb.org/t/p/original/';
  const count = 0;

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(fetchURL);
      setData(response.data.results);
      return response;
    }
    fetchData();
  }, [fetchURL]);

  const scrollToLeft = () => {
    document.getElementById(`bannerDiv${moveCount.toString()}`).scrollBy({
      left: -800,
    });
  };
  const scrollToRight = () => {
    document.getElementById(`bannerDiv${moveCount.toString()}`).scrollBy({
      left: 800,
    });
  };

  const setPosition = (item) => {
    const x = document.getElementById(`1${item.id}`);
    const divItem = document.getElementById(`2${item.id}`);
    const ele = document.getElementById(`bannerDiv${moveCount.toString()}`);
    if (divItem) {
      divItem.style.position = 'absolute';
      divItem.style.top = `${x.offsetTop}px`;
      divItem.style.left = `${x.offsetLeft - ele.scrollLeft}px`;
    }
  };

  const shuffleData = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  };
  if (data.length > 0) {
    shuffleData(data);
  }
  return (
    <div className="mediaScreen">
      <div className="headingBanner">
        <div>{heading}</div>
        {genre > 0 ? (
          <Link to={`/content?genre=${genre}&title=${heading}`}>
            <div className="moreButton">see more</div>
          </Link>
        ) : (
          <div />
        )}
      </div>

      <div className="leftIconDiv" onClick={scrollToLeft}>
        <ChevronLeftIcon className="leftIcon" fontSize="large" />
      </div>
      <div className="banner" id={`bannerDiv${moveCount.toString()}`}>
        &nbsp;
        {data.map((item) => (
          <div key={item.id}>
            {item.backdrop_path ? (
              <div
                className="mediaDiv"
                id={`1${item.id}`}
                onMouseEnter={() => {
                  setPosition(item);
                }}
              >
                <img
                  src={`${base_url}${item.backdrop_path}`}
                  alt={item.name}
                  className="mediaImg"
                />

                <div className="displayhoverScreen" id={`2${item.id}`}>
                  <HoverScreen
                    item={item}
                    api_key={API_KEY}
                    media_type={media_type}
                  />
                </div>
              </div>
            ) : (
              <div />
            )}
          </div>
        ))}
      </div>
      <div className="rightIconDiv" onClick={scrollToRight}>
        <ChevronRightIcon className="rightIcon" fontSize="large" />
      </div>
    </div>
  );
}

export default MediaScreen;

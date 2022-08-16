import React from 'react';
import Lottie from 'react-lottie';
import 'react-responsive-modal/styles.css';

import { useFilterContext } from '@hooks/useFilterContext';

import animation from './loading.json';

function Loading() {
  const { loading } = useFilterContext();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {loading && (
        <div
          style={{
            height: '100vh',
            width: '100vw',
            position: 'absolute',
            zIndex: '1',
            backdropFilter: 'blur(2px)',
            backgroundColor: 'rgba(0,0,0,0.2)',
          }}
        >
          (
          <Lottie
            isPaused={false}
            options={defaultOptions}
            height={250}
            width={350}
          />
          )
        </div>
      )}
    </>
  );
}

export default Loading;

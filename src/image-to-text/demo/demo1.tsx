import React from 'react';
import {ImageToText} from 'other-to-text'
import myfrined from './myfriend.jpeg'
const Example = () => {
  return (
    <div>
      
      <ImageToText 
      sourceImg={myfrined}
      />
    </div>
  );
};

export default Example;

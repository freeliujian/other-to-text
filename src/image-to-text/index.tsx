import React, { useRef ,useEffect,useState, ReactNode} from 'react';
import {toCharts,getCharsMap} from '../utils'


interface ImageToTextProps {
  sourceImg :string | ReactNode
}

const ImageToText = (props:ImageToTextProps) => {
  const {sourceImg} =props
  const imgRef = useRef<any>(null)
  const cavRef = useRef<any>(null)
  // const fileRef = useRef(null)
  // const file = fileRef.current?.files[0];
  const [code,setCode] = useState('');
  let img = new Image();
  
  let imgNaturalHeight = '';
  let imgNaturalWidth = '';
  useEffect(()=>{
    window.onload=()=>{
      console.log('start ~~ computer ~~ width and height')
      imgNaturalWidth=imgRef.current.naturalWidth;  
      imgNaturalHeight=imgRef.current.naturalHeight;  
    }
    
  })



  const showImage = ()=>{
    const cav = cavRef.current;
    const ctx = cav.getContext('2d');
    imgRef.current.setAttribute('crossOrigin', '');
    cav.width=imgNaturalWidth;  
    cav.height=imgNaturalHeight;  
    img.src = imgRef.current.src;
    img.setAttribute('crossOrigin', '');
    img.onload = ()=>{
      ctx.drawImage(img, 0, 0, cav.width, cav.height);
      setCode(toCharts({
        context:ctx,width:cav.width,height:cav.height,rowChars:100
      }))
    }
  }
  return (
    <div>

      <button type="button" onClick={showImage}>展示</button>
      <br/>
      <img ref={imgRef} src={sourceImg + '?' + new Date().getTime()} style={{width: '100px',height:'100px'}}/>  
      <canvas ref={cavRef}></canvas>
      <pre style={{fontSize:'10px',lineHeight:'8px',fontFamily:'Courier New'}}>
        {code}
      </pre>
      {/* {
        (file)?
        <canvas ref={cavRef}></canvas>:
        ""
      } */}
    </div>
  )
};

export default ImageToText;

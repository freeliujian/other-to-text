import React, { useRef ,useEffect,useState, ReactNode} from 'react';


interface toChartsProps {
  context: any
  width: any
  height: any
  rowChars: any
}
interface ImageToTextProps {
  sourceImg :string | ReactNode
}

const ImageToText = (props:ImageToTextProps) => {
  const {sourceImg} =props
  const imgRef = useRef(null)
  const cavRef = useRef(null)
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


  const toCharts = (imageContext: toChartsProps) => {
    const { context, width, height, rowChars } = imageContext
    console.log(context)
    let newRowChars = width < rowChars ? width : rowChars;
    let output = "";

      const  imageData = context.getImageData(0, 0, width, height)
      console.log(imageData)
      const  char_h = width / newRowChars,
      char_w = char_h,
      rows = height / char_h,
      map = getCharsMap(),
      cols = newRowChars

      const getBlockGray = (x, y, w, h) => {
        let sumGray = 0, pixels;
        for (let row = 0; row < w; row++) {
          for (let col = 0; col < h; col++) {
            let cx = x + col, //current position x  
              cy = y + row, //current positon y  
              index = (cy * imageData.width + cx) * 4, //current index in rgba data array  
              data = imageData.data,
              R = data[index],
              G = data[index + 1],
              B = data[index + 2],
              gray = ~~(R * 0.3 + G * 0.59 + B * 0.11);

            sumGray += gray;
          }
        }
        pixels = w * h;
        return ~~(sumGray / pixels);
      }   
      for (let r = 0; r < rows; r++) {  
          for (let c = 0; c < cols; c++) {  
              let pos_x = ~~(c * char_h),  
                  pos_y = ~~(r * char_h),  
                  
                  avg = getBlockGray(pos_x, pos_y, ~~char_w, ~~char_h),  
                  ch = map[avg];  
                  
              output += ch;  
          }  
          output += '\r\n';  
      }  
      console.log(output)
      return output; 
  }
  const getCharsMap = ()=>{
    const chars = ['@', 'w', '#', '$', 'k', 'd', 't', 'j', 'i', '.', ' '];  
    const  map = {};  
    for (let i = 0; i < 256; i++) {  
        const index = ~~(i / 25)  
        map[i] = chars[index];  
    };  
    return map; 
  }
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
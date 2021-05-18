import {toChartsProps} from '../types'

export const toCharts = (imageContext: toChartsProps) => {
  const { context, width, height, rowChars } = imageContext

  let newRowChars = width < rowChars ? width : rowChars;
  let output = "";

    const  imageData = context.getImageData(0, 0, width, height)
    const  char_h = width / newRowChars,
    char_w = char_h,
    rows = height / char_h,
    map = getCharsMap(),
    cols = newRowChars

    const getBlockGray = (x: number, y: number, w: number, h: number) => {
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
                ch = getCharsMap()[avg];  
                
            output += ch;  
        }  
        output += '\r\n';  
    }  
    return output; 
}

export const getCharsMap = ()=>{
  const chars = ['@', 'w', '#', '$', 'k', 'd', 't', 'j', 'i', '.', ' '];  
  const  map:any = {};  
  for (let i = 0; i < 256; i++) {  
      const index = ~~(i / 25)  
      map[i] = chars[index];  
  };  
  return map; 
}
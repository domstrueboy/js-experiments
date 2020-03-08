const fs = require('fs'),
len = 500000,
buff = Buffer.alloc(len),
pos = 0, offset = 0,
file = './progressive.jpg';

fs.open(file, 'r', (err, fd) => {
 fs.read(fd, buff, offset, len, pos,
 (err, bytes, buff) => { 
  const str = buff.toString('hex');
  // console.log(str, buff, bytes);
  const bytesPositions = [];
  console.log(str[0] + str[1]);
  for (let i = 0; i < str.length; i+=2) {
    if (str[i] + str[i + 1] + str[i + 2] + str[i + 3 ]=== 'ffc4') bytesPositions.push(i / 2);
  };
  // str.indexOf('ffc4');
  console.log(bytesPositions);
 });
});

// $img = "progressive.jpg";
// $jpgdata = file_get_contents($img);
// $positions = [];
// $offset = 0;
// while ($pos = strpos($jpgdata, "\xFF\xC4", $offset)) {
//     $positions[] = $pos+2;
//     $offset = $pos+2;
// }

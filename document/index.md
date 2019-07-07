# Tasks

Generate QR code pictures based on given link. Can generate a batch of QR given some dynamic link.

![Example](./preview-of-qr-generator.png)

# Features

- User can upload custome frame for the QR
- User can choose color
- User can insert a logo in the middle of the QR (only for small resoluiton of QR because the middle is the checksum)

# Work

- [x] Choose a QR generator library. [qrcode-svg](https://github.com/papnkukn/qrcode-svg)
- Setup the link form and the customize area
- Make responsive

# qrcode-svg

##### Code for getting the svg
```javascript
var QRCode = require('qrcode-svg');
var svg = new QRCode('Hello World!').svg();
```

##### Code for saving the image
```javascript
qrcode.save('sample.svg', function(error) {
  if (error) throw error;
  console.log('Done!');
});
```

##### Code for options
```javascript
var qrcode = new QRCode({
  content: 'http://github.com/',
  padding: 4,
  width: 256,
  height: 256,
  color: '#000000',
  background: '#ffffff',
  ecl: 'M',
});
```

#### List of options:

- content - QR Code content, required
- padding - white space padding, 4 modules by default, 0 for no border
- width - QR Code width in pixels
- height - QR Code height in pixels
- color - color of modules, color name or hex string, e.g. #000000
- background - color of background, color name or hex string, e.g. white
- ecl - error correction level: L, M, H, Q

## Svg with background

You can do it by making the background into a pattern:

```
<defs>
  <pattern id="img1" patternUnits="userSpaceOnUse" width="100" height="100">
    <image xlink:href="wall.jpg" x="0" y="0" width="100" height="100" />
  </pattern>
</defs>
```

Adjust the width and height according to your image, then reference it from the path like this:

```
<path d="M5,50
         l0,100 l100,0 l0,-100 l-100,0
         M215,100
         a50,50 0 1 1 -100,0 50,50 0 1 1 100,0
         M265,50
         l50,100 l-100,0 l50,-100
         z"
  fill="url(#img1)" />
```

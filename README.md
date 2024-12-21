# PlayInHTML
Takes a Youtube playlist and prettifies it into HTML using Google App Script. Ideal for integrating with Google Sites.

## Parameters
Once published as a web app, the following parameters are available:

### `list=abcdef...`
The playlist ID to pull data from
* Expected value: String of playlist ID
* Default value: `UUaN5pdq-IL4TMCusowpEn6w`

### `results=10`
Limits the number of results  
NOTE: Setting this to a high value or leaving unset will have a large impact on load times  
* Expected value: Whole number (integer)
* Default value: `infinity`

### `aCol=black`
Sets the color of link text 
* Expected value: String of [HTML Color Name](https://www.w3schools.com/colors/colors_names.asp) OR `rgb(XXX,YYY,ZZZ)` value of color
* Default value: `rgb(0,0,238)`

### `bgCol=white`
Sets the color of page background
* Expected value: String of [HTML Color Name](https://www.w3schools.com/colors/colors_names.asp) OR `rgb(XXX,YYY,ZZZ)` value of color
* Default value: `white`

### `font=Open+Sans`
Sets the font of link text
* Expected value: String name of [Web safe font](https://www.w3schools.com/cssref/css_websafe_fonts.php) or [Google Font](https://fonts.google.com)
* Default value: `sans-serif`

### `fontSize=12pt`
Sets the size of link text
* Expected value: String of number followed by [length unit](https://www.w3schools.com/cssref/css_units.php)
* Default value: `12pt`

### `fontWght=400`
Sets the font weight
* Expected value: String of [predefined font weight](https://www.w3schools.com/cssref/pr_font_weight.php) or number between 100-900
* Default value: `normal`

### `lineHeight=1.5`
Sets the line height
* Expected value: Any allowable [CSS line-height](https://www.w3schools.com/cssref/pr_dim_line-height.php) value
* Default value: `1.2`

## Example URL
  `https://script.google.com/macros/s/AKf...4EsLU/exec?aCol=rgb(28,28,28)&font=Open+Sans&fontSize=12pt&fontWght=400&lineHeight=1.5&results=50&list=UUaN5pdq-IL4TMCusowpEn6w`

![YTPlaylist](https://github.com/user-attachments/assets/8e1fe0c1-cf7b-43f5-b0d1-24ceae502e73)

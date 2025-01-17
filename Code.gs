function doGet(p) {
  const config = JSON.parse(HtmlService.createHtmlOutputFromFile("config.html").getContent());
  p.parameter.results = (p.parameter.results == undefined) ? config.defaults.results : p.parameter.results;
  p.parameter.list = (p.parameter.list == undefined) ? config.defaults.list : p.parameter.list
  p.parameter.font = (p.parameter.font == undefined) ? config.defaults.font : p.parameter.font;
  p.parameter.fontSize = (p.parameter.fontSize == undefined) ? config.defaults.fontSize : p.parameter.fontSize;
  p.parameter.fontWght = (p.parameter.fontWght == undefined) ? config.defaults.fontWght : p.parameter.fontWght;
  p.parameter.lineHeight = (p.parameter.lineHeight == undefined) ? config.defaults.lineHeight : p.parameter.lineHeight;
  p.parameter.bgCol = (p.parameter.bgCol == undefined) ? config.defaults.bgCol : p.parameter.bgCol;
  p.parameter.aCol = (p.parameter.aCol == undefined) ? config.defaults.aCol : p.parameter.aCol;

  var itemArray = [];
  var nextPageToken = "";
  var webOut = HtmlService.createTemplateFromFile('index');
  webOut.parameter = JSON.stringify(p.parameter);

  Logger.log(p.parameter)

  Logger.log('Getting content of playlist: '+p.parameter.list);

  while (nextPageToken !== undefined){
    var response = YouTube.PlaylistItems.list('snippet,status', {playlistId: p.parameter.list, maxResults: 50, pageToken: nextPageToken});
    for (var i = 0; i < response.items.length; i++) {
      var pItem = response.items[i];
      if (pItem.status.privacyStatus == "public" && itemArray.findIndex((item) => item.vId === pItem.snippet.resourceId.videoId) === -1) {
        itemArray.push({'vId': pItem.snippet.resourceId.videoId, 'vTitle': pItem.snippet.title});
      }
      if (itemArray.length == p.parameter.results) {break};
    };
    if (itemArray.length == p.parameter.results) {break};
    nextPageToken = response.nextPageToken;
  };

  webOut.itemArray = JSON.stringify(itemArray);
  
  webOut = webOut.evaluate();
  webOut.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  return(webOut);
};
//ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd hi
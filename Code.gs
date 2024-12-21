function doGet(p) {
  p.parameter.results = (p.parameter.results == undefined) ? Infinity : p.parameter.results;
  p.parameter.list = (p.parameter.list == undefined) ? "UUaN5pdq-IL4TMCusowpEn6w" : p.parameter.list
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
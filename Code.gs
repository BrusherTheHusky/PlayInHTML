/*  PlayInHTML - Takes a Youtube playlist and prettifies it into HTML
    Copyright (C) 2025 Brusher The Husky

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.


    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.


    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>. */


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

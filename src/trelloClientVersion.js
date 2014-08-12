function TrelloClientVersion(versionInfoFile) {

  var $this = this;
  var $versionInfo, $versionInfoText;

  $this.activate = function () {
    $.getJSON(versionInfoFile, function (data) {
      $versionInfo = $("<div id='versionInfo'></div>").insertBefore("#board");
      $versionInfoText = $("<div id='versionInfoText'></div>").insertAfter($versionInfo).hide();
      initPopup();
      fillPopup(data);
    });
  }

  var initPopup = function () {
    $versionInfoText.position({
                                my: "left+10 top+10",
                                at: "right bottom",
                                of: "#versionInfo"
                              })
    $versionInfoText.hide();
    var $description = $("<div class='description'>");
    $description.appendTo($versionInfoText);
    $("<p>Project to get read-only access to an Trello board.</p>").appendTo($description);
    $("<p>Sources @github: <a href='https://github.com/Atrusberlin/trello-html-client' target='_blank'>Atrusberlin/trello-html-client</a></p>").appendTo($description);

    var $infoTextHasFocus = false;

    $("#versionInfo").mouseover(function () {
      $infoTextHasFocus = false;
      $versionInfoText.show();
    }).mouseout(function () {
      window.setTimeout(hideInfoText, 3000);
    });

    /*    $versionInfoText.mouseover(function() {
     $infoTextHasFocus = true;
     }).mouseout(function() {
     $infoTextHasFocus = false;
     hideInfoText();
     })*/

    var hideInfoText = function () {
      if (!$infoTextHasFocus) {
        $versionInfoText.hide();
      }
    }

  };

  var fillPopup = function (releaseData) {
    var releases = releaseData.releases;
    if (releases && releases.length > 0) {
      for (i = 0; i < releases.length; i++) {
        var release = releases[i];
        $("<p>Version: " + release.number + "</p>").appendTo($versionInfoText);
        if (release.changes) {
          var changeList = $("<ul></ul>");
          for (change = 0; change < release.changes.length; change++) {
            var entry = release.changes[change];
            $("<li>" + entry.desc + "</li>").appendTo(changeList);
          }
          changeList.appendTo($versionInfoText);
        }

      }
    }

  }
}

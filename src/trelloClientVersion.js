function TrelloClientVersion(versionInfoFile) {

  var $this = this;
  var $versionInfo, $versionInfoText, $preDescritionText;

  $this.activate = function () {
    $.getJSON(versionInfoFile, function (data) {
      $versionInfo = $("<div id='versionInfo'></div>").insertBefore("#board");
      $versionInfoText = $("<div id='versionInfoText'></div>").insertAfter($versionInfo).hide();
      initPopup(data.description);
      fillPopup(data);
    });
  }

  $this.prependToDescription = function (additionalDescripion) {
    $preDescritionText = additionalDescripion;
  }

  var initPopup = function (description) {
    $versionInfoText.position({
                                my: "left+10 top+10",
                                at: "right bottom",
                                of: "#versionInfo"
                              })
    $versionInfoText.hide();
    var $description = $("<div class='description'>");
    $description.appendTo($versionInfoText);
    for (i = 0; i < description.length; i++) {
      $("<p>" + description[i].line + "</p>").appendTo($description);
    }
    $("<br/>").appendTo($description);

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

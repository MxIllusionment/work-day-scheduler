var startTime = 9;
var endTime = 18;


/* Dynamically creates all rows for the scheduler */
function pageInitializer() {
  for (var i = startTime; i < endTime; i++) {
    var newRow = $("<div>");
    var hourCol = $("<div>");
    var mainCol = $("<div>");
    var saveCol = $("<div>");
    var saveIcon = $("<i>");

    newRow.addClass("row time-block");
    newRow.attr("id", "time-" + i);
    hourCol.addClass("col-2 hour");

    /* Dynamically generate formatted time */
    hourCol.text(moment().hour(i).format("hA"));

    mainCol.addClass("col-9 main-col");
    mainCol.append("<textarea>");

    saveCol.addClass("col-1 saveBtn");
    saveIcon.addClass("fa fa-save");
    saveCol.append(saveIcon);

    newRow.append(hourCol);
    newRow.append(mainCol);
    newRow.append(saveCol);

    $("#timeblock-wrapper").append(newRow);
  }
}

/* Update date and row classes based on current time */
function timeUpdate() {
  var currentHour = moment().hour();

  /* Update date at top of screen */
  $("#currentDay").text(moment().format("dddd, MMMM Do"));

  /* Remove past/present/future classes from all main columns */
  $(".main-col").removeClass("past present future");

  /* Update each main column based on the current time */
  for (var i = startTime; i < endTime; i++) {
    var newClass;
    if (currentHour > i) {
      newClass = "past";
    } else if (currentHour < i) {
      newClass = "future";
    } else {
      newClass = "present";
    }
    $("#time-" + i).children(".main-col").addClass(newClass);
  }
}

/* Update time-based information every minute */
setInterval(timeUpdate, 60000);

/* Page initialization */
pageInitializer();
timeUpdate();
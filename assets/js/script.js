var startTime = 9;
var endTime = 18;


/* Dynamically creates all rows for the scheduler */
function pageInitializer() {
  for (var i = startTime; i < endTime; i++) {
    var newRow = $("<div>");
    var hourCol = $("<div>");
    var mainCol = $("<div>");
    var input = $("<textarea>");
    var saveCol = $("<div>");
    var saveIcon = $("<i>");

    newRow.addClass("row time-block");
    hourCol.addClass("col-2 hour");
    /* TODO: Dynamically generate formatted time */
    hourCol.text(i);

    mainCol.attr("id", "main-" + i);
    mainCol.addClass("col-9 main-col");
    input.attr("data-hour", i);
    mainCol.append(input);

    saveCol.addClass("col-1 saveBtn");
    saveIcon.addClass("fa fa-save");
    saveCol.append(saveIcon);
    saveCol.attr("data-hour", i);

    newRow.append(hourCol);
    newRow.append(mainCol);
    newRow.append(saveCol);

    $("#timeblock-wrapper").append(newRow);
  }
}

/* Update date and row classes based on current time */
function timeUpdate() {
  /* Update date at top of screen */
  $("#currentDay").text(moment().format("dddd, MMMM Do"));

  /* Remove past/present/future classes from all main columns */
  $(".main-col").removeClass("past present future");

  /* Update each main column based on the current time */
  for (var i = startTime; i < endTime; i++) {
    var newClass;
    var currentHour = moment().hour();
    if (currentHour > i) {
      newClass = "past";
    } else if (currentHour < i) {
      newClass = "future";
    } else {
      newClass = "present";
    }
    $("#main-" + i).addClass(newClass);
  }
}

/* Update time-based information every minute */
setInterval(timeUpdate, 60000);

/* Page initialization */
pageInitializer();
timeUpdate();
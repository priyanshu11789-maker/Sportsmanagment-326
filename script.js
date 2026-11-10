/* ===== DATA (stored in memory using Arrays and Objects) ===== */
var sports = ["Cricket", "Football", "Badminton", "Athletics", "Basketball", "Swimming"];

var athletes = [
  { name: "Aarav Sharma", age: 19, gender: "Male",   sport: "Cricket",   batch: "Morning", status: "" },
  { name: "Simran Kaur",  age: 20, gender: "Female", sport: "Badminton", batch: "Evening", status: "" },
  { name: "Rohan Verma",  age: 21, gender: "Male",   sport: "Football",  batch: "Morning", status: "" },
  { name: "Neha Singh",   age: 18, gender: "Female", sport: "Swimming",  batch: "Evening", status: "" }
];

var coaches = [
  { name: "Rajesh Kumar",  sport: "Cricket",    experience: 12 },
  { name: "Amandeep Gill", sport: "Football",   experience: 9 },
  { name: "Pooja Mehta",   sport: "Badminton",  experience: 7 },
  { name: "Harpreet Singh", sport: "Athletics", experience: 15 },
  { name: "Vikram Rao",    sport: "Basketball", experience: 10 },
  { name: "Anita Desai",   sport: "Swimming",   experience: 8 }
];

var schedule = [
  { day: "Monday",    sport: "Cricket",    coach: "Rajesh Kumar",   time: "6:00 AM - 8:00 AM", ground: "Main Cricket Ground" },
  { day: "Monday",    sport: "Badminton",  coach: "Pooja Mehta",    time: "5:00 PM - 7:00 PM", ground: "Indoor Court 1" },
  { day: "Tuesday",   sport: "Football",   coach: "Amandeep Gill",  time: "6:00 AM - 8:00 AM", ground: "Football Field A" },
  { day: "Tuesday",   sport: "Swimming",   coach: "Anita Desai",    time: "5:00 PM - 7:00 PM", ground: "Olympic Pool" },
  { day: "Wednesday", sport: "Athletics",  coach: "Harpreet Singh", time: "6:00 AM - 8:00 AM", ground: "Athletics Track" },
  { day: "Wednesday", sport: "Basketball", coach: "Vikram Rao",     time: "5:00 PM - 7:00 PM", ground: "Basketball Court" },
  { day: "Thursday",  sport: "Cricket",    coach: "Rajesh Kumar",   time: "5:00 PM - 7:00 PM", ground: "Main Cricket Ground" },
  { day: "Friday",    sport: "Football",   coach: "Amandeep Gill",  time: "5:00 PM - 7:00 PM", ground: "Football Field A" },
  { day: "Friday",    sport: "Badminton",  coach: "Pooja Mehta",    time: "6:00 AM - 8:00 AM", ground: "Indoor Court 1" },
  { day: "Saturday",  sport: "Swimming",   coach: "Anita Desai",    time: "6:00 AM - 8:00 AM", ground: "Olympic Pool" }
];

var performances = [
  { name: "Aarav Sharma", sport: "Cricket",   score: 82 },
  { name: "Simran Kaur",  sport: "Badminton", score: 90 },
  { name: "Rohan Verma",  sport: "Football",  score: 74 }
];

/* ===== COMMON FUNCTION: fill a dropdown with sports ===== */
function loadSportOptions(selectId, firstText) {
  var select = document.getElementById(selectId);
  var html = '<option value="">' + firstText + '</option>';
  for (var i = 0; i < sports.length; i++) {
    html += '<option value="' + sports[i] + '">' + sports[i] + '</option>';
  }
  select.innerHTML = html;
}

/* ===== ATHLETES PAGE ===== */
function showAthletes() {
  var table = document.getElementById("athleteTable");
  var rows = "";
  if (athletes.length === 0) {
    rows = '<tr><td colspan="7" class="empty">No athletes registered yet.</td></tr>';
  }
  for (var i = 0; i < athletes.length; i++) {
    var a = athletes[i];
    rows += "<tr><td>" + (i + 1) + "</td><td>" + a.name + "</td><td>" + a.age + "</td><td>" + a.gender +
            "</td><td>" + a.sport + "</td><td>" + a.batch +
            '</td><td><button class="btn-small btn-delete" onclick="deleteAthlete(' + i + ')">Delete</button></td></tr>';
  }
  table.innerHTML = rows;
}

function addAthlete(event) {
  event.preventDefault();                       // stop page reload
  var athlete = {
    name: document.getElementById("name").value.trim(),
    age: Number(document.getElementById("age").value),
    gender: document.getElementById("gender").value,
    sport: document.getElementById("sport").value,
    batch: document.getElementById("batch").value,
    status: ""
  };
  if (athlete.name === "" || athlete.sport === "" || athlete.gender === "" || athlete.batch === "") {
    alert("Please fill all the fields!");
    return;
  }
  athletes.push(athlete);
  showAthletes();
  document.getElementById("athleteForm").reset();
}

function deleteAthlete(index) {
  athletes.splice(index, 1);                    // remove 1 item at this position
  showAthletes();
}

/* ===== COACHES PAGE ===== */
function showCoaches(selectedSport) {
  var grid = document.getElementById("coachGrid");
  var html = "";
  for (var i = 0; i < coaches.length; i++) {
    var c = coaches[i];
    if (selectedSport === "" || c.sport === selectedSport) {
      html += '<article class="card coach-card center">' +
              '<img src="https://placehold.co/300x220/0b1d3a/ff7a00?text=' + encodeURIComponent(c.name) + '" alt="Photo of ' + c.name + '">' +
              "<h3>" + c.name + '</h3><span class="tag">' + c.sport + "</span>" +
              "<p>Experience: " + c.experience + " years</p></article>";
    }
  }
  grid.innerHTML = html;
}

function filterCoaches() {
  showCoaches(document.getElementById("coachFilter").value);
}

/* ===== SCHEDULE PAGE ===== */
function showSchedule(selectedSport) {
  var table = document.getElementById("scheduleTable");
  var rows = "";
  for (var i = 0; i < schedule.length; i++) {
    var s = schedule[i];
    if (selectedSport === "" || s.sport === selectedSport) {
      rows += "<tr><td>" + s.day + "</td><td>" + s.sport + "</td><td>" + s.coach +
              "</td><td>" + s.time + "</td><td>" + s.ground + "</td></tr>";
    }
  }
  table.innerHTML = rows;
}

function filterSchedule() {
  showSchedule(document.getElementById("scheduleFilter").value);
}

/* ===== ATTENDANCE PAGE ===== */
function showAttendance() {
  var table = document.getElementById("attendanceTable");
  var rows = "";
  for (var i = 0; i < athletes.length; i++) {
    var a = athletes[i];
    var statusText = '<span class="absent">Not Marked</span>';
    if (a.status === "Present") { statusText = '<span class="present">Present</span>'; }
    else if (a.status === "Absent") { statusText = '<span class="absent">Absent</span>'; }
    rows += "<tr><td>" + (i + 1) + "</td><td>" + a.name + "</td><td>" + a.sport + "</td><td>" + statusText +
            '</td><td><button class="btn-small btn-present" onclick="markAttendance(' + i + ', \'Present\')">Present</button>' +
            '<button class="btn-small btn-absent" onclick="markAttendance(' + i + ', \'Absent\')">Absent</button></td></tr>';
  }
  table.innerHTML = rows;
  updateAttendanceSummary();
}

function markAttendance(index, status) {
  athletes[index].status = status;
  showAttendance();
}

function updateAttendanceSummary() {
  var total = athletes.length;
  var present = 0;
  for (var i = 0; i < athletes.length; i++) {
    if (athletes[i].status === "Present") { present++; }
  }
  var percent = 0;
  if (total > 0) { percent = (present / total) * 100; }
  document.getElementById("totalCount").innerText = total;
  document.getElementById("presentCount").innerText = present;
  document.getElementById("attendancePercent").innerText = percent.toFixed(1) + "%";
}

/* ===== PERFORMANCE PAGE ===== */
function showPerformance() {
  var table = document.getElementById("performanceTable");
  var rows = "";
  for (var i = 0; i < performances.length; i++) {
    var p = performances[i];
    rows += "<tr><td>" + (i + 1) + "</td><td>" + p.name + "</td><td>" + p.sport + "</td><td>" + p.score + "</td></tr>";
  }
  table.innerHTML = rows;
  showDashboard();
}

function calculateAverage() {
  if (performances.length === 0) { return 0; }
  var sum = 0;
  for (var i = 0; i < performances.length; i++) {
    sum = sum + performances[i].score;
  }
  return sum / performances.length;
}

function showDashboard() {
  var avg = calculateAverage().toFixed(1);
  document.getElementById("averageScore").innerText = avg;
  document.getElementById("dashAverage").innerText = avg;
  document.getElementById("dashAthletes").innerText = athletes.length;
  document.getElementById("dashCoaches").innerText = coaches.length;
}

function addPerformance(event) {
  event.preventDefault();
  var name = document.getElementById("pName").value.trim();
  var sport = document.getElementById("pSport").value;
  var score = Number(document.getElementById("pScore").value);
  if (name === "" || sport === "") {
    alert("Please fill all the fields!");
    return;
  }
  if (score < 0 || score > 100) {
    alert("Score must be between 0 and 100!");
    return;
  }
  performances.push({ name: name, sport: sport, score: score });
  showPerformance();
  document.getElementById("performanceForm").reset();
}

/* ===== PAGE SETUP: run only the code needed for the current page ===== */
if (document.getElementById("athleteForm")) {
  loadSportOptions("sport", "-- Select Sport --");
  document.getElementById("athleteForm").addEventListener("submit", addAthlete);
  showAthletes();
}
if (document.getElementById("coachGrid")) {
  loadSportOptions("coachFilter", "All Sports");
  document.getElementById("coachFilter").addEventListener("change", filterCoaches);
  showCoaches("");
}
if (document.getElementById("scheduleTable")) {
  loadSportOptions("scheduleFilter", "All Sports");
  document.getElementById("scheduleFilter").addEventListener("change", filterSchedule);
  showSchedule("");
}
if (document.getElementById("attendanceTable")) {
  showAttendance();
}
if (document.getElementById("performanceForm")) {
  loadSportOptions("pSport", "-- Select Sport --");
  document.getElementById("performanceForm").addEventListener("submit", addPerformance);
  showPerformance();
}

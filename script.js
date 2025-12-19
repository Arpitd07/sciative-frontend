$(document).ready(function () {
  /* ---------- SEAT TABLE ---------- */
  fetch("https://viaje.ai/seatinfo_api/")
    .then((res) => res.json())
    .then((data) => {
      console.log("Seat API Raw:", data);

      // Convert to Array
      let seatArray = Array.isArray(data)
        ? data
        : Object.values(data).find((v) => Array.isArray(v));

      if (!seatArray) {
        console.error("Seat array not found");
        return;
      }

      let rows = "";
      seatArray.forEach((seat) => {
        rows += `
          <tr>
            <td>${seat.seat_no}</td>
            <td>${seat.price}</td>
            <td>${seat.status}</td>
          </tr>
        `;
      });

      $("#seatTable tbody").html(rows);
      $("#seatTable").DataTable();
    })
    .catch((err) => console.error("Seat API Error:", err));


  /* ---------- CHART ---------- */
  fetch("https://viaje.ai/mainvia_api/")
    .then((res) => res.json())
    .then((data) => {
      console.log("Graph API Raw:", data);

      // Convert to Array
      let graphArray = Array.isArray(data)
        ? data
        : Object.values(data).find((v) => Array.isArray(v));

      if (!graphArray) {
        console.error("Graph array not found");
        return;
      }

      let dates = [];
      let via = [];
      let main = [];

      graphArray.forEach((item) => {
        dates.push(item[0]);
        via.push(item[1]);
        main.push(item[2]);
      });

      Highcharts.chart("bookingChart", {
        chart: {
          type: "column",
        },
        title: {
          text: "",
        },
        xAxis: {
          categories: dates,
          title: {
            text: "",
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: "Bookings",
          },
        },
        tooltip: {
          shared: true,
        },
        series: [
          {
            name: "Via Route",
            data: via,
          },
          {
            name: "Main Route",
            data: main,
          },
        ],
      });
    })
    .catch((err) => console.error("Graph API Error:", err));
});

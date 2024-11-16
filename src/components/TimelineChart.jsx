import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import values from "../data/data.json";
import Typography from "@mui/material/Typography";
import ApexCharts from "apexcharts";

const userMap = {
  23: { name: "Jack A", color: "#ff0000" },
  24: { name: "John M", color: "#00ff00" },
  27: { name: "Richard M", color: "#0000ff" },
};

const { layers, finalSchedule, overrideLayer } = values;

function TimelineChart({ Dataval, currentDate }) {
  const [filterData, setFilterData] = useState();
  const [seriesDataval, setSeriesDataval] = useState(
    Object.keys(userMap).map((userId) => {
      // Layers data
      const userLayers = layers.flatMap((layer) => {
        const filteredLayers = layer.layers.filter(
          (subLayer) => subLayer.userId === parseInt(userId)
        );
        return filteredLayers.map((subLayer) => ({
          x: `Layer ${layer.number}`,
          y: [
            new Date(subLayer.startDate).getTime(),
            new Date(subLayer.endDate).getTime(),
          ],
          userId,
          layerType: `Layer ${layer.number}`,
        }));
      });

      // Override Layer data
      const userOverrideLayer = (overrideLayer || [])
        .filter((item) => item.userId === parseInt(userId))
        .map((schedule) => ({
          x: `Override Layer`,
          y: [
            new Date(schedule.startDate).getTime(),
            new Date(schedule.endDate).getTime(),
          ],
          userId,
          layerType: "Override Layer",
        }));

      // Final Schedule data
      const userFinalSchedule = finalSchedule
        .filter((item) => item.userId === parseInt(userId))
        .map((schedule) => ({
          x: `Final Schedule`,
          y: [
            new Date(schedule.startDate).getTime(),
            new Date(schedule.endDate).getTime(),
          ],
          userId,
          layerType: "Final Schedule",
        }));

      return {
        name: userMap[userId].name,
        data: [...userLayers, ...userOverrideLayer, ...userFinalSchedule],
      };
    })
  );

  const [datachart, setDatachart] = useState({
    options: {
      chart: {
        id: "area-datetime",
        type: "rangeBar",
        height: 350,
        zoom: {
          autoScaleYaxis: true,
        },
      },
      grid: {
        show: true,
        borderColor: "#e0e0e0",
        strokeDashArray: 4,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.25,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100],
        },
      },
      xaxis: {
        type: "datetime",
        position: "top",
      },
      markers: {
        size: 0,
        style: "hollow",
      },
      legend: {
        position: "top",
      },
      tooltip: {
        custom: ({ seriesIndex, dataPointIndex, w }) => {
          const userId =
            w.config.series[seriesIndex].data[dataPointIndex].userId;
          const userName = userMap[userId].name;
          const startDate = new Date(
            w.config.series[seriesIndex].data[dataPointIndex].y[0]
          );
          const endDate = new Date(
            w.config.series[seriesIndex].data[dataPointIndex].y[1]
          );
          const layerType =
            w.config.series[seriesIndex].data[dataPointIndex].layerType;

          return `
            <div style="padding: 5px; background: #fff; border: 1px solid #ddd;">
              <strong>${userName}</strong><br />
              From: ${startDate.toLocaleString()}<br />
              To: ${endDate.toLocaleString()}<br />
              Layer: ${layerType}
            </div>
          `;
        },
      },
    },
    selection: filterData,
  });

  const updateData = (timeline) => {
    const startDate = currentDate;
    let endDate = currentDate;
    switch (timeline) {
      case "1 DAY":
        endDate = currentDate;
        break;
      case "2 DAY":
        endDate = new Date(
          new Date(currentDate).setDate(new Date(currentDate).getDate() + 2)
        )
          .toISOString()
          .split("T")[0];
        break;
      case "1 WEEK":
        endDate = new Date(
          new Date(currentDate).setDate(new Date(currentDate).getDate() + 7)
        )
          .toISOString()
          .split("T")[0];
        break;
      case "2 WEEK":
        endDate = new Date(
          new Date(currentDate).setDate(new Date(currentDate).getDate() + 14)
        )
          .toISOString()
          .split("T")[0];
        break;
      case "1 MONTH":
        endDate = new Date(
          new Date(currentDate).setMonth(new Date(currentDate).getMonth() + 1)
        )
          .toISOString()
          .split("T")[0];
        break;
      default:
        break;
    }

    ApexCharts.exec(
      "area-datetime",
      "zoomX",
      new Date(startDate).getTime(),
      new Date(endDate).getTime()
    );
  };

  useEffect(() => {
    setFilterData(Dataval);
    updateData(Dataval);
  }, [Dataval, currentDate, overrideLayer]);

  const formattedDate = new Date(currentDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
        {formattedDate}
      </Typography>
      <Chart
        type="rangeBar"
        height={500}
        options={datachart.options}
        series={seriesDataval}
      />
    </div>
  );
}

export default TimelineChart;

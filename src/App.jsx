import React, { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TimelineChart from "./components/TimelineChart";

function App() {
  const [filter, setFilter] = useState("1 MONTH");
  const [currentDate, setCurrentDate] = useState("2022-10-01");

  const handleToday = () => {
    const today = new Date().toISOString().split("T")[0];
    setCurrentDate(today);
  };

  const handlePrev = () => {
    const newDate = new Date(currentDate);
    switch (filter) {
      case "1 DAY":
        newDate.setDate(newDate.getDate() - 1);
        break;
      case "2 DAY":
        newDate.setDate(newDate.getDate() - 2);
        break;
      case "1 WEEK":
        newDate.setDate(newDate.getDate() - 7);
        break;
      case "2 WEEK":
        newDate.setDate(newDate.getDate() - 14);
        break;
      case "1 MONTH":
        newDate.setMonth(newDate.getMonth() - 1);
        break;
      default:
        break;
    }
    setCurrentDate(newDate.toISOString().split("T")[0]);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    switch (filter) {
      case "1 DAY":
        newDate.setDate(newDate.getDate() + 1);
        break;
      case "2 DAY":
        newDate.setDate(newDate.getDate() + 2);
        break;
      case "1 WEEK":
        newDate.setDate(newDate.getDate() + 7);
        break;
      case "2 WEEK":
        newDate.setDate(newDate.getDate() + 14);
        break;
      case "1 MONTH":
        newDate.setMonth(newDate.getMonth() + 1);
        break;
      default:
        break;
    }
    setCurrentDate(newDate.toISOString().split("T")[0]);
  };

  const buttonStyle = (buttonFilter) => {
    return filter === buttonFilter
      ? { borderRadius: 0, backgroundColor: "#3f51b5", color: "#fff" }
      : { borderRadius: 0 };
  };

  return (
    <Box>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button
            variant="outlined"
            sx={{
              mr: "2%",
              "&:hover": {
                backgroundColor: "#3f51b5",
                color: "#fff",
              },
            }}
            onClick={handleToday}
          >
            Today
          </Button>
          <Button
            variant="outlined"
            sx={{
              mr: "2%",
              "&:hover": {
                backgroundColor: "#3f51b5",
                color: "#fff",
              },
            }}
            onClick={handlePrev}
          >
            <ArrowBackIosIcon />
          </Button>
          <Button
            variant="outlined"
            sx={{
              mr: "2%",
              "&:hover": {
                backgroundColor: "#3f51b5",
                color: "#fff",
              },
            }}
            onClick={handleNext}
          >
            <ArrowForwardIosIcon />
          </Button>
        </Typography>

        <Typography>
          <Button
            variant="outlined"
            sx={buttonStyle("1 DAY")}
            onClick={() => setFilter("1 DAY")}
          >
            1 DAY
          </Button>
          <Button
            variant="outlined"
            sx={buttonStyle("2 DAY")}
            onClick={() => setFilter("2 DAY")}
          >
            2 DAY
          </Button>
          <Button
            variant="outlined"
            sx={buttonStyle("1 WEEK")}
            onClick={() => setFilter("1 WEEK")}
          >
            1 WEEK
          </Button>
          <Button
            variant="outlined"
            sx={buttonStyle("2 WEEK")}
            onClick={() => setFilter("2 WEEK")}
          >
            2 WEEK
          </Button>
          <Button
            variant="outlined"
            sx={buttonStyle("1 MONTH")}
            onClick={() => setFilter("1 MONTH")}
          >
            1 MONTH
          </Button>
        </Typography>
      </Toolbar>

      <TimelineChart Dataval={filter} currentDate={currentDate} />
    </Box>
  );
}

export default App;

import cron from "cron";
import https from "https";

const job = new cron.CronJob("*/14 * * * *", function () {
  https
    .get(process.env.API_URL, (res) => {
      if (res.statusCode === 200) console.log("GET request sent successfully");
      else console.log("GET request failed with status code", res.statusCode);
    })
    .on("error", (err) => {
      console.log("Error sending GET request:", err);
    });
});

export default job;

// CRON JOB EXPLANATION
// Cron jobs are scheduled tasks that run periodically at fixed intervals.
// We want to send 1 GET request every 14 minutes

// How to define a "Schedule"?
// You define a schedule using a cron expression, which consisits of 5 fields representing:

//! MINUTE, HOUR, DAY OF THE MONTH, MONTH, DAY OF THE WEEK

//? EXAMPLES && EXPLANATIONS
//* 14 * * * 8 - Every 14 minutes
//* 0 0 * * * 8 - At midnight on every Sunday
//* 30 3 15 * * - At 3:30 on the 15th day of every month
//* 0 0 1 1 * - At midnight, on January 1st
//* 0 * * * * - Every hour

import express from "express"
import cors from "cors"
import fs from "fs";
import readline from "readline";

const app = express()

app.use(cors());

app.get("/", (req, res) => {

    const data = [];
    const filePath = "player_stats.csv";

    // input stream
    const readL = readline.createInterface({
        input: fs.createReadStream(filePath),
        output: process.stdout,
        terminal: false
    });

    var lineCt = 0;

    readL.on("line", (line) => {
        // Only load 50 data values to avoid overcrowding
        if(lineCt != 0 && lineCt < 50){
            const values = line.split(",");
        
            const kd = parseFloat(values[5]);
            const rating = parseFloat(values[6]);
            data.push({kd, rating});
        }
        lineCt++;
    });

    // On file close
    readL.on("close", () => {
        // Send data
        res.json(data);
    });

    readL.on("error", (error) => {

        console.error("Error while reading data file: ", error);
        res.status(500).json({ error: "Internal Server Error" });
        
    });
});


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server listening on port ${port} 🚀`))
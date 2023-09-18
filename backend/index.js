import express from "express"
import cors from "cors"
import fs from "fs";
import readline from "readline";

const app = express()

app.use(cors());

app.get("/", (req, res) => {
    const data = [];
    const filePath = "player_stats.csv";

    const readL = readline.createInterface({
        input: fs.createReadStream(filePath),
        output: process.stdout,
        terminal: false
    });

    let lineCt = 0;

    readL.on("line", (line) => {
        if(lineCt != 0 || lineCt>200){
            const values = line.split(",");
        
            const kd = parseFloat(values[5]);
            const rating = parseFloat(values[6]);
            data.push({kd, rating});
        }
        lineCt++;
    });

    readL.on("close", () => {
        res.json(data);
    });

    readL.on("error", (error) => {
        console.error("Error reading CSV file:", error);
        res.status(500).json({ error: "Internal Server Error" });
    });
});


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server listening on port ${port} 🚀`))
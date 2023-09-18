const graphDiv = document.getElementById("graph");

fetch(
    "https://dssd23-24.onrender.com" //use "http://localhost:3000" if running sample express backend locally, or replace with your own backend endpoint url
).then(async res => {
    const data = await res.json();

    const plot = {
        x: data.map(item => item.kd),
        y: data.map(item => item.rating),
        mode: 'markers',
        type: 'scatter',
        marker: {size: 5}
    };

    const legend = {
        title: 'CSGO KD vs HLTV Rating',
        xaxis:{
            title:'Kill Death Ratio',
        },
        yaxis:{
            title: 'HLTV Rating',
        }
    };

    Plotly.newPlot(graphDiv, [plot], legend);
})

const graphDiv = document.getElementById("graph");

fetch(
    "https://dssdoa-nl.onrender.com" //use "http://localhost:3000" if running sample express backend locally, or replace with your own backend endpoint url
).then(async res => {
    
    const data = await res.json();
    /* try {
        const data = await response.json();
      } catch(e) {
        console.log('error:', e.message);
        console.log(data);
      } */

    const legend = {

        xaxis:{
            title:'Kill Death Ratio',
        },
        yaxis:{
            title: 'HLTV Rating',
        },
        title: 'CSGO KD vs HLTV Rating'

    };

    const plot = {

        x: data.map(item => item.kd),
        y: data.map(item => item.rating),
        mode: 'markers',
        type: 'scatter',
        marker: {size: 5}

    };

    Plotly.newPlot(graphDiv, [plot], legend);
})

 function generateChart(wrong, correct, hasPasssed) {

        const data = {
            datasets: [{
            backgroundColor: ['#d20094', '#00ffff'],
            data: [wrong, correct],
            borderWidth: 0,
            cutout: '70%',
            }]
        };    

        const config = {
        type: 'doughnut',
        data: data,
        options: {
            scaleShowLabels: false,
            
        },
        plugins: []
        };
        const myChart = new Chart(document.querySelector('#chart'), config);
    
        document.querySelector('#chart').style.width = '380px'
        document.querySelector('#chart').style.height = '380px'
}

export default generateChart;

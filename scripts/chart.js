 function generateChart(wrong, correct) {
        const labels = [
            'Wrong',
            'Correct'
        ];
        
        const data = {
            labels: labels,
            datasets: [{
            backgroundColor: ['#d20094', '#00ffff'],
            data: [wrong, correct],
            borderWidth: 0,
            }]
        };    
        const config = {
        type: 'doughnut',
        data: data,
        options: {}
        };
        const myChart = new Chart(document.querySelector('#chart'), config);
    
        document.querySelector('#chart').style.width = '400px'
        document.querySelector('#chart').style.height = '400px'
}

export default generateChart;

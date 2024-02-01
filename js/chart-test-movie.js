
    const moviePrices = []; // 영화 영화를 저장할 배열
    let movieChart; // 영화 차트 변수를 전역으로 선언

    // 영화 차트 초기화
    const ctx = document.getElementById('movieChart').getContext('2d');
    movieChart = new Chart(ctx, {
    type: 'line',
    data: {
    labels: Array.from({ length: 10 }, (_, i) => ''),
    datasets: [{
    label: '영화 예매률',
    data: moviePrices,
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 1,
    fill: false,
}],
},
    options: {
    scales: {
    y: {
    beginAtZero: false,
},
},
},
});

    function updateHitMovie() {
    // 현재 영화 예매률
    const currPrice = parseFloat($('#moviePrice').text().replace(',', ''));

    // 랜덤한 예매률 생성 (-5%에서 5% 범위 내)
    const randomPercentage = (Math.random() - 0.7) * 10;
    
    // (소수점 이하 없는 정수로 변경)
    const priceChange = Math.round(currPrice * (randomPercentage / 100));
    const movieGoodPrice = currPrice + priceChange;


    // 영화 배열에 추가
    moviePrices.push(movieGoodPrice);

    // 최대 10개까지만 유지
    if (moviePrices.length > 20) {
    // moviePrices.shift(); // 첫 번째 원소 제거
        moviePrices[0][0].empty(); 
}

    // 영화 차트 업데이트
    updateMovieChart();

    // 영화변동 및 변동률 업데이트
    $('#priceChange').text(priceChange);
    $('#moviePrice').text(movieGoodPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    $('#percentageChange').text(randomPercentage.toFixed(2) + '%');
}

    // 영화 초기 업데이트
    updateHitMovie();

    // 랜덤한 시간 주기로 영화 업데이트
    const MIN_INTERVAL = 1000; // 최소 1초
    const MAX_INTERVAL = 3000; // 최대 3초
    function scheduleMovieUpdate() {
    const randomInterval = Math.random() * (MAX_INTERVAL - MIN_INTERVAL + 1) + MIN_INTERVAL;
    setTimeout(function() {
    updateHitMovie();
    scheduleMovieUpdate();
}, randomInterval);
}

    scheduleMovieUpdate();

    function updateMovieChart() {
    movieChart.data.labels = Array.from({ length: 10 }, (_, i) => ''); // 데이터 레이블 비우기
    movieChart.data.labels.push('');
    movieChart.data.datasets[0].data = moviePrices;
    movieChart.update();
}

// 1. Chart.js : Radar des Compétences
const ctxRadar = document.getElementById('skillsRadar').getContext('2d');
new Chart(ctxRadar, {
  type: 'radar',
  data: {
    labels: ['Signal & GNSS', ['RF &', 'Antennas'], ['IA & Time-', 'Series'], '5G / NTN', 'Propagation', ['Python /', 'MATLAB']],
    datasets: [{
      label: 'Niveau (%)',
      data: [90, 85, 80, 85, 85, 95],
      backgroundColor: 'rgba(56, 189, 248, 0.25)',
      borderColor: '#38bdf8',
      borderWidth: 2,
      pointBackgroundColor: '#38bdf8',
      pointBorderColor: '#fff',
      pointHoverRadius: 6
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        pointLabels: {
          color: '#94a3b8',
          font: { size: 11, weight: '500' }
        },
        ticks: { display: false },
        suggestedMin: 0,
        suggestedMax: 100
      }
    },
    plugins: { legend: { display: false } }
  }
});

// 2. Chart.js : Répartition Outils (Thème Cyan/Bleu)
const ctxDoughnut = document.getElementById('toolsDoughnut').getContext('2d');
new Chart(ctxDoughnut, {
  type: 'doughnut',
  data: {
    labels: ['MATLAB', 'Python / PyTorch', 'LTspice / HFSS', 'LaTeX / Git'],
    datasets: [{
      data: [35, 30, 20, 15],
      backgroundColor: [
        '#38bdf8', // Blue
        '#0284c7', // Dark Blue
        '#06b6d4', // Cyan
        '#818cf8'  // Indigo
      ],
      borderWidth: 0,
      hoverOffset: 8
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#94a3b8',
          font: { size: 12 },
          padding: 16,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      }
    }
  }
});

// 3. Filtrage dynamique
function filterProjects(category) {
  const cards = document.querySelectorAll('.project-card');
  const buttons = document.querySelectorAll('.filter-btn');

  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  cards.forEach(card => {
    if (category === 'all' || card.dataset.category.includes(category)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}
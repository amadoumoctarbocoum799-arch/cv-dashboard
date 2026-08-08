/* ═══════════════════════════════════════════════════════════
   CV DASHBOARD · Amadou Moctar BOCOUM
   script.js
   ═══════════════════════════════════════════════════════════ */

/* ─── COULEURS THÈME ─────────────────────────────────────── */
const C = {
  cyan:      '#38bdf8',
  violet:    '#a78bfa',
  teal:      '#06b6d4',
  amber:     '#fbbf24',
  green:     '#34d399',
  cyanDim:   'rgba(56,189,248,.2)',
  violetDim: 'rgba(167,139,250,.2)',
  tealDim:   'rgba(6,182,212,.2)',
  gridLine:  'rgba(255,255,255,.07)',
  text:      '#64748b',
};

/* ─── 1. RADAR CHART ─────────────────────────────────────── */
const radarCtx = document.getElementById('radarChart').getContext('2d');

// Plugin : dessine un fond coloré sur l'aire remplie (lueur)
const glowPlugin = {
  id: 'radarGlow',
  beforeDraw(chart) {
    const ctx = chart.ctx;
    ctx.save();
    // ombre diffuse sur le canvas
    ctx.shadowColor  = C.cyan;
    ctx.shadowBlur   = 18;
  },
  afterDraw(chart) {
    chart.ctx.restore();
  }
};

new Chart(radarCtx, {
  type: 'radar',
  plugins: [glowPlugin],
  data: {
    labels: [
      ['Signal', '& GNSS'],
      ['RF &', 'Antennes'],
      ['IA /','Time-Series'],
      ['5G', 'NTN'],
      ['Propagation', 'Satellite'],
      ['Python/', 'MATLAB'],
    ],
    datasets: [{
      label: 'Niveau (%)',
      data: [90, 85, 80, 85, 85, 95],
      backgroundColor: 'rgba(56,189,248,.12)',
      borderColor: C.cyan,
      borderWidth: 2,
      pointBackgroundColor: C.cyan,
      pointBorderColor: '#0f1727',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7,
      pointHoverBackgroundColor: '#fff',
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0, max: 100,
        ticks: {
          display: false,
          stepSize: 20,
        },
        grid: {
          color: C.gridLine,
          lineWidth: 1,
        },
        angleLines: {
          color: C.gridLine,
          lineWidth: 1,
        },
        pointLabels: {
          color: C.text,
          font: { size: 11, family: "'Space Grotesk', sans-serif", weight: '500' },
          padding: 14,
        },
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0f1727',
        borderColor: C.cyan,
        borderWidth: 1,
        titleColor: C.cyan,
        bodyColor: '#94a3b8',
        padding: 12,
        callbacks: {
          label: ctx => `  ${ctx.raw}%`,
        }
      }
    }
  }
});

/* ─── 2. DONUT CHART ─────────────────────────────────────── */
const donutCtx = document.getElementById('donutChart').getContext('2d');

// Plugin : texte central
const centerTextPlugin = {
  id: 'centerText',
  beforeDraw(chart) {
    const { ctx, chartArea: { left, top, right, bottom } } = chart;
    const cx = (left + right) / 2;
    const cy = (top + bottom) / 2;
    ctx.save();
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = "700 22px 'Space Grotesk', sans-serif";
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText('Stack', cx, cy - 10);
    ctx.font = "400 11px 'Inter', sans-serif";
    ctx.fillStyle = '#64748b';
    ctx.fillText('Outils & Langages', cx, cy + 12);
    ctx.restore();
  }
};

new Chart(donutCtx, {
  type: 'doughnut',
  plugins: [centerTextPlugin],
  data: {
    labels: ['MATLAB', 'Python / PyTorch', 'HFSS / LTspice', 'C / C++', 'LaTeX / Git'],
    datasets: [{
      data: [30, 30, 18, 10, 12],
      backgroundColor: [C.cyan, C.violet, C.teal, C.amber, C.green],
      borderWidth: 0,
      hoverOffset: 10,
      hoverBorderWidth: 2,
      hoverBorderColor: '#fff',
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '68%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#64748b',
          font: { size: 11.5, family: "'Inter', sans-serif" },
          padding: 14,
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 9,
        }
      },
      tooltip: {
        backgroundColor: '#0f1727',
        borderColor: 'rgba(56,189,248,.3)',
        borderWidth: 1,
        titleColor: '#e2e8f0',
        bodyColor: '#94a3b8',
        padding: 12,
        callbacks: {
          label: ctx => `  ${ctx.label}: ${ctx.raw}%`,
        }
      }
    }
  }
});

/* ─── 3. ANIMATION BARRES COMPÉTENCES ───────────────────── */
function animateSkillBars() {
  const bars = document.querySelectorAll('.skill-bar');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(bar => observer.observe(bar));
}
animateSkillBars();

/* ─── 4. FILTRAGE PROJETS (avec animation smooth) ───────── */
function initFilters() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  const count = document.getElementById('projectCount');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Mettre à jour le bouton actif
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      let visible = 0;

      cards.forEach(card => {
        const cats = card.dataset.cat || '';
        const show = (filter === 'all') || cats.includes(filter);

        if (show) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeIn .35s ease both';
          visible++;
        } else {
          card.classList.add('hidden');
        }
      });

      count.textContent = `${visible} projet${visible > 1 ? 's' : ''}`;
    });
  });
}
initFilters();

/* ─── 5. KEYFRAME fadeIn via JS (pas dans CSS pour éviter conflit) */
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

/* ─── 6. TOOLTIPS COMPÉTENCES (léger) ───────────────────── */
const skillNames = document.querySelectorAll('.skill-name');
skillNames.forEach(el => {
  el.title = el.textContent.trim();
});

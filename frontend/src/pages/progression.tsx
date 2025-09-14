import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import * as echarts from 'echarts';

interface Parti {
  _id: string;
  nom: string;
  votes: number;
  votesPercent?: number; // Calculé pour le graphique
}

const ResultsPage: React.FC = () => {
  const [parties, setParties] = useState<Parti[]>([]);

  // Fonction pour récupérer les partis depuis l'API
  const fetchParties = async () => {
    try {
      const response = await fetch('https://iai-vote.onrender.com/api/partis');
      const data: Parti[] = await response.json();

      // Calcul du pourcentage
      const totalVotes = data.reduce((sum, p) => sum + (p.votes || 0), 0);
      const partiesWithPercent = data.map(p => ({
        ...p,
        votesPercent: totalVotes ? Math.round((p.votes / totalVotes) * 100) : 0
      }));

      setParties(partiesWithPercent);
      updateChart(partiesWithPercent);
    } catch (err) {
      console.error("Erreur récupération des partis :", err);
    }
  };

  // Fonction pour mettre à jour le graphique ECharts
  const updateChart = (partiesData: Parti[]) => {
    const chartDom = document.getElementById('voteChart');
    if (chartDom) {
      const myChart = echarts.init(chartDom);
      const option = {
        animation: false,
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'value', boundaryGap: [0, 0.01] },
        yAxis: { type: 'category', data: partiesData.map(p => p.nom) },
        series: [
          {
            type: 'bar',
            data: partiesData.map(p => p.votes),
            itemStyle: { color: '#4A90E2' }
          }
        ]
      };
      myChart.setOption(option);
    }
  };

  useEffect(() => {
    fetchParties();

    // Rafraîchissement toutes les 10 secondes
    const interval = setInterval(fetchParties, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <Header />

      <section className="py-24 bg-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Résultats en Direct</h2>
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-2xl transition-all">
            <div id="voteChart" style={{ height: '400px' }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {parties.map((party) => (
              <div key={party._id} className="bg-white rounded-lg shadow-lg p-6 text-center hover:scale-105 hover:shadow-2xl transition-transform">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{party.nom}</h3>
                <div className="text-3xl font-bold text-[#4A90E2] mb-2">{party.votesPercent}%</div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-[#4A90E2] h-3 rounded-full transition-all"
                    style={{ width: `${party.votesPercent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ResultsPage;

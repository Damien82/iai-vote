import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';

interface DashboardContentProps {
  darkMode: boolean;
}

interface Party {
  nom: string;
  votes: number;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ darkMode }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [userCount, setUserCount] = useState<number>(0);
  const [adminCount, setAdminCount] = useState<number>(0);
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const [parties, setParties] = useState<Party[]>([]);

  // --- Récupération des counts ---
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const res = await fetch('https://iai-vote.onrender.com/api/users/count');
        const data = await res.json();
        setUserCount(data.count);
      } catch (err) {
        console.error(err);
      }
    };
    const fetchAdminCount = async () => {
      try {
        const res = await fetch('https://iai-vote.onrender.com/api/admins/count');
        const data = await res.json();
        setAdminCount(data.count);
      } catch (err) {
        console.error(err);
      }
    };
    const fetchTotalVotes = async () => {
      try {
        const res = await fetch('https://iai-vote.onrender.com/api/admins/countvote');
        const data = await res.json();
        setTotalVotes(data.totalVotes);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserCount();
    fetchAdminCount();
    fetchTotalVotes();
  }, []);

  // --- Récupération des partis pour le graphique ---
  useEffect(() => {
    const fetchParties = async () => {
      try {
        const res = await fetch('https://iai-vote.onrender.com/api/partis'); // ton API
        const data = await res.json();
        setParties(data);
      } catch (err) {
        console.error("Erreur récupération partis :", err);
      }
    };
    fetchParties();
  }, []);

  // --- Initialisation graphique ---
  useEffect(() => {
    if (!chartRef.current || parties.length === 0) return;

    const myChart = echarts.init(chartRef.current);

    const option = {
      backgroundColor: 'transparent',
      title: {
        text: 'Résultats des Votes en %',
        left: 'center',
        textStyle: {
          color: darkMode ? '#ffffff' : '#1f2937',
          fontSize: 18,
          fontWeight: 'bold',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: darkMode ? '#374151' : '#ffffff',
        borderColor: darkMode ? '#6b7280' : '#e5e7eb',
        textStyle: { color: darkMode ? '#ffffff' : '#1f2937' },
      },
      xAxis: {
        type: 'category',
        data: parties.map(p => p.nom),
        axisLine: { lineStyle: { color: darkMode ? '#6b7280' : '#d1d5db' } },
        axisLabel: { color: darkMode ? '#d1d5db' : '#6b7280' },
      },
      yAxis: {
        type: 'value',
        axisLine: { lineStyle: { color: darkMode ? '#6b7280' : '#d1d5db' } },
        axisLabel: { color: darkMode ? '#d1d5db' : '#6b7280' },
        splitLine: { lineStyle: { color: darkMode ? '#374151' : '#f3f4f6' } },
      },
      series: [
        {
          name: 'Votes',
          type: 'bar',
          data: parties.map(p => p.votes),
          itemStyle: {
            color: function (params: any) {
              const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];
              return colors[params.dataIndex % colors.length];
            },
            borderRadius: [6, 6, 0, 0],
          },
          barWidth: '40%',
        },
      ],
    };

    myChart.setOption(option);

    const handleResize = () => myChart.resize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      myChart.dispose();
    };
  }, [darkMode, parties]);

  const stats = [
    { title: 'Total Utilisateurs', value: `${userCount} utilisateur${userCount > 1 ? 's' : ''}`, color: 'from-blue-500 to-blue-600' },
    { title: 'Total Administrateurs', value: `${adminCount} administrateur${adminCount > 1 ? 's' : ''}`, color: 'from-purple-500 to-purple-600' },
    { title: 'Total Votes', value: `${totalVotes} vote${totalVotes > 1 ? 's' : ''}`, color: 'from-green-500 to-green-600' },
  ];

  return (
    <div className="space-y-8">
      {/* Message de bienvenue */}
      <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border shadow-lg`}>
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
          Bienvenue sur votre Dashboard 👋
        </h1>
        <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Voici un aperçu de vos données et statistiques importantes.
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}>
              <FontAwesomeIcon icon={faChartBar} className="text-white" size="lg" />
            </div>
            <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wide mb-2`}>
              {stat.title}
            </h3>
            <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Graphique dynamique */}
      <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border shadow-lg`}>
        <div ref={chartRef} style={{ width: '100%', height: 400 }} />
      </div>
    </div>
  );
};

export default DashboardContent;

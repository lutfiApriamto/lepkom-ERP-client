import { Card } from '@/components/ui/Card';
import { useAdminDashboardStore } from '../../../shared/store';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#14b8a6', '#f43f5e'];

export const AdminChartWidget = ({ isLoading }: { isLoading: boolean }) => {
  const data = useAdminDashboardStore(state => state.adminStats);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6">
        <Card className="animate-pulse h-96" />
        <Card className="animate-pulse h-96" />
      </div>
    );
  }

  const funnel = data?.funnel || {};
  const funnelData = Object.keys(funnel).map((key) => ({
    name: key.replace(/_/g, ' ').toUpperCase(),
    total: funnel[key],
  }));

  const jurusan = data?.jurusan || {};
  const jurusanData = Object.keys(jurusan).map((key) => ({
    name: key,
    value: jurusan[key],
  }));

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card header="Funnel Rekrutmen">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 12 }} />
              <Tooltip cursor={{fill: '#f3f4f6'}} />
              <Bar dataKey="total" fill="#10b981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card header="Distribusi Jurusan">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={jurusanData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${((percent || 0) * 100).toFixed(0)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {jurusanData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

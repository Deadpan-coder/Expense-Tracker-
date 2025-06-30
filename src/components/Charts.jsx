import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';
import useGlobalContext from '../context/useGlobalContext';

const COLORS = ['#0088FE', '#FF8042', '#FFBB28', '#00C49F', '#FF6666', '#AA66CC'];

const Charts = () => {
  const { incomes, expenses } = useGlobalContext();

  // Group expenses by category
  const expenseCategories = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + parseFloat(curr.amount);
    return acc;
  }, {});

  const expenseData = Object.keys(expenseCategories).map((key, index) => ({
    name: key,
    value: expenseCategories[key],
    fill: COLORS[index % COLORS.length],
  }));

  const totalIncome = incomes.reduce((acc, income) => acc + parseFloat(income.amount), 0);
  const totalExpense = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);

  const summaryData = [
    { name: 'Income', amount: totalIncome },
    { name: 'Expense', amount: totalExpense }
  ];

  return (
    <div className="w-full mt-8 grid md:grid-cols-2 gap-6">
      {/* Donut Chart for Expenses */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Expenses by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={expenseData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={60}
              label
            >
              {expenseData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart for Income vs Expense */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Income vs Expenses</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={summaryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;

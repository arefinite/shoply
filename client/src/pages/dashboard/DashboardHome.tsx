import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetAllProducts } from "@/services/queries";
import { Product } from '@/types/product';
import { LoaderCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const DashboardHome = () => {
  const {
    data: products,
    isPending: isProductsPending,
    isError: isProductsError,
  } = useGetAllProducts();

  if (isProductsPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  if (isProductsError) {
    return <p>Something went wrong!</p>;
  }

  
  const productsList = products as Product[];

  
  const categoryCounts = productsList.reduce((acc: Record<string, number>, product: Product) => {
    if (!acc[product.category]) {
      acc[product.category] = 0;
    }
    acc[product.category]++;
    return acc;
  }, {});

  const data = Object.keys(categoryCounts).map(category => ({
    category,
    count: categoryCounts[category]
  }));

  return (
    <main className="mt-8">
      <h1 className="text-2xl text-center font-semibold mb-8">Dashboard Home</h1>
      <section className="grid grid-cols-1 gap-4">
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Products by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default DashboardHome;

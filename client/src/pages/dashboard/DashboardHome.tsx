import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetAllProducts } from "@/services/queries";
import { Product } from '@/types/product';
import { LoaderCircle } from 'lucide-react';

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

  return (
    <main className="mt-8">
      <h1 className="text-2xl text-center font-semibold mb-8">Dashboard Home</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.keys(categoryCounts).map((category) => (
          <Card key={category} className="p-4">
            <CardHeader>
              <CardTitle>{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Number of Products: <strong>{categoryCounts[category]}</strong>
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
};

export default DashboardHome;

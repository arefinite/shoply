import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useGetAllProducts } from '@/services/queries';

import { LoaderCircle, Star } from 'lucide-react';
import { Product } from '@/types/product';

const Products = () => {
  const {
    data: products,
    isPending: isProductsPending,
    isError: isProductsError,
  } = useGetAllProducts();

  const [searchName, setSearchName] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchRating, setSearchRating] = useState('');
  const [searchBrand, setSearchBrand] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]| never>([]);

  useEffect(() => {
    if (products) {
      let filtered = products;

      if (searchName) {
        filtered = filtered.filter(product =>
          product.title.toLowerCase().includes(searchName.toLowerCase())
        );
      }

      if (searchCategory) {
        filtered = filtered.filter(product =>
          product.category.toLowerCase().includes(searchCategory.toLowerCase())
        );
      }

      if (searchRating) {
        filtered = filtered.filter(product =>
          +product.rating === parseInt(searchRating)
        );
      }

      if (searchBrand) {
        filtered = filtered.filter(product =>
          product.brand.toLowerCase().includes(searchBrand.toLowerCase())
        );
      }

      setFilteredProducts(filtered);
    }
  }, [products, searchName, searchCategory, searchRating, searchBrand]);

  if (isProductsPending)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  if (isProductsError) return <p>Something went wrong!</p>;

  return (
    <main className="center pb-8">
      <h2 className="text-2xl text-center font-semibold py-8">Discounted Gadgets</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="md:w-[250px] border h-fit p-4 sticky top-0 bg-muted">
          <h1 className="text-center font-semibold pb-4">Search by</h1>
          <div>
            <form className="space-y-4">
              <Input
                placeholder="Search by name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <Input
                placeholder="Search by category"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
              />
              <Input
                placeholder="Search by rating"
                value={searchRating}
                onChange={(e) => setSearchRating(e.target.value)}
              />
              <Input
                placeholder="Search by brand"
                value={searchBrand}
                onChange={(e) => setSearchBrand(e.target.value)}
              />
              <Button className="w-full" onClick={(e) => e.preventDefault()}>
                Search
              </Button>
            </form>
          </div>
        </Card>
        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product._id}>
              <CardHeader>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-36 object-cover"
                />
                <CardTitle className="pt-4">{product.title}</CardTitle>
                <CardDescription>
                  <span>Category: {product.category}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-2 flex-col">
                <div className="flex flex-col gap-1">
                  <span>
                    Price: <strong>${product.price}</strong>
                  </span>
                  <span className="flex gap-1 items-center">
                    Rating: <strong>{product.rating}</strong> <Star size={20} />
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span>
                    Before: <span className="line-through">${product.price}</span>
                  </span>
                  <span className="font-semibold">
                    Price: $
                    {product.discount &&
                      (
                        +product.price -
                        Math.ceil((+product.price * +product.discount) / 100)
                      ).toFixed(2)}{' '}
                    <span className="text-sm text-red-500">
                      ({product.discount}% discount)
                    </span>
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button>View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </section>
      </div>
    </main>
  );
};

export default Products;

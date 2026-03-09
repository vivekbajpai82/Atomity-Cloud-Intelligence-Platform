import { useQuery } from "@tanstack/react-query";

const METRIC_MAP = [
  { title: "Cost Saved",          unit: "%",  prefix: "",  trend: "up"   },
  { title: "Uptime",              unit: "%",  prefix: "",  trend: "up"   },
  { title: "Resources Optimized", unit: "TB", prefix: "",  trend: "up"   },
  { title: "Latency Reduced",     unit: "ms", prefix: "-", trend: "down" },
  { title: "Active Nodes",        unit: "",   prefix: "",  trend: "up"   },
  { title: "Deployments Today",   unit: "",   prefix: "",  trend: "up"   },
];

const fetchMetrics = async () => {
  const res = await fetch("https://dummyjson.com/products?limit=6");
  console.log("API status:", res.status);
  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();
  console.log("Data received:", data.products.length);

  return data.products.map((product, i) => {
    const DESCRIPTIONS = [
      `Saved across ${Math.round(product.stock / 10)} cloud regions`,
      `${Math.round(product.rating * 20)}% SLA guaranteed`,
      `${Math.round(product.stock / 5)} TB freed this month`,
      `Avg response time down by ${Math.round(product.price / 5)}ms`,
      `${Math.round(product.stock / 8)} nodes active globally`,
      `${Math.round(product.price / 2)} deploys completed today`,
    ];

    return {
      id: product.id,
      title: METRIC_MAP[i].title,
      value: Math.round(product.price),
      unit: METRIC_MAP[i].unit,
      prefix: METRIC_MAP[i].prefix,
      trend: METRIC_MAP[i].trend,
      change: `+${Math.round(product.discountPercentage)}%`,
      description: DESCRIPTIONS[i],
    };
  });
};

export const useApiData = () => {
  return useQuery({
    queryKey: ["metrics"],
    queryFn: fetchMetrics,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
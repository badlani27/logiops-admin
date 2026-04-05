interface MetricCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  color?: "blue" | "green" | "yellow" | "red" | "gray";
}

const colorMap = {
  blue: "border-blue-400 bg-blue-50",
  green: "border-green-400 bg-green-50",
  yellow: "border-yellow-400 bg-yellow-50",
  red: "border-red-400 bg-red-50",
  gray: "border-gray-300 bg-gray-50",
};

export default function MetricCard({
  label,
  value,
  sublabel,
  color = "gray",
}: MetricCardProps) {
  return (
    <div
      className={`rounded-lg border-l-4 p-4 shadow-sm bg-white ${colorMap[color]}`}
    >
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
      {sublabel && (
        <p className="mt-1 text-xs text-gray-400">{sublabel}</p>
      )}
    </div>
  );
}

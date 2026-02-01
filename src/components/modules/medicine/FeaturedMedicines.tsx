import { Medicine } from "@/types/api.type";
import { MedicineCard } from "./MedicineCard";

interface Props {
  medicines: Medicine[];
}

export const FeaturedMedicines = ({ medicines }: Props) => {
  const featuredMedicines = medicines.filter(
    (medicine) => medicine.isFeatured === true,
  );

  if (featuredMedicines.length === 0) return null;

  return (
    <section className="my-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Featured Medicines</h2>
        <p className="text-muted-foreground">
          Hand-picked medicines just for you
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredMedicines.map((medicine) => (
          <MedicineCard key={medicine.id} medicine={medicine} />
        ))}
      </div>
    </section>
  );
};

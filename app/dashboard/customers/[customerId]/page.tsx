import GridSkeleton from "@/app/ui/GridSkeleton";
import Section from "@/app/ui/Section";
import Image from "next/image";
import CustomerDetails from "@/app/ui/customers/CustomerDetails";
import { Customer } from "@/app/query/customers";

export default async function Page({ params }: { params: Promise<{ customerId: string }> }) {
    
  const { customerId: id } = await params;

  return (
    <Section title={`Customer Details`} fallback={<GridSkeleton />}>
        <CustomerDetails id={id} />
    </Section>
  );
}
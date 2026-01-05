import GridSkeleton from "@/app/ui/GridSkeleton";
import Section from "@/app/ui/Section";

export default function Page() {
    return (
        <Section title="Invoices" fallback={<GridSkeleton />}>
            <div>Invoices content goes here.</div>
        </Section>
    )
}
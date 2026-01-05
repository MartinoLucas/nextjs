import GridSkeleton from "../ui/GridSkeleton";
import Section from "../ui/Section";

export default function Page() {
  return ( 
    <Section title="Dashboard" fallback={<GridSkeleton />}>
        <div>Dashboard content goes here.</div>
    </Section>
  )
}
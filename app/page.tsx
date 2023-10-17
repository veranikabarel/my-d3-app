'use client'
import FamilyTree from "@/app/components/FamilyTree";

const data = {
  name: "Eve",
  children: [
    {name: "Cain"},
    {name: "Seth", children: [{name: "Enos"}, {name: "Noam"}]},
    {name: "Abel"},
    {name: "Awan", children: [{name: "Enoch"}]},
    {name: "Azura"}
  ]
};

export default function Home() {
  return (
    <FamilyTree data={data} />
  );
}

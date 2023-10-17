'use client'
import Dots from "@/app/components/Dots";
import FamilyTreeContainer from "@/app/components/FamilyTreeContainer";
import * as data from '@/app/data/data.json';

export default function Home() {

  return (
    <>
    <Dots />
    <FamilyTreeContainer data={data}/>
    </>
  );

}

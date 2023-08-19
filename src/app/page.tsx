"use client";

import { CardList, MultipleContainers } from "@/components/List/CardList";

export default function Home() {
  return (
    <main>
      <div className="flex w-full min-h-[100vh] p-6">
        {/* <CardList /> */}
        <MultipleContainers />
      </div>
    </main>
  );
}

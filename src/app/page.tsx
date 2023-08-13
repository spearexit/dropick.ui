"use client";
import { Button, Tooltip } from "@nextui-org/react";

export default function Home() {
  return (
    <main>
      <div className="flex w-full h-[100vh] items-center justify-center">
        <Tooltip content="링크 스따또">
          <Button>Hover me</Button>
        </Tooltip>
      </div>
    </main>
  );
}

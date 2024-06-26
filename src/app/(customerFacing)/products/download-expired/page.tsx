import Link from "next/link";

import { Button } from "@/component/ui/button";

export default function Expired() {
  return (
    <>
      <h1 className={"text-4xl mb-4"}>{"Download link expired"}</h1>
      <Button asChild size={"lg"}>
        <Link href={"/orders"}>{"Get New Link"}</Link>
      </Button>
    </>
  );
}
